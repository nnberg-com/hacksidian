import {expect, test} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import {readParameters, updateParameter} from '../src/parameters';
import {resolveParameterVariants} from '../src/parameter-variants';
import {scopeLiveExample} from '../src/live-example-css';
import {compileHack} from '../src/hacks';
const directory=path.resolve(import.meta.dirname,'../../content/atlas/! hacks/image-e010');
const css=fs.readFileSync(path.join(directory,'recipe.css'),'utf8');
const variable='--hacksidian-image-e010-filename';
test('image source filter compiles identically for preview and exported recipe, including empty input',()=>{
 for(const input of ['', 'screenshot', 'Screenshot', 'a"b\\c', 'x"] , body { color: red; } /*']){
  const selected=updateParameter(css,variable,input);
  const compiled=compileHack({id:'image-e010',title:'crop',path:directory+'/image-e010.md',spec:JSON.parse(fs.readFileSync(path.join(directory,'hack.json'),'utf8')),css:selected});
  expect(compiled).toBe(resolveParameterVariants(selected));
  for(const output of [compiled,scopeLiveExample(selected,'hacksidian-live-test')]){
   expect(output).not.toContain('@hacksidian-image-source');
   expect(output).not.toContain(':--hacksidian-image-source');
   const attributes:selectorParser.Attribute[]=[];
   postcss.parse(output).walkRules(r=>{selectorParser().astSync(r.selector).walkAttributes(a=>{if(a.attribute==='src') attributes.push(a);});});
   expect(attributes).toHaveLength(input ? 1 : 0);
   if(input){expect(attributes[0].value).toBe(input);expect(attributes[0].operator).toBe('*=');expect(attributes[0].insensitive).toBe(true);}
  }
 }
});
test('image filter rejects invalid parameter and placeholder contracts',()=>{
 for(const bad of [css.replace('@hacksidian-image-source '+variable,'@hacksidian-image-source --missing'),css.replace('img:--hacksidian-image-source','div:--hacksidian-image-source'),css.replace('img:--hacksidian-image-source','img'),css.replace('img:--hacksidian-image-source','img:--hacksidian-image-source(foo)')])expect(()=>resolveParameterVariants(bad)).toThrow();
});
test('image parameters round trip numeric limits and color values',()=>{
 const root=path.dirname(directory);
 for(const id of ['image-e010','image-e027','image-e020']){
  const source=fs.readFileSync(path.join(root,id,'recipe.css'),'utf8');
  for(const p of readParameters(source)){
   const values=p.type==='number'?[String(p.min),String(p.max),String(Number(p.min)+Number(p.step))]:p.type==='color'?['#123abc']:['','lake'];
   for(const input of values){const updated=updateParameter(source,p.variable,input);expect(()=>resolveParameterVariants(updated)).not.toThrow();expect(readParameters(updated).find(q=>q.variable===p.variable)?.value).toBe(p.type==='text'?JSON.stringify(input):input+p.unit);}
  }
 }
});
