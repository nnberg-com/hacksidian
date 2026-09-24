import {test,expect} from 'vitest';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {groupManifest} from '../src/snippet-groups';
import {categoryPage} from '../src/category-page';
import {migrateSnippetGroups} from '../src/snippets';
import {readFileStyle,writeFileStyle} from '../src/file-style';
import {addHack,removeHack} from '../src/hacks';
import {readParameters,updateParameter} from '../src/parameters';
import {scopeLiveExample} from '../src/live-example-css';
const id='plugin-horizontal-blocks-plain';
const root=path.resolve(import.meta.dirname,'../../content/atlas');

test('plugin collection resolves to its page and adds only its own snippet on migration',async()=>{
 expect(categoryPage('plugin-horizontal-blocks')).toBe('! plugins/horizontal-blocks.md');
 expect(categoryPage('quote')).toBe('! categories/quote.md');
 expect(await readFile(path.join(root,categoryPage('plugin-horizontal-blocks')),'utf8')).toContain('```hacksidian-category\nplugin-horizontal-blocks\n```');
 const dir=await mkdtemp(path.join(tmpdir(),'hs-plugin-group-'));
 try {
  const old={...groupManifest,custom:'keep',modules:groupManifest.modules.filter(m=>!m.group.startsWith('plugin-'))};
  await writeFile(path.join(dir,'hacksidian-manifest.json'),JSON.stringify(old));
  for(const m of old.modules)await writeFile(path.join(dir,m.file),'/* user CSS '+m.id+' */');
  // Preserve an existing file even when it has not yet been registered in the manifest.
  await writeFile(path.join(dir,'hacksidian-plugin-horizontal-blocks.css'),'/* existing plugin styles */');
  await migrateSnippetGroups(dir);
  expect(await readFile(path.join(dir,'hacksidian-plugin-horizontal-blocks.css'),'utf8')).toBe('/* existing plugin styles */');
  expect(JSON.parse(await readFile(path.join(dir,'hacksidian-manifest.json'),'utf8')).custom).toBe('keep');
  const directory=path.join(root,'! hacks',id);
  const css=await readFile(path.join(directory,'recipe.css'),'utf8');
  const spec=JSON.parse(await readFile(path.join(directory,'hack.json'),'utf8'));
  const hack={id,title:id,path:directory+'/'+id+'.md',spec,css};
  const before=await readFileStyle(dir),applied=addHack(before,hack).style;
  await writeFileStyle(dir,before,applied);
  expect((await readFileStyle(dir)).modules.find(m=>m.id===spec.target)!.css).toContain(css);
  for(const m of old.modules)expect(await readFile(path.join(dir,m.file),'utf8')).toBe('/* user CSS '+m.id+' */');
  expect(addHack(applied,hack).changed).toBe(false);
  expect(removeHack(applied,id).style.modules.find(m=>m.id===spec.target)!.css.trim()).toBe('/* existing plugin styles */');
  expect(await migrateSnippetGroups(dir)).toEqual([]);
 } finally {await rm(dir,{recursive:true,force:true});}
});

test('column reset exposes only gap, including zero, and can be scoped to a live example',async()=>{
 const css=await readFile(path.join(root,'! hacks',id,'recipe.css'),'utf8');
 const params=readParameters(css);
 expect(params).toHaveLength(1);
 expect(params[0].variable).toBe('--hacksidian-horizontal-blocks-gap');
 for(const value of ['0','24','200']){
  const changed=updateParameter(css,params[0].variable,value);
  expect(readParameters(changed)[0].value).toBe(value+'px');
  expect(scopeLiveExample(changed,'hacksidian-live-plugin-test')).toContain('#hacksidian-live-plugin-test');
 }
});
