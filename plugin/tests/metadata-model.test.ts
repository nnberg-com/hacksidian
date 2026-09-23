import {test,expect} from 'vitest';
import fs from 'node:fs';import path from 'node:path';
import {metadataDocument} from '../src/metadata-model';
import {liveExampleIssue} from '../src/live-example-css';
const root=path.resolve(import.meta.dirname,'../../content/atlas/! hacks');
test('all 48 metadata cards have isolated simulations using current recipes',()=>{
 const ids=fs.readdirSync(root).filter(id=>id.startsWith('metadata-'));expect(ids).toHaveLength(48);
 for(const id of ids){
  const dir=path.join(root,id),model=fs.readFileSync(path.join(dir,'Model.ru.html'),'utf8');
  const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  expect(liveExampleIssue('metadata','',css,model),id).toBeNull();
  const on=metadataDocument(model,css,{'--text-normal':'#123456'}),off=metadataDocument(model,'',{'--text-normal':'#123456'});
  expect(on,id).toContain('--text-normal:#123456');
  expect(on,id).toContain('default-src');expect(on,id).not.toContain('href="Model.css"');
  expect(on,id).not.toBe(off);
  expect(fs.readFileSync(path.join(dir,id+'.md'),'utf8'),id).toContain('```hacksidian-live\n'+id+'\n```');
 }
});
test('missing model bodies and executable model content fail explicitly',()=>{
 expect(()=>metadataDocument('', '',{})).toThrow('no body');
 expect(()=>metadataDocument('<body><script>alert(1)</script></body>','',{})).toThrow('active content');
 expect(()=>metadataDocument('<body><input onclick="alert(1)"></body>','',{})).toThrow('active content');
});
