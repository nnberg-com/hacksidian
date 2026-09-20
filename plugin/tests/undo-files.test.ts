import { vi, test, expect, afterEach } from 'vitest';
import { mkdtemp, cp, rm, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
const state = vi.hoisted(() => ({ directory: '', data: {} as any, notices: [] as string[] }));
vi.mock('obsidian', () => ({
 getLanguage: () => 'ru',
 Plugin: class { app = { vault: { configDir: '.obsidian' } }; async loadData(){return state.data;} async saveData(value: any){state.data=structuredClone(value);} },
 Notice: class { constructor(message: string){state.notices.push(message);} },
 TFile: class {},
 MarkdownRenderChild: class {},
 ItemView: class {}, PluginSettingTab: class {}, MarkdownView: class {},
 MarkdownRenderer: {render:vi.fn(async(_app:any,source:string,target:any)=>{target.textContent=source.replace(/<br\s*\/?>/gi," ").replace(/<[^>]*>/g,"").replace(/\[\[([^\]]+)\]\]/g,"$1");})},
}));
vi.mock('../src/capture', () => ({captureReadingView:vi.fn(async()=> 'image-base64')}));
vi.mock('../src/context', () => ({collectComputedStyleContext:vi.fn(()=> 'computed styles')}));
vi.mock('../src/storage', () => ({ styleDirectory: () => state.directory }));
vi.mock('../src/snippets', () => ({ installSnippetTemplates: vi.fn(), refreshNativeSnippets: vi.fn(), migrateSnippetGroups: vi.fn(async()=>[]) }));
import CallMeRedPlugin from '../src/main';
import { TFile } from 'obsidian';
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
 vi.spyOn(plugin,'getCurrentHack').mockResolvedValue(null);
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
 const recipe = path.resolve(import.meta.dirname, '../../content/atlas/! hacks/task-e30');
 const hack = { id: 'task-e30', title: 'Completed last', path: 'atlas/! hacks/task-e30/task-e30.md',
  spec: JSON.parse(await readFile(path.join(recipe, 'hack.json'), 'utf8')),
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

test.each([0.1, null])('cost %s is recorded but never blocks subsequent requests',async cost=>{
 const plugin=await setup();
 plugin.settings.autoPricing=false;plugin.settings.sendScreenshot=false;
 vi.spyOn(plugin,'getCurrentColoringContext').mockResolvedValue({file:{path:'test.md'},view:{getMode:()=> 'preview',containerEl:{}},markdown:'test'} as any);
 vi.spyOn(plugin,'getCompatibleFonts').mockResolvedValue({families:['Arial']} as any);
 vi.spyOn(plugin as any,'getColoringFiles').mockReturnValue([]);
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockImplementation(async request=>{
   expect(state.data.apiAttempts.at(-1).status).toBe('pending');
   await request.onUsage!({inputTokens:100,cachedInputTokens:0,outputTokens:10,totalTokens:110,estimatedCostUsd:cost},'paid-failure');
   expect(state.data.apiAttempts.at(-1).usage.estimatedCostUsd).toBe(cost);
   throw new Error('Invalid paid CSS');
 });
 await expect(plugin.processFeedback('test',()=>{})).rejects.toThrow('Invalid paid CSS');
 expect(plugin.state.turns).toHaveLength(0);expect(plugin.totalUsage().estimatedCostUsd).toBe(cost);
 expect(state.data.apiAttempts[0].status).toBe('failed');
 await plugin.loadPluginData();expect(plugin.totalUsage().estimatedCostUsd).toBe(cost);
 state.data.settings.spendLimitUsd=0.05;
 await plugin.loadPluginData();await plugin.savePluginData();
 expect(state.data.settings).not.toHaveProperty('spendLimitUsd');
 create.mockClear();
 await expect(plugin.processFeedback('test',()=>{})).rejects.toThrow('Invalid paid CSS');expect(create).toHaveBeenCalledOnce();
 expect(plugin.apiAttempts).toHaveLength(2);
 create.mockClear();
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

async function parameterFixture(id = 'hr-e070') {
 const plugin=await setup(); plugin.settings.autoPricing=false;
 plugin.catalog.active=undefined;
 let source=await readFile(path.resolve(import.meta.dirname,`../../content/atlas/! hacks/${id}/recipe.css`),'utf8');
 const cardPath=`atlas/! hacks/${id}/${id}.md`;
 const file=Object.assign(new TFile(),{path:`atlas/! hacks/${id}/recipe.css`,extension:'css'});
 const card=Object.assign(new TFile(),{path:cardPath,extension:'md'});
 const spec=JSON.parse(await readFile(path.resolve(import.meta.dirname,`../../content/atlas/! hacks/${id}/hack.json`),'utf8'));
 const hack={id,title:'Example',path:cardPath,spec,css:source};
 vi.spyOn(plugin,'getHackAt').mockImplementation(async()=>({...hack,css:source}));
 vi.mocked(plugin.getCurrentHack).mockImplementation(async()=>({...hack,css:source}));
 const view=vi.spyOn(plugin as any,'findMarkdownView').mockReturnValue({file:{path:cardPath}});
 const vault=plugin.app.vault as any;
 vault.getAbstractFileByPath=(path:string)=>path===cardPath?card:file;
 const leaf={openFile:vi.fn(async()=>{})};
 plugin.app.workspace={getLeaf:vi.fn(()=>leaf),revealLeaf:vi.fn(async()=>{}),setActiveLeaf:vi.fn()} as any;
 vault.adapter={read:async(path:string)=>path.endsWith('hacksidian-manifest.json')?readFile(dir+'/hacksidian-manifest.json','utf8'):source};
 vault.process=vi.fn(async(_file:any,update:(css:string)=>string)=>{source=update(source);});
 const usage={inputTokens:100,cachedInputTokens:0,outputTokens:20,totalTokens:120,estimatedCostUsd:0.001};
 const result={decision:{action:'update_parameters' as const,message:'Thicker',changes:[{variable:'--hacksidian-hr-e070-height',input:'4'}]},usage,responseId:'paid-params'};
 return {plugin,view,result,vault,leaf,cardPath,source:()=>source,edit:()=>{source+='/* manual edit */\n';}};
}
test('card chat changes recipe values without a catalog or installed-snippet writes',async()=>{
 const f=await parameterFixture(),before=await readFileStyle(dir);
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createParameterIteration').mockResolvedValue(f.result);
 try {
  await f.plugin.processFeedback('Сделай толще',()=>{});
  expect(f.source()).toContain('--hacksidian-hr-e070-height: 4px');
  expect(await readFileStyle(dir)).toEqual(before);
  expect(f.plugin.state.turns.at(-1)).toMatchObject({action:'update_parameters',techniqueId:'hr-e070',parameterChanges:[{before:'2px',after:'4px'}]});
  expect(f.plugin.spendingSummary().knownCostUsd).toBe(0.001);
 } finally {create.mockRestore();}
});
test.each(['page','css','invalid'] as const)('paid parameter request rejects %s changes without overwriting source',async(reason)=>{
 const f=await parameterFixture();
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createParameterIteration').mockImplementation(async request=>{
  await request.onUsage?.(f.result.usage,f.result.responseId);
  if(reason==='page')f.view.mockReturnValue({file:{path:'atlas/Эксперименты.md'}});
  if(reason==='css')f.edit();
  return reason==='invalid'?{...f.result,decision:{...f.result.decision,changes:[{variable:'--arbitrary',input:'3'}]}}:f.result;
 });
 try {
  await expect(f.plugin.processFeedback('Сделай толще',()=>{})).rejects.toThrow();
  expect(f.source()).toContain('--hacksidian-hr-e070-height: 2px');
  if(reason==='css')expect(f.source()).toContain('/* manual edit */');
  expect(f.plugin.spendingSummary().knownCostUsd).toBe(0.001);
  expect(state.data.apiAttempts.at(-1).status).toBe('failed');
 } finally {create.mockRestore();}
});
test('ambiguous card request records a question without changing values',async()=>{
 const f=await parameterFixture(),before=f.source();
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createParameterIteration').mockResolvedValue({...f.result,decision:{action:'ask_question',message:'Ширину или высоту?',changes:[]}});
 try {
  await f.plugin.processFeedback('Увеличь размер',()=>{});
  expect(f.source()).toBe(before); expect(f.vault.process).not.toHaveBeenCalled();
  expect(f.plugin.state.turns.at(-1)).toMatchObject({action:'ask_question',systemMessage:'Ширину или высоту?',techniqueId:'hr-e070'});
 } finally {create.mockRestore();}
});
test('search request on a technique page retains catalog recommendation flow and accounts for both calls',async()=>{
 const f=await parameterFixture(),before=f.source();
 f.plugin.catalog.active={revision:'test',createdAt:'now',storeId:'vs_test',documents:[],entries:[]};
 const parameter=vi.spyOn(OpenAIResponsesProvider.prototype,'createParameterIteration').mockResolvedValue({...f.result,decision:{action:'search_catalog',message:'',changes:[]}});
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({decision:{action:'no_match',message:'No match',recommendations:[]},retrievedIds:[],searchQueries:[],usage:f.result.usage,responseId:'search'});
 try {
  await f.plugin.processFeedback('Найди другой разделитель',()=>{});
  expect(f.source()).toBe(before);expect(search).toHaveBeenCalledTimes(1);
  expect(f.plugin.spendingSummary()).toMatchObject({count:2,knownCostUsd:0.002});
 } finally {parameter.mockRestore();search.mockRestore();}
});
test('a history write failure after source save explicitly reports that parameters were saved',async()=>{
 const f=await parameterFixture();
 const original=f.plugin.savePluginData.bind(f.plugin);
 vi.spyOn(f.plugin,'savePluginData').mockImplementation(async()=>{if(f.plugin.state.turns.length)throw Error('History unavailable');await original();});
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createParameterIteration').mockResolvedValue(f.result);
 try {
  await expect(f.plugin.processFeedback('Сделай толще',()=>{})).rejects.toThrow('CSS параметров сохранён');
  expect(f.source()).toContain('--hacksidian-hr-e070-height: 4px');
 } finally {create.mockRestore();}
});

async function recommendationFixture() {
 const f=await parameterFixture();
 vi.mocked(f.plugin.getCurrentHack).mockResolvedValue(null);
 const entry={id:'hr-e070',title:'Short line',kind:'technique' as const,path:'atlas/! hacks/hr-e070/hr-e070.md',text:'Line',applyAvailable:true};
 f.plugin.catalog.active={revision:'test',createdAt:'now',storeId:'vs_test',documents:[],entries:[entry]};
 const response={decision:{action:'recommend' as const,message:'',recommendations:[{id:entry.id,reason:'Short thick separator',instructions:'',parameterChanges:[{variable:'--hacksidian-hr-e070-height',input:'4'}]}]},retrievedIds:[entry.id],searchQueries:['separator'],usage:f.result.usage,responseId:'prepared-search'};
 return {...f,response};
}
test('recommendation outside a card preconfigures in one provider call without enabling or changing snippets',async()=>{
 const f=await recommendationFixture(),before=await readFileStyle(dir);
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue(f.response);
 const parameters=vi.spyOn(OpenAIResponsesProvider.prototype,'createParameterIteration');
 try {
  await f.plugin.processFeedback('Хочу короткий толстый разделитель',()=>{});
  expect(search).toHaveBeenCalledTimes(1);expect(parameters).not.toHaveBeenCalled();
  expect(search.mock.calls[0][0].prompt).toContain('"max":12');
  expect(f.source()).toContain('--hacksidian-hr-e070-height: 4px');
  expect(await readFileStyle(dir)).toEqual(before);
  expect(f.plugin.state.turns.at(-1)?.recommendations?.[0]).toMatchObject({preparedParameters:[{before:'2px',after:'4px'}]});
  expect(f.plugin.state.turns.at(-1)?.recommendations?.[0].instructions).toContain('Параметры преднастроены');
 } finally {search.mockRestore();parameters.mockRestore();}
});
test('recommendation refuses to overwrite a recipe edited during search and retains its expense',async()=>{
 const f=await recommendationFixture();
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockImplementation(async()=>{f.edit();return f.response;});
 try {
  await expect(f.plugin.processFeedback('Хочу толстый разделитель',()=>{})).rejects.toThrow('изменился');
  expect(f.source()).toContain('--hacksidian-hr-e070-height: 2px');expect(f.source()).toContain('/* manual edit */');
  expect(f.plugin.spendingSummary().knownCostUsd).toBe(0.001);
 } finally {search.mockRestore();}
});

test.each([false,true])('single recommendation with explicit apply works with parameter changes=%s without opening a tab',async(withChanges)=>{
 const f=await recommendationFixture(),before=await readFileStyle(dir);
 const request='Сделай разделитель толще';
 const recommendation={...f.response.decision.recommendations[0],parameterChanges:withChanges?f.response.decision.recommendations[0].parameterChanges:[],command:'apply' as const,commandEvidence:request};
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({...f.response,decision:{...f.response.decision,recommendations:[recommendation]}});
 try {
  await f.plugin.processFeedback(request,()=>{});
  const after=await readFileStyle(dir);
  expect(after.modules.find(m=>m.id==='g-hr')?.css).toContain(`--hacksidian-hr-e070-height: ${withChanges?'4':'2'}px`);
  expect(after.modules.filter(m=>m.id!=='g-hr')).toEqual(before.modules.filter(m=>m.id!=='g-hr'));
  expect(f.plugin.state.turns.at(-1)?.recommendations?.[0].applied).toBe(true);
  expect(f.plugin.app.workspace.getLeaf).not.toHaveBeenCalled();
  expect(f.leaf.openFile).not.toHaveBeenCalled();
 } finally {search.mockRestore();}
});
test.each(['show','uncertain'] as const)('single %s recommendation stays in chat without applying',async(command)=>{
 const f=await recommendationFixture(),before=await readFileStyle(dir);
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({...f.response,decision:{...f.response.decision,recommendations:[{...f.response.decision.recommendations[0],parameterChanges:[],command,commandEvidence:''}]}});
 try {
  await f.plugin.processFeedback('Покажи разделитель',()=>{});
  expect(await readFileStyle(dir)).toEqual(before);
  expect(f.plugin.app.workspace.getLeaf).not.toHaveBeenCalled();
 } finally {search.mockRestore();}
});
test('multiple candidates remain a list even if model erroneously proposes commands and parameters',async()=>{
 const f=await recommendationFixture(),before=await readFileStyle(dir),source=f.source();
 const other={...f.plugin.catalog.active!.entries[0],id:'other',path:'atlas/! hacks/other/other.md'};f.plugin.catalog.active!.entries.push(other);
 const rec={...f.response.decision.recommendations[0],command:'apply' as const,commandEvidence:'Сделай'};
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({...f.response,retrievedIds:['hr-e070','other'],decision:{...f.response.decision,recommendations:[rec,{...rec,id:'other'}]}});
 try {
  await f.plugin.processFeedback('Сделай',()=>{});
  expect(f.source()).toBe(source);expect(await readFileStyle(dir)).toEqual(before);expect(f.plugin.app.workspace.getLeaf).not.toHaveBeenCalled();
  expect(f.plugin.state.turns.at(-1)?.recommendations).toHaveLength(2);
 } finally {search.mockRestore();}
});
test('table spacing request sets horizontal padding to maximum, enables, then updates the same installed block',async()=>{
 const f=await parameterFixture('table-e015');
 const request='Сделай в ячейках таблицы отступы слева и справа как можно больше';
 const response={...f.result,decision:{action:'update_parameters' as const,message:'',changes:[{variable:'--hacksidian-table-e015-horizontal',input:'3'}],command:'apply' as const,commandEvidence:request}};
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createParameterIteration').mockResolvedValue(response);
 try {
  await f.plugin.processFeedback(request,()=>{});
  expect((await readFileStyle(dir)).modules.find(m=>m.id==='g-table')?.css).toContain('--hacksidian-table-e015-horizontal: 3em');
  create.mockResolvedValue({...response,decision:{...response.decision,changes:[{variable:'--hacksidian-table-e015-horizontal',input:'2'}],commandEvidence:'Уменьши до 2'}});
  await f.plugin.processFeedback('Уменьши до 2',()=>{});
  const css=(await readFileStyle(dir)).modules.find(m=>m.id==='g-table')!.css;
  expect(css).toContain('--hacksidian-table-e015-horizontal: 2em');expect(css.split('hacksidian:hack:table-e015:start')).toHaveLength(2);
  expect(f.plugin.state.turns.at(-1)?.techniqueApplied).toBe(true);
 } finally {create.mockRestore();}
});

test('interrupted synchronization permits chat using recorded partial sources',async()=>{
 const plugin=await setup();plugin.settings.autoPricing=false;
 const active=plugin.catalog.active!;
 plugin.catalog.sync={storeId:active.storeId,entries:active.entries,documents:[{name:'partial',hash:'h',fileId:'partial',entryId:'image-round',text:''}]};
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({decision:{action:'no_match',message:'No match',recommendations:[]},retrievedIds:[],searchQueries:[],usage:{inputTokens:1,cachedInputTokens:0,outputTokens:1,totalTokens:2,estimatedCostUsd:0},responseId:'partial'});
 try {
  await plugin.processFeedback('Find a technique',()=>{});
  expect(create.mock.calls[0][0].catalog.documents.map(d=>d.fileId)).toContain('partial');
  expect(plugin.catalog.sync).toBeDefined();
  expect(plugin.apiAttempts.at(-1)?.status).toBe('completed');
 } finally {create.mockRestore();}
});


test('only a grounded clarification about one technique opens its card, without applying',async()=>{
 const f=await recommendationFixture(),before=await readFileStyle(dir);
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({...f.response,decision:{action:'ask_question',message:'Какая толщина нужна?',recommendations:[],clarificationId:'hr-e070'}});
 try {
  await f.plugin.processFeedback('Помоги выбрать толщину',()=>{});
  expect(await readFileStyle(dir)).toEqual(before);
  expect(f.leaf.openFile).toHaveBeenCalledWith(expect.objectContaining({path:f.cardPath}),{active:true,state:{mode:'preview'}});
  expect(f.plugin.state.turns.at(-1)?.techniquePath).toBe(f.cardPath);
 } finally {search.mockRestore();}
});

test('near matches are displayed on no_match without changing CSS, parameters or tabs',async()=>{
 const f=await recommendationFixture(),before=await readFileStyle(dir),source=f.source();
 const search=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({...f.response,decision:{action:'no_match',message:'No exact match',recommendations:[],alternatives:[{id:'hr-e070',reason:'A related effect, but for a different element.'}]}});
 try {
  await f.plugin.processFeedback('Сделай',()=>{});
  expect(await readFileStyle(dir)).toEqual(before);expect(f.source()).toBe(source);
  expect(f.plugin.app.workspace.getLeaf).not.toHaveBeenCalled();
  expect(f.plugin.state.turns.at(-1)?.recommendations?.[0]).toMatchObject({id:'hr-e070',partialMatch:true,command:'show',applied:false,path:f.cardPath});
 }finally{search.mockRestore();}
});
