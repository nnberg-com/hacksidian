import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
const atlas=process.argv.find(v=>v.startsWith('--atlas='))?.slice(8)||'/Users/op/vaults/op/! P R O/hacksidian/atlas';
const apply=process.argv.includes('--apply'),renames=[],edits=[];
const names=new Map([['Default.css','default.css'],['Markdown.md','markdown.md']]);
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function visit(dir){const entries=fs.readdirSync(dir,{withFileTypes:true});
 for(const entry of entries){const file=path.join(dir,entry.name);if(entry.isDirectory()){visit(file);continue;}
  if(names.has(entry.name)){
   const name=names.get(entry.name);assert(!entries.some(e=>e.name===name),'Conflicting file: '+file);
   const temporary=file+'.hacksidian-case-rename';assert(!fs.existsSync(temporary));
   renames.push({from:file,to:path.join(dir,name),temporary,sha256:hash(file)});
  }
  // Historical provenance is kept verbatim; references in active metadata move.
  if(entry.name==='provenance.json'||! /\.(md|base|json)$/.test(entry.name))continue;
  const text=fs.readFileSync(file,'utf8');const next=text.replaceAll('Default.css','default.css').replaceAll('Markdown.md','markdown.md');
  if(text!==next)edits.push({file,text:next});
 }
}
visit(atlas);
if(apply){
 for(const {file,text}of edits)fs.writeFileSync(file,text);
 for(const item of renames){fs.renameSync(item.from,item.temporary);fs.renameSync(item.temporary,item.to);assert.equal(hash(item.to),item.sha256,'Rename changed content: '+item.to);}
 fs.writeFileSync('/private/tmp/hacksidian-lowercase-card-files.json',JSON.stringify({renames,updatedReferences:edits.length},null,2));
}
console.log(JSON.stringify({apply,defaultFiles:renames.filter(r=>r.to.endsWith('/default.css')).length,markdownFiles:renames.filter(r=>r.to.endsWith('/markdown.md')).length,updatedReferences:edits.length}));
