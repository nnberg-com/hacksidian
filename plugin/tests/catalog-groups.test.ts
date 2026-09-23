import {test,expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'yaml';
import {groupManifest} from '../src/snippet-groups';
import {addHack} from '../src/hacks';
const repo=path.resolve(import.meta.dirname,'../..');
const atlas=path.join(repo,'content/atlas');

test('catalog recipes use their category prefix and compile into the matching group',()=>{
 const dirs=fs.readdirSync(path.join(atlas,'! hacks')).filter(id=>fs.existsSync(path.join(atlas,'! hacks',id,'hack.json')));
 expect(dirs.length).toBeGreaterThan(0);
 const index=fs.readFileSync(path.join(atlas,'atlas.md'),'utf8');
 for(const id of dirs){
  const dir=path.join(atlas,'! hacks',id);
  const meta=parse(fs.readFileSync(path.join(dir,id+'.md'),'utf8').match(/^---\n([\s\S]*?)\n---/)![1]);
  const spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));
  expect(id===spec.group || id.startsWith(spec.group+'-'),id).toBe(true);
  expect(spec.target,id).toBe('g-'+meta.category);
  expect(spec.group,id).toBe(meta.category);
  expect(meta.tags,id).toContain('hacksidian_technique');
  expect(meta.tags,id).not.toContain('hacksidian_note');
  expect(groupManifest.modules.some(m=>m.id===spec.target),id).toBe(true);
  expect(fs.existsSync(path.join(atlas,'! categories',spec.group+'.md')),id).toBe(true);
  const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  const hack={id,title:meta.title,path:id+'.md',spec,css};
  const empty={format:1 as const,modules:[{id:spec.target,component:spec.group,css:'/* destination */'}]};
  const next=addHack(empty,hack).style;
  expect(next.modules[0].css,id).toContain(`/* hacksidian:hack:${id}:start */`);
  expect(next.modules[0].css,id).toContain('/* destination */');
  expect(addHack(next,hack).changed,id).toBe(false);
 }
 expect(index).not.toContain('## Заметки ·');
 expect(fs.existsSync(path.join(atlas,'! categories/note.md'))).toBe(false);
});

test('fresh templates omit note and keep established snippet filenames',()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(repo,'snippets/hacksidian-manifest.json'),'utf8'));
 expect(manifest).toEqual(groupManifest);
 expect(manifest.modules.some((m:{id:string})=>m.id==='g-note')).toBe(false);
 expect(manifest.modules.find((m:{id:string})=>m.id==='g-text').file).toBe('hacksidian-04-text.css');
 expect(manifest.modules.find((m:{id:string})=>m.id==='g-composition').file).toBe('hacksidian-22-composition.css');
});
