import {test,expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'yaml';
import {groupManifest} from '../src/snippet-groups';

const atlas=path.resolve(import.meta.dirname,'../../content/atlas');
const standard=new Set('note abstract summary tldr info todo tip hint important success check done question help faq warning caution attention failure fail missing danger error bug example quote cite'.split(' '));
test('special callout syntax belongs only to compositions across the entire catalog',()=>{
 const moved:string[]=[];
 for(const relative of fs.readdirSync(path.join(atlas,'! hacks'),{recursive:true}) as string[]){
  if(!relative.endsWith('/hack.json'))continue;
  const dir=path.join(atlas,'! hacks',path.dirname(relative)), id=path.basename(dir);
  const spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));
  const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  const sample=fs.existsSync(path.join(dir,'markdown.md')) ? fs.readFileSync(path.join(dir,'markdown.md'),'utf8') : '';
  const types=[...css.matchAll(/data-callout\s*(?:[~|^$*]?=)\s*["']([^"']+)/g)].map(m=>m[1].toLowerCase());
  types.push(...[...sample.matchAll(/\[!([\w-]+)\]/g)].map(m=>m[1].toLowerCase()));
  const special=types.some(type=>!standard.has(type));
  const meta=parse(fs.readFileSync(path.join(dir,id+'.md'),'utf8').match(/^---\n([\s\S]*?)\n---/)![1]);
  expect(meta.category,id).toBe(spec.group);
  if(special){expect(spec.group,id).toBe('composition');moved.push(id);}
  if(spec.group==='composition'){
   expect(special || ['composition-github-alerts','composition-book','composition-dotted','composition-paper','composition-index-card','composition-editorial','composition-manual','composition-magazine','composition-responsive'].includes(id),id).toBe(true);expect(spec.target,id).toBe('g-composition');
   expect(meta.tags,id).toContain('hacksidian_composition');
   expect(meta.tags,id).not.toContain('hacksidian_callout');
   if(special)expect(spec.previousTargets,id).toEqual(['g-callout']);
  }
 }
 expect(moved).toHaveLength(19);
 expect(moved).toContain('composition-ticket');expect(moved).toContain('composition-qna');
 const page=fs.readFileSync(path.join(atlas,'! categories/composition.md'),'utf8');
 expect(page).toContain('```hacksidian-category\ncomposition\n```');
 expect(groupManifest.modules.find(m=>m.group==='composition')?.file).toBe('hacksidian-22-composition.css');
 const index=fs.readFileSync(path.join(atlas,'atlas.md'),'utf8');
 const section=index.split('## Композиции · 28\n')[1].split('\n## ')[0];
 for(const id of moved)expect(section).toContain(`/! hacks/${id}/${id}|`);
});
