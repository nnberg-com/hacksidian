import { vi, test, expect } from 'vitest';
vi.mock('obsidian', () => ({ItemView: class {}, Notice: class {}, setIcon: vi.fn()}));
import { ConversationView } from '../src/view';
class Element {
 children: Element[] = []; style: Record<string,string> = {}; dataset: Record<string,string> = {};
 textContent = ''; disabled = false; tag = ''; listeners: Record<string,Function> = {};
 empty(){this.children=[];}
 createDiv(options:any={}){return this.createEl('div',options);}
 createEl(tag:string,options:any={}){const e=new Element();e.tag=tag;e.textContent=options.text??'';this.children.push(e);return e;}
 setText(text:string){this.textContent=text;}
 setAttribute(){} removeClass(){} addClass(){} toggleClass(){}
 addEventListener(name:string,fn:Function){this.listeners[name]=fn;}
 querySelectorAll(tag:string):Element[]{return this.children.flatMap(e=>[...(e.tag===tag?[e]:[]),...e.querySelectorAll(tag)]);}
}
function setup(){
 const hack={id:'task-e30',path:'atlas/! hacks/task-e30/task-e30.md',title:'Task',spec:{target:'g-task',hasCss:true}};
 const plugin={getCurrentPage:vi.fn(()=>({path:'notes/page.md',title:'Current page'})),getCurrentHack:vi.fn(async()=>hack), getCurrentColoringContext:vi.fn(async()=>null),state:{turns:[]},spendingSummary:()=>({count:0,knownCostUsd:0,unknownCount:0}),totalUsage:()=>({totalTokens:0,estimatedCostUsd:0}),applyCurrentHack:vi.fn(async()=>true)};
 const view=new ConversationView({} as any,plugin as any) as any;
 for(const key of ['hackEl','hackResultEl','conversationEl','usageEl','statusEl','submitButton','inputEl','contentEl'])view[key]=new Element();
 return {view,plugin,hack};
}
test('focus refresh preserves the apply button and handler for the same card',async()=>{
 const {view,plugin,hack}=setup();await view.refresh();const button=view.hackEl.querySelectorAll('button')[0];
 await view.refresh();expect(view.hackEl.querySelectorAll('button')[0]).toBe(button);
 button.listeners.click();
 await vi.waitFor(()=>expect(plugin.applyCurrentHack).toHaveBeenCalledWith(hack.path, true));
 await vi.waitFor(()=>expect(view.hackResultEl.textContent).toContain('CSS'));
 const result=view.hackResultEl.textContent;await view.refresh();expect(view.hackResultEl.textContent).toBe(result);
});
test('an apply error remains visible after panel refresh',async()=>{
 const {view,plugin,hack}=setup();plugin.applyCurrentHack.mockRejectedValueOnce(new Error('Test write error'));
 await view.refresh();await view.applyHack(hack.path);await view.refresh();
 expect(view.hackResultEl.textContent).toBe('Test write error');expect(view.busy).toBe(false);
});

test('page header remains visible on ordinary pages and clears obsolete actions', async()=>{
 const {view,plugin}=setup();await view.refresh();
 expect(view.hackEl.querySelectorAll('button')).toHaveLength(1);
 plugin.getCurrentHack.mockResolvedValue(null as any);
 await view.refresh();
 expect(view.hackEl.children[0].children[0].textContent).toBe('Current page');
 expect(view.hackEl.querySelectorAll('button')).toHaveLength(0);
 plugin.getCurrentPage.mockReturnValue(null as any);await view.refresh();
 expect(view.hackEl.children[0].children[0].textContent).toBe('Страница не открыта');
});
test('late page lookup cannot overwrite a newer page header',async()=>{
 const {view,plugin}=setup();
 let resolve:any;plugin.getCurrentHack.mockImplementationOnce(()=>new Promise(r=>{resolve=r}));
 const old=view.refresh();
 await Promise.resolve();
 plugin.getCurrentPage.mockReturnValue({path:'new.md',title:'New page'});
 plugin.getCurrentHack.mockResolvedValue(null as any);await view.refresh();
 resolve(null);await old;
 expect(view.hackEl.children[0].children[0].textContent).toBe('New page');
});

test('installed block changes action to disable and reacts to external removal', async()=>{
 const {view,plugin,hack}=setup();
 (hack as any).installed=true;
 await view.refresh(); const button=view.hackEl.querySelectorAll('button')[0];
 expect(button.textContent).toBe('Выключить приём');button.listeners.click();
 await vi.waitFor(()=>expect(plugin.applyCurrentHack).toHaveBeenCalledWith(hack.path,false));
 await vi.waitFor(()=>expect(view.busy).toBe(false));
 (hack as any).installed=false;await view.refresh();
 expect(view.hackEl.querySelectorAll('button')[0].textContent).toBe('Применить приём');
});
