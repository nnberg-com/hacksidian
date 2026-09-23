import {test,expect} from 'vitest';
import fs from 'node:fs';import path from 'node:path';
import {parse} from 'yaml';
import {groupManifest} from '../src/snippet-groups';
import {addHack} from '../src/hacks';
const atlas=path.resolve(import.meta.dirname,'../../content/atlas');
test('emphasis has descriptive titles and separates deletion from compound markup',()=>{
 const counts:Record<string,number>={};
 for(let n=1;n<=37;n++){
  const group=[28,29,30,31,37].includes(n)?'strike':[32,33,34,35].includes(n)?'combinations':'emphasis';
  const id=group+'-s'+String(n).padStart(2,'0'),dir=path.join(atlas,'! hacks',id);
  const meta=parse(fs.readFileSync(path.join(dir,id+'.md'),'utf8').match(/^---\n([\s\S]*?)\n---/)![1]);
  const spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));
  expect(meta.category,id).toBe(group);expect(spec.group,id).toBe(group);expect(spec.target,id).toBe('g-'+group);expect(meta.title,id).not.toMatch(/^\d/);
  expect(meta.tags).toContain('hacksidian_'+group);counts[group]=(counts[group]??0)+1;
  if(group!=='emphasis'){
   const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');const hack={id,title:id,path:id+'.md',spec,css};
   const old={format:1 as const,modules:[{id:'g-emphasis',component:'emphasis',css:`/* keep */\n/* hacksidian:hack:${id}:start */\n${css}/* hacksidian:hack:${id}:end */`},{id:spec.target,component:group,css:''}]};
   const next=addHack(old,hack).style;expect(next.modules[0].css.trim()).toBe('/* keep */');expect(next.modules[1].css).toContain(css);expect(addHack(next,hack).changed).toBe(false);
  }
 }
 expect(counts).toEqual({emphasis:28,strike:5,'combinations':4});
 for(const group of ['strike','combinations']){
  expect(fs.readFileSync(path.join(atlas,'! categories',group+'.md'),'utf8')).toContain('```hacksidian-category\n'+group+'\n```');
  expect(groupManifest.modules.some(m=>m.group===group)).toBe(true);
 }
});
