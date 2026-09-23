import {test,expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {compileHack,addHack} from '../src/hacks';
import {readParameters,updateParameter} from '../src/parameters';
import {scopeLiveExample} from '../src/live-example-css';
const ids=[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27].map(n=>'emphasis-s'+String(n).padStart(2,'0'));
const root=path.resolve(import.meta.dirname,'../../content/atlas/! hacks');
test('all 23 recipes compile three targets with identical styling in Preview only',()=>{
 for(const id of ids){
  const css=fs.readFileSync(path.join(root,id,'recipe.css'),'utf8'),spec=JSON.parse(fs.readFileSync(path.join(root,id,'hack.json'),'utf8'));
  const p=readParameters(css).find(p=>p.label==='Применить к…')!;
  expect(p.options.map(o=>o.value)).toEqual(['bold','italic','highlight']);
  let canonical:string|undefined;
  for(const [choice,tag] of Object.entries({bold:'strong',italic:'em',highlight:'mark'})){
   const selected=updateParameter(css,p.variable,choice),hack={id,css:selected,spec,title:id,path:id+'.md'};
   const compiled=compileHack(hack);expect(compiled).not.toContain('@hacksidian');expect(compiled).not.toContain(':--hacksidian-target');expect(compiled).not.toContain('markdown-source-view');
   expect(compiled).toContain('.markdown-preview-view '+tag);
   const normalized=compiled.replace(`${p.variable}: ${choice}`,`${p.variable}: TARGET`).replace(new RegExp('\\b'+tag+'(?=\\s*[:{,])','g'),'TARGET');
   if(canonical)expect(normalized,id).toBe(canonical);else canonical=normalized;
   const scoped=scopeLiveExample(selected,'hacksidian-live-target');expect(scoped).toContain('#hacksidian-live-target '+tag);
   const old={format:1 as const,modules:[{id:'g-emphasis',component:'emphasis',css:'/* preserved */'}]};
   const next=addHack(old,hack).style;expect(addHack(next,hack).changed).toBe(false);expect(next.modules[0].css).toContain('/* preserved */');
  }
 }
});
test('target and independent visual parameters coexist and invalid target options fail',()=>{
 const css=`.markdown-preview-view {
 /**\n * @parameter Target\n * @type select\n * @default bold\n * @option bold | Bold\n * @option italic | Italic\n */
 --hacksidian-target: bold;
 /**\n * @parameter Gap\n * @type number\n * @default 2px\n * @unit px\n */
 --hacksidian-gap: 2px;
 }
 @hacksidian-target --hacksidian-target { .markdown-preview-view :--hacksidian-target {letter-spacing:var(--hacksidian-gap)} }`;
 const h=(css:string)=>({id:'test',title:'test',path:'test.md',spec:{format:2,hasCss:true,target:'g-emphasis'},css});
 const changed=updateParameter(updateParameter(css,'--hacksidian-target','italic'),'--hacksidian-gap','3');
 expect(compileHack(h(changed))).toContain('.markdown-preview-view em');
 expect(compileHack(h(changed))).toContain('--hacksidian-gap: 3px');
 expect(()=>compileHack(h(css.replaceAll('bold','body')))).toThrow();
 expect(()=>compileHack(h(css.replace(':--hacksidian-target','a')))).toThrow();
});
