// Read-only verification of source recipes and their snippet compilation.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(path.join(repo,'plugin/package.json'));
const {buildSync}=require('esbuild');
const root=path.join(process.env.HACKSIDIAN_ATLAS||'/Users/op/vaults/op/! P R O/hacksidian/atlas','! hacks');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'hacksidian-recipes-'));
try{
 buildSync({entryPoints:[path.join(repo,'plugin/src/hacks.ts')],bundle:true,platform:'node',format:'cjs',outfile:path.join(tmp,'hacks.cjs')});
 const {compileHack,addHack}=require(path.join(tmp,'hacks.cjs'));
 const counts={total:0,withCss:0,withoutCss:0,exactSnippetCopies:0,resolvedParameterRecipes:0,idempotentUpdates:0};
 for(const id of fs.readdirSync(root)){
  const dir=path.join(root,id);if(!fs.existsSync(path.join(dir,'hack.json')))continue;
  const spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));
  assert.equal(spec.format,2,id);
  const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  assert.equal(css.includes('{{'),false,id);assert.equal(css.includes('.callmered-coloring'),false,id);
  counts.total++;
  if(!spec.hasCss){counts.withoutCss++;assert.equal(css,'',id);continue;}
  counts.withCss++;
  const hack={id,spec,css,path:dir+'/'+id+'.md',title:id};
  const compiled=compileHack(hack);
  if (!/@hacksidian-(?:variants|target|heading)\b/.test(css)) assert.equal(compiled,css,id);
  assert(!/@hacksidian-(?:variants|target|heading)\b/.test(compiled),id);
  const old={format:1,modules:[{id:spec.target,component:'test',css:'/* before */\n'+`/* hacksidian:hack:${id}:start */\n.old {}\n/* hacksidian:hack:${id}:end */\n`+'/* after */\n'}]};
  const next=addHack(old,hack);assert(next.changed,id);
  const start=`/* hacksidian:hack:${id}:start */\n`,end=`/* hacksidian:hack:${id}:end */`;
  assert.equal(next.style.modules[0].css.split(start)[1].split(end)[0],compiled,id);
  assert(next.style.modules[0].css.startsWith('/* before */\n'),id);
  assert(next.style.modules[0].css.endsWith('/* after */\n'),id);
  assert.equal(addHack(next.style,hack).changed,false,id);
  if (compiled===css) counts.exactSnippetCopies++; else counts.resolvedParameterRecipes++;
  counts.idempotentUpdates++;
 }
 fs.mkdirSync(path.join(repo,'build'),{recursive:true});
 fs.writeFileSync(path.join(repo,'build/recipe-verification.json'),JSON.stringify(counts,null,2)+'\n');
 console.log(counts);
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
