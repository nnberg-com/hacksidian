// Read-only inventory. Capability checks are not a visual acceptance test.
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const require=createRequire(path.join(repo,'plugin/package.json'));const {buildSync}=require('esbuild');
const root=path.join(process.argv[2]||'/Users/op/vaults/op/! P R O/hacksidian/atlas','! hacks');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'hacksidian-live-audit-'));
try {
 buildSync({entryPoints:[path.join(repo,'plugin/src/live-example-css.ts')],bundle:true,platform:'node',format:'cjs',outfile:path.join(tmp,'check.cjs')});
 const {liveExampleIssue}=require(path.join(tmp,'check.cjs'));const rows=[];
 for(const rel of fs.readdirSync(root,{recursive:true})){
  if(!rel.endsWith('/hack.json'))continue;const dir=path.join(root,path.dirname(rel)),id=path.basename(dir),card=path.join(dir,id+'.md');if(!fs.existsSync(card))continue;
  const s=fs.readFileSync(card,'utf8'),spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'))),md=path.join(dir,'markdown.md'),css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');
  const model=fs.existsSync(path.join(dir,'Model.ru.html'))?fs.readFileSync(path.join(dir,'Model.ru.html'),'utf8'):undefined;
  const issue=!spec.hasCss?'theme-native':spec.group==='metadata'&&model?liveExampleIssue(spec.group,'',css,model):!fs.existsSync(md)?'missing-markdown':liveExampleIssue(spec.group,fs.readFileSync(md,'utf8'),css);
  const present=s.includes('```hacksidian-live');
  let status=present?(issue?'broken-block':'supported-not-visually-verified'):!issue?'missing-block':issue==='theme-native'?'not-adapted':/печати|Части интерфейса|моделью редактора|page sizing/.test(issue)?'outside-inline-preview':'preview-not-implemented';
  rows.push({id,path:path.relative(root,card),present,status,issue});
 }
 const counts={};for(const r of rows)counts[r.status]=(counts[r.status]||0)+1;
 const report={scope:'All technique directories including nested cards; source capability only, not DOM/visual verification',counts,rows};
 const output=process.argv[3]||path.join(repo,'build/live-example-audit.json');fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({counts,report:output}));
} finally {fs.rmSync(tmp,{recursive:true,force:true});}
