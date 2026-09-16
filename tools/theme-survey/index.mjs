import fs from 'node:fs';import path from 'node:path';import postcss from '../../plugin/node_modules/postcss/lib/postcss.mjs';import {parse} from '../../plugin/node_modules/yaml/dist/index.js';
const folder=new URL('../../docs/research/theme-survey/',import.meta.url);const inventory=JSON.parse(fs.readFileSync(new URL('inventory.json',folder)));
const summaries=[];
for(const t of inventory.themes){
 if(t.status!=='fetched'){summaries.push(t);continue;}
 const docs=[],settings=[],styles=[],errors=[];
 for(const file of t.files){
  const source=fs.readFileSync(path.join(t.local,file),'utf8');
  if(/\.mdx?$/i.test(file))docs.push({file,lines:source.split('\n').length,headings:source.split('\n').flatMap((line,i)=>/^#{1,6} /.test(line)?[{line:i+1,text:line}]:[])});
  if(/\.(css|scss|sass|less)$/i.test(file)){
   for(const m of source.matchAll(/\/\*\s*@settings\b([\s\S]*?)\*\//g)){
    try {const block=parse(m[1].replace(/\t/g,'    '),{uniqueKeys:false});for(const s of block?.settings??[])if(s?.id)settings.push({file,line:source.slice(0,m.index).split('\n').length+Math.max(0,m[0].split('\n').findIndex(l=>l.includes('id: '+s.id))),...s});}catch(e){errors.push({file,type:'settings',error:String(e).slice(0,100)})}
   }
   if(/\.css$/i.test(file)){
    try{const ast=postcss.parse(source);let rules=0;const selectors=new Set(),classes=new Set(),comments=[];ast.walkRules(r=>{rules++;selectors.add(r.selector);for(const m of r.selector.matchAll(/\.([a-zA-Z][\w-]*)/g))classes.add(m[1]);});ast.walkComments(c=>{if(!c.text.includes('@settings') && c.text.length>5&&c.text.length<180)comments.push({line:c.source.start.line,text:c.text})});styles.push({file,lines:source.split('\n').length,rules,selectors:[...selectors],classes:[...classes],comments});}catch(e){errors.push({file,type:'css',error:String(e).slice(0,100)})}
   }
  }
 }
 // Preserve all locations, but deduplicate settings in the reading report.
 const primary = t.files.includes('theme.css') ? 'theme.css' : t.files.includes('obsidian.css') ? 'obsidian.css' : null;
 const unique=[...new Map(settings.filter(s=>!primary||s.file===primary).map(s=>[s.id,s])).values()];
 const row={...t,primary,docs,settings:unique,styles,errors};summaries.push(row);
}
fs.writeFileSync('/tmp/hacksidian-theme-survey-source-index.json',JSON.stringify(summaries,null,2));
const lines=summaries.map(t=>`## ${t.rank}. ${t.name} (${t.slug})\n${t.repo}@${t.commit}\nFiles ${t.files?.length??0}; docs ${t.docs?.length??0}; CSS ${t.styles?.length??0}; settings ${t.settings?.length??0}\n${(t.settings??[]).filter(s=>s.type!=='heading'&&!['variable-color','variable-number','variable-text','variable-number-slider'].includes(s.type)).map(s=>`${s.id}: ${s.title} ${s.description??''}`).join('\n')}\nREADME: ${(t.docs??[]).filter(d=>/^readme/i.test(d.file)).flatMap(d=>d.headings.map(h=>h.text)).join('; ')}`);
fs.writeFileSync(new URL('reading-index.md',folder),lines.join('\n\n'));
console.log({themes:summaries.length,docs:summaries.reduce((n,t)=>n+(t.docs?.length??0),0),css:summaries.reduce((n,t)=>n+(t.styles?.length??0),0),settings:summaries.reduce((n,t)=>n+(t.settings?.length??0),0)});
