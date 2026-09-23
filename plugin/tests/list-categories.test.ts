import {test,expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'yaml';
import {groupManifest} from '../src/snippet-groups';
import {addHack} from '../src/hacks';
const repo=path.resolve(import.meta.dirname,'../..');
const atlas=path.join(repo,'content/atlas');

test('all 114 list recipes are classified by the list type in their Markdown example',()=>{
 const counts:Record<string,number>={ordered:0,unordered:0};
 const index=fs.readFileSync(path.join(atlas,'atlas.md'),'utf8');
 for(const id of fs.readdirSync(path.join(atlas,'! hacks'))){
  const dir=path.join(atlas,'! hacks',id);
  if(!fs.existsSync(path.join(dir,'hack.json')))continue;
  const spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));
  expect(spec.group,id).not.toBe('list');
  if(!['ordered','unordered'].includes(spec.group))continue;
  counts[spec.group]++;
  const meta=parse(fs.readFileSync(path.join(dir,id+'.md'),'utf8').match(/^---\n([\s\S]*?)\n---/)![1]);
  const sample=fs.readFileSync(path.join(dir,'markdown.md'),'utf8').replace(/^---\n[\s\S]*?\n---\n/,'');
  const ordered=/^\s*\d+[.)] /m.test(sample),unordered=/^\s*[-*+] /m.test(sample);
  expect(ordered!==unordered,id).toBe(true);
  expect(spec.group,id).toBe(ordered?'ordered':'unordered');
  expect(meta.category,id).toBe(spec.group);
  expect(meta.tags,id).toContain('hacksidian_'+spec.group);
  expect(meta.tags,id).not.toContain('hacksidian_list');
  expect(spec.target,id).toBe('g-'+spec.group);
  const category=fs.readFileSync(path.join(atlas,'! categories',spec.group+'.md'),'utf8');
  const title=parse(category.match(/^---\n([\s\S]*?)\n---/)![1]).title;
  expect(index.split(/^## /m).find(s=>s.includes(`/${id}/${id}|`))?.startsWith(title+' ·'),id).toBe(true);
  const hack={id,title:meta.title,path:id+'.md',spec,css:fs.readFileSync(path.join(dir,'recipe.css'),'utf8')};
  const next=addHack({format:1,modules:[{id:spec.target,component:spec.group,css:''}]},hack).style;
  expect(addHack(next,hack).changed,id).toBe(false);
 }
 expect(counts).toEqual({ordered:29,unordered:85});
 expect(fs.existsSync(path.join(atlas,'! categories/list.md'))).toBe(false);
 expect(groupManifest.modules.some(m=>String(m.group)==='list')).toBe(false);
 for(const group of ['ordered','unordered'])expect(groupManifest.modules.some(m=>m.group===group)).toBe(true);
});
