/** Read-only source export; --live makes paid OpenAI calls against a temporary
 * catalog and removes only the resources it created. Never edits plugin data. */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { collectCatalog } from '../src/catalog-source';
import { CatalogApi, syncCatalog, cleanCatalogGarbage } from '../src/catalog-api';
import { buildCatalog, type CatalogState } from '../src/catalog';
import { OpenAIResponsesProvider } from '../src/provider';
import { buildTurnPrompt, SYSTEM_PROMPT } from '../src/prompt';
import { DEFAULT_SETTINGS } from '../src/constants';
import { setLanguageResolver } from '../i18n';
import { loadPricing } from '../src/pricing';
setLanguageResolver(()=>'ru');
const vault = process.env.HACKSIDIAN_VAULT || '/Users/op/vaults/op';
const output = process.env.HACKSIDIAN_REPORT || '/private/tmp/hacksidian-catalog-check.json';
const config=JSON.parse(await readFile(path.join(vault,'.obsidian/plugins/hacksidian/data.json'),'utf8'));
const settings={...DEFAULT_SETTINGS,...config.settings};
if(settings.provider!=='openai') throw Error('Select OpenAI in the plugin first.');
const root=settings.atlasFolder;
const files=[];
for(const entry of await readdir(path.join(vault,root,'! hacks'),{withFileTypes:true})) {
 if(entry.isDirectory())files.push({path:`${root}/! hacks/${entry.name}/${entry.name}.md`,basename:entry.name});
}
const sourceCatalog=await collectCatalog({read:relative=>readFile(path.join(vault,relative),'utf8')},files,root,settings.globalVariablesFile);
const smoke=process.argv.includes('--smoke');
const catalog=smoke ? buildCatalog(sourceCatalog.entries.filter(entry=>['setting-accent','image-e016'].includes(entry.id))) : sourceCatalog;
const report:any={scope:smoke?'two-record protocol smoke':'full local atlas',revision:catalog.revision,entries:catalog.entries.length,documents:catalog.documents.length,bytes:Buffer.byteLength(catalog.documents.map(doc=>doc.text).join('')),kinds:Object.fromEntries(['technique','setting','variable'].map(kind=>[kind,catalog.entries.filter(entry=>entry.kind===kind).length])),results:[]};
await writeFile(output,JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
if(process.argv.includes('--live')) {
 const api=new CatalogApi(settings.apiKey), state:CatalogState={garbage:[]};
 const journal=output+'.resources.json';
 let saving=Promise.resolve();
 const save=()=>{ const json=JSON.stringify(state,null,2); saving=saving.then(()=>writeFile(journal,json));return saving; };
 try {
  const snapshot=await syncCatalog(api,state,catalog,save,(n,total)=>{if(n%25===0||n===total)console.log(`Catalog files: ${n}/${total}`);});
  try { settings.pricing=await loadPricing('openai',settings.model); } catch {settings.pricing=undefined;}
  let total=0;
  for(const userText of (smoke ? ['Скругляй уголки у фотографий','Хочу изменить акцентный цвет'] : ['Как мне сделать текст в несколько колонок?','Хочу показывать timeline','Скругляй уголки у фотографий','Показывай иконку перед ссылкой на PDF-файл','Хочу изменить акцентный цвет','Покажи живую погоду в заметке без интернета'])) {
   if(total>0.50)throw Error('Smoke test spending cap reached');
   const row:any={query:userText};
   report.results.push(row);
   try {
    const result=await new OpenAIResponsesProvider(settings).createIteration({instructions:SYSTEM_PROMPT,prompt:buildTurnPrompt({userText,interfaceLanguage:'ru',conversation:[],revision:snapshot.revision}),catalog:snapshot,onUsage:async(usage,id)=>{row.usage=usage;row.responseId=id;total+=usage.estimatedCostUsd??0;await writeFile(output,JSON.stringify(report,null,2));}});
    Object.assign(row,result);
   }catch(error){row.error=String(error);}
   await writeFile(output,JSON.stringify(report,null,2));
   console.log(JSON.stringify(row));
  }
 }finally{
  if(state.active){state.garbage.push({storeId:state.active.storeId,fileIds:state.active.documents.map(doc=>doc.fileId!)});delete state.active;}
  if(state.pending){state.garbage.push(state.pending);delete state.pending;}
  await save();await cleanCatalogGarbage(api,state,save);
  report.cleanupPending=state.garbage.length;await writeFile(output,JSON.stringify(report,null,2));
 }
}
