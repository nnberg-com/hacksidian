import {test,expect} from 'vitest';
import {mkdtemp,writeFile,readFile,readdir,rm} from 'node:fs/promises';
import path from 'node:path';import {tmpdir} from 'node:os';
import {groupManifest,splitLegacyStyle} from '../src/snippet-groups';
import {migrateSnippetGroups} from '../src/snippets';
import {readFileStyle,writeFileStyle} from '../src/file-style';
const ids=['00-settings','10-reading','20-links-and-highlights','30-lists-and-tasks','40-quotes-and-callouts','50-tables','60-code','70-images','80-footnotes','90-hide-note-header'];
function fixture(){return {format:1 as const,modules:ids.map((id,i)=>({id:'m-'+id,component:id,css:i===0?'.markdown-preview-view.callmered-coloring {--cmr-color-text:#123;--cmr-gap:10px;}':i===4?'.markdown-preview-view.callmered-coloring blockquote {padding:var(--cmr-gap);color:var(--cmr-color-text)} .markdown-preview-view.callmered-coloring .callout {padding:var(--cmr-gap)}':'/* base */'}))};}
test('22 unique groups; shared palette but independent quote and callout parameters',()=>{
 expect(new Set(groupManifest.modules.map(m=>m.group)).size).toBe(22);
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
  expect(await migrateSnippetGroups(dir)).toHaveLength(22);
  expect(await readFileStyle(dir)).toEqual(splitLegacyStyle(before));expect(await migrateSnippetGroups(dir)).toEqual([]);
  expect(await readdir(dir)).not.toContain('hacksidian-00-settings.css');expect(await readFile(path.join(dir,'unrelated.css'),'utf8')).toBe('keep');
  const prior=fixture();prior.modules[0].css=prior.modules[0].css.replace('10px','20px');
  const next=splitLegacyStyle(prior),current=await readFileStyle(dir);
  await expect(writeFileStyle(dir,current,next)).rejects.toThrow('один CSS');
  await writeFileStyle(dir,current,next,true);expect(await readFileStyle(dir)).toEqual(next);
  await writeFileStyle(dir,next,current,true);expect(await readFileStyle(dir)).toEqual(current);
 }finally{await rm(dir,{recursive:true,force:true});}
});
