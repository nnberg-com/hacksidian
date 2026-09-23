// Browser fixture: the components under test are real; only the Obsidian host is simulated.
export class Component {
 children: Component[]=[]; cleanups: Array<()=>void>=[];
 addChild<T extends Component>(c:T):T {this.children.push(c);void (c as any).onload?.();return c;}
 removeChild(c:Component){c.unload();this.children=this.children.filter(x=>x!==c);}
 register(fn:()=>void){this.cleanups.push(fn);}
 registerEvent(off:()=>void){this.register(off);}
 registerDomEvent(el:any,event:string,fn:any,options?:any){el.addEventListener(event,fn,options);this.register(()=>el.removeEventListener(event,fn,options));}
 unload(){for(const c of this.children)c.unload();for(const f of this.cleanups)f();(this as any).onunload?.();}
}
export class MarkdownRenderChild extends Component {constructor(public containerEl:HTMLElement){super();}}
export class Plugin {}
export class TAbstractFile {constructor(public path:string){}}
export class TFile extends TAbstractFile {}
export class Notice {}
export const setIcon=()=>{};
export const parseYaml=()=>({});
export const MarkdownRenderer={render:async(_app:any,markdown:string,el:HTMLElement)=>{
 for(const block of markdown.split(/\n\s*\n/)){
  const heading=block.match(/^(#{1,6}) (.+)/);const node=document.createElement(heading?'h'+heading[1].length:'p');
  node.textContent=heading?heading[2]:block;el.append(node);
 }
}};
