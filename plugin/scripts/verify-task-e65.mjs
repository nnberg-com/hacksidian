// Isolated Chromium verification; does not control a user's browser or Obsidian.
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.HACKSIDIAN_PLAYWRIGHT_PATH || 'playwright');
const css=await readFile(new URL('../../content/atlas/! hacks/task-e65/recipe.css',import.meta.url),'utf8');
const browser=await chromium.launch({headless:true,...(process.env.HACKSIDIAN_CHROMIUM ? {executablePath:process.env.HACKSIDIAN_CHROMIUM}: {})});
try {
 const page=await browser.newPage();
 const items=(complete)=>`<li class="task-list-item"><input type="checkbox" checked>First</li><li class="task-list-item"><input type="checkbox" ${complete?'checked':''}>Second</li>`;
 const section=(id,complete,wrapped=false,tag='ul')=> wrapped
  ? `<div class="el-h2"><h2 id="${id}">${id}</h2></div><div class="el-${tag}"><${tag}>${items(complete)}</${tag}></div>`
  : `<h2 id="${id}">${id}</h2><${tag}>${items(complete)}</${tag}>`;
 await page.setContent(`<!doctype html><meta charset="utf-8"><style>${css}</style><div class="markdown-preview-view">
 ${section('flat-done',true)}${section('flat-progress',false)}
 ${section('Foundation-in-place',true,true)}${section('Next-steps',false,true)}
 ${section('ordered-done',true,true,'ol')}
 <div class="el-h2"><h2 id="nested">Nested</h2></div><div class="el-ul"><ul>${items(true)}<li><ul>${items(false)}</ul></li></ul></div>
 <div class="el-h2"><h2 id="plain-list">Plain</h2></div><div class="el-ul"><ul><li>No checkbox</li></ul></div>
 <h2 id="no-list">No list</h2><p>Text</p>
 <div class="el-h2"><h2 id="separated">Separated</h2></div><div class="el-p"><p>Gap</p></div><div class="el-ul"><ul>${items(true)}</ul></div>
 </div>`);
 const result=await page.evaluate(()=>{
  const content=id=>getComputedStyle(document.getElementById(id),'::after').content;
  const status=id=>content(id)==='none'?'none':content(id).includes('✓')?'done':'progress';
  const expected={'flat-done':'done','flat-progress':'progress','Foundation-in-place':'done','Next-steps':'progress','ordered-done':'done',nested:'progress','plain-list':'none','no-list':'none',separated:'none'};
  for(const [id,value] of Object.entries(expected))if(status(id)!==value)throw Error(`${id}: ${content(id)} instead of ${value}`);
  const checkbox=document.querySelector('.el-h2:has(#Foundation-in-place) + .el-ul input');
  checkbox.checked=false;if(status('Foundation-in-place')!=='progress')throw Error('Uncheck did not change status');
  checkbox.checked=true;if(status('Foundation-in-place')!=='done')throw Error('Recheck did not change status');
  const heading=document.getElementById('Next-steps');
  heading.style.setProperty('--hacksidian-task-e65-progress-label','"working"');
  if(!content('Next-steps').includes('working'))throw Error('Custom progress label not rendered');
  heading.style.setProperty('--hacksidian-task-e65-progress-label','""');
  if(content('Next-steps').includes('working')||content('Next-steps').includes('в работе'))throw Error('Empty label not respected');
  return {fixtures:Object.keys(expected).length,toggle:true,customAndEmptyLabel:true};
 });
 console.log(JSON.stringify(result));
}finally{await browser.close();}
