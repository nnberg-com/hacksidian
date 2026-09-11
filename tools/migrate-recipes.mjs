// Offline migration only. Runtime consumers read recipe.css without transforms.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(repo, 'plugin/package.json'));
const postcss = require('postcss');
const { buildSync } = require('esbuild');
const source = process.env.HACKSIDIAN_ATLAS || '/Users/op/vaults/op/! P R O/hacksidian/atlas';
const root = path.join(source, '! hacks');
const reportPath = path.join(repo, 'build/recipe-migration-report.json');
const backup = path.join(repo, 'build/recipe-migration-originals');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'hacksidian-converter-'));
buildSync({entryPoints:[path.join(repo,'tools/recipe-migration/legacy-compiler.ts')],bundle:true,alias:{postcss:require.resolve('postcss')},platform:'node',format:'cjs',outfile:path.join(temporary,'compiler.cjs')});
const {compileHack} = require(path.join(temporary,'compiler.cjs'));
const host = ':is(.markdown-preview-view, .markdown-source-view)';
const escapedHost = host.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const block = '(?:p|h[1-6]|ul|ol|blockquote|pre|table|hr)';
function adapt(selector, changes) {
  let s = selector.replaceAll('.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)', host)
    .replaceAll('.markdown-source-view.mod-cm6.callmered-coloring', '.markdown-source-view.mod-cm6')
    .replaceAll('.callmered-coloring', host);
  // Root lists are semantic lists, independent of Reading-view block wrappers.
  const list = new RegExp(escapedHost + '\\s*>\\s*(ul|ol)\\b', 'g');
  const lists = s.replace(list, (_, tag) => `${host} ${tag}:not(li ${tag})`);
  if (lists !== s) { changes.add('top-level-lists'); s = lists; }
  const variants = [s];
  // Preserve flat/nested HTML selectors and add the equivalent native block path.
  let wrapped = s;
  const hasSibling = new RegExp(`\\b(${block}):has\\(\\s*([+~])\\s*(${block})\\s*\\)`, 'g');
  wrapped = wrapped.replace(hasSibling, (_, a, op, b) => `.el-${a}:has(${op} .el-${b}) > ${a}`);
  const chain = new RegExp(`\\b${block}(?:\\s*[+~]\\s*${block})+\\b`, 'g');
  wrapped = wrapped.replace(chain, value => {
    const tags = value.match(new RegExp(block, 'g'));
    return value.replace(new RegExp('\\b' + block + '\\b', 'g'), tag => '.el-' + tag) + ' > ' + tags.at(-1);
  });
  const direct = new RegExp(escapedHost + '\\s*>\\s*(p|h[1-6]|blockquote|pre|table|hr)(?=[:.#\\s>+~\\[]|$)(:first-child|:last-child)?', 'g');
  wrapped = wrapped.replace(direct, (_, tag, position) => {
    const filter = position === ':first-child' ? `:not(.el-${tag} ~ .el-${tag})`
      : position === ':last-child' ? `:not(:has(~ .el-${tag}))` : '';
    return `${host} .el-${tag}${filter} > ${tag}`;
  });
  // A direct child in the flat sample is a block inside the native sizer.
  wrapped = wrapped.replace(new RegExp(escapedHost + '\\s*>\\s*(?=\\.el-)', 'g'), host + ' ');
  if (wrapped !== s) { variants.push(wrapped); changes.add('native-block-wrappers'); }
  return variants;
}
const nativeNames = new Set(JSON.parse(fs.readFileSync(path.join(repo,'tools/recipe-migration/obsidian-variables.json'),'utf8')).names);
const refine = process.argv.includes('--from-backup');
const plans = [], report = {source, total:0, withCss:0, withoutCss:0, migrated:0, existing:0, recipes:[]};
try {
 for (const id of fs.readdirSync(root).sort()) {
  const directory = path.join(root,id);
  const inputDirectory=refine&&fs.existsSync(path.join(backup,id,'hack.json'))?path.join(backup,id):directory;
  const specFile=path.join(inputDirectory,'hack.json');
  if(!fs.existsSync(specFile))continue;
  const spec=JSON.parse(fs.readFileSync(specFile,'utf8'));
  report.total++; report[spec.hasCss?'withCss':'withoutCss']++;
  if(spec.format===2){report.existing++;report.recipes.push({id,status:'existing',hasCss:spec.hasCss});continue;}
  const template=fs.readFileSync(path.join(inputDirectory,'recipe.template.css'),'utf8');
  const dependencies=fs.readFileSync(path.join(inputDirectory,'dependencies.template.css'),'utf8');
  const changes=new Set();
  const css=postcss.parse(spec.hasCss?compileHack({id,spec,template,dependencies:spec.group==='interface'?'':dependencies}):'');
  css.walkRules(rule=>{
   let parent=rule.parent;while(parent){if(parent.type==='atrule'&&/keyframes$/i.test(parent.name))return;parent=parent.parent;}
   rule.selectors=[...new Set(rule.selectors.flatMap(selector=>adapt(selector,changes)))];
  });
  const result=(css.toString().trim()+(spec.hasCss?'\n':''))
    .replace(new RegExp('--hack-'+id+'-([a-zA-Z_][\\w-]*)','g'),(full,name)=>nativeNames.has('--'+name)?'--'+name:full);
  if(result.includes('{{')||result.includes('.callmered-coloring')||/\.atlas-[\w-]+/.test(result))throw new Error(id+': unresolved scope');
  postcss.parse(result);
  const requirements=(spec.requirements||[]).map(text=>text.replace(', помимо callmered-coloring',''));
  const previewDirectory=path.join(repo,'build/recipe-migration-preview',id);
  fs.mkdirSync(previewDirectory,{recursive:true});fs.writeFileSync(path.join(previewDirectory,'recipe.css'),result);
  const next={format:2,target:spec.target,hasCss:spec.hasCss,...(spec.group?{group:spec.group}:{}),...(requirements.length?{requirements}:{})};
  const writes=new Map([['recipe.css',result],['hack.json',JSON.stringify(next,null,2)+'\n']]);
  const common=id+'.md';
  writes.set(common,fs.readFileSync(path.join(directory,common),'utf8').replaceAll('recipe.template.css','recipe.css'));
  for(const name of ['Description.ru.md','Description.en.md']){
   const file=path.join(directory,name);if(!fs.existsSync(file))continue;
   let description=fs.readFileSync(file,'utf8').replaceAll('recipe.template.css','recipe.css').replaceAll('[Шаблон CSS]','[CSS приёма]');
   const prose=name.includes('.ru.')
    ? '## Использование в Obsidian\n\n`recipe.css` — единый CSS приёма. Атлас подключает его без изменений в изолированный пример; кнопка «Применить hack» записывает тот же CSS в целевой сниппет. Дополнительный класс заметки для подключения не нужен. Селекторы самого приёма определяют нужные элементы и режим Obsidian. Повторное применение обновляет блок; Undo возвращает предыдущий CSS.\n\n'
    : '## Usage in Obsidian\n\n`recipe.css` is the single CSS source. The atlas includes it unchanged in an isolated example; Apply hack writes the same CSS to the target snippet. No extra activation class is required. The recipe selectors determine the target elements and Obsidian mode. Applying again updates the block; Undo restores the previous CSS.\n\n';
   description=description.replace(/## (?:Использование в Obsidian|Usage in Obsidian|Using in Obsidian)\n[\s\S]*?(?=\n## |$)/g,prose.trimEnd());
   writes.set(name,description);
  }
  const review=[];
  if(spec.group==='interface')review.push('interface-controls');
  if(spec.group==='metadata')review.push('properties-or-editor');
  if(/\.cm-|\.cm-line/.test(result))review.push('editor-dom');
  if(/:target|:hover|:focus|:checked|@keyframes|@container/.test(result))review.push('interactive-state');
  if(/\.lightbox|\.expand-panel|\.map-gate|\.embed-box|\.toggle\b/.test(result))review.push('custom-html');
  if(/:nth-|:first-child|:last-child|\s[+~]\s/.test(result))review.push('document-structure');
  report.recipes.push({id,status:'migrated',hasCss:spec.hasCss,bytes:Buffer.byteLength(result),changes:[...changes],manualReview:review});
  report.migrated++;plans.push({id,directory,writes,remove:['recipe.template.css','dependencies.template.css','preview.css']});
 }
 fs.mkdirSync(path.dirname(reportPath),{recursive:true});
 fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
 if(process.argv.includes('--apply')){
  // Snapshot every touched original before changing any source files.
  for(const plan of plans){
   const dest=path.join(backup,plan.id);fs.mkdirSync(dest,{recursive:true});
   for(const name of new Set([...plan.writes.keys(),...plan.remove])){
    const file=path.join(plan.directory,name);if(fs.existsSync(file)&&!refine)fs.copyFileSync(file,path.join(dest,name),fs.constants.COPYFILE_EXCL);
   }
  }
  for(const plan of plans){
   for(const [name,text] of plan.writes)fs.writeFileSync(path.join(plan.directory,name),text);
   for(const name of plan.remove)fs.rmSync(path.join(plan.directory,name),{force:true});
  }
 }
 console.log(JSON.stringify({...report,recipes:undefined,applied:process.argv.includes('--apply'),reportPath}));
} finally {fs.rmSync(temporary,{recursive:true,force:true});}
