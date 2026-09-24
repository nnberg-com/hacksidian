import {expect,test} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'yaml';
const atlas=path.resolve(import.meta.dirname,'../../content/atlas');

test('Inline Dataview category counters count immediate recipe folders and agree with card metadata',()=>{
 const folders=fs.readdirSync(path.join(atlas,'! hacks'),{withFileTypes:true}).map(f=>({name:f.name,...(f.isDirectory()?{children:[]}: {})}));
 const counts:Record<string,number>={};
 for(const f of folders.filter(f=>f.children)){
  const card=fs.readFileSync(path.join(atlas,'! hacks',f.name,f.name+'.md'),'utf8');
  const {category}=parse(card.match(/^---\n([\s\S]*?)\n---/)![1]);
  counts[category]=(counts[category]??0)+1;
 }
 for(const [category,count] of Object.entries(counts)){
  if(category.startsWith('plugin-'))continue; // Plugin pages do not use inline Dataview counters.
  const page=fs.readFileSync(path.join(atlas,'! categories',category+'.md'),'utf8');
  expect(parse(page.match(/^---\n([\s\S]*?)\n---/)![1])).not.toHaveProperty('group');
  expect(page).not.toContain('dv.current()');
  const scripts=[...page.matchAll(/`\$=([^`]+)`/g)].map(m=>m[1]);
  expect(scripts).toHaveLength(2);
  for(const prefix of ['', 'nested/']){
   const sourcePath=prefix+'atlas/! categories/'+category+'.md';
   const dv={current:()=>undefined,currentFilePath:sourcePath,el:(tag:string,text:string)=>({tag,text}),app:{vault:{getAbstractFileByPath:(p:string)=>{
    if(p===sourcePath)return {basename:category,parent:{path:prefix+'atlas/! categories'}};
    expect(p).toBe(prefix+'atlas/! hacks');
    return {children:[...folders,{name:category+'-not-a-folder.md'},{name:category+'extra',children:[]}]};
   }}}};
   // Dataview evaluates inline JS and renders its completion value.
   const run=(script:string)=>new Function('script','return eval("const dv=this;" + script)').call(dv,script);
   expect(run(scripts[0]),category).toEqual({tag:'code',text:category});
   expect(run(scripts[1]),category).toBe(count);
  }
 }
});
