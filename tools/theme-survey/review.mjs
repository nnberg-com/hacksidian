import fs from 'node:fs';import path from 'node:path';import postcss from '../../plugin/node_modules/postcss/lib/postcss.mjs';
const project=path.resolve(new URL('../..',import.meta.url).pathname),dir=path.join(project,'docs/research/theme-survey');
const all=JSON.parse(fs.readFileSync('/tmp/hacksidian-theme-survey-source-index.json')),features=JSON.parse(fs.readFileSync(path.join(project,'tools/theme-survey/features.json')));
const decisionsFile=path.join(dir,'decisions.json'),decisions=fs.existsSync(decisionsFile)?JSON.parse(fs.readFileSync(decisionsFile)):[];
const findings=[],rows=[],inspection=[];
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const url=(t,file,line)=>`https://github.com/${t.repo}/blob/${t.commit}/${file.split('/').map(encodeURIComponent).join('/')}#L${line}`;
const preferred=(rules,f)=>{
 const hint=f.evidenceHint;if(!hint)return rules[0];
 return rules.find(r=>(!hint.selector||new RegExp(hint.selector).test(r.selector))&&(!hint.declaration||r.declarations.some(d=>new RegExp(hint.declaration).test(`${d.prop}: ${d.value}`))))??rules[0];
};
for(const t of all){
 if(!t.primary){rows.push({...t,status:'missing-primary'});continue;}
 const text=fs.readFileSync(path.join(t.local,t.primary),'utf8'),rules=[],parseErrors=[];
 const readRule=r=>{
  const declarations=[];r.each(d=>{if(d.type==='decl')declarations.push({prop:d.prop,value:d.value});});
  let selectors=postcss.list.comma(r.selector),parent=r.parent;const conditions=[];
  while(parent){if(parent.type==='atrule')conditions.unshift('@'+parent.name+' '+parent.params);if(parent.type==='rule'){const parents=postcss.list.comma(parent.selector);selectors=parents.flatMap(p=>selectors.map(s=>s.includes('&')?s.replaceAll('&',`:is(${p})`):`${p} ${s}`));}parent=parent.parent;}
  rules.push({selector:selectors.join(', '),line:r.source.start.line,declarations,conditions});
 };
 try {postcss.parse(text).walkRules(readRule)}catch(e){
  parseErrors.push(String(e).split('\n')[0]);
  // Broken CSS does not erase the rest of a theme from the survey. Recover leaf rules separately.
  const clean=text.replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' '));
  let offset=0,line=1;
  for(const m of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)){
   line+=clean.slice(offset,m.index).split('\n').length-1;offset=m.index;
   const selector=m[1].trim();if(!selector||selector.startsWith('@'))continue;
   try{postcss.parse(selector+'{'+m[2]+'}').walkRules(r=>{const before=rules.length;readRule(r);rules[before].line=line+m[1].slice(0,m[1].indexOf(selector)).split('\n').length-1;});}catch{}
  }
 }
 const cssWithoutComments=text.replace(/\/\*[\s\S]*?\*\//g,'');
 // Capture unparseable settings as raw candidates too; never silently omit a whole theme.
 const rawSettings=[];
 for(const block of text.matchAll(/\/\*\s*@settings\b([\s\S]*?)\*\//g)){
  const lines=block[1].split('\n');for(let i=0;i<lines.length;i++){
   const m=lines[i].match(/^\s*(?:-\s*)?id:\s*["']?([\w-]+)["']?\s*$/);if(!m)continue;
   let title='',type='';for(let j=i+1;j<Math.min(i+18,lines.length);j++){if(/^\s*(?:-\s*)?id:/.test(lines[j]))break;const v=lines[j].match(/^\s*(title|type):\s*(.*)$/);if(v){if(v[1]==='title')title=v[2].replace(/^['"]|['"]$/g,'');else type=v[2].trim();}}
   if(!t.settings.some(s=>s.id===m[1])){
    const options=[];let label='';
    for(let j=i+1;j<lines.length;j++){
     if(/^\s*(?:-\s*)?id:/.test(lines[j]))break;
     const option=lines[j].match(/^\s*(?:-\s*)?(label|value):\s*['"]?(.*?)['"]?\s*$/);
     if(option){if(option[1]==='label')label=option[2];else options.push({label:label||option[2],value:option[2]});}
    }
    rawSettings.push({id:m[1],title,type,options,file:t.primary,line:text.slice(0,block.index).split('\n').length+i+1,recovered:true});
   }
  }
 }
 const settingLines=new Map();text.split('\n').forEach((line,i)=>{const match=line.match(/^\s*(?:-\s*)?id:\s*["']?(.+?)["']?\s*$/);if(match&&!settingLines.has(match[1]))settingLines.set(match[1],i+1);});
 const settings=[...t.settings,...rawSettings].map(s=>({...s,line:settingLines.get(s.id)??s.line}));const classified=new Set();
 inspection.push({slug:t.slug,name:t.name,repo:t.repo,commit:t.commit,primary:t.primary,settings,rules});
 for(const f of features){
  for(const e of (f.evidence??[]).filter(e=>e.theme===t.slug)){
   const rule=preferred(rules.filter(r=>new RegExp(e.selector).test(r.selector)&&(!e.property||r.declarations.some(d=>d.prop===e.property&&(!e.value||new RegExp(e.value).test(d.value))))),f);
   if(!rule)continue;
   const doc=fs.readFileSync(path.join(t.local,e.file),'utf8');
   const at=doc.indexOf(e.needle);if(at<0)throw Error('Missing documented evidence: '+t.slug+' '+e.needle);
   findings.push({id:f.existing??f.id,existing:!!f.existing,theme:t.slug,name:t.name,commit:t.commit,repo:t.repo,source:url(t,e.file,doc.slice(0,at).split('\n').length),implementation:url(t,t.primary,rule.line),selector:rule.selector,conditions:rule.conditions,declarations:rule.declarations.slice(0,8),usage:e.usage});
  }
  for(const s of settings.filter(s=>new RegExp(f.setting).test(s.id))){
   const classes=[s.id,...(s.options??[]).map(o=>typeof o==='string'?o:o.value)].filter(x=>typeof x==='string'&&x!=='none');
   const evidence=preferred(rules.filter(r=>!/(?:setting-item|style-settings|data-id=)/.test(r.selector)&&classes.some(c=>new RegExp('\\.'+escape(c)+'(?![\\w-])').test(r.selector))),f);
   if(!evidence)continue;
   classified.add(s.id);
   const settingLine=settingLines.get(s.id)??s.line;
   findings.push({id:f.existing??f.id,existing:!!f.existing,theme:t.slug,name:t.name,commit:t.commit,repo:t.repo,setting:s.id,title:s.title,description:s.description??'',options:s.options??[],default:s.default??null,source:url(t,t.primary,settingLine||s.line),implementation:url(t,t.primary,evidence.line),selector:evidence.selector,conditions:evidence.conditions,declarations:evidence.declarations.slice(0,8)});
  }
 }
 for(const decision of decisions.filter(d=>d.theme===t.slug&&d.outcome==='mapped')){
  const s=settings.find(s=>s.id===decision.setting);if(!s)throw Error(`Unknown reviewed setting ${t.slug}/${decision.setting}`);
  const classes=[s.id,...(s.options??[]).map(o=>typeof o==='string'?o:o.value)].filter(x=>typeof x==='string'&&x&&x!=='none'&&x!=='default');
  const candidates=rules.filter(r=>!/(?:style-settings|data-id\s*=)/.test(r.selector)&&classes.some(c=>new RegExp('\\.'+escape(c)+'(?![\\w-])').test(r.selector)));
  for(const link of decision.links){
   const r=candidates.find(r=>(!link.selector||new RegExp(link.selector).test(r.selector))&&(!link.property||r.declarations.some(d=>d.prop===link.property&&(!link.value||new RegExp(link.value).test(d.value)))));
   if(!r)throw Error(`Reviewed evidence missing: ${t.slug}/${s.id}/${link.id}`);
   if(!findings.some(f=>f.theme===t.slug&&f.setting===s.id&&f.id===link.id))findings.push({id:link.id,existing:!features.some(f=>f.id===link.id),theme:t.slug,name:t.name,commit:t.commit,repo:t.repo,setting:s.id,title:s.title,options:s.options??[],source:url(t,t.primary,s.line),implementation:url(t,t.primary,r.line),selector:r.selector,conditions:r.conditions,declarations:r.declarations.slice(0,8),matchedProperty:link.property??null,usage:link.usage??decision.usage});
  }
  classified.add(s.id);
 }
 // Additional occurrences without Style Settings: require a narrowly matching selector and declaration.
 const checks=[
  ['code-syntax-palette',r=>(/\.token\.(?:keyword|string|comment)\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='color'))||r.declarations.some(d=>/^--code-(?:keyword|string|comment)$/.test(d.prop))],
  ['text-selection-custom',r=>r.selector.includes('::selection')&&r.declarations.some(d=>/^background/.test(d.prop)&&!/none|transparent/.test(d.value))],
  ['interface-active-tab',r=>/\.workspace-tab-header\.is-active/.test(r.selector)&&r.declarations.some(d=>/^(?:background|background-color|box-shadow|border-bottom|border-inline-start)$/.test(d.prop)&&!/^(?:none|transparent|0)$/.test(d.value))],
  ['heading-e007',r=>r.declarations.some(d=>/^--h[1-6]-color$/.test(d.prop)&&!/normal|inherit/.test(d.value))],
  ['task-alternative-markers',r=>/\[data-task\s*[=~]\s*["']?[/?><!-]/.test(r.selector)&&r.declarations.length>0],
  ['image-e062',r=>/(?:\bimg\b|\.image-embed\b)/.test(r.selector)&&r.declarations.some(d=>d.prop==='float'&&d.value==='left')],
  ['image-e063',r=>/(?:\bimg\b|\.image-embed\b)/.test(r.selector)&&r.declarations.some(d=>d.prop==='float'&&d.value==='right')],
  ['composition-margin',r=>/\.callout\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='float'&&d.value==='right')],
  ['combinations-s33',r=>/(?:\bem\s*>\s*em\b|\bstrong\s*>\s*strong\b)/.test(r.selector)&&r.declarations.some(d=>d.prop==='text-decoration'&&/underline/.test(d.value))],
  ['strike-s37',r=>/(?:\bdel\s*>\s*mark\b|\bmark\s*>\s*del\b)/.test(r.selector)&&r.declarations.some(d=>d.prop==='filter'&&/blur\(/.test(d.value))],
  ['emphasis-s02',r=>r.declarations.some(d=>d.prop==='--bold-color'&&!/normal|inherit|initial/.test(d.value))||(/(?:\bstrong\b|\.cm-strong\b)/.test(r.selector)&&!/:hover|\.setting|callout/.test(r.selector)&&r.declarations.some(d=>d.prop==='color'&&!/normal|inherit|initial/.test(d.value)))],
  ['emphasis-s03',r=>r.declarations.some(d=>d.prop==='--italic-color'&&!/normal|inherit|initial/.test(d.value))||(/(?:\bem\b|\.cm-em\b)/.test(r.selector)&&!/:hover|\.setting|callout/.test(r.selector)&&r.declarations.some(d=>d.prop==='color'&&!/normal|inherit|initial/.test(d.value)))],
  ['heading-e019',r=>/(?:\bh[1-6]\b|\.cm-header-[1-6]\b)/.test(r.selector)&&r.declarations.some(d=>d.prop==='border-bottom'&&!/^(?:0|none)\b/.test(d.value))],
  ['heading-e051',r=>/\bh[1-6]\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='text-shadow'&&/0\s+0\s+/.test(d.value))],
  ['quote-line',r=>/\bblockquote\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='border-left'&&!/^(?:0|none)\b/.test(d.value))],
  ['code-scroll',r=>/\bpre\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='overflow-x'&&/^(?:auto|scroll)$/.test(d.value))],
  ['task-e14',r=>/(?:\.is-checked|data-task=["']?x)/.test(r.selector)&&r.declarations.some(d=>d.prop==='opacity'&&/^(?:0?\.[1-9]|0\.[1-9]\d)$/.test(d.value))],
  ['task-e13',r=>/(?:\.is-checked|data-task=["']?x)/.test(r.selector)&&r.declarations.some(d=>/^text-decoration/.test(d.prop)&&/line-through/.test(d.value))],
  ['interface-statusbar-top',r=>t.slug==='sodalite'&&r.selector==='.status-bar'&&r.declarations.some(d=>d.prop==='top'&&d.value==='0')],
  ['interface-terminal-prompts',r=>t.slug==='terminal'&&/activeline|search|prompt/.test(r.selector)&&r.declarations.some(d=>d.prop==='content'&&/var\(--(?:input-prompt|search|replace)\)/.test(d.value))],
  ['interface-file-name-wrap',r=>/\.nav-(?:file|folder)-title(?:-content)?\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='white-space'&&d.value==='normal')],
  ['interface-active-editor-line',r=>/(?:\.cm-active\b|CodeMirror-activeline-background)/.test(r.selector)&&!/codeblock|header|frontmatter|yaml/.test(r.selector)&&r.declarations.some(d=>/^background/.test(d.prop)&&!/none|transparent/.test(d.value))],
  ['note-embed-title-hide',r=>/\.markdown-embed-title\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='display'&&d.value==='none')],
  ['image-hold-zoom',r=>/img:active/.test(r.selector)&&r.declarations.some(d=>d.prop==='position'&&d.value==='fixed')],
  ['table-e007',r=>/(?:tr|table-row)[^,{]*:nth-(?:child|of-type)\((?:even|odd|2n(?:\s*\+\s*1)?)\)/.test(r.selector)&&r.declarations.some(d=>/^background/.test(d.prop)&&!/none|transparent/.test(d.value))],
  ['table-e034',r=>/\btr:hover/.test(r.selector)&&r.declarations.some(d=>/^background/.test(d.prop)&&!/none|transparent/.test(d.value))],
  ['table-e043',r=>/(?:\bthead|\bth\b)/.test(r.selector)&&r.declarations.some(d=>d.prop==='position'&&d.value==='sticky')],
  ['image-e016',r=>/\bimg\b/.test(r.selector)&&!/[\s.](?:icon|avatar)|:hover|:active/.test(r.selector)&&r.declarations.some(d=>d.prop==='border-radius'&&/^(?:[1-9][\d.]*(?:px|em|rem)|var\(--(?:image|img|radius)[^)]*\))$/.test(d.value))],
  ['image-e028',r=>/\bimg\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='filter'&&/grayscale\((?:1|100%)\)/.test(d.value))],
  ['image-e034',r=>/\bimg\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='filter'&&/invert\((?:1|100%)\)/.test(d.value))],
  ['code-e018',r=>/\bpre\b/.test(r.selector)&&r.declarations.some(d=>d.prop==='white-space'&&d.value==='pre-wrap')],
 ];
 for(const [id,predicate] of checks){const r=rules.find(predicate);if(r&&!findings.some(f=>f.id===id&&f.theme===t.slug))findings.push({id,existing:!features.some(f=>f.id===id),theme:t.slug,name:t.name,repo:t.repo,commit:t.commit,source:url(t,t.primary,r.line),implementation:url(t,t.primary,r.line),selector:r.selector,conditions:r.conditions,declarations:r.declarations.slice(0,8)});}
 const extraChecks=JSON.parse(fs.readFileSync(path.join(project,'tools/theme-survey/static-rules.json')));
 for(const check of extraChecks){
  const r=rules.find(r=>new RegExp(check.selector).test(r.selector)&&(!check.exclude||!new RegExp(check.exclude).test(r.selector))&&r.declarations.some(d=>new RegExp(check.property).test(d.prop)&&(!check.value||new RegExp(check.value).test(d.value))));
  if(r&&!findings.some(f=>f.id===check.id&&f.theme===t.slug))findings.push({id:check.id,existing:!features.some(f=>f.id===check.id),theme:t.slug,name:t.name,repo:t.repo,commit:t.commit,source:url(t,t.primary,r.line),implementation:url(t,t.primary,r.line),selector:r.selector,conditions:r.conditions,declarations:r.declarations.slice(0,8),proofRule:check});
 }
 if(parseErrors.length)for(const f of findings.filter(f=>f.theme===t.slug))f.recoveredCss=true;
 rows.push({slug:t.slug,name:t.name,repo:t.repo,rank:t.rank,commit:t.commit,primary:t.primary,files:t.files.length,docs:t.docs,cssFiles:t.styles.length,ruleCount:rules.length,settings:settings.map(s=>{const decision=decisions.find(d=>d.theme===t.slug&&d.setting===s.id);return {id:s.id,title:s.title,type:s.type,source:url(t,t.primary,s.line),disposition:classified.has(s.id)?'catalog-mapped':decision?'reviewed-'+decision.outcome:['class-toggle','class-select'].includes(s.type)?'candidate-not-yet-deduplicated':'parameter-or-heading',...(decision?{reviewReason:decision.reason}: {})};}),parseErrors,settingsErrors:t.errors.filter(e=>e.file===t.primary&&e.type==='settings'),status:'source-review-complete'});
}
fs.writeFileSync(path.join(dir,'findings.json'),JSON.stringify(findings,null,2));fs.writeFileSync(path.join(dir,'coverage.json'),JSON.stringify(rows,null,2));
fs.writeFileSync('/tmp/hacksidian-theme-survey-inspection.json',JSON.stringify(inspection));
const remaining=rows.flatMap(t=>t.settings.filter(s=>s.disposition==='candidate-not-yet-deduplicated').map(s=>{
 const z=`${s.id} ${s.title}`.toLowerCase();let triage;
 if(/^(info-|syntax-)|do not show again|mobile support|macos and ios support/.test(z))triage='service-information';
 else if(/color|colour|palette|accent|theme flavor|color scheme/.test(z))triage='palette-and-color-variants';
 else if(/font|typograph|ligature|size|weight|spacing|margin|padding|align|width|height/.test(z))triage='typography-and-dimensions';
 else if(/plugin|kanban|dataview|calendar|statblock|thino|memos|excalidraw|notebook.navigator/.test(z))triage='plugin-specific-styling';
 else if(/callout|embed|table|blockquote|checkbox|codeblock|list|tag|highlight|image|picture|hr|heading/.test(z))triage='content-variants';
 else triage='interface-and-other';
 return {theme:t.slug,...s,triage,triage_status:'automatic-routing-not-a-verdict'};
}));
fs.writeFileSync(path.join(dir,'remaining.json'),JSON.stringify(remaining,null,2));
console.log(JSON.stringify({themes:rows.length,rules:rows.reduce((n,t)=>n+t.ruleCount,0),findings:findings.length,newFeatures:new Set(findings.filter(f=>!f.existing).map(f=>f.id)).size,existingFeatures:new Set(findings.filter(f=>f.existing).map(f=>f.id)).size,representedThemes:new Set(findings.map(f=>f.theme)).size,unmatchedFeatures:features.filter(f=>!findings.some(x=>x.id===(f.id??f.existing))).map(f=>f.id??f.existing),cssErrors:rows.filter(t=>t.parseErrors.length).map(t=>t.name)}));
