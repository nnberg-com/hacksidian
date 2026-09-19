import {expect,it,vi} from 'vitest';
vi.mock('obsidian',()=>({MarkdownRenderChild:class {
 children:any[]=[]; cleanups:Function[]=[];
 constructor(public containerEl:any){}
 addChild(c:any){this.children.push(c);} register(fn:Function){this.cleanups.push(fn);}
 registerDomEvent(el:any,event:string,fn:Function){el.events[event]=fn;}
},Notice:class{},setIcon:vi.fn()}));
vi.mock('../src/live-example',()=>({LiveExample:class {constructor(public el:any,public plugin:any,public directory:string,public language:string,public controls:any){}}}));
import {ChatTechnique} from '../src/chat-technique';
class El {
 children:El[]=[];attrs:Record<string,string>={};events:Record<string,Function>={};disabled=false;text='';title='';
 createEl(_tag:string,_options:any){const el=new El();this.children.push(el);return el;}
 setAttribute(k:string,v:string){this.attrs[k]=v;}setText(s:string){this.text=s;}
}
const flush=()=>new Promise(r=>setTimeout(r,0));
it('shares the live editor and synchronizes favourite and applied state in both directions',async()=>{
 let installed=false,saved=false;const listeners:Function[]=[],stars:Function[]=[];
 const controls={english:()=>false,store:{has:()=>saved,subscribe:(fn:Function)=>{stars.push(fn);return()=>{};},toggle:vi.fn(async()=>{saved=!saved;stars.forEach(fn=>fn());})},technique:{get:async()=>({installed,hasCss:true}),subscribe:(fn:Function)=>{listeners.push(fn);return()=>{};},set:vi.fn(async(_path:string,value:boolean)=>{installed=value;listeners.forEach(fn=>fn());})}};
 const heading=new El(),el=new El();const path='atlas/! hacks/image-e016/image-e016.md';
 const child=new ChatTechnique(el as any,heading as any,{techniqueControls:()=>controls} as any,path);
 child.onload();await flush();const [star,apply]=heading.children;
 expect((child as any).children[0].directory).toBe('atlas/! hacks/image-e016');
 expect((child as any).children[0].controls).toBe(controls);
 expect(apply.attrs['aria-pressed']).toBe('false');expect(star.attrs['aria-pressed']).toBe('false');
 star.events.click();await flush();expect(star.attrs['aria-pressed']).toBe('true');
 apply.events.click();await flush();expect(controls.technique.set).toHaveBeenCalledWith(path,true);expect(apply.text).toBe('Выключить');
 installed=false;listeners.forEach(fn=>fn());await flush();expect(apply.text).toBe('Включить');
});
