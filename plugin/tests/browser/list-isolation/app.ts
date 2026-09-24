// @ts-nocheck -- real CSS/Shadow DOM; no Obsidian host or author vault mutations.
import {createLiveExampleSurface} from '../../../src/live-example-surface';
import {scopeLiveExample} from '../../../src/live-example-css';
const recipes=await(await fetch('./recipes.json')).json();
const examples=document.querySelector('#examples'),results=document.querySelector('#results');
const active=document.head.appendChild(document.createElement('style'));
const cases=[];
const item='Блокнот для коротких наблюдений и подробностей, которые легко забыть';
const markup=native=>`<ul${native?' class="has-list-bullet"':''}><li>${native?'<span class="list-bullet"></span>':''}${item}<ul${native?' class="has-list-bullet"':''}><li>${native?'<span class="list-bullet"></span>':''}Вложенный пункт<ul><li>Третий уровень</li></ul></li></ul></li><li>${native?'<span class="list-bullet"></span>':''}Карандаш с мягким грифелем</li></ul><ol><li>Нумерованный пункт</li></ol><ul><li class="task-list-item" data-task=" "><input type="checkbox">Задача</li></ul>`;
const properties=['content','display','list-style-type','list-style-image','list-style-position','color','background-color','font-size','font-weight','line-height','padding-left','margin-left','width','height','border-radius','border-width','transform'];
const signature=sample=>JSON.stringify([...sample.querySelectorAll('ul,ol,li,.list-bullet')].map(el=>[null,'::marker','::before','::after'].map(pseudo=>{
 const computed=getComputedStyle(el,pseudo);return properties.map(p=>computed.getPropertyValue(p));
})));
try {
 for(const [id,css] of Object.entries(recipes))for(const native of [false,true]){
  const section=examples.appendChild(document.createElement('section'));section.appendChild(document.createElement('h2')).textContent=id+(native?' · native bullets':' · plain Markdown');
  const viewport=section.appendChild(document.createElement('div'));viewport.className='hacksidian-live-viewport';
  const root=createLiveExampleSurface(viewport),sample=root.appendChild(document.createElement('div'));
  sample.id='hacksidian-live-'+id+(native?'-native':'-plain');sample.className='markdown-preview-view markdown-rendered hacksidian-live-sample';sample.innerHTML=markup(native);
  const style=root.appendChild(document.createElement('style'));style.textContent=scopeLiveExample(css,sample.id);
  cases.push({id,native,sample,style});
 }
 for(const shown of [true,false]){
  for(const c of cases){if(!shown)c.style.textContent='';c.before=signature(c.sample);}
  active.textContent=recipes['unordered-e004'];
  examples.style.setProperty('--list-marker-color','rgb(255,0,255)');
  for(const c of cases)if(signature(c.sample)!==c.before)throw Error(`${c.id} native=${c.native}, shown=${shown}: enabled technique leaked into example`);
  active.textContent='';examples.style.removeProperty('--list-marker-color');
 }
 results.textContent=`PASS: ${cases.length} cases, enabled/disabled preview, native/plain DOM. All unordered recipes unchanged under enabled unordered-e004 and note-level variable override.`;
 document.documentElement.dataset.result='pass';
}catch(error){results.textContent='FAIL: '+error.stack;document.documentElement.dataset.result='fail';}
