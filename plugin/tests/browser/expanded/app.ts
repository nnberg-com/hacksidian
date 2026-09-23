// @ts-nocheck — browser-only host fixture, no author vault or remote API.
import { ExpandedExample } from '../../../src/expanded-example';
import { LiveExample } from '../../../src/live-example';
import { readParameters } from '../../../src/parameters';
import { TFile } from './obsidian';
for(const [name,fn] of Object.entries({empty(){this.replaceChildren()},createDiv(o={}){return this.createEl('div',o)},createSpan(o={}){return this.createEl('span',o)},createEl(tag,o={}){const e=document.createElement(tag);e.className=o.cls??'';if(o.text)e.textContent=o.text;if(o.value!==undefined)e.value=o.value;if(o.href)e.setAttribute('href',o.href);for(const[k,v]of Object.entries(o.attr??{}))e.setAttribute(k,v);this.append(e);return e},setText(t){this.textContent=t},appendText(t){this.append(t)},addClass(...c){this.classList.add(...c)},toggleClass(c,v){this.classList.toggle(c,v)}}))HTMLElement.prototype[name]=fn;
const files=await (await fetch('./files.json')).json();
const listeners=new Set();const writes=[];
const vault={adapter:{read:async p=>{if(!(p in files))throw Error('Missing '+p);return files[p]},exists:async p=>p in files,getResourcePath:p=>p},on:(name,fn)=>{if(name==='modify')listeners.add(fn);return()=>listeners.delete(fn)},getAbstractFileByPath:p=>new TFile(p),process:async(file,fn)=>{files[file.path]=fn(files[file.path]);writes.push(file.path);for(const listener of listeners)listener(file)}};
const plugin={app:{vault}};
const controls={english:()=>false};
const components=[];
for(const id of ['text-system','palette']){
 const directory='atlas/! hacks/'+id,css=files[directory+'/recipe.css'];
 const page=document.querySelector('#'+id);page.createEl('h1',{text:id==='text-system'?'Текстовая система':'Палитра'});
 const main=page.createDiv({cls:'main-card'});main.createEl('h2',{text:'Карточка: текущий выбор'});
 const component=new LiveExample(main,plugin,directory,'ru',controls);components.push(component);component.onload();
 for(const option of readParameters(css)[0].options){
  const section=page.createEl('section',{attr:{'data-option':option.value,id:id+'-'+option.value}});section.createEl('h2',{text:option.label});
  const expanded=new ExpandedExample(section.createDiv(),plugin,directory,{[readParameters(css)[0].variable]:option.value},controls);components.push(expanded);void expanded.onload();
 }
}
window.fixture={files,writes,components,listeners};

const report=document.querySelector('#results');
const check=(ok,label)=>{if(!ok)throw Error(label);report.textContent+='PASS '+label+'\n';};
document.querySelector('#run').addEventListener('click',async()=>{
 report.textContent='';
 const pause=()=>new Promise(r=>setTimeout(r,300));
 try {
  const expected=await (await fetch('./expected.json')).json();
  check(writes.length===0,'просмотр не записывает параметры');
  for(const system of expected){
   const section=document.querySelector('#text-system section[data-option="'+system.id+'"]');
   for(let i=0;i<6;i++){
    const a=getComputedStyle(section.querySelector('.hacksidian-live-sample h'+(i+1))),h=system.headings[i];
    if(Math.abs(parseFloat(a.fontSize)-h.size*16)>.02||Math.abs(parseFloat(a.lineHeight)-h.size*16*h.leading)>.02||a.fontWeight!==String(h.weight)||Math.abs(parseFloat(a.marginBlockStart)-h.before*16)>.02||Math.abs(parseFloat(a.marginBlockEnd)-h.after*16)>.02||a.fontStyle!==h.style||a.textTransform!==h.transform)throw Error(system.id+' H'+(i+1));
   }
  }
  check(true,'60 заголовков: размеры, интерлиньяж, насыщенность, стиль, отбивки, регистр');
  const palettes=document.querySelectorAll('#palette section');check(palettes.length===11,'11 светлых палитр');
  for(const section of palettes){const sample=section.querySelector('.hacksidian-palette-model').shadowRoot.querySelector('.workspace');const style=getComputedStyle(sample);if(!style.getPropertyValue('--color-red').trim()||style.backgroundColor==='rgba(0, 0, 0, 0)')throw Error('Палитра '+section.dataset.option);}
  check(true,'цвета палитр вычислены в браузере');
  const colors=['red','orange','yellow','green','cyan','blue','purple','pink'];
  const paletteColors=()=>[...palettes].flatMap(section=>{const style=getComputedStyle(section.querySelector('.hacksidian-palette-model').shadowRoot.querySelector('.workspace'));return colors.map(c=>style.getPropertyValue('--color-'+c).trim());});
  const beforeColors=paletteColors(),beforeStyle=document.body.getAttribute('style');
  for(const c of colors)document.body.style.setProperty('--hacksidian-semantic-'+c,'#010203');
  await pause();
  check(JSON.stringify(paletteColors())===JSON.stringify(beforeColors),'ручные цвета страницы не искажают 88 цветов в примерах палитр');
  if(beforeStyle===null)document.body.removeAttribute('style');else document.body.setAttribute('style',beforeStyle);
  await pause();

  document.querySelector('#text-system-carbon > div > button').click();await pause();
  check(document.querySelector('#text-system .main-card select').value==='carbon','expanded → редактор text-system');
  check(Math.abs(parseFloat(getComputedStyle(document.querySelector('#text-system-uswds .hacksidian-live-sample h1')).fontSize)-expected.find(s=>s.id==='uswds').headings[0].size*16)<.02,'другие варианты не меняются');
  document.querySelector('#palette-solarized-1 > div > button').click();await pause();
  check(document.querySelector('#palette .main-card .hacksidian-parameters select').value==='solarized-1','expanded → редактор palette');
  const select=document.querySelector('#text-system .main-card select');select.value='primer';select.dispatchEvent(new Event('change'));await pause();
  check(getComputedStyle(document.querySelector('#text-system-carbon .hacksidian-live-sample h1')).fontSize==='42px','выбор в редакторе не меняет фиксированный пример');
  check(getComputedStyle(document.querySelector('#unrelated')).fontSize==='17px','окружающая страница не изменена');
  check(writes.length===3,'ровно три явных сохранения');
  report.textContent+='DONE';
 }catch(e){report.textContent+='FAIL '+e;}
});
document.querySelector('#cleanup').addEventListener('click',()=>{components.forEach(c=>c.unload());report.textContent+='\n'+(listeners.size===0?'PASS':'FAIL')+' cleanup listeners='+listeners.size;});
