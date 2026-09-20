import { vi, test, expect } from 'vitest';
vi.mock('obsidian', () => ({ItemView: class { addChild(){} removeChild(){} }, Notice: class {}, setIcon: vi.fn()}));
vi.mock('../src/chat-technique', () => ({ ChatTechnique: class { constructor(public el: unknown, public heading: unknown, public plugin: unknown, public path: string) {} } }));
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

test('an apply error remains visible after panel refresh',async()=>{
 const {view,plugin,hack}=setup();plugin.applyCurrentHack.mockRejectedValueOnce(new Error('Test write error'));
 await view.refresh();await view.applyHack(hack.path);await view.refresh();
 expect(view.statusEl.textContent).toBe('Test write error');expect(view.busy).toBe(false);
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
 expect(children[children.length-1].children).toContain(view.statusEl);
 expect(children[children.length-1].children).toContain(view.stopCatalogButton);
 expect(view.contentEl.querySelectorAll('div').filter((e:Element)=>e.className==='callmered-status')).toHaveLength(1);
 expect(view.usageEl.textContent).not.toContain('стоимость неизвестна');
});
test('history reset clears a stale response status and pending conversation text',async()=>{
 const {view}=setup();view.setStatus('Ответ получен.');view.pendingText='old request';
 view.resetHistoryStatus();await view.refresh();
 expect(view.statusEl.textContent).toBe('Готово к работе.');expect(view.pendingText).toBeNull();
 expect(view.busy).toBe(false);
});

test('chat technique preview omits source-theme references',async()=>{
 const {view,plugin}=setup();const open=vi.fn(async()=>{});(plugin as any).openRecommendation=open;
 const theme={id:'theme-minimal',title:'Minimal',kind:'theme',path:'atlas/! themes/minimal.md',helpUrl:'https://community.obsidian.md/themes/minimal'};
 (plugin.state.turns as any[]).push({userText:'Photos',systemMessage:'Found',usage:{totalTokens:1,estimatedCostUsd:0},recommendations:[{id:'image-round',title:'Rounded',kind:'technique',path:'atlas/image-round.md',reason:'Corners',instructions:'Open',relatedThemes:[theme]}]});
 await view.refresh();const links=view.conversationEl.querySelectorAll('a');
 expect(links.map((e:Element)=>e.textContent)).toEqual(['Rounded']);
 expect(open).not.toHaveBeenCalled();
 expect(plugin.applyCurrentHack).not.toHaveBeenCalled();
});

test('dialogue does not duplicate card title or apply controls',async()=>{
 const {view}=setup();await view.refresh();expect(view.hackEl.children).toHaveLength(0);expect(view.hackEl.style.display).toBe('none');
});

test('stop beside progress stays usable while busy and disappears after stopping',async()=>{
 const {view,plugin}=setup();let finish!:()=>void;
 (plugin as any).stopCatalogUpdate=vi.fn(()=>finish());
 (plugin as any).updateCatalog=vi.fn(async(status:Function)=>{
  status('Обработано 1 из 2 файлов');
  await new Promise<void>(resolve=>{finish=resolve;});
  status('Обновление остановлено. Обработанные файлы сохранены.');
 });
 await view.onOpen();
 const running=view.toolbarButtons[0].listeners.click();
 expect(view.stopCatalogButton.hidden).toBe(false);expect(view.stopCatalogButton.disabled).toBe(false);
 expect(view.statusEl.textContent).toBe('Обработано 1 из 2 файлов');
 view.stopCatalogButton.listeners.click();
 expect(view.stopCatalogButton.disabled).toBe(true);
 await running;
 expect((plugin as any).stopCatalogUpdate).toHaveBeenCalledOnce();
 expect(view.stopCatalogButton.hidden).toBe(true);expect(view.busy).toBe(false);
 expect(view.statusEl.textContent).toContain('Обновление остановлено');
});

test('each technique gets a reusable example and controls without history metadata',async()=>{
 const {view,plugin}=setup();
 (plugin.state.turns as any[]).push({userText:'Round',systemMessage:'Found',catalogRevision:'123',usage:{totalTokens:10,estimatedCostUsd:null},recommendations:[
  {id:'one',title:'First',kind:'technique',path:'atlas/one.md',reason:'Reason',instructions:''},
  {id:'two',title:'Second',kind:'technique',path:'atlas/two.md',reason:'Reason',instructions:''},
 ]});
 await view.refresh();
 expect(view.examples.map((e:any)=>e.path)).toEqual(['atlas/one.md','atlas/two.md']);
 const nodes=view.conversationEl.querySelectorAll('div');
 expect(nodes.some((e:Element)=>e.className==='callmered-turn-label'||e.className==='callmered-turn-usage')).toBe(false);
 expect(nodes.some((e:Element)=>e.textContent.includes('Версия каталога'))).toBe(false);
 expect(view.usageEl.textContent).toBe('0 токенов · 0 запросов · расходы ≈ $0.00');
 const before=view.examples[0];await view.refresh();expect(view.examples[0]).toBe(before);
});
test('parameter replies link the technique title instead of its ID',async()=>{
 const {view,plugin}=setup();
 (plugin.state.turns as any[]).push({userText:'Thicker',systemMessage:'Updated',techniqueId:'hr-e070',techniqueTitle:'Line',techniquePath:'atlas/hr.md',usage:{totalTokens:1,estimatedCostUsd:null}});
 await view.refresh();expect(view.conversationEl.querySelectorAll('a')[0].textContent).toBe('Line');
});

test('recommendation order is heading, example, full model description without truncation or obsolete instructions',async()=>{
 const {view,plugin}=setup();
 (plugin.state.turns as any[]).push({userText:'Test',systemMessage:'Found',recommendations:[{id:'one',title:'First',kind:'technique',path:'atlas/one.md',reason:'а'.repeat(250),instructions:'Откройте карточку и нажмите «Применить приём».'}]});
 await view.refresh();
 const item=view.conversationEl.querySelectorAll('div').find((e:Element)=>e.className==='hacksidian-recommendation');
 expect(item.children.map((e:Element)=>e.className)).toEqual(['hacksidian-card-header hacksidian-chat-technique-heading','hacksidian-chat-example','hacksidian-chat-description']);
 expect(item.children[2].textContent).toBe('а'.repeat(250));
});

test('saved current-card replies render the same interactive example and description as recommendations',async()=>{
 const {view,plugin}=setup();
 (plugin.state.turns as any[]).push({userText:'emphasis-s19 — разве не подходит?',systemMessage:'Наклонная подсветка маркером.',techniqueId:'emphasis-s19',techniqueTitle:'19 · Неровный маркер',techniquePath:'atlas/! hacks/emphasis-s19/emphasis-s19.md'});
 await view.refresh();
 expect(view.examples.map((e:any)=>e.path)).toEqual(['atlas/! hacks/emphasis-s19/emphasis-s19.md']);
 const item=view.conversationEl.querySelectorAll('div').find((e:Element)=>e.className==='hacksidian-recommendation');
 expect(item.children.map((e:Element)=>e.className)).toEqual(['hacksidian-card-header hacksidian-chat-technique-heading','hacksidian-chat-example','hacksidian-chat-description']);
 expect(item.children[2].textContent).toBe('Наклонная подсветка маркером.');
});

test('a near match on no_match is a complete interactive card with its limitation',async()=>{
 const {view,plugin}=setup();
 (plugin.state.turns as any[]).push({userText:'Lists in two columns',action:'no_match',systemMessage:'No exact match',recommendations:[{id:'callout-columns',title:'Two columns',kind:'technique',path:'atlas/columns.md',partialMatch:true,reason:'Only callout content, not ordinary lists.',instructions:''}]});
 await view.refresh();
 expect(view.examples.map((e:any)=>e.path)).toEqual(['atlas/columns.md']);
 expect(view.conversationEl.querySelectorAll('a')[0].textContent).toBe('Two columns');
 const nodes=view.conversationEl.querySelectorAll('div');
 expect(nodes.some((e:Element)=>e.className==='hacksidian-chat-match-note')).toBe(true);
 expect(nodes.some((e:Element)=>e.textContent==='Only callout content, not ordinary lists.')).toBe(true);
});

test('a new answer preserves existing message nodes and loaded examples', async()=>{
 const {view,plugin}=setup();
 const turn={userText:'First',systemMessage:'Answer',recommendations:[]};
 (plugin.state.turns as any[]).push(turn);await view.refresh();
 const first=view.conversationEl.children[0], answer=view.conversationEl.children[1];
 const example={};view.examples.push(example);
 (plugin.state.turns as any[]).push({userText:'Second',systemMessage:'Next answer'});await view.refresh();
 expect(view.conversationEl.children[0]).toBe(first);
 expect(view.conversationEl.children[1]).toBe(answer);
 expect(view.examples).toContain(example);
 expect(view.conversationEl.children).toHaveLength(4);
});

test('clearing history removes previous messages instead of appending over them',async()=>{
 const {view,plugin}=setup();(plugin.state.turns as any[]).push({userText:'Old',systemMessage:'Old answer'});
 await view.refresh();plugin.state.turns=[];await view.refresh();
 expect(view.conversationEl.children).toHaveLength(0);expect(view.examples).toHaveLength(0);
});
