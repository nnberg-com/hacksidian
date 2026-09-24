import {test,expect} from 'vitest';
import fs from 'node:fs';import path from 'node:path';
import {parse} from 'yaml';
import {categoryPage} from '../src/category-page';
import {groupManifest} from '../src/snippet-groups';
const root=path.resolve(import.meta.dirname,'../..');
test('every current card uses an active Markdown category or plugin collection, with matching page and target',()=>{
 const groups=new Set(groupManifest.modules.map(m=>String(m.group)));
 expect(groups.size).toBe(26);
 for(const group of ['note','list','interface','meta','emphasis-combinations','pseudo-task','strikethrough'])expect(groups.has(group)).toBe(false);
 for(const group of ['combinations','taskplus','strike'])expect(groups.has(group)).toBe(true);
 const hacks=path.join(root,'content/atlas/! hacks');
 for(const dir of fs.readdirSync(hacks,{withFileTypes:true}).filter(d=>d.isDirectory())){
  const p=path.join(hacks,dir.name);if(!fs.existsSync(path.join(p,'hack.json')))continue;
  const spec=JSON.parse(fs.readFileSync(path.join(p,'hack.json'),'utf8'));
  const md=fs.readFileSync(path.join(p,dir.name+'.md'),'utf8'),meta=parse(md.match(/^---\n([\s\S]*?)\n---/)![1]);
  expect(groups.has(spec.group),dir.name).toBe(true);expect(meta.category,dir.name).toBe(spec.group);expect(spec.target,dir.name).toBe('g-'+spec.group);
  expect(fs.existsSync(path.join(root,'content/atlas',categoryPage(spec.group))),dir.name).toBe(true);
 }
 expect(JSON.parse(fs.readFileSync(path.join(root,'snippets/hacksidian-manifest.json'),'utf8'))).toEqual(groupManifest);
});
