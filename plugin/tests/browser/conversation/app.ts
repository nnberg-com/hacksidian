// @ts-nocheck — browser-only Obsidian host fixture.
import {ConversationView} from '../../../src/view';
for(const [name,fn] of Object.entries({empty(){this.replaceChildren()},createDiv(o={}){return this.createEl('div',o)},createEl(tag,o={}){let e=document.createElement(tag);e.className=o.cls??'';if(o.text)e.textContent=o.text;if(o.href)e.setAttribute('href',o.href);for(const[k,v]of Object.entries(o.attr??{}))e.setAttribute(k,v);this.append(e);return e},setText(t){this.textContent=t},appendText(t){this.append(t)},addClass(c){this.classList.add(c)},toggleClass(c,v){this.classList.toggle(c,v)}}))HTMLElement.prototype[name]=fn;
const turns=Array.from({length:12},(_,i)=>({userText:'Запрос '+(i+1),systemMessage:'Ответ '+(i+1)+'. '+ 'Объяснение приёма и его применения. '.repeat(5)}));
const plugin={state:{turns},catalogStatus:()=> 'Каталог: готов',getCurrentPage:async()=>null,getCurrentHack:async()=>null,spendingSummary:()=>({count:0,knownCostUsd:0}),totalUsage:()=>({totalTokens:0}),processFeedback:async(text)=>{await new Promise(r=>setTimeout(r,150));turns.push({userText:text,systemMessage:'Новый ответ с примером',recommendations:[{title:'Пример',path:'demo.md',kind:'technique',reason:'Описание',instructions:''}]})}};
const view=new ConversationView({} as any,plugin as any);
await view.onOpen();
const pause=()=>new Promise(r=>setTimeout(r,550));
const scroll=document.querySelector('.callmered-conversation');
const distance=()=>scroll.scrollHeight-scroll.clientHeight-scroll.scrollTop;
const results=[];
const check=(ok,label)=>{results.push((ok?'PASS ':'FAIL ')+label);document.querySelector('#results').textContent=results.join('\n')};
document.querySelector('#run').addEventListener('click',async()=>{
 await pause();check(distance()<2,'открытие в конце истории');
 const first=scroll.firstElementChild;
 const input=document.querySelector('textarea');input.value='Покажи новый приём';document.querySelector('.callmered-submit').click();
 await pause();await pause();check(scroll.firstElementChild===first,'предыдущие сообщения не пересозданы');check(distance()<2,'ответ и поздний пример остаются в поле зрения');
 scroll.scrollTop=250;await pause();const before=scroll.scrollTop;
 turns.push({userText:'Фоновый ответ',systemMessage:'Не прерывать чтение'});await view.refresh();await pause();check(Math.abs(scroll.scrollTop-before)<2,'новый ответ не уводит от старых сообщений');
 const el=scroll.firstElementChild;el.style.height=(el.getBoundingClientRect().height+100)+'px';await pause();check(Math.abs(scroll.scrollTop-before-100)<2,'изменение высоты выше сохраняет читаемое место');
 scroll.scrollTop=scroll.scrollHeight;await pause();scroll.lastElementChild.style.height='300px';await pause();check(distance()<2,'возвращение вниз возобновляет следование');
});
