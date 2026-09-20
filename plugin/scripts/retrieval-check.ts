/** Tests the installed catalog without applying styles or mutating remote files.
 * --live makes paid model calls; every receipt is saved before validation. */
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {OpenAIResponsesProvider} from '../src/provider';
import {DEFAULT_SETTINGS} from '../src/constants';
import {SYSTEM_PROMPT,buildTurnPrompt} from '../src/prompt';
import {lexicalCandidates} from '../src/catalog-search';
import {collectRecommendationParameters} from '../src/recommendation-parameters';
import {loadPricing} from '../src/pricing';
const vault=process.env.HACKSIDIAN_VAULT;
if(!vault || !path.isAbsolute(vault)) throw Error('Set HACKSIDIAN_VAULT');
const output=process.env.HACKSIDIAN_REPORT || '/private/tmp/hacksidian-retrieval-check.json';
const config=JSON.parse(await readFile(path.join(vault,'.obsidian/plugins/hacksidian/data.json'),'utf8'));
const catalog=config.catalog.active;
const settings={...DEFAULT_SETTINGS,...config.settings};
const cases=[
 {query:"Хочу, чтобы некоторые callout'ы (специально оформленные) отображались как диалоги в чате. Сделай.",id:'callout-dialogue',command:'apply'},
 {query:'Покажи оформление специальных выносок как переписку двух собеседников, ничего не применяй.',id:'callout-dialogue',command:'show'},
 {query:'Style selected callouts as a chat conversation with alternating speech bubbles. Apply it.',id:'callout-dialogue',command:'apply'},
 {query:'Сделай так, чтобы выделения (подсветка) в тексте были немного наискосок, как будто маркером.',id:'emphasis-s19',command:'apply'},
 {query:'Хочу посмотреть подсветку, словно провели фломастером чуть под углом. Ничего не применяй.',id:'emphasis-s19',command:'show'},
 {query:'Make highlighted words look like a slightly slanted highlighter stroke.',id:'emphasis-s19',command:'apply'},
 {query:'Сделай подчёркивание ссылок волнистым.',id:'link-e023',command:'apply'},
 {query:'Спрячь свойства страницы при чтении.',id:'metadata-hide-reading',command:'apply'},
];
const report:any={createdAt:new Date().toISOString(),revision:catalog.revision,model:settings.model,scope:'selected installed catalog; no style changes',results:[]};
const save=()=>writeFile(output,JSON.stringify(report,null,2));
await save();
const live=process.argv.includes('--live');
if(live && settings.autoPricing) settings.pricing=await loadPricing('openai',settings.model,settings.pricing);
const parameters=live ? await collectRecommendationParameters(catalog.entries,p=>readFile(path.join(vault,p),'utf8')) : [];
for(const test of cases){
 const result:any={...test,lexicalIds:lexicalCandidates(test.query,catalog.entries).map(e=>e.id)};
 report.results.push(result);await save();
 if(live){
  try {
   const response=await new OpenAIResponsesProvider(settings).createIteration({instructions:SYSTEM_PROMPT,userText:test.query,catalog,
    prompt:buildTurnPrompt({userText:test.query,interfaceLanguage:'ru',revision:catalog.revision,conversation:[],parameterContext:parameters.map(({id,title,parameters})=>({id,title,parameters}))}),
    onUsage:async(usage,responseId)=>{result.receipts ??= []; result.receipts.push({usage,responseId});Object.assign(result,{usage,responseId});await save();},
   });
   Object.assign(result,response);
   const rec=response.decision.recommendations.find(r=>r.id===test.id);
   result.passed=response.decision.action==='recommend' && !!rec && rec.command===test.command;
  } catch(e){result.error=String(e);result.passed=false;}
 }
 await save();console.log(JSON.stringify({query:test.query,lexicalRank:result.lexicalIds.indexOf(test.id)+1,passed:result.passed,decision:result.decision,error:result.error}));
}
if(live && report.results.some((r:any)=>!r.passed))process.exitCode=1;
