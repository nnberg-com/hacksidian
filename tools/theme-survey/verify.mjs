import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {parse} from '../../plugin/node_modules/yaml/dist/index.js';
const project=path.resolve(new URL('../..',import.meta.url).pathname),dir=path.join(project,'docs/research/theme-survey');
const atlas=process.argv[2]||'/Users/op/vaults/op/! P R O/hacksidian/atlas';
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name)));
const findings=read('findings.json'),coverage=read('coverage.json'),decisions=read('decisions.json'),baseline=read('original-sources.json');
assert.equal(coverage.length,100);assert.equal(read('remaining.json').length,0);assert.equal(decisions.length,1266);
assert.equal(new Set(decisions.map(d=>d.theme+'|'+d.setting)).size,decisions.length);
const metadata=new Map();let sourcesChecked=0,newCards=0,linkedCards=0,totalLinks=0,anchors=0;
for(const id of fs.readdirSync(path.join(atlas,'! hacks'))){
 const p=path.join(atlas,'! hacks',id,id+'.md');if(!fs.existsSync(p))continue;
 const text=fs.readFileSync(p,'utf8'),meta=parse(text.match(/^---\n([\s\S]*?)\n---/)[1]);metadata.set(id,meta);
 if(id in baseline){assert.deepEqual(meta.sources??[],baseline[id],id+' changed original sources');sourcesChecked++;}
 if(meta.research==='theme-survey-2026-09-16'){
  newCards++;assert.equal(meta.implementation,'theme-native');assert.equal(meta.verification,'source-only');
  assert.equal(JSON.parse(fs.readFileSync(path.join(atlas,'! hacks',id,'hack.json'))).hasCss,false);
  assert.equal(fs.readFileSync(path.join(atlas,'! hacks',id,'recipe.css'),'utf8'),'');
 }
 if(meta.themes?.length){linkedCards++;totalLinks+=meta.themes.length;}
 for(const link of meta.themes??[]){
  assert(/^[a-z0-9][a-z0-9_-]*$/.test(link),id+' malformed theme code');assert(fs.existsSync(path.join(atlas,'! themes',link+'.md')),id+' missing theme');
 }
}
assert.equal(sourcesChecked,1388);assert.equal(newCards,new Set(findings.filter(f=>!f.existing).map(f=>f.id)).size);
const byTheme=new Map(coverage.map(t=>[t.slug,t]));
for(const f of findings){
 const meta=metadata.get(f.id);assert(meta,'missing '+f.id);assert(meta.themes.includes(f.theme),f.id+' missing '+f.theme);
 const t=byTheme.get(f.theme);assert.equal(f.commit,t.commit);if(!f.existing){assert(meta.sources.includes(f.source));assert(meta.sources.includes(f.implementation));}
 for(const link of [f.source,f.implementation]){
  const prefix=`https://github.com/${t.repo}/blob/${t.commit}/`;assert(link.startsWith(prefix),link);
  const [file,anchor]=link.slice(prefix.length).split('#L'),p=path.join('/tmp/hacksidian-theme-survey',t.slug,decodeURIComponent(file));
  assert(fs.existsSync(p),p);const lines=fs.readFileSync(p,'utf8').split('\n');assert(Number(anchor)>=1&&Number(anchor)<=lines.length,link);if(link===f.source&&f.setting)assert(lines[Number(anchor)-1].includes(f.setting),link+' does not name setting');anchors++;
 }
}
for(const t of coverage){
 assert.equal(t.status,'source-review-complete');assert(!t.settings.some(s=>s.disposition==='candidate-not-yet-deduplicated'));
 for(const s of t.settings.filter(s=>s.disposition==='catalog-mapped'))assert(findings.some(f=>f.theme===t.slug&&f.setting===s.id),t.slug+'/'+s.id+' missing evidence');
 assert(fs.existsSync(path.join(atlas,'! themes','_research',t.slug+'.md')));
}
for(const d of decisions){const t=byTheme.get(d.theme),setting=t.settings.find(s=>s.id===d.setting);assert(setting);assert.equal(d.settingSource,setting.source);assert.equal(d.reviewedCommit,t.commit);}
const report={date:'2026-09-16',scope:'source-only',themes:100,classControlsReviewed:coverage.reduce((n,t)=>n+t.settings.filter(s=>['class-toggle','class-select'].includes(s.type)).length,0),continuedDecisions:decisions.length,originalSourceListsChecked:sourcesChecked,originalSourceListsChanged:0,localSourceAnchorsChecked:anchors,newCards,existingCards:new Set(findings.filter(f=>f.existing).map(f=>f.id)).size,pairs:new Set(findings.map(f=>f.id+'|'+f.theme)).size,representedThemes:new Set(findings.map(f=>f.theme)).size,remainingSettings:0,totalTechniqueCards:metadata.size,totalLinkedTechniqueCards:linkedCards,totalThemeLinks:totalLinks,obsidianVisualVerification:false,cloudIndexUpdated:false};
fs.writeFileSync(path.join(dir,'verification.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
