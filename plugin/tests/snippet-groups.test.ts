import {test,expect} from 'vitest';
import {mkdtemp,writeFile,readFile,readdir,rm} from 'node:fs/promises';
import path from 'node:path';import {tmpdir} from 'node:os';
import {groupManifest,splitLegacyStyle} from '../src/snippet-groups';
import {migrateSnippetGroups} from '../src/snippets';
import {readFileStyle,writeFileStyle} from '../src/file-style';
const ids=['00-settings','10-reading','20-links-and-highlights','30-lists-and-tasks','40-quotes-and-callouts','50-tables','60-code','70-images','80-footnotes','90-hide-note-header'];
function fixture(){return {format:1 as const,modules:ids.map((id,i)=>({id:'m-'+id,component:id,css:i===0?'.markdown-preview-view.callmered-coloring {--cmr-color-text:#123;--cmr-gap:10px;}':i===4?'.markdown-preview-view.callmered-coloring blockquote {padding:var(--cmr-gap);color:var(--cmr-color-text)} .markdown-preview-view.callmered-coloring .callout {padding:var(--cmr-gap)}':'/* base */'}))};}
test('26 unique groups; shared palette but independent quote and callout parameters',()=>{
 expect(new Set(groupManifest.modules.map(m=>m.group)).size).toBe(26);
 const style=splitLegacyStyle(fixture());
 expect(style.modules.find(m=>m.id==='g-quote')!.css).toMatch(/--hs-quote-gap:\s*10px/);
 expect(style.modules.find(m=>m.id==='g-callout')!.css).toMatch(/--hs-callout-gap:\s*10px/);
 expect(style.modules.find(m=>m.id==='g-quote')!.css).toContain('var(--cmr-color-text)');
 expect(()=>splitLegacyStyle({...fixture(),modules:[]})).toThrow('Неизвестная');
});
test('migrates working values, removes old files, is idempotent; regrouped Undo restores multiple files',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'hs-groups-'));
 try{
  const before=fixture();const manifest={format:1,modules:ids.map((id,i)=>({id:'m-'+id,component:id,file:'hacksidian-'+id+'.css'}))};
  await writeFile(path.join(dir,'hacksidian-manifest.json'),JSON.stringify(manifest));
  for(let i=0;i<ids.length;i++)await writeFile(path.join(dir,manifest.modules[i].file),before.modules[i].css);
  await writeFile(path.join(dir,'unrelated.css'),'keep');
  expect(await migrateSnippetGroups(dir)).toHaveLength(26);
  expect(await readFileStyle(dir)).toEqual(splitLegacyStyle(before));expect(await migrateSnippetGroups(dir)).toEqual([]);
  expect(await readdir(dir)).not.toContain('hacksidian-00-settings.css');expect(await readFile(path.join(dir,'unrelated.css'),'utf8')).toBe('keep');
  const prior=fixture();prior.modules[0].css=prior.modules[0].css.replace('10px','20px');
  const next=splitLegacyStyle(prior),current=await readFileStyle(dir);
  await writeFileStyle(dir,current,next);expect(await readFileStyle(dir)).toEqual(next);
  await writeFileStyle(dir,next,current);expect(await readFileStyle(dir)).toEqual(current);
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('adds composition to an existing group manifest without changing installed CSS or other metadata',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'hs-composition-'));
 try {
  const old={...groupManifest,custom:'keep',modules:groupManifest.modules.filter(m=>m.id!=='g-composition')};
  await writeFile(path.join(dir,'hacksidian-manifest.json'),JSON.stringify(old));
  for(const m of old.modules)await writeFile(path.join(dir,m.file),'/* user CSS '+m.id+' */');
  expect(await migrateSnippetGroups(dir)).toEqual(['hacksidian-22-composition']);
  const manifest=JSON.parse(await readFile(path.join(dir,'hacksidian-manifest.json'),'utf8'));
  expect(manifest.custom).toBe('keep');expect(manifest.modules.slice(0,-1)).toEqual(old.modules);
  expect(await readFile(path.join(dir,'hacksidian-22-composition.css'),'utf8')).toBe('');
  for(const m of old.modules)expect(await readFile(path.join(dir,m.file),'utf8')).toBe('/* user CSS '+m.id+' */');
  expect(await migrateSnippetGroups(dir)).toEqual([]);
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('category manifest removes missing aliases and empty retired slots, preserving current CSS',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'hs-retired-'));
 try {
  const obsolete=[['meta','01-meta'],['interface','02-interface'],['note','03-note'],['list','11-list'],['pseudo-task','13-pseudo-task']].map(([id,file])=>({id:'g-'+id,component:id,file:'hacksidian-'+file+'.css'}));
  const old={...groupManifest,modules:[...groupManifest.modules,...obsolete]};
  await writeFile(path.join(dir,'hacksidian-manifest.json'),JSON.stringify(old));
  for(const m of groupManifest.modules)await writeFile(path.join(dir,m.file),'/* user CSS '+m.id+' */');
  for(const m of obsolete.slice(0,3))await writeFile(path.join(dir,m.file),'');
  await migrateSnippetGroups(dir);
  const manifest=JSON.parse(await readFile(path.join(dir,'hacksidian-manifest.json'),'utf8'));
  expect(manifest.modules).toEqual(groupManifest.modules);
  expect((await readdir(dir)).filter(f=>f.endsWith('.css')).sort()).toEqual(groupManifest.modules.map(m=>m.file).sort());
  const style=await readFileStyle(dir);
  for(const m of style.modules)expect(m.css).toBe('/* user CSS '+m.id+' */');
  expect(await migrateSnippetGroups(dir)).toEqual([]);
  const categories=(await readdir(path.resolve(import.meta.dirname,'../../content/atlas/! categories'))).filter(f=>f.endsWith('.md')&&!f.startsWith('!')).map(f=>f.slice(0,-3)).sort();
  expect(manifest.modules.map((m:{group:string})=>m.group).filter((group:string)=>!group.startsWith('plugin-')).sort()).toEqual(categories);
  await writeFile(path.join(dir,'hacksidian-manifest.json'),JSON.stringify(old));
  await writeFile(path.join(dir,obsolete[3].file),'ul { color: red; }');
  await expect(migrateSnippetGroups(dir)).rejects.toThrow('Retired snippet contains CSS');
  expect(await readFile(path.join(dir,'hacksidian-manifest.json'),'utf8')).toBe(JSON.stringify(old));
  expect(await readFile(path.join(dir,obsolete[3].file),'utf8')).toBe('ul { color: red; }');
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('renames nonempty pseudo-task CSS byte-for-byte, rejects conflicts and is idempotent',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'hs-taskplus-'));
 try {
  const current=groupManifest.modules.find(m=>m.id==='g-taskplus')!;
  const previous={id:'g-pseudo-task',component:'pseudo-task',file:'hacksidian-13-pseudo-task.css'};
  const old={...groupManifest,modules:groupManifest.modules.map(m=>m.id===current.id?previous:m)};
  const css='/* hacksidian:hack:pseudo-task-e11:start */\nli[data-task="/"] { color: red; }\n/* hacksidian:hack:pseudo-task-e11:end */\n';
  await writeFile(path.join(dir,'hacksidian-manifest.json'),JSON.stringify(old));
  for(const m of old.modules)await writeFile(path.join(dir,m.file),m.id===previous.id?css:'/* keep */');
  await writeFile(path.join(dir,current.file),'/* conflicting user CSS */');
  await expect(migrateSnippetGroups(dir)).rejects.toThrow('Conflicting renamed snippet');
  expect(await readFile(path.join(dir,previous.file),'utf8')).toBe(css);
  expect(await readFile(path.join(dir,'hacksidian-manifest.json'),'utf8')).toBe(JSON.stringify(old));
  await rm(path.join(dir,current.file));
  expect(await migrateSnippetGroups(dir)).toContain(current.file.slice(0,-4));
  expect(await readFile(path.join(dir,current.file),'utf8')).toBe(css);
  expect(await readdir(dir)).not.toContain(previous.file);
  for(const m of groupManifest.modules.filter(m=>m.id!==current.id))expect(await readFile(path.join(dir,m.file),'utf8')).toBe('/* keep */');
  expect(await migrateSnippetGroups(dir)).toEqual([]);
 }finally{await rm(dir,{recursive:true,force:true});}
});
