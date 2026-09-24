import {test,expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {readParameters,updateParameter} from '../src/parameters';
import {scopeLiveExample} from '../src/live-example-css';
import {compileHack,addHack} from '../src/hacks';
const root=path.resolve(import.meta.dirname,'../../content/atlas/! hacks');
function hack(id:string){const dir=path.join(root,id);return {id,title:id,path:dir+'/'+id+'.md',spec:JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8')),css:fs.readFileSync(path.join(dir,'recipe.css'),'utf8')};}
test('float compiles independent filename choices in preview and installed CSS',()=>{
 const h=hack('image-float');
 for(const [left,right] of [['left','right'],['portrait','landscape'],['','right'],['x"y','a\\b']]){
  h.css=updateParameter(updateParameter(h.css,'--hacksidian-image-float-left',left),'--hacksidian-image-float-right',right);
  const compiled=compileHack(h),preview=scopeLiveExample(h.css,'hacksidian-live-test');
  for(const css of [compiled,preview]){expect(css).not.toContain('@hacksidian-image-source');expect(css).not.toContain(':--hacksidian-image-source');expect(css).toContain('float: left');expect(css).toContain('float: right');}
  expect(compiled).toContain('@media (min-width:430px)');expect(preview).toContain('@container preview (min-width:430px)');
 }
});
test('filter variants compile and explicit application replaces legacy blocks while preserving other CSS',()=>{
 const h=hack('image-filter'),parameter=readParameters(h.css)[0];
 expect(parameter.options).toHaveLength(9);
 for(const option of parameter.options){const css=updateParameter(h.css,parameter.variable,option.value);expect(()=>scopeLiveExample(css,'hacksidian-live-test')).not.toThrow();expect(compileHack({...h,css})).not.toContain('@hacksidian');}
 const old={format:1 as const,modules:[{id:'g-image',component:'image',css:'.mine { color: red; }\n'+h.spec.replaces.map((id:string)=>`/* hacksidian:hack:${id}:start */\nimg {filter:none}\n/* hacksidian:hack:${id}:end */\n`).join('')}]};
 const result=addHack(old,h);
 expect(result.changed).toBe(true);expect(result.style.modules[0].css).toContain('.mine { color: red; }');
 for(const id of h.spec.replaces)expect(result.style.modules[0].css).not.toContain(`hacksidian:hack:${id}:`);
 expect(addHack(result.style,h).changed).toBe(false);
});
test('filter expanded page covers every option exactly once',()=>{
 const h=hack('image-filter');
 const page=fs.readFileSync(path.join(root,'image-filter/expanded.md'),'utf8');
 const values=[...page.matchAll(/```hacksidian-expanded\n([^\n]+)\n```/g)].map(m=>JSON.parse(m[1])['--hacksidian-image-filter-choice']);
 expect(values).toEqual(readParameters(h.css)[0].options.map(o=>o.value));
});
test('imagelist migration removes only the declared old image recipe',()=>{
 const ids=fs.readdirSync(root).filter(id=>id.startsWith('imagelist-'));
 expect(ids).toHaveLength(9);
 for(const id of ids){
  const h=hack(id),old=h.spec.replaces[0];
  const style={format:1 as const,modules:[{id:'g-image',component:'image',css:`.keep {}\n/* hacksidian:hack:${old}:start */\nimg {}\n/* hacksidian:hack:${old}:end */\n`},{id:'g-imagelist',component:'imagelist',css:''}]};
  const result=addHack(style,h).style;
  expect(result.modules[0].css).toContain('.keep {}');expect(result.modules[0].css).not.toContain(old);
  expect(result.modules[1].css).toContain(`hacksidian:hack:${id}:start`);
  expect(addHack(result,h).changed).toBe(false);
 }
});
