import {test,expect} from 'vitest';import fs from 'node:fs';import path from 'node:path';
import {compileHack,addHack} from '../src/hacks';import {readParameters,updateParameter} from '../src/parameters';import {parameterMarkdown} from '../src/parameter-variants';
const root=path.resolve(import.meta.dirname,'../../content/atlas/! hacks');
test('103 heading recipes support all six levels and preserve independent parameters',()=>{
 let count=0;
 for(const id of fs.readdirSync(root)){
  const dir=path.join(root,id);if(!fs.existsSync(path.join(dir,'hack.json')))continue;
  const spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));if(spec.group!=='heading')continue;
  const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  const p=readParameters(css).find(p=>p.label==='Уровень заголовка');
  if(!p){expect(['heading-e012','heading-e039','heading-e043','heading-anchor','heading-band','heading-hierarchy','heading-numbers','heading-rule','heading-sticky-heading']).toContain(id);continue;}count++;
  expect(p.options.map(o=>o.value)).toEqual(['h1','h2','h3','h4','h5','h6']);
  const others=readParameters(css).filter(x=>x.variable!==p.variable);
  for(let i=1;i<=6;i++){
   const selected=updateParameter(css,p.variable,'h'+i),hack={id,title:id,path:id+'.md',spec,css:selected};
   const compiled=compileHack(hack);expect(compiled).not.toContain('@hacksidian-');expect(compiled).not.toContain('markdown-source-view');expect(compiled).toContain('h'+i);
   expect(readParameters(selected).filter(x=>x.variable!==p.variable)).toEqual(others);
   const example=fs.readFileSync(path.join(dir,'markdown.md'),'utf8');expect(parameterMarkdown(example,selected)).toMatch(new RegExp('^'+ '#'.repeat(i)+'\\s','m'));
   const installed=addHack({format:1,modules:[{id:'g-heading',component:'heading',css:'/* keep */'}]},hack).style;expect(addHack(installed,hack).changed).toBe(false);
  }
 }
 expect(count).toBe(103);
});
test('native level variables and Obsidian wrappers follow the level; preview preserves fenced code',()=>{
 for(const id of ['heading-e001','heading-e037']){
  const css=fs.readFileSync(path.join(root,id,'recipe.css'),'utf8'),p=readParameters(css).find(p=>p.label==='Уровень заголовка')!;
  const selected=updateParameter(css,p.variable,'h6');
  const compiled=compileHack({id,title:id,path:id+'.md',spec:{format:2,hasCss:true,target:'g-heading'},css:selected});
  if(id==='heading-e001'){expect(compiled).toContain('--h6-size');expect(compiled).not.toContain('--h3-size');}
  else {expect(compiled).toContain('.el-h6');expect(compiled).not.toContain('.el-h2');}
  const hashes='#'.repeat(Number(p.default[1]));
  const markdown=`${hashes} Title\n\n\`\`\`md\n${hashes} Code\n\`\`\`\n`;
  expect(parameterMarkdown(markdown,selected)).toBe(`###### Title\n\n\`\`\`md\n${hashes} Code\n\`\`\`\n`);
 }
});
