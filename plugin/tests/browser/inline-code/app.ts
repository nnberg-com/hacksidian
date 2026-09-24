// @ts-nocheck -- browser regression for actual Range and computed styles.
import {scopeLiveExample} from '../../../src/live-example-css';
import {installInlineCodeSelection,fullySelected} from '../../../src/inline-code-selection';
const recipes=await(await fetch('./recipes.json')).json(),results=document.querySelector('#results');
const check=(ok,message)=>{if(!ok)throw Error(message);results.textContent+='PASS '+message+'\n';};
const cases={};
for(const[id,css]of Object.entries(recipes)){
 const root=document.body.appendChild(document.createElement('section'));root.id='hacksidian-live-inline-'+id;root.className='markdown-preview-view markdown-rendered';root.innerHTML='<h3>inline-code-ex-'+id+'</h3><p>Строка перед кодом должна оставаться читаемой даже при высокой подложке. Команда <code>sample_command --argument</code> внутри текста. Следующие строки показывают сохранённую форму и отступы.</p>';
 const code=root.querySelector('code'),prior=getComputedStyle(code),before={background:prior.backgroundColor,radius:prior.borderRadius,padding:prior.padding};
 const style=root.appendChild(document.createElement('style'));style.textContent=scopeLiveExample(css.replaceAll(':hover','.test-hover'),root.id);
 cases[id]={root,code,style,before};
}
try{
 results.textContent='';
 const a=cases['33'],s=getComputedStyle(a.code);check(s.backgroundColor===a.before.background,'33 preserves background');check(s.borderRadius===a.before.radius,'33 preserves shape');
 const b=cases['51'];check(getComputedStyle(b.code).backgroundColor===b.before.background,'51 unchanged without hover');b.code.classList.add('test-hover');check(getComputedStyle(b.code).borderRadius===b.before.radius&&getComputedStyle(b.code).padding===b.before.padding,'51 hover preserves shape and padding');check(getComputedStyle(b.code).backgroundColor!==b.before.background,'51 hover highlight');
 const c=cases['40'];check(getComputedStyle(c.code,'::before').zIndex==='-1'&&getComputedStyle(c.code.closest('p')).isolation==='isolate','40 underlay has paragraph stacking boundary');
 const d=cases['53'],cleanups=[];const refresh=installInlineCodeSelection(d.root,{register:fn=>cleanups.push(fn)});
 const selection=document.getSelection(),range=document.createRange(),text=d.code.firstChild;
 range.setStart(text,0);range.setEnd(text,text.length);selection.removeAllRanges();selection.addRange(range);refresh();
 check(fullySelected(d.code,selection)&&d.code.hasAttribute('data-hacksidian-selected'),'53 entire text including text-node boundaries');
 check(getComputedStyle(d.code).borderRadius===d.before.radius&&getComputedStyle(d.code).padding===d.before.padding,'53 selection retains rounded shape and padding');
 check(getComputedStyle(d.code).boxShadow!=='none','53 paints whole code box');check(selection.toString()===d.code.textContent,'53 clipboard text unchanged');
 range.setEnd(text,3);selection.removeAllRanges();selection.addRange(range);refresh();check(!d.code.hasAttribute('data-hacksidian-selected'),'53 partial selection does not paint full box');
 range.selectNodeContents(d.root.querySelector('p'));selection.removeAllRanges();selection.addRange(range);refresh();check(d.code.hasAttribute('data-hacksidian-selected'),'53 selection extending beyond code');
 selection.removeAllRanges();refresh();check(!d.code.hasAttribute('data-hacksidian-selected'),'53 clear selection');
 range.selectNodeContents(d.code);selection.addRange(range);refresh();for(const dispose of cleanups)dispose();check(!d.code.hasAttribute('data-hacksidian-selected'),'53 cleanup');
 document.documentElement.dataset.result='pass';
}catch(error){results.textContent+='FAIL '+error.stack;document.documentElement.dataset.result='fail';}
