import {expect,test,vi} from 'vitest';
vi.mock('obsidian',()=>({
 Component:class {registerDomEvent(el:any,event:string,fn:any){el.events[event]=fn;}},
 MarkdownRenderChild:class { constructor(public containerEl:any){} registerEvent(){} addChild(){} removeChild(){} },
 MarkdownRenderer:{render:vi.fn(async (_app:any,text:string,el:any)=>{el.rendered=text;})},
 Notice:class{},parseYaml:(text:string)=>({themes:text.includes('minimal')?['minimal']:[]}),Plugin:class{},TAbstractFile:class{}
}));
import {registerSourceBlocks,sourceFence} from '../src/source-blocks';
import {techniqueDirectory,readTechniqueSource} from '../src/technique-files';
function element():any{return {children:[],events:{},empty(){this.children=[];},addClass(){},setText:vi.fn(),createDiv(options:any={}){return this.createEl('div',options);},createEl(tag:string,options:any={}){const child={...element(),tag,...options};this.children.push(child);return child;}};}
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));
function setup(){
 const handlers=new Map<string,Function>(),events=new Map<string,Function>();
 const files:any={'recipe.css':'a {color: red;}','markdown.md':'<script>literal</script>\n```hacksidian-live\nx\n```','link-e023.md':'---\nthemes: [minimal]\n---'};
 const adapter={exists:vi.fn(async()=>true),read:vi.fn(async(path:string)=>files[path.split('/').pop()!]),getFullPath:(path:string)=>'/vault name/'+path};
 const workspace={openLinkText:vi.fn()};
 const plugin={app:{vault:{adapter,on:(name:string,callback:Function)=>{events.set(name,callback);return {};}} ,workspace,metadataCache:{getCache:()=>({frontmatter:{title:'Minimal'}})}},registerMarkdownCodeBlockProcessor:(name:string,fn:Function)=>handlers.set(name,fn)};
 registerSourceBlocks(plugin as any);
 const render=async(kind:string,source='link-e023')=>{const el=element();handlers.get('hacksidian-'+kind)!(source,el,{sourcePath:'atlas/! hacks/link-e023/link-e023.md',addChild:(child:any)=>child.onload()});await flush();return el;};
 return {handlers,events,files,adapter,workspace,render};
}
test('native language fences keep nested blocks literal, refresh and provide editor links',async()=>{
 const {render,files,events,workspace}=setup();const el=await render('files');
 expect(el.children).toHaveLength(2);
 expect(el.children[0].rendered).toBe(sourceFence(files['recipe.css'],'css'));
 expect(el.children[1].rendered).toMatch(/^````markdown\n/);
 expect(el.children[0].children[0].children[1].href).toBe('vscode://file/vault%20name/atlas/!%20hacks/link-e023/recipe.css');
 el.children[1].children[0].children[1].events.click({preventDefault(){}});
 expect(workspace.openLinkText).toHaveBeenCalledWith('atlas/! hacks/link-e023/markdown.md',expect.any(String),false,{state:{mode:'source'}});
 files['recipe.css']='a {color: blue;}';events.get('modify')!({path:'atlas/! hacks/link-e023/recipe.css'});await flush();
 expect(el.children[0].rendered).toContain('blue');
});
test('sources retain details and link catalog themes',async()=>{
 const {render}=setup();const el=await render('sources','link-e023\n- [example.org](https://example.org)');
 expect(el.children[1].rendered).toBe('- [example.org](https://example.org)');
 const link=el.children[0].children[1].children[0].children[0];expect(link.text).toBe('Minimal');expect(link.href).toBe('atlas/! themes/minimal.md');
});
test('copy ID uses folder code and legacy source blocks still work',async()=>{
 const writeText=vi.fn(async()=>{});vi.stubGlobal('navigator',{clipboard:{writeText}});
 const {render}=setup();const el=await render('id');el.children[0].events.click();await flush();expect(writeText).toHaveBeenCalledWith('link-e023');
 for(const kind of ['css','markdown'])expect((await render(kind)).children[0].rendered).toContain(kind);
 vi.unstubAllGlobals();
});
test('missing source is explicit; traversal cannot select arbitrary vault files',async()=>{
 expect(()=>techniqueDirectory('atlas/example.md','../../private')).toThrow();
 const read=vi.fn();expect(await readTechniqueSource({exists:async()=>false,read},'atlas/! hacks/theme-native','markdown')).toBeNull();expect(read).not.toHaveBeenCalled();
});
