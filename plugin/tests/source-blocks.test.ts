import {expect,test,vi} from 'vitest';
vi.mock('obsidian',()=>({
 Component:class {addChild(){} register(){} registerDomEvent(el:any,event:string,fn:any){el.events[event]=fn;}},
 MarkdownRenderChild:class { constructor(public containerEl:any){} registerEvent(){} addChild(){} removeChild(){} },
 MarkdownRenderer:{render:vi.fn(async (_app:any,text:string,el:any)=>{el.rendered=text;})},
 setIcon:vi.fn(), Notice:class{},parseYaml:(text:string)=>({category:'link',title:'Волнистая линия',themes:text.includes('minimal')?['minimal']:[],sources:text.includes('example.org')?['https://example.org/guide']:text.includes('example.net')?['https://example.net/new']:[]}),Plugin:class{},TAbstractFile:class{}
}));
import { Favourites } from '../src/favourites';
import type { FavouriteControls } from '../src/favourites';
import {registerSourceBlocks,sourceFence,TechniqueBlock} from '../src/source-blocks';
import {techniqueDirectory,readTechniqueSource} from '../src/technique-files';
function element():any{return {children:[],events:{},attrs:{},closest(){return this;},toggleClass(){},appendText(){},setAttribute(key:string,value:string){this.attrs[key]=value;},empty(){this.children=[];},addClass(){},setText:vi.fn(),createDiv(options:any={}){return this.createEl('div',options);},createEl(tag:string,options:any={}){const child={...element(),tag,...options};this.children.push(child);return child;}};}
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));
function setup(controls?: FavouriteControls){
 const handlers=new Map<string,Function>(),events=new Map<string,Function>();
 const files:any={'recipe.css':'a {color: red;}','markdown.md':'<script>literal</script>\n```hacksidian-live\nx\n```','link-e023.md':'---\nthemes: [minimal]\n---'};
 const adapter={exists:vi.fn(async()=>true),read:vi.fn(async(path:string)=>files[path.split('/').pop()!]),getFullPath:(path:string)=>'/vault name/'+path};
 const workspace={openLinkText:vi.fn()};
 const plugin={app:{vault:{adapter,on:(name:string,callback:Function)=>{events.set(name,callback);return {};}} ,workspace,metadataCache:{getCache:(path:string)=>({frontmatter:{title:path.includes('! categories')?'Ссылки':'Minimal'}})}},addCommand:()=>{},registerMarkdownCodeBlockProcessor:(name:string,fn:Function)=>handlers.set(name,fn)};
 registerSourceBlocks(plugin as any, controls);
 const render=async(kind:string,source='link-e023')=>{const el=element();handlers.get('hacksidian-'+kind)!(source,el,{sourcePath:'atlas/! hacks/link-e023/link-e023.md',addChild:(child:any)=>child.onload()});await flush();return el;};
 return {handlers,events,files,adapter,workspace,render,plugin};
}
test('native language fences keep nested blocks literal, refresh and provide editor links',async()=>{
 const {render,files,events,workspace}=setup();const el=await render('files');
 expect(el.children).toHaveLength(2);
 expect(el.children[0].rendered).toBe(sourceFence(files['recipe.css'],'css'));
 expect(el.children[1].rendered).toMatch(/^````markdown\n/);
 const open=vi.fn();vi.stubGlobal('window',{open});
 expect(el.children[0].children[0].children[0].tag).toBe('h6');
 el.children[0].children[0].children[1].events.click();
 expect(open).toHaveBeenCalledWith('vscode://file/vault%20name/atlas/!%20hacks/link-e023/recipe.css');vi.unstubAllGlobals();
 el.children[1].children[0].children[0].children[0].events.click({preventDefault(){}});
 expect(workspace.openLinkText).toHaveBeenCalledWith('atlas/! hacks/link-e023/markdown.md',expect.any(String),false,{state:{mode:'source'}});
 files['recipe.css']='a {color: blue;}';events.get('modify')!({path:'atlas/! hacks/link-e023/recipe.css'});await flush();
 expect(el.children[0].rendered).toContain('blue');
});
test('sources read current metadata with an ID-only block and refresh on card edits',async()=>{
 const {render,files,events}=setup();files['link-e023.md']='---\nthemes: [minimal]\nsources: [https://example.org/guide]\n---';
 const el=await render('sources','link-e023');
 const source=el.children[1].children[1].children[0].children[0];expect(source.text).toBe('example.org');expect(source.href).toBe('https://example.org/guide');
 const link=el.children[0].children[1].children[0].children[0];expect(link.text).toBe('Minimal');expect(link.href).toBe('atlas/! themes/minimal.md');
 files['link-e023.md']=files['link-e023.md'].replace('example.org','example.net');events.get('modify')!({path:'atlas/! hacks/link-e023/link-e023.md'});await flush();
 expect(el.children[1].children[1].children[0].children[0].text).toBe('example.net');
});
test('copy ID uses folder code and legacy source blocks still work',async()=>{
 const writeText=vi.fn(async()=>{});vi.stubGlobal('navigator',{clipboard:{writeText}});
 const {render}=setup();const el=await render('id');el.children[1].children[0].children[0].events.click();await flush();expect(writeText).toHaveBeenCalledWith('link-e023');
 for(const kind of ['css','markdown'])expect((await render(kind)).children[0].rendered).toContain(kind);
 vi.unstubAllGlobals();
});
test('missing source is explicit; traversal cannot select arbitrary vault files',async()=>{
 expect(()=>techniqueDirectory('atlas/example.md','../../private')).toThrow();
 const read=vi.fn();expect(await readTechniqueSource({exists:async()=>false,read},'atlas/! hacks/theme-native','markdown')).toBeNull();expect(read).not.toHaveBeenCalled();
});

test('card favourite button saves, updates another open card and opens list',async()=>{
 const marks=new Set<string>();const store=new Favourites({list:()=>[...marks],has:path=>marks.has(path),toggle:async path=>{if(marks.has(path))marks.delete(path);else marks.add(path);}}),open=vi.fn();
 const openEnabled=vi.fn();const {render}=setup({store,open,openEnabled,english:()=>false});
 const a=await render('id'),b=await render('id');
 const star=a.children[1].children[1];expect(star.attrs['aria-pressed']).toBe('false');
 star.events.click();await flush();
 expect(store.has('atlas/! hacks/link-e023/link-e023.md')).toBe(true);
 expect(star.attrs['aria-pressed']).toBe('true');expect(b.children[1].children[1].attrs['aria-pressed']).toBe('true');
 a.children[0].children[1].events.click({preventDefault(){}});expect(open).toHaveBeenCalledOnce();
 expect(a.children[0].children[2].text).toBe('Включённые');a.children[0].children[2].events.click({preventDefault(){}});expect(openEnabled).toHaveBeenCalledOnce();
 star.events.click();await flush();expect(store.list()).toEqual([]);
});

test('card apply button uses its own path and switches enable/disable',async()=>{
 let installed=false;const set=vi.fn(async(_path:string,enabled:boolean)=>{installed=enabled;});
 const store=new Favourites({list:()=>[],has:()=>false,toggle:async()=>{}});
 const {render,files}=setup({store,open:()=>{},english:()=>false,technique:{get:async()=>({installed,hasCss:true}),set,subscribe:()=>()=>{}}});
 files['link-e023.md']+='\n```hacksidian-live\nlink-e023\n```';
 const el=await render('id');const row=el.children[1];expect(row.children[0].tag).toBe('h2');expect(row.children[0].text).toBe('Волнистая линия');expect(row.children[0].children[0].tag).toBe('code');
 expect(el.children[0].children[0].text).toBe('Ссылки');expect(el.children[0].children[0].href).toBe('atlas/! categories/link.md');expect(el.children[0].children[1].tag).toBe('a');
 const actions=row.children[2];expect(actions.children[0].cls).toBe('hacksidian-preview-control');
 const button=actions.children[1];expect(button.textContent).toBe('Включить');expect(button.cls).toBe('hacksidian-apply-toggle');
 button.events.click();await flush();expect(set).toHaveBeenCalledWith('atlas/! hacks/link-e023/link-e023.md',true);expect(button.textContent).toBe('Выключить');expect(button.attrs['aria-pressed']).toBe('true');
 button.events.click();await flush();expect(set).toHaveBeenLastCalledWith('atlas/! hacks/link-e023/link-e023.md',false);
});

test('embedded category headers omit top navigation while retaining the card title link',async()=>{
 const {plugin}=setup();const el=element();
 const child=new TechniqueBlock(el,plugin as any,'atlas/! hacks/link-e023','id','atlas/! hacks/link-e023/link-e023.md',undefined,true);
 child.onload();await flush();
 expect(el.children.some((item:any)=>item.cls==='hacksidian-card-nav')).toBe(false);
 expect(el.children[0].cls).toBe('hacksidian-card-row');
 const title=el.children[0].children[0].children[0];expect(title.tag).toBe('a');expect(title.href).toBe('atlas/! hacks/link-e023/link-e023.md');
});
