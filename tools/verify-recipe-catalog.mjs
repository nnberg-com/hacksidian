// Read-only verification of the full single-source recipe pipeline.
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
const atlas=path.resolve(process.env.HACKSIDIAN_ATLAS_BUILD||path.join(repo,'build/atlas'));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'hacksidian-recipes-'));
try{
 buildSync({entryPoints:[path.join(repo,'plugin/src/hacks.ts')],bundle:true,platform:'node',format:'cjs',outfile:path.join(tmp,'hacks.cjs')});
 const {compileHack,addHack}=require(path.join(tmp,'hacks.cjs'));
 const counts={total:0,withCss:0,withoutCss:0,exactAtlasCopies:0,exactSnippetCopies:0,idempotentUpdates:0};
 for(const id of fs.readdirSync(root)){
  const dir=path.join(root,id);if(!fs.existsSync(path.join(dir,'hack.json')))continue;
  const spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));
  assert.equal(spec.format,2,id);
  const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  assert.equal(css.includes('{{'),false,id);assert.equal(css.includes('.callmered-coloring'),false,id);
  assert.equal(fs.readFileSync(path.join(atlas,'recipes',id,'recipe.css'),'utf8'),css,id);
  assert.equal(fs.readFileSync(path.join(atlas,'recipes',id,'snippet.css'),'utf8'),css,id);
  assert(fs.readFileSync(path.join(atlas,'recipes',id,'preview.html'),'utf8').includes(css),id);
  counts.total++;counts.exactAtlasCopies++;
  if(!spec.hasCss){counts.withoutCss++;assert.equal(css,'',id);continue;}
  counts.withCss++;
  const hack={id,spec,css,path:dir+'/'+id+'.md',title:id};
  assert.equal(compileHack(hack),css,id);
  const old={format:1,modules:[{id:spec.target,component:'test',css:'/* before */\n'+`/* hacksidian:hack:${id}:start */\n.old {}\n/* hacksidian:hack:${id}:end */\n`+'/* after */\n'}]};
  const next=addHack(old,hack);assert(next.changed,id);
  const start=`/* hacksidian:hack:${id}:start */\n`,end=`/* hacksidian:hack:${id}:end */`;
  assert.equal(next.style.modules[0].css.split(start)[1].split(end)[0],css,id);
  assert(next.style.modules[0].css.startsWith('/* before */\n'),id);
  assert(next.style.modules[0].css.endsWith('/* after */\n'),id);
  assert.equal(addHack(next.style,hack).changed,false,id);
  counts.exactSnippetCopies++;counts.idempotentUpdates++;
 }
 fs.writeFileSync(path.join(repo,'build/recipe-verification.json'),JSON.stringify(counts,null,2)+'\n');
 console.log(counts);
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
