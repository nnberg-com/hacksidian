import { expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { collectRecommendationParameters, recommendationParameterPatch } from '../src/recommendation-parameters';
import { parseModelDecision } from '../src/response';
import type { CatalogEntry } from '../src/catalog';
const css=readFileSync(new URL('../../content/atlas/! hacks/quote-dashed/recipe.css',import.meta.url),'utf8');
const entry: CatalogEntry={id:'quote-dashed',kind:'technique',title:'Пунктир',path:'atlas/! hacks/quote-dashed/quote-dashed.md',text:'Old index: parameters unavailable',applyAvailable:true};
const recommendation={id:entry.id,reason:'Left dashed quote border',instructions:'',parameterChanges:[
 {variable:'--hacksidian-quote-dashed-width',input:'4px'},
 {variable:'--hacksidian-quote-dashed-style',input:'dashed'},
]};
test('one search recommendation configures thick dashed quote border from fresh local fields',async()=>{
 const snapshots=await collectRecommendationParameters([entry],async()=>css);
 expect(snapshots[0].parameters).toHaveLength(2);
 const result=recommendationParameterPatch([recommendation],snapshots,[entry],[entry.id])!;
 expect(result.css).toContain('--hacksidian-quote-dashed-width: 4px');
 expect(result.css).toContain('--hacksidian-quote-dashed-style: dashed');
 expect(result.css).toContain('border-inline-start:');
});
test('refuses alternatives, nonretrieved entries, nontechniques, unknown fields and invalid values',async()=>{
 const snapshots=await collectRecommendationParameters([entry],async()=>css);
 for(const items of [
  [{...recommendation,parameterChanges:[{variable:'--arbitrary',input:'4px'}]}],
  [{...recommendation,parameterChanges:[{variable:'--hacksidian-quote-dashed-width',input:'999px'}]}],
 ])expect(()=>recommendationParameterPatch(items,snapshots,[entry],[entry.id])).toThrow();
 expect(()=>recommendationParameterPatch([recommendation],snapshots,[entry],[])).toThrow();
 expect(()=>recommendationParameterPatch([recommendation],snapshots,[{...entry,kind:'setting'}],[entry.id])).toThrow();
 expect(()=>recommendationParameterPatch([recommendation],[],[entry],[entry.id])).toThrow();
});
test('missing or malformed local CSS never authorizes preset fields; ordinary recommendations need no fields',async()=>{
 expect(await collectRecommendationParameters([entry],async()=>{throw Error('missing');})).toEqual([]);
 expect(await collectRecommendationParameters([entry],async()=>css.replace('@type select','@type unsupported'))).toEqual([]);
 expect(recommendationParameterPatch([{...recommendation,parameterChanges:[]}],[],[entry],[entry.id])).toBeNull();
});
test('strict response accepts one preset and rejects multiple preset alternatives or invalid batch shapes',()=>{
 const parse=(recommendations:unknown[])=>parseModelDecision({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({action:'recommend',message:'',recommendations})}]}]});
 expect(parse([recommendation]).recommendations[0].parameterChanges).toHaveLength(2);
 expect(parse([recommendation,{...recommendation,id:'other'}]).recommendations).toHaveLength(2);
 expect(recommendationParameterPatch([recommendation,{...recommendation,id:'other'}],[],[entry],[entry.id])).toBeNull();
 expect(()=>parse([{...recommendation,parameterChanges:[{variable:'x',input:4}]}])).toThrow();
 expect(()=>parse([{...recommendation,parameterChanges:[{variable:'x',input:'4',css:'body{}'}]}])).toThrow();
});
