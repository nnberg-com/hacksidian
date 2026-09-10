import { vi, test, expect, afterEach } from 'vitest';
import { mkdtemp, cp, rm, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
const state = vi.hoisted(() => ({ directory: '', data: {} as any, notices: [] as string[] }));
vi.mock('obsidian', () => ({
 Plugin: class { async loadData(){return state.data;} async saveData(value: any){state.data=structuredClone(value);} },
 Notice: class { constructor(message: string){state.notices.push(message);} },
 ItemView: class {}, PluginSettingTab: class {}, MarkdownView: class {},
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
 return plugin;
}
test('actual commit and Undo restore all group files, including after plugin reload',async()=>{
 let plugin=await setup();const before=await readFileStyle(dir);expect(before.modules).toHaveLength(22);
 const selected=before.modules[0];await plugin.commitModuleUpdate('test-change',selected.id,selected.css.replace('#110f00','#120f00'));
 expect((await readFileStyle(dir)).modules[0].css).not.toBe(selected.css);
 await plugin.savePluginData();expect(state.data.state.activeCss).toBeUndefined();expect(state.data.state.style).toBeUndefined();
 plugin=new CallMeRedPlugin({} as any,{} as any);(plugin as any).refreshView=vi.fn();
 await plugin.loadPluginData();await plugin.undo();expect(await readFileStyle(dir)).toEqual(before);
 await plugin.undo();expect(await readFileStyle(dir)).toEqual(before);
});
test('actual Undo never overwrites a newer manual edit',async()=>{
 const plugin=await setup();const before=await readFileStyle(dir);const m=before.modules[0];
 await plugin.commitModuleUpdate('test-change',m.id,m.css+'\n/* change */\n');
 const file=path.join(dir,'hacksidian-00-palette.css');await writeFile(file,(await readFile(file,'utf8'))+'\n/* manual */\n');
 await expect(plugin.undo()).rejects.toThrow('вручную');expect(await readFile(file,'utf8')).toContain('manual');
});
test('old structure is a retained history boundary, not an Undo target',async()=>{
 const plugin=await setup();const before=await readFileStyle(dir);
 plugin.state.versions.unshift({id:'legacy',css:'.markdown-preview-view{}',style:{format:1,modules:[{id:'old',component:'old',css:'.markdown-preview-view{}'}]},createdAt:'2026-01-01',source:'initial'});
 await plugin.undo();expect(await readFileStyle(dir)).toEqual(before);expect(state.notices.at(-1)).toContain('Начало истории');expect(plugin.state.versions[0].id).toBe('legacy');
});

test('later loads never seed templates, including when a working snippet was deleted', async()=>{
 await setup();
 await rm(path.join(dir,'hacksidian-00-palette.css'));
 const plugin=new CallMeRedPlugin({} as any,{} as any);
 await expect(plugin.loadPluginData()).rejects.toThrow();
 expect(installSnippetTemplates).not.toHaveBeenCalled();
});

test('retains exactly 50 Undo steps on save and after a new commit', async()=>{
 const plugin=await setup();
 const current=structuredClone(plugin.state.versions.at(-1)!);
 plugin.state.versions=Array.from({length:60},(_,i)=>({...current,id:`version-${i}`}));
 plugin.state.turns=[{id:'old-turn',userText:'Keep conversation',cssBefore:'old',cssAfter:'old'} as any];
 await plugin.savePluginData();
 expect(state.data.state.versions).toHaveLength(51);
 expect(state.data.state.versions[0].id).toBe('version-9');
 expect(state.data.state.turns[0]).toEqual({id:'old-turn',userText:'Keep conversation'});
 const m=plugin.state.style!.modules[0];
 await plugin.commitModuleUpdate('new',m.id,m.css+'\n/* next */\n');
 expect(state.data.state.versions).toHaveLength(51);
 expect(state.data.state.versions[0].id).toBe('version-10');
 const reloaded=new CallMeRedPlugin({} as any,{} as any);
 await reloaded.loadPluginData();
 expect(reloaded.state.versions).toHaveLength(51);
 expect(reloaded.state.versions.at(-1)!.id).toBe('new');
});

test.each([false,true])('feedback captures only when enabled (%s)', async(sendScreenshot)=>{
 const plugin=await setup();
 plugin.settings.sendScreenshot=sendScreenshot;plugin.settings.autoPricing=false;
 vi.mocked(captureReadingView).mockClear();
 vi.spyOn(plugin,'getCurrentColoringContext').mockResolvedValue({file:{path:'test.md'},view:{getMode:()=> 'preview',containerEl:{}},markdown:'Test',coverage:{missing:[]}} as any);
 vi.spyOn(plugin as any,'getColoringFiles').mockReturnValue([]);
 vi.spyOn(plugin,'getCompatibleFonts').mockResolvedValue({families:[]} as any);
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration').mockResolvedValue({decision:{action:'no_change',message:'',css:'',moduleId:'',targetColoring:''},usage:{inputTokens:0,cachedInputTokens:0,outputTokens:0,totalTokens:0,estimatedCostUsd:0},responseId:'test'});
 try {
  await plugin.processFeedback('Test',()=>{});
  expect(captureReadingView).toHaveBeenCalledTimes(sendScreenshot ? 1 : 0);
  expect(create.mock.calls[0][0].screenshotBase64).toBe(sendScreenshot ? 'image-base64' : undefined);
 } finally { create.mockRestore(); }
});

test('settings survive reload and existing installs default to screenshots enabled', async()=>{
 const plugin=await setup();
 expect(plugin.settings.sendScreenshot).toBe(true);
 plugin.settings.sendScreenshot=false;plugin.settings.model='custom-model';plugin.settings.apiKey='test-key';
 await plugin.savePluginData();
 const reloaded=new CallMeRedPlugin({} as any,{} as any);await reloaded.loadPluginData();
 expect(reloaded.settings).toMatchObject({sendScreenshot:false,model:'custom-model',apiKey:'test-key'});
});

test('clear history removes chat and Undo persistently without changing style or settings',async()=>{
 const plugin=await setup();
 const m=plugin.state.style!.modules[0];await plugin.commitModuleUpdate('before-clear',m.id,m.css+'\n/* change */\n');
 plugin.state.turns=[{id:'chat',userText:'old chat'} as any];
 const style=await readFileStyle(dir),settings=structuredClone(plugin.settings);
 await plugin.clearHistory();
 expect(plugin.state.turns).toEqual([]);expect(plugin.state.versions).toHaveLength(1);
 expect(plugin.settings).toEqual(settings);expect(await readFileStyle(dir)).toEqual(style);
 const reloaded=new CallMeRedPlugin({} as any,{} as any);(reloaded as any).refreshView=vi.fn();
 await reloaded.loadPluginData();expect(reloaded.state.turns).toEqual([]);expect(reloaded.state.versions).toHaveLength(1);
 await reloaded.undo();expect(await readFileStyle(dir)).toEqual(style);
 const next=style.modules[0];await reloaded.commitModuleUpdate('after-clear',next.id,next.css+'\n/* next */\n');
 await reloaded.undo();expect(await readFileStyle(dir)).toEqual(style);expect(reloaded.state.versions).toHaveLength(1);
});

test('clear history refuses during an active operation and preserves history on save failure',async()=>{
 const plugin=await setup();plugin.state.turns=[{id:'keep'} as any];
 (plugin as any).historyBusy=true;
 await expect(plugin.clearHistory()).rejects.toThrow('Дождитесь');
 expect(plugin.state.turns).toHaveLength(1);
 (plugin as any).historyBusy=false;
 const versions=structuredClone(plugin.state.versions);
 vi.spyOn(plugin,'savePluginData').mockRejectedValueOnce(new Error('disk error'));
 await expect(plugin.clearHistory()).rejects.toThrow('disk error');
 expect(plugin.state.turns).toHaveLength(1);expect(plugin.state.versions).toEqual(versions);
});

test('direct hack application changes only its group, records Undo and never calls an LLM',async()=>{
 const plugin=await setup();const before=await readFileStyle(dir);
 (plugin as any).app={vault:{configDir:'.obsidian',adapter:{read:async()=>readFile(path.join(dir,'hacksidian-manifest.json'),'utf8')}}};
 vi.spyOn(plugin,'getCurrentHack').mockResolvedValue({id:'text-demo',title:'Demo',path:'atlas/! hacks/text-demo/text-demo.md',spec:{format:1,target:'g-text',hasCss:true,atlas:{scope:'.x',class:'.x'},snippet:{scope:'.callmered-coloring.markdown-preview-view',class:'.callmered-coloring'}},template:'{{scope}} p {letter-spacing:.02em}',dependencies:''});
 const create=vi.spyOn(OpenAIResponsesProvider.prototype,'createIteration');
 try{
  expect(await plugin.applyCurrentHack('atlas/! hacks/text-demo/text-demo.md')).toBe(true);
  const after=await readFileStyle(dir);expect(after.modules.filter((m,i)=>m.css!==before.modules[i].css).map(m=>m.id)).toEqual(['g-text']);
  const n=plugin.state.versions.length;expect(await plugin.applyCurrentHack('atlas/! hacks/text-demo/text-demo.md')).toBe(false);expect(plugin.state.versions).toHaveLength(n);
  expect(create).not.toHaveBeenCalled();await plugin.undo();expect(await readFileStyle(dir)).toEqual(before);
 }finally{create.mockRestore();}
});
