import { beforeEach, expect, it, vi } from 'vitest';
import { DEFAULT_SETTINGS } from '../src/constants';
import { OpenAIResponsesProvider, createProvider } from '../src/provider';
import type { CatalogSnapshot } from '../src/catalog';
const { requestUrl } = vi.hoisted(() => ({ requestUrl: vi.fn() }));
vi.mock('obsidian', () => ({ requestUrl }));
export const catalog: CatalogSnapshot = { revision:'v1',createdAt:'now',storeId:'vs_test',entries:[{id:'image-round',title:'Round',kind:'technique',path:'atlas/image-round.md',text:'Rounded photos'}],documents:[{name:'images.md',hash:'h',text:'',fileId:'file_test'}] };
const request = {instructions:'Instructions',prompt:'Round photos',catalog};
const decision = {action:'recommend',message:'Found',recommendations:[{id:'image-round',reason:'Rounded corners',instructions:'Open card'}]};
function body(text = JSON.stringify(decision), file = 'file_test') {
 return {id:'paid',status:'completed',usage:{input_tokens:100,output_tokens:20},output:[
  {type:'file_search_call',status:'completed',queries:['round photos'],results:[{file_id:file,text:'# ID: image-round\nRounded photos'}]},
  {type:'message',content:[{type:'output_text',text}]},
 ]};
}
beforeEach(()=>vi.clearAllMocks());
it('searches the selected snapshot; sends only text and never exposes CSS actions',async()=>{
 requestUrl.mockResolvedValue({status:200,json:body()});
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test',autoPricing:false,sendScreenshot:true}).createIteration(request);
 const payload=JSON.parse(requestUrl.mock.calls[0][0].body);
 expect(payload.tools).toEqual([{type:'file_search',vector_store_ids:['vs_test'],max_num_results:6}]);
 expect(payload.include).toEqual(['file_search_call.results']);expect(payload.tool_choice).toBe('required');
 expect(payload.input[0].content).toEqual([{type:'input_text',text:'Round photos'}]);
 expect(payload.text.format.schema.properties.action.enum).toEqual(['recommend','ask_question','no_match']);
 expect(result.retrievedIds).toEqual(['image-round']);expect(result.searchQueries).toEqual(['round photos']);
 expect(result.usage.estimatedCostUsd).toBeCloseTo(0.00294);expect(result.usage.fileSearchCalls).toBe(1);
});
it.each(['unknown-id','image-round'])('rejects ungrounded recommendation %s after recording usage',async(id)=>{
 const value={...decision,recommendations:[{...decision.recommendations[0],id}]};
 requestUrl.mockResolvedValue({status:200,json:body(JSON.stringify(value),'foreign-file')});
 const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,onUsage})).rejects.toThrow('источника');
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({fileSearchCostUsd:0.0025}),'paid');
});
it.each(['invalid',JSON.stringify({action:'update_css',message:'done',modules:[],targetColoring:''})])('rejects malformed or legacy output and retains paid receipt',async(text)=>{
 requestUrl.mockResolvedValue({status:200,json:body(text)});const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,onUsage})).rejects.toThrow();
 expect(onUsage).toHaveBeenCalled();
});
it('retains usage on truncated responses',async()=>{
 requestUrl.mockResolvedValue({status:200,json:{...body(),status:'incomplete',incomplete_details:{reason:'max_output_tokens'}}});
 const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,onUsage})).rejects.toThrow('лимиту');
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({inputTokens:100,outputTokens:20}),'paid');
});
it.each(['ask_question','no_match'])('allows %s with no invented recommendations',async(action)=>{
 requestUrl.mockResolvedValue({status:200,json:body(JSON.stringify({action,message:'Explain',recommendations:[]}))});
 expect((await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request)).decision.action).toBe(action);
});
it('rejects an answer without a completed search',async()=>{
 requestUrl.mockResolvedValue({status:200,json:{...body(),output:body().output.slice(1)}});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request)).rejects.toThrow('поиск');
});
it('rejects retired providers',()=>expect(()=>createProvider({...DEFAULT_SETTINGS,provider:'google'})).toThrow('OpenAI only'));


it('identifies a retrieved card from its single-record file when the chunk lacks an ID heading',async()=>{
 const response=body();response.output[0].results![0].text='Rounded photos; no heading in this chunk';
 requestUrl.mockResolvedValue({status:200,json:response});
 const snapshot={...catalog,documents:[{...catalog.documents[0],entryId:'image-round'}]};
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,catalog:snapshot});
 expect(result.retrievedIds).toEqual(['image-round']);
});


it('does not treat another ID mentioned inside a single-record file as a retrieved card',async()=>{
 const response=body();response.output[0].results![0].text='# ID: image-round\n# ID: unrelated';
 requestUrl.mockResolvedValue({status:200,json:response});
 const snapshot={...catalog,entries:[...catalog.entries,{...catalog.entries[0],id:'unrelated'}],documents:[{...catalog.documents[0],entryId:'image-round'}]};
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,catalog:snapshot});
 expect(result.retrievedIds).toEqual(['image-round']);
});
it('rejects a response exposed to an obsolete file even alongside a current file for the same card',async()=>{
 const response=body();
 (response.output[0] as any).results.push({file_id:'old-file',text:'# ID: image-round\nOutdated instructions'});
 requestUrl.mockResolvedValue({status:200,json:response});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request)).rejects.toThrow('источника');
});

it('parameter requests use structured values without file search or a catalog dependency', async()=>{
 const value={action:'update_parameters',message:'Thicker',changes:[{variable:'--hacksidian-hr-e070-height',input:'4'}]};
 requestUrl.mockResolvedValue({status:200,json:{...body(JSON.stringify(value)),output:body(JSON.stringify(value)).output.slice(1)}});
 const onUsage=vi.fn(async()=>{});
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createParameterIteration({instructions:'Adjust',prompt:'Thicker',onUsage});
 const payload=JSON.parse(requestUrl.mock.calls[0][0].body);
 expect(payload.tools).toBeUndefined();expect(payload.tool_choice).toBeUndefined();
 expect(payload.text.format.schema.properties.action.enum).toContain('update_parameters');
 expect(result.decision).toEqual(value);expect(result.usage.fileSearchCalls).toBe(0);
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({fileSearchCostUsd:0}),'paid');
});
it('invalid paid parameter responses still retain usage',async()=>{
 requestUrl.mockResolvedValue({status:200,json:{...body('invalid'),output:body('invalid').output.slice(1)}});
 const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createParameterIteration({instructions:'Adjust',prompt:'Thicker',onUsage})).rejects.toThrow();
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({inputTokens:100}),'paid');
});

it('accepts a recorded replacement during incomplete sync without trusting foreign files',async()=>{
 const {searchableCatalog}=await import('../src/catalog');
 const partial=searchableCatalog({garbage:[],active:catalog,sync:{storeId:catalog.storeId,entries:catalog.entries,documents:[{name:'new',hash:'new',text:'',entryId:'image-round',fileId:'replacement'}]}})!;
 requestUrl.mockResolvedValue({status:200,json:body(JSON.stringify(decision),'replacement')});
 const provider=new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'});
 expect((await provider.createIteration({...request,catalog:partial})).retrievedIds).toEqual(['image-round']);
 requestUrl.mockResolvedValue({status:200,json:body(JSON.stringify(decision),'foreign')});
 await expect(provider.createIteration({...request,catalog:partial})).rejects.toThrow('источника');
});
