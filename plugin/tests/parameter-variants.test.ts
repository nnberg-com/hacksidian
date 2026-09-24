import { expect, test } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import { compileHack, addHack, hasHack } from '../src/hacks';
import { readParameters, updateParameter } from '../src/parameters';
import { parameterExample, parseExpandedValues, resolveParameterVariants } from '../src/parameter-variants';
import { scopeLiveExample } from '../src/live-example-css';
const root=path.resolve(import.meta.dirname,'../../content/atlas/! hacks');
const read=(id:string)=>fs.readFileSync(path.join(root,id,'recipe.css'),'utf8');
test('all ten systems compile to the identical selector structure and define every heading',()=>{
 const css=read('text-system'), p=readParameters(css)[0];
 expect(p.options).toHaveLength(10);
 let structure:string[]|undefined;
 for(const option of p.options){
  const selected=updateParameter(css,p.variable,option.value);
  const compiled=resolveParameterVariants(selected), tree=postcss.parse(compiled), selectors:string[]=[];
  tree.walkRules(r=>{selectors.push(r.selector);});
  if(structure)expect(selectors).toEqual(structure);else structure=selectors;
  expect(compiled).not.toContain('@hacksidian');
  for(let h=1;h<=6;h++){
   for(const prop of ['size','line-height','weight','style'])expect(compiled).toContain(`--h${h}-${prop}:`);
   expect(compiled).toContain(`.HyperMD-header-${h}`);
   expect(compiled).toContain(`--hacksidian-text-system-h${h}-before:`);
   expect(compiled).toContain(`--hacksidian-text-system-h${h}-after:`);
  }
  expect(compiled).not.toMatch(/font-family\s*:/);
  expect(scopeLiveExample(selected,'hacksidian-live-test')).not.toContain('.markdown-source-view');
 }
});
test('expanded examples validate ordinary parameters without changing source or another example',()=>{
 const css=updateParameter(read('text-system'),'--hacksidian-text-system-choice','uswds'),p=readParameters(css)[0];
 const a=parameterExample(css,{[p.variable]:'carbon'}),b=parameterExample(css,{[p.variable]:'primer'});
 expect(readParameters(css)[0].value).toBe('uswds');
 expect(readParameters(a)[0].value).toBe('carbon');expect(readParameters(b)[0].value).toBe('primer');
 expect(()=>parameterExample(css,{[p.variable]:'invented'})).toThrow();
 expect(()=>parameterExample(css,{'--hacksidian-unknown':'2'})).toThrow();
 for(const raw of ['[]','null','{}','{"--hacksidian-x":2}','{"path":"../../other"}'])expect(()=>parseExpandedValues(raw)).toThrow();
 const ordinary=read('quote-dashed'),params=readParameters(ordinary);
 const values=Object.fromEntries(params.map(p=>[p.variable,p.options.length?p.options[0].value:'4']));
 expect(readParameters(parameterExample(ordinary,values))).toHaveLength(params.length);
});
test('value tables reject incomplete schemas, duplicate choices and executable structure',()=>{
 const css=read('text-system');
 for(const bad of [
  css.replace('@variant carbon','@variant unknown'),
  css.replace('@variant dmk','@variant carbon'),
  css.replace('--hacksidian-text-system-h1-size:', '--hacksidian-typo:'),
  css.replace('--hacksidian-text-system-h1-size:', 'font-size:'),
  css.replace('@variant carbon {','@variant carbon { body {color:red;}'),
  css.replace('@variant carbon {','@variant carbon { @import "evil";'),
 ])expect(()=>resolveParameterVariants(bad)).toThrow();
});
test('applying unified technique removes legacy blocks only on explicit apply and preserves handwritten CSS',()=>{
 const id='text-system',spec=JSON.parse(fs.readFileSync(path.join(root,id,'hack.json'),'utf8'));
 const original={format:1 as const,modules:[{id:'g-text',component:'text',css:'/* hand */\n/* hacksidian:hack:text-system-carbon:start */\n.old {}\n/* hacksidian:hack:text-system-carbon:end */\n/* tail */'},{id:'g-link',component:'link',css:'.mine {}'}]};
 const hack={id,title:id,path:id,spec,css:read(id)};
 const next=addHack(original,hack).style;
 expect(hasHack(original,'text-system-carbon')).toBe(true);expect(hasHack(next,'text-system-carbon')).toBe(false);
 expect(next.modules[0].css).toContain('/* hand */');expect(next.modules[0].css).toContain('/* tail */');expect(next.modules[1]).toBe(original.modules[1]);
 expect(next.modules[0].css).toContain(compileHack(hack));expect(addHack(next,hack).changed).toBe(false);
});
test('expanded pages enumerate the complete current options without becoming additional cards',()=>{
 for(const id of ['text-system','palette']){
  const css=read(id),p=readParameters(css)[0],page=fs.readFileSync(path.join(root,id,'expanded.md'),'utf8');
  const values=[...page.matchAll(/```hacksidian-expanded\n([^`]+)```/g)].map(m=>parseExpandedValues(m[1]));
  expect(values.map(v=>v[p.variable]).sort()).toEqual(p.options.map(o=>o.value).sort());
  expect(page).not.toContain('hacksidian_technique');
  for(const v of values)expect(()=>resolveParameterVariants(parameterExample(css,v))).not.toThrow();
 }
});
test('legacy migration rejects damaged ownership and foreign modules without mutating input',()=>{
 const id='text-system',spec=JSON.parse(fs.readFileSync(path.join(root,id,'hack.json'),'utf8'));
 const hack={id,title:id,path:id,spec,css:read(id)};
 for(const modules of [
  [{id:'g-text',component:'text',css:'/* hacksidian:hack:text-system-carbon:start */\n.broken{}'}],
  [{id:'g-text',component:'text',css:''},{id:'g-other',component:'other',css:'/* hacksidian:hack:text-system-carbon:start */\n.old{}\n/* hacksidian:hack:text-system-carbon:end */'}],
 ]){
  const original={format:1 as const,modules};const before=JSON.stringify(original);
  expect(()=>addHack(original,hack)).toThrow();expect(JSON.stringify(original)).toBe(before);
 }
});
