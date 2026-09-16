throw new Error('Retired: technique cards are maintained as Markdown. This command would recreate technical files or overwrite authored content.');
import {writeCard} from './card-format.mjs';
/** One-time, auditable atlas migration. Input is the installed version's extracted app.css.
 * Re-running uses each recipe's recorded pre-migration source, never compounds coefficients.
 * Does not write Obsidian snippets. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import postcss from '../plugin/node_modules/postcss/lib/postcss.mjs';
const [atlas,stockFile]=process.argv.slice(2);
if(!atlas||!stockFile)throw Error('Usage: node tools/adapt-atlas-native.mjs ATLAS EXTRACTED_APP_CSS');
const stock=fs.readFileSync(stockFile,'utf8'), sha=crypto.createHash('sha256').update(stock).digest('hex');
if(sha!=='f612f1e8f36486fa57f3b8bd45f0c848409d5b168002e757a13c6d286a7b4c41')throw Error('Re-review mappings for this app.css version');
const tree=postcss.parse(stock), defaults=path.join(atlas,'! defaults');fs.mkdirSync(defaults,{recursive:true});
const refs=v=>[...v.matchAll(/var\(\s*(--[\w-]+)/g)].map(m=>m[1]);
const context=n=>{const a=[];for(let p=n.parent;p&&p.type!=='root';p=p.parent)if(p.type==='atrule')a.unshift('@'+p.name+(p.params?' '+p.params:''));return a;};
const rules=[],definitions=new Map();
tree.walkRules(r=>{let record={selector:r.selector,atRules:context(r),line:r.source.start.line,declarations:[]};for(let d of r.nodes.filter(n=>n.type==='decl')){const x={property:d.prop,value:d.value,important:!!d.important,line:d.source.start.line};record.declarations.push(x);if(d.prop.startsWith('--')){let a=definitions.get(d.prop)||[];a.push({...record,declarations:[x]});definitions.set(d.prop,a);}}rules.push(record);});
const global=r=>r.selector.split(',').some(s=>['body',':root','.theme-light','.theme-dark'].includes(s.trim()));
const patterns={callout:/\.callout\b/,code:/\.markdown-rendered pre|\.HyperMD-codeblock|\.cm-hmd-codeblock/, 'inline-code':/\.markdown-rendered.*code|\.cm-inline-code/,heading:/\.markdown-rendered h[1-6]|\.HyperMD-header|\.cm-header/,table:/\.markdown-rendered.*(?:table|th\b|td\b)|\.cm-table/,link:/\.markdown-rendered.*(?:a\b|internal-link|external-link)|\.cm-(?:hmd-internal-link|link|url)/,tag:/\.tag\b|\.cm-hashtag/,task:/task-list|input\[type=['"]?checkbox/,'pseudo-task':/task-list|input\[type=['"]?checkbox/,quote:/blockquote|\.HyperMD-quote/,list:/\.markdown-rendered.*(?:ul\b|ol\b|li\b)|\.list-bullet|\.cm-formatting-list/,metadata:/\.metadata-/,image:/\.markdown-rendered.*img|\.image-embed/,iframe:/\.markdown-rendered.*iframe|\.iframe-container/,hr:/\.markdown-rendered hr|\.HyperMD-hr/,emphasis:/\.markdown-rendered.*(?:strong|em\b|mark|del\b)|\.cm-(?:strong|em\b|highlight|strikethrough)/,footnote:/footnote/,note:/^\.markdown-preview-view$|^\.markdown-rendered p$|^\.markdown-source-view$/,meta:/^\.markdown-preview-view$|^\.markdown-source-view$/,interface:/\.view-header|\.workspace-leaf|\.status-bar/};
const roleMap={ink:'--text-normal',text:'--text-normal',paper:'--background-primary',page:'--background-primary',surface:'--background-secondary',line:'--background-modifier-border',edge:'--background-modifier-border',muted:'--text-muted',accent:'--interactive-accent',wash:'--background-secondary',tint:'--background-secondary',marker:'--text-highlight-bg',highlight:'--text-highlight-bg',mark:'--text-highlight-bg',purple:'--color-purple',pink:'--color-pink',berry:'--color-red',amber:'--color-orange',green:'--color-green',blue:'--color-blue',red:'--color-red',cool:'--color-cyan','local-link':'--link-color'};
for(const v of Object.values(roleMap))if(!definitions.has(v))throw Error('Unknown variable '+v);
let backupFile=path.join(defaults,'atlas-before-native.json');
const backup=fs.existsSync(backupFile)?JSON.parse(fs.readFileSync(backupFile,'utf8')):{};
for(const id of fs.readdirSync(path.join(atlas,'! hacks')).sort()){const p=path.join(atlas,'! hacks',id,'recipe.css');if(fs.existsSync(p)&&!(id in backup))backup[id]=fs.readFileSync(p,'utf8');}
fs.writeFileSync(backupFile,JSON.stringify(backup,null,2)+'\n');
const report=[];let evidenceCount=0;
for(const [id,original] of Object.entries(backup)){
 const dir=path.join(atlas,'! hacks',id),hack=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8')),group=hack.group;
 if(group==='text'){const b=JSON.parse(fs.readFileSync(path.join(dir,'baseline.json'),'utf8'));report.push({id,group,status:b.status,variables:b.variables,changes:[],review:[],previousTextPass:true});continue;}
 const css=postcss.parse(original),changes=[],review=[];const own='--hack-'+id+'-';
 // Only local atlas aliases can be removed; native custom properties are externally consumed.
 let needed=new Set();css.walkDecls(d=>{if(!d.prop.startsWith(own))for(const v of refs(d.value))needed.add(v);});
 let changed=true;while(changed){changed=false;css.walkDecls(d=>{if(needed.has(d.prop))for(const v of refs(d.value))if(!needed.has(v)){needed.add(v);changed=true;}});}
 css.walkDecls(d=>{if(d.prop.startsWith(own)&&!needed.has(d.prop)){changes.push({property:d.prop,from:d.value,to:null,reason:'unused-local-variable'});d.remove();}});
 const mapped=new Map();css.walkDecls(d=>{if(!d.prop.startsWith(own))return;let role=d.prop.slice(own.length),v=roleMap[role];if(role==='tone'&&group==='callout')v='--callout-color';if(role==='line'&&group==='table')v='--table-border-color';if(role==='line'&&group==='code')v='--code-border-color';if(v)mapped.set(d.prop,v);});
 css.walkDecls(d=>{
  if(mapped.has(d.prop)){changes.push({property:d.prop,from:d.value,to:null,reason:'native-role-replaces-local-alias'});d.remove();return;}
  let value=d.value;for(const [alias,native] of mapped){value=value.replaceAll(alias,native);}
  // On an accent background use the theme's matching foreground, not its page color.
  if(d.prop==='color'&&value==='var(--background-primary)'&&d.parent.nodes.some(n=>n.type==='decl'&&/^background/.test(n.prop)&&refs(n.value).some(v=>v.endsWith('-accent')||v==='--interactive-accent')))value='var(--text-on-accent)';
  const sel=d.parent.selector||'';
  if(d.prop==='background'&&group==='code'&&/repeating-linear-gradient/.test(value)&&d.parent.nodes.some(n=>n.type==='decl'&&n.prop==='line-height'&&['1.6','calc(var(--line-height-normal) * 1.066667)'].includes(n.value))){value=value.replace(/1\.6em/g,'calc(1em * var(--line-height-normal) * 1.066667)').replace(/3\.2em/g,'calc(1em * var(--line-height-normal) * 2.133333)');}const hm=[...sel.matchAll(/\bh([1-6])\b/g)].map(m=>m[1]);const h=hm.length&&new Set(hm).size===1?hm[0]:null;
  if(d.prop==='font-family'&&/^(?:ui-monospace\s*,\s*)?(?:SFMono-Regular,\s*Consolas,\s*)?monospace$/.test(value))value='var(--font-monospace)';
  if(d.prop==='font-size'&&!sel.includes('::')){let m=value.match(/^([\d.]+)(px|rem)$/);if(m){let size=Number(m[1])/(m[2]==='px'?16:1);let base=h?'--h'+h+'-size':'--font-text-size';let standard=h?[0,1.618,1.462,1.318,1.188,1.076,1][Number(h)]:1;value=`calc(var(${base}) * ${Number((size/standard).toFixed(6))})`;}}
  if(d.prop==='line-height'&&/^[\d.]+$/.test(value)&&Number(value)>1&&!sel.includes('::')){let base=h?'--h'+h+'-line-height':'--line-height-normal',standard=h?[0,1.2,1.2,1.3,1.4,1.5,1.5][Number(h)]:1.5;value=`calc(var(${base}) * ${Number((Number(value)/standard).toFixed(6))})`;}
  if(d.prop==='font-weight'&&({'300':1,'400':1,'500':1,'600':1,'700':1})[value])value='var(--font-'+({'300':'light','400':'normal','500':'medium','600':'semibold','700':'bold'})[value]+')';
  if(value!==d.value){changes.push({selector:sel,property:d.prop,from:d.value,to:value,reason:'native-variable'});d.value=value;}
 });
 // Avoid self-reference in native declarations after replacing aliases (e.g. --link-color).
 css.walkDecls(d=>{if(d.prop.startsWith('--')&&refs(d.value).includes(d.prop)){const fallback={'--link-color':'--text-accent','--link-color-hover':'--text-accent-hover'}[d.prop];if(fallback){const old=d.value;d.value=d.value.replaceAll(d.prop,fallback);changes.push({property:d.prop,from:old,to:d.value,reason:'avoid-variable-cycle'});}else throw Error(id+' self-reference '+d.prop);}});
 for(let i=0;i<3;i++)css.walk(n=>{if((n.type==='rule'||n.type==='atrule')&&n.nodes?.length===0)n.remove();});
 css.walkDecls(d=>{
  if(d.prop==='font-family'&&!/^(inherit|var\()/.test(d.value))review.push({kind:'font',selector:d.parent.selector,property:d.prop,value:d.value});
  if(!d.value.includes('data:')&&/(#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|light-dark)\(|\b(?:white|black|red|blue|green|yellow|pink|purple|orange)\b)/i.test(d.value))review.push({kind:'literal-color',selector:d.parent.selector,property:d.prop,value:d.value});
  if(d.value.includes('data:'))review.push({kind:'embedded-asset',selector:d.parent.selector,property:d.prop,value:'Embedded asset retained; native icon values are not CSS image URLs.'});
 });
 const used=new Set();const properties=new Set();css.walkDecls(d=>{properties.add(d.prop);for(const v of refs(d.value))if(!v.startsWith(own))used.add(v);});
 for(const v of used)if(!definitions.has(v))review.push({kind:'variable-not-in-stock',value:v});
 const nonNativeEffects=[...properties].filter(p=>!p.startsWith('--')&&!rules.some(r=>(patterns[group]||/^$/).test(r.selector)&&r.declarations.some(d=>d.property===p))).sort();
 const pattern=patterns[group]||/^$/;const selected=new Map();const add=(r,ds)=>{if(!ds.length)return;let key=JSON.stringify([r.selector,r.atRules]);let rec=selected.get(key);if(!rec){rec={...r,declarations:[]};selected.set(key,rec);}for(const d of ds)if(!rec.declarations.some(x=>x.property===d.property&&x.value===d.value&&x.important===d.important))rec.declarations.push(d);};
 // Consumers in this category: only properties actually touched by the recipe.
 for(const r of rules)if(pattern.test(r.selector))add(r,r.declarations.filter(d=>properties.has(d.property)&&!d.property.startsWith('--')));
 const required=new Set([...used,...[...properties].filter(p=>p.startsWith('--')&&definitions.has(p))]);for(const r of selected.values())for(const d of r.declarations)for(const v of refs(d.value))required.add(v);
 const seen=new Set();const visit=v=>{if(seen.has(v))return;seen.add(v);for(const r of definitions.get(v)||[])if(global(r)||pattern.test(r.selector)){add(r,r.declarations);for(const d of r.declarations)for(const ref of refs(d.value))visit(ref);}};for(const v of required)visit(v);
 const blocks=[...selected.values()].sort((a,b)=>a.line-b.line).map(r=>{evidenceCount+=r.declarations.length;let s=r.selector+' {\n'+r.declarations.map(d=>'  /* app.css:'+d.line+' */ '+d.property+': '+d.value+(d.important?' !important':'')+';').join('\n')+'\n}';for(const a of [...r.atRules].reverse())s=a+' {\n'+s+'\n}';return s;});
 const active=[];css.walkDecls(d=>{if(!d.prop.startsWith(own))active.push(d);});const noCss=!active.length;
 const status=noCss?'no-css':review.length?'needs-review':'adapted';
 const ru=noCss?'Приём не содержит применяемых CSS-деклараций.':`Связи с темой проверены; изменений: ${changes.filter(x=>x.to!==null).length}. Используется штатных переменных: ${used.size}. Геометрия и механика эффекта сохранены.`;
 const en=noCss?'This technique contains no applied CSS declarations.':`Theme bindings reviewed; replacements: ${changes.filter(x=>x.to!==null).length}. Native variables used: ${used.size}. Effect geometry and mechanics are preserved.`;
 const data={format:1,obsidianVersion:'1.13.7',appCssSha256:sha,sourceArchive:'/Users/op/Library/Application Support/obsidian/obsidian-1.13.7.asar',sourceEntry:'app.css',defaultCss:'default.css',defaultRole:'reference-only',variables:[...used].sort(),status,nonNativeEffects,defaultGaps:blocks.length?'Reference covers matching stock category declarations, not every browser default or recipe selector.':'No matching stock declaration found; removal restores inherited/browser behavior.',summary:{ru:ru+(review.length?` Требуют отдельного решения: ${[...new Set(review.map(x=>x.kind))].join(', ')}; детали в baseline.json.`:''),en:en+(review.length?` Needs individual review: ${[...new Set(review.map(x=>x.kind))].join(', ')}; see baseline.json.`:'')},restore:{ru:'Удалите блок этого приёма или используйте Undo сразу после применения. default.css — справка, а не сброс пользовательских настроек.',en:'Remove the technique block or use Undo immediately after applying. default.css is reference only, not a reset of user settings.'},changes,review};
 fs.writeFileSync(path.join(dir,'recipe.css'),css.toString().trim()+'\n');
 fs.writeFileSync(path.join(dir,'default.css'),`/* REFERENCE ONLY. Obsidian 1.13.7 app.css\nSHA-256: ${sha}\nExact stock selectors, declarations and at-rule contexts; unrelated declarations omitted.\nCategory references do not prove selector equivalence or provide an installable reset. */\n\n`+(blocks.join('\n\n')||'/* No matching stock CSS declarations. */')+'\n');
 delete data.summary.en; delete data.restore.en;
 fs.writeFileSync(path.join(dir,'baseline.json'),JSON.stringify(data,null,2)+'\n');
 for(const lang of ['ru']){const p=path.join(dir,`${id}.md`);if(!fs.existsSync(p))continue;let s=fs.readFileSync(p,'utf8');const heading=lang==='ru'?'Опора на стандартную тему':'Default-theme baseline';s=s.replace(new RegExp('\\n## '+heading+'\\n[\\s\\S]*?(?=\\n## |$)'),'');s+='\n## '+heading+'\n\n'+data.summary[lang]+'\n\n'+(lang==='ru'?'[CSS стандартной темы](./default.css) · [Данные привязки и нерешённые случаи](./baseline.json)':'[Default theme CSS](./default.css) · [Bindings and unresolved cases](./baseline.json)')+'\n\n'+data.restore[lang]+'\n';writeCard(p,s);}
 report.push({id,group,status,variables:data.variables,changes:changes.length,review});
}
fs.writeFileSync(path.join(defaults,'atlas-native-migration.json'),JSON.stringify({version:'1.13.7',sha256:sha,recipes:report},null,2)+'\n');
const counts={};for(const r of report){const c=counts[r.group]??={total:0,adapted:0,review:0,noCss:0};c.total++;if(r.status==='adapted')c.adapted++;else if(r.status==='no-css')c.noCss++;else c.review++;}
let md='# Атлас — привязка к стандартной теме\n\nПроверены все '+report.length+' приёмов. Источник: установленный Obsidian 1.13.7, `app.css`, SHA-256 `'+sha+'`.\n\nЭто проход по CSS и его привязкам, а не визуальная приёмка всех эффектов. Геометрические значения, специальные шрифты и встроенные изображения требуют отдельных решений. Статус `adapted` означает отсутствие перечисленных автоматических признаков нерешённой палитры/шрифта; он не доказывает полноту всех возможных привязок.\n\n| Категория | Всего | Привязаны | Есть вопросы | Без CSS |\n|---|---:|---:|---:|---:|\n';for(const [g,c]of Object.entries(counts).sort())md+=`| ${g} | ${c.total} | ${c.adapted} | ${c.review} | ${c.noCss} |\n`;
md+='\n## Что изменено\n\n- Неиспользуемые локальные переменные удалены.\n- Именованные роли демонстрационной палитры переведены на переменные темы; цвет текста на акцентном фоне — на `--text-on-accent`.\n- Размеры шрифта в px/rem выражены через базовый размер текста или соответствующего заголовка. Коэффициент сохраняет исходный размер при базе 16px.\n- Числовой межстрочный интервал больше 1 выражен коэффициентом от штатного интервала; псевдоэлементы исключены как потенциальная геометрия значков.\n- Стандартные моноширинные семейства и именованные веса используют переменные.\n- В каждой карточке есть справочный default.css и машинный журнал baseline.json. Не все эффекты имеют штатный аналог.\n\n## Для дальнейшего обсуждения\n\nНе переведены механически: конкретные цвета вне именованных ролей; специально выбранные/встроенные шрифты; SVG и иконки; размеры и интервалы геометрии; числовые веса между штатными ступенями. Они могут быть сутью приёма. Список ниже покрывает обнаруженные цветовые, шрифтовые и встроенные зависимости; полный набор деклараций доступен в recipe.css.\n\n';
for(const r of report.filter(r=>r.review.length||r.status==='needs-font-decision'))md+=`- [${r.id}](../!%20hacks/${r.id}/${r.id}.md): ${[...new Set(r.review.map(x=>x.kind))].join(', ')||'font'} ([подробности](../!%20hacks/${r.id}/baseline.json)).\n`;
md+='\n## Возврат\n\ndefault.css содержит подлинные выдержки для сверки, его нельзя накладывать как сброс. Удаление блока приёма/Undo возвращает пользовательское оформление. Исходные recipe.css этого прохода сохранены в atlas-before-native.json. Установленные сниппеты не менялись.\n';
fs.writeFileSync(path.join(defaults,'Атлас — привязки.md'),md);console.log(JSON.stringify({recipes:report.length,counts,evidenceDeclarations:evidenceCount},null,2));
