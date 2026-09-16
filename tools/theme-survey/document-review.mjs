import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const project=path.resolve(new URL('../..',import.meta.url).pathname),dir=path.join(project,'docs/research/theme-survey');
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name)));
const coverage=read('coverage.json'),findings=read('findings.json'),previous=read('documentation-review.json');
const sha=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const results=coverage.map(t=>{
 const local=path.join('/tmp/hacksidian-theme-survey',t.slug),prior=previous.find(p=>p.theme===t.slug);
 return {...prior,theme:t.slug,commit:t.commit,status:'source-review-complete',primarySha256:sha(path.join(local,t.primary)),documents:t.docs.map(d=>{
  const p=path.join(local,d.file),name=d.file.toLowerCase();
  return {file:d.file,sha256:sha(p),lines:fs.readFileSync(p,'utf8').split('\n').length,role:/issue_template|pull_request|license|contributing|code_of_conduct/.test(name)?'repository-administration':/changelog|changes|history|old_readme/.test(name)?'history':'theme-description-or-guide'};
 }),techniques:[...new Set(findings.filter(f=>f.theme===t.slug).map(f=>f.id))].sort(),outcomes:t.settings.reduce((a,s)=>(a[s.disposition]=(a[s.disposition]??0)+1,a),{})};
});
fs.writeFileSync(path.join(dir,'documentation-review.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify({themes:results.length,documents:results.reduce((n,t)=>n+t.documents.length,0)}));
