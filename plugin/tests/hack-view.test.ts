import { vi, test, expect } from 'vitest';
vi.mock('obsidian', () => ({ItemView: class {}, Notice: class {}, setIcon: vi.fn()}));
import { ConversationView } from '../src/view';
class Element {
 children: Element[] = []; style: Record<string,string> = {}; dataset: Record<string,string> = {};
 textContent = ''; className = ''; disabled = false; tag = ''; listeners: Record<string,Function> = {};
 empty(){this.children=[];}
 createDiv(options:any={}){return this.createEl('div',options);}
 createEl(tag:string,options:any={}){const e=new Element();e.tag=tag;e.className=options.cls??'';e.textContent=options.text??'';this.children.push(e);return e;}
 appendText(text:string){this.textContent+=text;}
 setText(text:string){this.textContent=text;}
 setAttribute(){} removeClass(){} addClass(){} toggleClass(){}
 addEventListener(name:string,fn:Function){this.listeners[name]=fn;}
 querySelectorAll(tag:string):Element[]{return this.children.flatMap(e=>[...(e.tag===tag?[e]:[]),...e.querySelectorAll(tag)]);}
}
function setup(){
 const hack={id:'task-e30',path:'atlas/! hacks/task-e30/task-e30.md',title:'Task',spec:{target:'g-task',hasCss:true}};
 const plugin={catalogStatus:()=> 'Каталог: 42 решения',openCatalog:vi.fn(async()=>{}),getCurrentPage:vi.fn(()=>({path:'notes/page.md',title:'Current page'})),getCurrentHack:vi.fn(async()=>hack), getCurrentColoringContext:vi.fn(async()=>null),state:{turns:[]},spendingSummary:()=>({count:0,knownCostUsd:0,unknownCount:0}),totalUsage:()=>({totalTokens:0,estimatedCostUsd:0}),applyCurrentHack:vi.fn(async()=>true)};
 const view=new ConversationView({} as any,plugin as any) as any;
 for(const key of ['hackEl','conversationEl','usageEl','statusEl','submitButton','inputEl','contentEl'])view[key]=new Element();
 return {view,plugin,hack};
}
test('focus refresh preserves the apply button and handler for the same card',async()=>{
 const {view,plugin,hack}=setup();await view.refresh();const button=view.hackEl.querySelectorAll('button')[0];
 await view.refresh();expect(view.hackEl.querySelectorAll('button')[0]).toBe(button);
 button.listeners.click();
 await vi.waitFor(()=>expect(plugin.applyCurrentHack).toHaveBeenCalledWith(hack.path, true));
 await vi.waitFor(()=>expect(view.statusEl.textContent).toContain('CSS'));
 const result=view.statusEl.textContent;await view.refresh();expect(view.statusEl.textContent).toBe(result);
});
test('an apply error remains visible after panel refresh',async()=>{
 const {view,plugin,hack}=setup();plugin.applyCurrentHack.mockRejectedValueOnce(new Error('Test write error'));
 await view.refresh();await view.applyHack(hack.path);await view.refresh();
 expect(view.statusEl.textContent).toBe('Test write error');expect(view.busy).toBe(false);
});

test('mini card is hidden on ordinary pages and reappears on technique pages', async()=>{
 const {view,plugin,hack}=setup();await view.refresh();
 expect(view.hackEl.querySelectorAll('button')).toHaveLength(1);
 plugin.getCurrentHack.mockResolvedValue(null as any);
 await view.refresh();
 expect(view.hackEl.children).toHaveLength(0);expect(view.hackEl.style.display).toBe('none');
 expect(view.hackEl.querySelectorAll('button')).toHaveLength(0);
 plugin.getCurrentPage.mockReturnValue(null as any);await view.refresh();
 expect(view.hackEl.children).toHaveLength(0);
 plugin.getCurrentHack.mockResolvedValue(hack);await view.refresh();
 expect(view.hackEl.style.display).toBe('');expect(view.hackEl.querySelectorAll('button')).toHaveLength(1);
});
test('late page lookup cannot overwrite a newer page header',async()=>{
 const {view,plugin}=setup();
 let resolve:any;plugin.getCurrentHack.mockImplementationOnce(()=>new Promise(r=>{resolve=r}));
 const old=view.refresh();
 await Promise.resolve();
 plugin.getCurrentPage.mockReturnValue({path:'new.md',title:'New page'});
 plugin.getCurrentHack.mockResolvedValue(null as any);await view.refresh();
 resolve(null);await old;
 expect(view.hackEl.children).toHaveLength(0);expect(view.hackPath).toBeNull();
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

test('recommendations open their verified card and do not apply CSS',async()=>{
 const {view,plugin}=setup();
 const open=vi.fn(async()=>{});(plugin as any).openRecommendation=open;
 const recommendation={id:'image-round',title:'Rounded photos',kind:'technique',path:'atlas/image-round.md',reason:'Soft corners',instructions:'Open and apply'};
 (plugin.state.turns as any[]).push({userText:'Round photos',systemMessage:'Found a technique',usage:{totalTokens:10,estimatedCostUsd:0.01},recommendations:[recommendation],catalogRevision:'abcdefghij'});
 await view.refresh();
 const link=view.conversationEl.querySelectorAll('a')[0];
 expect(link.textContent).toBe('Rounded photos');link.listeners.click({preventDefault(){}});
 expect(open).toHaveBeenCalledWith(recommendation);expect(plugin.applyCurrentHack).not.toHaveBeenCalled();
});


test('toolbar buttons have visible labels and the only status line follows the composer',async()=>{
 const {view,plugin}=setup();await view.onOpen();
 const toolbar=view.contentEl.children.find((e:Element)=>e.className==='callmered-toolbar');
 expect(toolbar.querySelectorAll('button').map((e:Element)=>e.textContent)).toEqual(['Скопировать диалог','Обновить поисковый каталог']);
 const link=view.catalogEl.querySelectorAll('a')[0];expect(link.textContent).toBe('Каталог');
 link.listeners.click({preventDefault(){}});expect(plugin.openCatalog).toHaveBeenCalledOnce();
 expect(toolbar.querySelectorAll('button').every((e:Element)=>e.textContent.trim().length>0)).toBe(true);
 const children=view.contentEl.children;
 expect(children[children.length-2].className).toBe('callmered-composer');
 expect(children[children.length-1]).toBe(view.statusEl);
 expect(children.filter((e:Element)=>e.className==='callmered-status')).toHaveLength(1);
 expect(view.usageEl.textContent).not.toContain('стоимость неизвестна');
});
test('history reset clears a stale response status and pending conversation text',async()=>{
 const {view}=setup();view.setStatus('Ответ получен.');view.pendingText='old request';
 view.resetHistoryStatus();await view.refresh();
 expect(view.statusEl.textContent).toBe('Готово к работе.');expect(view.pendingText).toBeNull();
 expect(view.busy).toBe(false);
});

test('source themes have card and Community links without offering automatic theme application',async()=>{
 const {view,plugin}=setup();const open=vi.fn(async()=>{});(plugin as any).openRecommendation=open;
 const theme={id:'theme-minimal',title:'Minimal',kind:'theme',path:'atlas/! themes/minimal.md',helpUrl:'https://community.obsidian.md/themes/minimal'};
 (plugin.state.turns as any[]).push({userText:'Photos',systemMessage:'Found',usage:{totalTokens:1,estimatedCostUsd:0},recommendations:[{id:'image-round',title:'Rounded',kind:'technique',path:'atlas/image-round.md',reason:'Corners',instructions:'Open',relatedThemes:[theme]}]});
 await view.refresh();const links=view.conversationEl.querySelectorAll('a');
 expect(links.map((e:Element)=>e.textContent)).toEqual(['Rounded','Minimal','Тема в Obsidian Community']);
 links[1].listeners.click({preventDefault(){}});expect(open).toHaveBeenCalledWith(theme);
 expect(plugin.applyCurrentHack).not.toHaveBeenCalled();
});
