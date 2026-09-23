import {test,expect} from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {readParameters,updateParameter} from '../src/parameters';
import {techniqueEntry} from '../src/catalog';
const repo=path.resolve(import.meta.dirname,'../..');
test('both generators preserve a saved choice, are idempotent and reject removed choices',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'hacksidian-generators-'));
 try{
  fs.mkdirSync(path.join(root,'tools'),{recursive:true});
  fs.copyFileSync(path.join(repo,'tools/parameterized-recipes.mjs'),path.join(root,'tools/parameterized-recipes.mjs'));
  fs.mkdirSync(path.join(root,'content/atlas/! categories'),{recursive:true});fs.mkdirSync(path.join(root,'content/playground'),{recursive:true});
  for(const [folder,id] of [['text-systems','text-system'],['palettes','palette']]){
   fs.cpSync(path.join(repo,'tools',folder),path.join(root,'tools',folder),{recursive:true});
   const run=()=>execFileSync(process.execPath,[path.join(root,'tools',folder,'build.mjs')],{stdio:'pipe'});
   run();const file=path.join(root,'content/atlas/! hacks',id,'recipe.css');let css=fs.readFileSync(file,'utf8');const p=readParameters(css)[0];
   css=updateParameter(css,p.variable,p.options[1].value);fs.writeFileSync(file,css);run();expect(fs.readFileSync(file,'utf8')).toBe(css);
   fs.writeFileSync(file,css.replace(`${p.variable}: ${p.options[1].value};`,`${p.variable}: missing;`));expect(run).toThrow();
  }
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('unified catalogue descriptions retain searchable option names',()=>{
 for(const id of ['text-system','palette']){
  const dir=path.join(repo,'content/atlas/! hacks',id),css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  const entry=techniqueEntry(`atlas/! hacks/${id}/${id}.md`,fs.readFileSync(path.join(dir,id+'.md'),'utf8'),{title:id},{hasCss:true},css);
  for(const option of readParameters(css)[0].options)expect(entry.text).toContain(option.label);
 }
});
