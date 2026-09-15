import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import postcss from '../plugin/node_modules/postcss/lib/postcss.mjs';
const [atlas, sourceFile, snippets] = process.argv.slice(2);
if(!atlas||!sourceFile||!snippets)throw Error('Usage: ATLAS STOCK_APP_CSS SNIPPETS');
const source=fs.readFileSync(sourceFile,'utf8'), sha=crypto.createHash('sha256').update(source).digest('hex');
if(sha!=='f612f1e8f36486fa57f3b8bd45f0c848409d5b168002e757a13c6d286a7b4c41')throw Error('Review mappings for the changed stock CSS');
const stock=postcss.parse(source), defs=new Map(), stockNames=new Set();
stock.walkDecls(d=>{if(d.prop.startsWith("--"))stockNames.add(d.prop);});
const refs=s=>[...s.matchAll(/var\(\s*(--[\w-]+)/g)].map(m=>m[1]);
const context=n=>{const a=[];for(let p=n.parent;p&&p.type!=='root';p=p.parent)if(p.type==='atrule')a.unshift('@'+p.name+(p.params?' '+p.params:''));return a;};
stock.walkDecls(d=>{if(d.prop.startsWith('--')&&d.parent.type==='rule'&&d.parent.selectors.some(s=>['body',':root','.theme-light','.theme-dark'].includes(s.trim()))){const a=defs.get(d.prop)||[];a.push({selector:d.parent.selector,atRules:context(d),property:d.prop,value:d.value,important:!!d.important,line:d.source.start.line});defs.set(d.prop,a);}});
const out=path.join(atlas,'! defaults'),backupPath=path.join(out,'atlas-before-variable-refinement.json');
const backups=fs.existsSync(backupPath)?JSON.parse(fs.readFileSync(backupPath)):{};
const ids=fs.readdirSync(path.join(atlas,'! hacks')).filter(id=>fs.existsSync(path.join(atlas,'! hacks',id,'hack.json'))).sort();
for(const id of ids)if(!(id in backups))backups[id]=fs.readFileSync(path.join(atlas,'! hacks',id,'recipe.css'),'utf8');
fs.writeFileSync(backupPath,JSON.stringify(backups,null,2)+'\n');
const factor=n=>Number(n.toFixed(8));
const scale=(v,n)=>n===1?`var(${v})`:`calc(var(${v}) * ${factor(n)})`;
function leafKind(selector){
 // Only classify simple final elements; never confuse an ancestor or a pseudo-element with the target.
 if(selector.includes('::'))return null;
 if(/(?:^|[\s>+~,])(?:pre\s*>?\s*)?code(?:\:not\(pre code\))?$/.test(selector))return 'code';
 if(/(?:^|[\s>+~,])pre$/.test(selector))return 'pre';
 if(/(?:^|[\s>+~,])(?:table|th|td)(?::(?:first-child|last-child))?$/.test(selector))return 'table';
 if(/(?:a)?\.tag(?::(?:hover|focus-visible))?$/.test(selector))return 'tag';
 if(/\.callout$/.test(selector))return 'callout';
 if(/(?:^|[\s>+~,])blockquote$/.test(selector))return 'quote';
 return null;
}
const records=[],registry=new Map();
function reg(v){if(!registry.has(v))registry.set(v,{variable:v,stock:stockNames.has(v),recipeDefinitions:new Set(),snippetDefinitions:new Set(),consumers:new Set(),recipes:new Set()});return registry.get(v);}
for(const id of ids){
 const dir=path.join(atlas,'! hacks',id),spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'))),group=spec.group;
 const tree=postcss.parse(backups[id]),changes=[],questions=[];
 tree.walkDecls(d=>{
  if(d.parent.type!=='rule')return;
  const selector=d.parent.selector,kind=leafKind(selector),before=d.value;
  // Interface and properties remain outside the content work requested by the user.
  if(!['interface','metadata','meta'].includes(group)&&!d.prop.startsWith('--')){
   const sizeBase=kind==='code'?['--code-size',.875]:kind==='table'?['--table-text-size',1]:kind==='tag'?['--tag-size',.875]:null;
   let m=d.value.match(/^calc\(var\(--font-text-size\) \* ([\d.]+)\)$/);
   if(d.prop==='font-size'&&sizeBase&&m)d.value=scale(sizeBase[0],Number(m[1])/sizeBase[1]);
   if(d.prop==='font-size'&&sizeBase&&/^([\d.]+)em$/.test(d.value))d.value=scale(sizeBase[0],parseFloat(d.value)/sizeBase[1]);
   if(d.prop==='line-height'&&kind==='table'){
    m=d.value.match(/^calc\(var\(--line-height-normal\) \* ([\d.]+)\)$/);
    if(m)d.value=scale('--table-line-height',Number(m[1])*1.5/1.3);
   }
   if(d.prop==='color'&&d.value==='var(--text-normal)'){
    if(kind==='code')d.value='var(--code-normal)';
    if(/(?:^|[\s>+~,])th$/.test(selector))d.value='var(--table-header-color)';
   }
   if(d.prop==='color'&&kind==='tag'&&d.value==='var(--interactive-accent)')d.value='var(--tag-color)';
   if(/^border(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?(?:-color)?$/.test(d.prop)){
    if(kind==='code'||kind==='pre')d.value=d.value.replaceAll('var(--background-modifier-border)','var(--code-border-color)');
    if(kind==='table')d.value=d.value.replaceAll('var(--background-modifier-border)','var(--table-border-color)');
   }
   if(/^border(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?(?:-width)?$/.test(d.prop)&&['table','quote'].includes(kind)) {
    const v=kind==='table'?'--table-border-width':'--blockquote-border-thickness',base=kind==='table'?1:2;
    d.value=d.value.replace(/(?<![\w.-])(\d+(?:\.\d+)?)px\b/g,(all,n)=>Number(n)>0?scale(v,Number(n)/base):all);
   }
   // Use the nonzero, four-pixel native spacing unit. Keep em/rem/% relationships intact.
   if(/^(?:padding|margin)(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?$|^(?:row-gap|column-gap|gap)$/.test(d.prop)&&!/[()]/.test(d.value)){
    d.value=d.value.replace(/(?<![\w.-])(-?(?:\d+\.?\d*|\.\d+))px\b/g,(all,n)=>Number(n)!==0&&Math.abs(Number(n))<=128?scale('--size-4-1',Number(n)/4):all);
   }
   if(d.prop==='border-radius'&&!/[()]/.test(d.value)){
    const radius=kind==='code'||kind==='pre'?'--code-radius':kind==='callout'?'--callout-radius':'--radius-s';
    d.value=d.value.replace(/(?<![\w.-])(\d+(?:\.\d+)?)px\b/g,(all,n)=>Number(n)>0&&Number(n)<=64?scale(radius,Number(n)/4):all);
    if(kind==='tag')d.value=d.value.replace(/(?<![\w.-])((?:\d+\.?\d*|\.\d+))em\b/g,(all,n)=>Number(n)>0?scale('--tag-radius',Number(n)/2):all);
   }
   if(d.prop==='padding'&&kind==='tag'&&/^([\d.]+)em\s+([\d.]+)em$/.test(d.value)){
    const [,y,x]=d.value.match(/^([\d.]+)em\s+([\d.]+)em$/);d.value=scale('--tag-padding-y',Number(y)/.25)+' '+scale('--tag-padding-x',Number(x)/.65);
   }
   // A visible border cannot be derived by multiplying a stock zero-width border.
   if(/^border/.test(d.prop)&&/\b[1-9][\d.]*px\b/.test(d.value)&&(kind==='code'||kind==='pre'||kind==='callout'||kind==='tag'))questions.push({kind:'zero-baseline',selector,property:d.prop,value:d.value,reason:'Штатная толщина границы равна 0; умножение не создаст видимую границу.'});
   if(/^background/.test(d.prop)&&['var(--background-secondary)','var(--background-primary)'].includes(d.value)&&['table','tag','callout','quote'].includes(kind))questions.push({kind:'surface-role',selector,property:d.prop,value:d.value,reason:'Проверить роль заливки отдельно: штатная подложка может быть прозрачной; её замена может убрать смысл приёма.'});
  }
  if(before!==d.value)changes.push({selector,property:d.prop,from:before,to:d.value});
  if(d.prop.startsWith('--'))reg(d.prop).recipeDefinitions.add(group);
  for(const v of refs(d.value)){const r=reg(v);r.consumers.add(group);r.recipes.add(id);}
 });
 const css=tree.toString();fs.writeFileSync(path.join(dir,'recipe.css'),css);
 const baselinePath=path.join(dir,'baseline.json'),baseline=JSON.parse(fs.readFileSync(baselinePath));
 const variables=[...new Set(refs(css))].sort(),newVars=variables.filter(v=>!baseline.variables.includes(v)&&defs.has(v));
 // Add exact stock definitions and category consumers to the reference, not to the applied CSS.
 const defaultPath=path.join(dir,'Default.css');let reference=fs.readFileSync(defaultPath,'utf8').split('\n/* Variable refinement reference */')[0];
 const wanted=new Set(variables.filter(v=>defs.has(v))),seen=new Set(),extra=[];
 function visit(v){if(seen.has(v))return;seen.add(v);for(const d of defs.get(v)||[]){extra.push(d);for(const ref of refs(d.value))visit(ref);}}
 // Include refinements on every run, even after baseline.variables has been refreshed.
 const refinedVars=new Set(changes.flatMap(c=>refs(c.to)).filter(v=>defs.has(v)));for(const v of refinedVars)visit(v);
 const selected=[];
 stock.walkDecls(d=>{if(d.parent.type!=='rule'||d.prop.startsWith('--')||!refs(d.value).some(v=>refinedVars.has(v)))return;
 const s=d.parent.selector;if(!(/\.markdown-rendered|\.tag\b|\.callout\b/.test(s)))return;
 if(!changes.some(c=>c.property===d.prop))return;
 selected.push({selector:s,atRules:context(d),property:d.prop,value:d.value,important:!!d.important,line:d.source.start.line});});
 for(const d of [...extra,...selected]){
  let rule=d.selector+' {\n  /* app.css:'+d.line+' */ '+d.property+': '+d.value+(d.important?' !important':'')+';\n}';for(const at of [...d.atRules].reverse())rule=at+' {\n'+rule+'\n}';
  if(!reference.includes(rule)){if(!reference.includes('/* Variable refinement reference */'))reference+='\n/* Variable refinement reference */\n';reference+=rule+'\n';}
 }
 fs.writeFileSync(defaultPath,reference);
 baseline.variables=variables;baseline.refinement={sourceSha256:sha,changes,questions};fs.writeFileSync(baselinePath,JSON.stringify(baseline,null,2)+'\n');
 records.push({id,group,changes,questions});
 for(const lang of ['ru','en']){
  const p=path.join(dir,`Description.${lang}.md`);if(!fs.existsSync(p))continue;
  let text=fs.readFileSync(p,'utf8');const heading=lang==='ru'?'Уточнение опорных переменных':'Refined variable bindings';text=text.replace(new RegExp('\\n## '+heading+'\\n[\\s\\S]*?(?=\\n## |$)'),'');
  if(changes.length||questions.length)text+='\n## '+heading+'\n\n'+(lang==='ru'?`Уточнено привязок: ${changes.length}. Случаев для отдельного решения: ${questions.length}.`:`Refined bindings: ${changes.length}. Cases needing individual decisions: ${questions.length}.`)+' [baseline.json](./baseline.json) · [Default.css](./Default.css)\n';fs.writeFileSync(p,text);
 }
}
const manifest=JSON.parse(fs.readFileSync(path.join(snippets,'hacksidian-manifest.json')));
for(const module of manifest.modules){postcss.parse(fs.readFileSync(path.join(snippets,module.file),'utf8')).walkDecls(d=>{if(d.prop.startsWith('--'))reg(d.prop).snippetDefinitions.add(module.group);for(const v of refs(d.value))reg(v).consumers.add(module.group);});}
const rows=[...registry.values()].sort((a,b)=>a.variable.localeCompare(b.variable)).map(r=>({...r,recipeDefinitions:[...r.recipeDefinitions].sort(),snippetDefinitions:[...r.snippetDefinitions].sort(),consumers:[...r.consumers].sort(),recipes:[...r.recipes].sort(),candidateLevel:r.consumers.size>1?'shared':'category',ownership:'observed; no ownership enforcement or snippet changes'}));
fs.writeFileSync(path.join(out,'variable-usage.json'),JSON.stringify({stockVersion:'1.13.7',sourceSha256:sha,variables:rows},null,2)+'\n');
fs.writeFileSync(path.join(out,'variable-refinement.json'),JSON.stringify({sourceSha256:sha,recipes:records},null,2)+'\n');
let md='# Уточнение CSS-переменных\n\nОбход всех '+ids.length+' приёмов. Изменены '+records.filter(r=>r.changes.length).length+'; заменено деклараций '+records.reduce((n,r)=>n+r.changes.length,0)+'. Исходник опор: app.css Obsidian 1.13.7. Это проверка CSS и сохранения исходных размеров, не визуальная приёмка.\n\n| Категория | Приёмов | Изменено | С вопросами |\n|---|---:|---:|---:|\n';
for(const g of [...new Set(records.map(r=>r.group))].sort()){const rs=records.filter(r=>r.group===g);md+=`| ${g} | ${rs.length} | ${rs.filter(r=>r.changes.length).length} | ${rs.filter(r=>r.questions.length).length} |\n`;}
md+='\n## Решения\n\nРазмер кода, таблиц и тегов привязан к переменным соответствующего элемента. Межстрочный интервал таблиц — к --table-line-height. Пиксельные отступы до 128px — к штатной единице --size-4-1; скругления до 64px — к подходящему радиусу. Относительные em/rem, проценты, нули и большие радиусы форм сохранены. При стандартных опорах коэффициенты сохраняют исходные значения. Для отступов тегов в em использованы --tag-padding-x/y.\n\nПрошлый проход не заменял голые числовые значения на переменные везде; этот проход также не трактует число как ошибку. Геометрия формы и типографические пропорции остаются частью приёма.\n\n## Требуют отдельных решений\n\n';
for(const r of records.filter(r=>r.questions.length))md+=`- [${r.id}](../!%20hacks/${r.id}/Description.ru.md): ${[...new Set(r.questions.map(q=>q.reason))].join(' ')}\n`;
md+='\n## Реестр\n\n[Использование переменных](./Переменные%20—%20реестр.md). Он показывает фактические определения и потребителей, а не устанавливает новые ограничения. Предложение верхнего уровня основано на использовании несколькими категориями. Сами сниппеты и их набор не менялись.\n';fs.writeFileSync(path.join(out,'Уточнение CSS-переменных.md'),md);
let registryMd='# Переменные — реестр\n\nУчтены только встречающиеся в приёмах и текущих сниппетах переменные. «Кандидат» — предложение для обсуждения, не назначенное владение. Определения в нескольких категориях показаны явно. Полные списки приёмов — в [variable-usage.json](./variable-usage.json).\n\n| Переменная | Есть в штатной теме | Определяют сниппеты | Определяют приёмы категорий | Используют категории | Кандидат |\n|---|---|---|---|---|---|\n';for(const r of rows)registryMd+=`| ${r.variable} | ${r.stock?'да':'нет'} | ${r.snippetDefinitions.join(', ')} | ${r.recipeDefinitions.join(', ')} | ${r.consumers.join(', ')} | ${r.candidateLevel==='shared'?'общая':'категория'} |\n`;fs.writeFileSync(path.join(out,'Переменные — реестр.md'),registryMd);
console.log(JSON.stringify({recipes:ids.length,changed:records.filter(r=>r.changes.length).length,declarations:records.reduce((n,r)=>n+r.changes.length,0),questions:records.filter(r=>r.questions.length).length,variables:rows.length}));
