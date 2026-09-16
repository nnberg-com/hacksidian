import { vi, test, expect, afterEach } from 'vitest';
import { mkdtemp, cp, rm, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
const state = vi.hoisted(() => ({ directory: '', data: {} as any, notices: [] as string[] }));
vi.mock('obsidian', () => ({
 getLanguage: () => 'ru',
 Plugin: class { async loadData(){return state.data;} async saveData(value: any){state.data=structuredClone(value);} },
 Notice: class { constructor(message: string){state.notices.push(message);} },
 MarkdownRenderChild: class {},
 ItemView: class {}, PluginSettingTab: class {}, MarkdownView: class {},
 MarkdownRenderer: {render:vi.fn(async(_app:any,source:string,target:any)=>{target.textContent=source.replace(/<br\s*\/?>/gi," ").replace(/<[^>]*>/g,"").replace(/\[\[([^\]]+)\]\]/g,"$1");})},
}));
vi.mock('../src/capture', () => ({captureReadingView:vi.fn(async()=> 'image-base64')}));
vi.mock('../src/context', () => ({collectComputedStyleContext:vi.fn(()=> 'computed styles')}));
vi.mock('../src/storage', () => ({ styleDirectory: () => state.directory }));
vi.mock('../src/snippets', () => ({ installSnippetTemplates: vi.fn(), refreshNativeSnippets: vi.fn(), migrateSnippetGroups: vi.fn(async()=>[]) }));
import CallMeRedPlugin from '../src/main';
import { captureReadingView } from '../src/capture';
import { OpenAIResponsesProvider } from '../src/provider';
import { installSnippetTemplates } from '../src/snippets';
import { readFileStyle } from '../src/file-style';
let dir='';
afterEach(async()=>{if(dir)await rm(dir,{recursive:true,force:true});state.notices=[];});
async function setup(){
 dir=await mkdtemp(path.join(tmpdir(),'hacksidian-undo-'));state.directory=dir;
 await cp(path.resolve(import.meta.dirname, '../../snippets'),dir,{recursive:true});
 state.data={snippetsInstalled: true,settings:{},state:{versions:[],turns:[]}};
 const plugin=new CallMeRedPlugin({} as any,{} as any);
 (plugin as any).refreshView=vi.fn();
 await plugin.loadPluginData();
 plugin.catalog.active = { revision:'test',createdAt:'now',storeId:'vs_test',documents:[],entries:[{id:'image-round',title:'Rounded',kind:'technique',path:'image-round.md',text:'Rounded photos'}] };
 return plugin;
}
test('legacy CSS history is discarded on load and save without changing current files',async()=>{
 const plugin=await setup();const before=await readFileStyle(dir);
 state.data.state={versions:[{id:'legacy',css:'obsolete CSS'}],turns:[{id:'old',cssBefore:'before',cssAfter:'after'}]};
 await plugin.loadPluginData();await plugin.savePluginData();
 expect(state.data.state).toEqual({turns:[{id:'old'}]});
 expect(await readFileStyle(dir)).toEqual(before);
 expect((plugin as any).undo).toBeUndefined();
});

test('later loads never seed templates, including when a working snippet was deleted', async()=>{
 await setup();
 await rm(path.join(dir,'hacksidian-00-palette.css'));
 const plugin=new CallMeRedPlugin({} as any,{} as any);
 await expect(plugin.loadPluginData()).rejects.toThrow();
 expect(installSnippetTemplates).not.toHaveBeenCalled();
});

test.each([false,true])('feedback never captures the page despite legacy preference (%s)', async(sendScreenshot)=>{
 const plugin=await setup();
 plugin.settings.sendScreenshot=sendScreenshot;plugin.settings.autoPricing=false;
 vi.mocked(captureReadingView).mockClear();
 vi.spyOn(plugin,'getCurrentColoringContext').mockResolvedValue({file:{path:'test.md'},view:{getMode:()=> 'preview',containerEl:{}},markdown:'Test'} as any);
 vi.spyOn(plugin as any,'getColoringFiles').mockReturnValue([]);
 vi.spyOn(plugin,'getCompatibleFonts').mockResolvedValue({families:[]} as any);
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({retrievedIds:[],searchQueries:[],decision:{action:'no_match',message:'',recommendations:[]},usage:{inputTokens:0,cachedInputTokens:0,outputTokens:0,totalTokens:0,estimatedCostUsd:0},responseId:'test'});
 try {
  await plugin.processFeedback('Test',()=>{});
  expect(captureReadingView).not.toHaveBeenCalled();
  expect(create.mock.calls[0][0]).not.toHaveProperty('screenshotBase64');
  expect(create.mock.calls[0][0].prompt).not.toContain('Test document');
 } finally { create.mockRestore(); }
});

test('settings survive reload and legacy screenshots are disabled', async()=>{
 const plugin=await setup();
 expect(plugin.settings.sendScreenshot).toBe(false);
 plugin.settings.sendScreenshot=false;plugin.settings.model='custom-model';plugin.settings.apiKey='test-key';
 await plugin.savePluginData();
 const reloaded=new CallMeRedPlugin({} as any,{} as any);await reloaded.loadPluginData();
 expect(reloaded.settings).toMatchObject({sendScreenshot:false,model:'custom-model',apiKey:'test-key'});
});

test('clear history removes chat and API history persistently without changing style or settings',async()=>{
 const plugin=await setup();
 plugin.state.turns=[{id:'chat',userText:'old chat'} as any];
 plugin.apiAttempts=[{id:'paid',status:'failed',usage:{totalTokens:10,estimatedCostUsd:0.1}} as any];
 const style=await readFileStyle(dir),settings=structuredClone(plugin.settings);
 await plugin.clearHistory();
 expect(plugin.apiAttempts).toEqual([]);expect((plugin as any).refreshView).toHaveBeenLastCalledWith(true);
 expect(plugin.state.turns).toEqual([]);
 expect(plugin.settings).toEqual(settings);expect(await readFileStyle(dir)).toEqual(style);
 const reloaded=new CallMeRedPlugin({} as any,{} as any);(reloaded as any).refreshView=vi.fn();
 await reloaded.loadPluginData();expect(reloaded.apiAttempts).toEqual([]);expect(reloaded.state.turns).toEqual([]);
});

test('clear history refuses during an active operation and preserves history on save failure',async()=>{
 const plugin=await setup();plugin.state.turns=[{id:'keep'} as any];
 const attempts=[{id:'keep-cost',status:'failed'} as any];plugin.apiAttempts=attempts;
 (plugin as any).historyBusy=true;
 await expect(plugin.clearHistory()).rejects.toThrow('Дождитесь');
 expect(plugin.state.turns).toHaveLength(1);
 (plugin as any).historyBusy=false;
 vi.spyOn(plugin,'savePluginData').mockRejectedValueOnce(new Error('disk error'));
 await expect(plugin.clearHistory()).rejects.toThrow('disk error');
 expect(plugin.state.turns).toHaveLength(1);expect(plugin.apiAttempts).toBe(attempts);
});

test('direct hack application changes only its group, does not retain CSS history or call an LLM',async()=>{
 const plugin=await setup();const before=await readFileStyle(dir);
 (plugin as any).app={vault:{configDir:'.obsidian',adapter:{read:async()=>readFile(path.join(dir,'hacksidian-manifest.json'),'utf8')}}};
 vi.spyOn(plugin,'getCurrentHack').mockResolvedValue({id:'text-demo',title:'Demo',path:'atlas/! hacks/text-demo/text-demo.md',spec:{format:2,target:'g-text',hasCss:true},css:'.markdown-preview-view p {letter-spacing:.02em}'});
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration');
 try{
  expect(await plugin.applyCurrentHack('atlas/! hacks/text-demo/text-demo.md')).toBe(true);
  const after=await readFileStyle(dir);expect(after.modules.filter((m,i)=>m.css!==before.modules[i].css).map(m=>m.id)).toEqual(['g-text']);
  expect(await plugin.applyCurrentHack('atlas/! hacks/text-demo/text-demo.md')).toBe(false);
  expect(state.data.state.versions).toBeUndefined();expect(create).not.toHaveBeenCalled();
 }finally{create.mockRestore();}
});

test('interface and content languages persist independently across plugin reloads', async () => {
 const plugin = await setup();
 expect(plugin.settings.interfaceLanguage).toBe('auto');
 expect(plugin.settings.contentLanguage).toBe('auto');
 expect(plugin.interfaceLanguage).toBe('ru');
 plugin.settings.interfaceLanguage = 'en';
 plugin.settings.contentLanguage = 'ru';
 await plugin.savePluginData();
 const reloaded = new CallMeRedPlugin({} as any, {} as any);
 await reloaded.loadPluginData();
 expect(reloaded.interfaceLanguage).toBe('en');
 expect(reloaded.contentLanguage).toBe('ru');
});

test('installed recipe cannot be reapplied; disable and enable preserve the other snippets', async () => {
 const plugin = await setup();
 const current = await readFileStyle(dir);
 const old = structuredClone(current);
 old.modules.find(m => m.id === 'g-task')!.css += '\n/* hacksidian:hack:task-e30:start */\n.callmered-coloring.markdown-preview-view > ul {display:flex}\n/* hacksidian:hack:task-e30:end */\n';
 await (plugin as any).saveAppliedStyle(old);
 const recipe = '/Users/op/vaults/op/! P R O/hacksidian/atlas/! hacks/task-e30';
 const hack = { id: 'task-e30', title: 'Completed last', path: 'atlas/! hacks/task-e30/task-e30.md',
  spec: JSON.parse(await readFile('/Users/op/vaults/op/! P R O/hacksidian/atlas/! hacks/task-e30/hack.json', 'utf8')),
  css: await readFile(path.join(recipe, 'recipe.css'), 'utf8') };
 (plugin as any).app = { vault: { configDir: '.obsidian', adapter: { read: async () => readFile(path.join(dir, 'hacksidian-manifest.json'), 'utf8') } } };
 vi.spyOn(plugin, 'getCurrentHack').mockResolvedValue(hack);
 expect(await plugin.applyCurrentHack(hack.path)).toBe(false);
 expect(await plugin.applyCurrentHack(hack.path, false)).toBe(true);
 const disabled = await readFileStyle(dir);
 expect(disabled.modules.find(m => m.id === 'g-task')!.css).not.toContain('hacksidian:hack:task-e30:start');
 expect(await plugin.applyCurrentHack(hack.path, false)).toBe(false);
 expect(await plugin.applyCurrentHack(hack.path)).toBe(true);
 const updated = await readFileStyle(dir);
 expect(updated.modules.find(m => m.id === 'g-task')!.css).toContain('ul.contains-task-list');
 expect(updated.modules.filter(m=>m.id!=='g-task')).toEqual(current.modules.filter(m=>m.id!=='g-task'));
 expect(state.data.state.versions).toBeUndefined();
 expect(await plugin.applyCurrentHack(hack.path)).toBe(false);
});

test('paid failures are tracked and enforce the spending limit until history is cleared',async()=>{
 const plugin=await setup();
 plugin.settings.autoPricing=false;plugin.settings.sendScreenshot=false;
 vi.spyOn(plugin,'getCurrentColoringContext').mockResolvedValue({file:{path:'test.md'},view:{getMode:()=> 'preview',containerEl:{}},markdown:'test'} as any);
 vi.spyOn(plugin,'getCompatibleFonts').mockResolvedValue({families:['Arial']} as any);
 vi.spyOn(plugin as any,'getColoringFiles').mockReturnValue([]);
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockImplementation(async request=>{
   expect(state.data.apiAttempts[0].status).toBe('pending');
   await request.onUsage!({inputTokens:100,cachedInputTokens:0,outputTokens:10,totalTokens:110,estimatedCostUsd:0.1},'paid-failure');
   expect(state.data.apiAttempts[0].usage.estimatedCostUsd).toBe(0.1);
   throw new Error('Invalid paid CSS');
 });
 await expect(plugin.processFeedback('test',()=>{})).rejects.toThrow('Invalid paid CSS');
 expect(plugin.state.turns).toHaveLength(0);expect(plugin.totalUsage().estimatedCostUsd).toBe(0.1);
 expect(state.data.apiAttempts[0].status).toBe('failed');
 await plugin.loadPluginData();expect(plugin.totalUsage().estimatedCostUsd).toBe(0.1);
 plugin.settings.spendLimitUsd=0.05;create.mockClear();
 await expect(plugin.processFeedback('test',()=>{})).rejects.toThrow('Лимит');expect(create).not.toHaveBeenCalled();
 await plugin.clearHistory();await plugin.loadPluginData();expect(plugin.apiAttempts).toEqual([]);expect(plugin.totalUsage().estimatedCostUsd).toBe(0);
 await expect(plugin.processFeedback('test',()=>{})).rejects.toThrow('Invalid paid CSS');expect(create).toHaveBeenCalledOnce();
 create.mockRestore();
});

test('recommendation leaves all CSS unchanged; legacy mutation responses fail safely',async()=>{
 const plugin=await setup();const before=await readFileStyle(dir);
 plugin.settings.autoPricing=false;
 const result={decision:{action:'recommend' as const,message:'Found',recommendations:[{id:'image-round',reason:'Rounds photos',instructions:'Open card'}]},retrievedIds:['image-round'],searchQueries:['round photos'],usage:{inputTokens:100,cachedInputTokens:0,outputTokens:10,totalTokens:110,estimatedCostUsd:0.1},responseId:'recommendation'};
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue(result);
 try {
  await plugin.processFeedback('Round photos',()=>{});
  expect(await readFileStyle(dir)).toEqual(before);
  expect(plugin.state.turns[0].recommendations?.[0].path).toBe('image-round.md');
  expect(plugin.state.turns[0].catalogRevision).toBe('test');
  create.mockResolvedValueOnce({...result,decision:{action:'update_css',modules:before.modules,message:'changed'}} as any);
  await expect(plugin.processFeedback('legacy',()=>{})).rejects.toThrow();
  expect(await readFileStyle(dir)).toEqual(before);expect(plugin.apiAttempts[1].status).toBe('failed');
 } finally {create.mockRestore();}
});

test('missing catalog prevents a paid request',async()=>{
 const plugin=await setup();delete plugin.catalog.active;
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration');
 try {await expect(plugin.processFeedback('test',()=>{})).rejects.toThrow('каталог');expect(create).not.toHaveBeenCalled();} finally {create.mockRestore();}
});

test('font scan status is emitted only for a new scan, forced refresh or changed languages',async()=>{
 const fonts=await import('../src/fonts');
 const scan=vi.spyOn(fonts,'discoverCompatibleFonts').mockResolvedValue({families:['Arial'],scannedFiles:1,unreadableFiles:0,locales:[]});
 try {
  const plugin=await setup(),status=vi.fn();
  await plugin.getCompatibleFonts(false,status);
  await plugin.getCompatibleFonts(false,status);
  expect(scan).toHaveBeenCalledTimes(1);expect(status).toHaveBeenCalledTimes(1);
  await plugin.getCompatibleFonts(true,status);
  plugin.settings.supportedLocales=['he'];
  await plugin.getCompatibleFonts(false,status);
  expect(scan).toHaveBeenCalledTimes(3);expect(status).toHaveBeenCalledTimes(3);
 } finally {scan.mockRestore();}
});

test('page title uses rendered H1 and evaluates a pending Dataview heading without exposing source',async()=>{
 const plugin=await setup();
 const file={path:'notes/test.md',basename:'test'};
 const element=(text='')=>({textContent:text,cloneNode(){return element(this.textContent);},querySelectorAll:()=>[]});
 const rendered=element('hacksidian  ситуативный груминг Obsidian');
 const view={file,getMode:()=> 'preview',containerEl:{querySelector:()=>rendered}};
 vi.spyOn(plugin as any,'findMarkdownView').mockReturnValue(view);
 expect(await plugin.getCurrentPage()).toEqual({path:file.path,title:'hacksidian ситуативный груминг Obsidian'});
 const page={file:{name:'hacksidian'},desc:'ситуативный груминг [[Obsidian]]'};
 const evaluate=vi.fn(()=>({successful:true,value:'<code>hacksidian</code><br/>ситуативный груминг [[Obsidian]]'}));
 const expr='"<code>" + this.file.name + "</code><br/>" + this.desc';
 (plugin as any).app={metadataCache:{getFileCache:()=>({headings:[{level:1,heading:String.fromCharCode(96)+'='+expr+String.fromCharCode(96)}]})},plugins:{plugins:{dataview:{api:{page:()=>page,evaluate}}}}};
 view.containerEl.querySelector=()=>null as any;
 vi.stubGlobal('document',{createElement:()=>element()});
 try {
  expect(await plugin.getCurrentPage()).toEqual({path:file.path,title:'hacksidian ситуативный груминг Obsidian'});
  expect(evaluate).toHaveBeenCalledWith(expr,{this:page},file.path);
 } finally {vi.unstubAllGlobals();}
});

test('standard settings receive verified menu instructions instead of an invented Apply action',async()=>{
 const plugin=await setup();plugin.settings.autoPricing=false;
 plugin.catalog.active!.entries=[{id:'setting-accent',kind:'setting',title:'Accent',path:'',text:'Accent',menuPath:'Settings → Appearance → Accent color',helpUrl:'https://obsidian.md/help/settings'}];
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({decision:{action:'recommend',message:'Press Apply',recommendations:[{id:'setting-accent',reason:'Change accent color',instructions:'Open the card and press Apply'}]},retrievedIds:['setting-accent'],searchQueries:[],usage:{inputTokens:1,cachedInputTokens:0,outputTokens:1,totalTokens:2,estimatedCostUsd:0.001},responseId:'setting'});
 try {
  await plugin.processFeedback('accent',()=>{});
  expect(plugin.state.turns[0].systemMessage).not.toContain('Apply');
  expect(plugin.state.turns[0].recommendations![0].instructions).toContain('Settings → Appearance → Accent color');
  expect(plugin.state.turns[0].recommendations![0].instructions).not.toContain('Apply');
 }finally{create.mockRestore();}
});


test('catalog link opens the index inside the configured atlas folder',async()=>{
 const plugin=await setup();const openLinkText=vi.fn(async()=>{});
 (plugin as any).app={workspace:{openLinkText}};
 plugin.settings.atlasFolder='custom atlas/';await plugin.openCatalog();
 expect(openLinkText).toHaveBeenCalledWith('custom atlas/atlas.md','',true);
});
