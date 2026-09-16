throw new Error('Retired: technique cards are maintained as Markdown. This command would recreate technical files or overwrite authored content.');
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {parse,stringify} from '../plugin/node_modules/yaml/dist/index.js';
import {formatCard,normalizeTag} from './card-format.mjs';
const atlas=process.argv.find(x=>x.startsWith('--atlas='))?.slice(8)||'/Users/op/vaults/op/! P R O/hacksidian/atlas';
const apply=process.argv.includes('--apply');
const changes=[],renames=[],before={};const hash=s=>createHash('sha256').update(s).digest('hex');
const report={cards:0,renamedSamples:0,updatedFiles:0,sourceLists:{},cssHashes:{},sampleHashes:{}};
function write(file,text){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==text){changes.push([file,text]);before[file]=fs.existsSync(file)?fs.readFileSync(file,'utf8'):null;}}
function visit(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())visit(file);else{
 if(entry.name==='Markdown.ru.md'){
  const dest=path.join(dir,'markdown.md');if(fs.existsSync(dest))throw Error('Sample destination exists: '+dest);
  report.sampleHashes[dest]=hash(fs.readFileSync(file));renames.push([file,dest]);report.renamedSamples++;
 }
 if(!/\.(md|base)$/.test(entry.name))continue;
 let text=fs.readFileSync(file,'utf8');
 const isCard=path.basename(dir)===entry.name.slice(0,-3)&&file.includes(path.sep+'! hacks'+path.sep);
 if(isCard){
  const meta=parse(text.match(/^---\n([\s\S]*?)\n---/)?.[1]??'')??{};
  if(!(meta.tags??[]).some(t=>['atlas/technique','hacksidian_technique'].includes(t)))continue;
  report.cards++;report.sourceLists[file]=meta.sources??[];
  const css=path.join(dir,'recipe.css');if(fs.existsSync(css))report.cssHashes[css]=hash(fs.readFileSync(css));
  const history=path.join(dir,'provenance.json');const previous=fs.existsSync(history)?JSON.parse(fs.readFileSync(history,'utf8')):{};
  const result=formatCard(text,previous);text=result.markdown;
  write(history,JSON.stringify(result.provenance,null,2)+'\n');
 }else{
  const m=text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if(m){const meta=parse(m[1]);if(Array.isArray(meta?.tags)&&meta.tags.some(t=>/^#?atlas\//.test(t))){meta.tags=meta.tags.map(normalizeTag);text='---\n'+stringify(meta,{lineWidth:0})+'---'+text.slice(m[0].length);}}
 }
 text=text.replaceAll('Markdown.ru.md','markdown.md').replaceAll('Markdown.ru|','Markdown|').replace(/(FROM #|file\.hasTag\(")atlas\/([^"\s)]+)/g,(_,prefix,suffix)=>prefix+'hacksidian_'+suffix.replaceAll('/','_'));
 if(file.endsWith('/! themes/themes.base'))text=text.replace('list(note["Встречается в темах"]).contains(this.file.asLink())','list(themes).contains(this.file.name)');
 write(file,text);
}}}
visit(atlas);report.updatedFiles=changes.length;
if(apply){
 fs.writeFileSync('/private/tmp/hacksidian-card-format-before-'+Date.now()+'.json',JSON.stringify({before,renames,report}));
 for(const [file,text]of changes)fs.writeFileSync(file,text);
 for(const [file,dest]of renames)fs.renameSync(file,dest);
}
fs.writeFileSync('/private/tmp/hacksidian-card-format-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({apply,cards:report.cards,renamedSamples:report.renamedSamples,updatedFiles:report.updatedFiles}));
