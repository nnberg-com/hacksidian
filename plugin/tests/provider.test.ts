import { beforeEach, expect, it, vi } from 'vitest';
import { DEFAULT_SETTINGS } from '../src/constants';
import { OpenAIResponsesProvider } from '../src/provider';
import type { CatalogSnapshot } from '../src/catalog';
const { requestUrl } = vi.hoisted(() => ({ requestUrl: vi.fn() }));
vi.mock('obsidian', () => ({ requestUrl }));
const catalog: CatalogSnapshot = {revision:'v1',createdAt:'now',storeId:'vs_test',entries:[{id:'image-round',title:'Round',kind:'technique',path:'atlas/image-round.md',text:'Rounded photos',applyAvailable:true}],documents:[{name:'images.md',hash:'h',text:'',fileId:'file_test',entryId:'image-round'}]};
const request={instructions:'Instructions',prompt:'Round photos',userText:'Round photos',catalog};
const decision={action:'recommend',message:'',clarificationId:'',recommendations:[{id:'image-round',reason:'Rounded corners',instructions:''}]};
function body(text=JSON.stringify(decision)) { return {id:'paid',status:'completed',usage:{input_tokens:100,output_tokens:20},output:[{type:'message',content:[{type:'output_text',text}]}]}; }
const hit={file_id:'file_test',score:.7,content:[{type:'text',text:'partial chunk'}]};
beforeEach(()=>vi.resetAllMocks());
function plan(){requestUrl.mockResolvedValueOnce({status:200,json:{...body(JSON.stringify({queries:['Скругление фото','Rounded photos']})),id:'plan'}});}
function search(data:any[]=[hit]) { plan();requestUrl.mockResolvedValueOnce({status:200,json:{data,search_query:'rounded images'}}); }
it('retrieves 50 semantic hits then gives full grounded records to the model',async()=>{
 search();requestUrl.mockResolvedValueOnce({status:200,json:body()});
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test',autoPricing:false}).createIteration(request);
 expect(JSON.parse(requestUrl.mock.calls[1][0].body)).toEqual({query:['Round photos','Скругление фото','Rounded photos'],rewrite_query:true,max_num_results:50});
 const payload=JSON.parse(requestUrl.mock.calls[2][0].body);
 expect(payload.tools).toBeUndefined();expect(payload.input[0].content[0].text).toContain('Rounded photos');
 expect(result.retrievedIds).toEqual(['image-round']);expect(result.searchQueries).toEqual(['Round photos','Скругление фото','Rounded photos','rounded images']);
 expect(result.usage.fileSearchCostUsd).toBe(0);expect(result.usage.estimatedCostUsd).toBeCloseTo(.00088);
});
it('lexical retrieval rescues a semantic miss without an explicit ID',async()=>{
 search([]);requestUrl.mockResolvedValueOnce({status:200,json:body()});
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request);
 expect(result.retrievedIds).toContain('image-round');
});
it('exact IDs survive empty semantic results',async()=>{
 search([]);requestUrl.mockResolvedValueOnce({status:200,json:body()});
 expect((await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,userText:'image-round — подходит?'})).retrievedIds).toContain('image-round');
});
it('foreign or obsolete search files fail before the decision call',async()=>{
 search([{...hit,file_id:'foreign'}]);
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request)).rejects.toThrow('obsolete');
 expect(requestUrl).toHaveBeenCalledTimes(2);
});
it('network search failures never become no_match',async()=>{
 plan();requestUrl.mockResolvedValueOnce({status:500,json:{}});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request)).rejects.toThrow();
 expect(requestUrl).toHaveBeenCalledTimes(2);
});
it.each(['invalid',JSON.stringify({...decision,recommendations:[{...decision.recommendations[0],id:'invented'}]}),JSON.stringify({action:'ask_question',message:'Which?',recommendations:[],clarificationId:'invented'})])('rejects invalid or ungrounded paid decisions, preserving usage',async(text)=>{
 search();requestUrl.mockResolvedValueOnce({status:200,json:body(text)});const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,onUsage})).rejects.toThrow();
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({inputTokens:200}),'paid');
});
it('truncated responses preserve the paid receipt',async()=>{
 search();requestUrl.mockResolvedValueOnce({status:200,json:{...body(),status:'incomplete',incomplete_details:{reason:'max_output_tokens'}}});const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,onUsage})).rejects.toThrow();expect(onUsage).toHaveBeenCalledTimes(2);
});
it('parameter requests use structured values without file search or a catalog dependency', async()=>{
 const value={action:'update_parameters',message:'Thicker',changes:[{variable:'--hacksidian-hr-e070-height',input:'4'}]};
 requestUrl.mockResolvedValue({status:200,json:{...body(JSON.stringify(value)),output:body(JSON.stringify(value)).output}});
 const onUsage=vi.fn(async()=>{});
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createParameterIteration({instructions:'Adjust',prompt:'Thicker',onUsage});
 const payload=JSON.parse(requestUrl.mock.calls[0][0].body);
 expect(payload.tools).toBeUndefined();expect(payload.tool_choice).toBeUndefined();
 expect(payload.text.format.schema.properties.action.enum).toContain('update_parameters');
 expect(result.decision).toEqual(value);expect(result.usage.fileSearchCalls).toBe(0);
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({fileSearchCostUsd:0}),'paid');
});
it('invalid paid parameter responses still retain usage',async()=>{
 requestUrl.mockResolvedValue({status:200,json:{...body('invalid'),output:body('invalid').output}});
 const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createParameterIteration({instructions:'Adjust',prompt:'Thicker',onUsage})).rejects.toThrow();
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({inputTokens:100}),'paid');
});

it('records planning cost when retrieval fails before the decision call',async()=>{
 plan();requestUrl.mockResolvedValueOnce({status:503,json:{}});const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test',autoPricing:false}).createIteration({...request,onUsage})).rejects.toThrow();
 expect(onUsage).toHaveBeenCalledOnce();expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({inputTokens:100,estimatedCostUsd:.00044}),'plan');
});
it('rejects malformed expansion before search and keeps its paid receipt',async()=>{
 requestUrl.mockResolvedValueOnce({status:200,json:body(JSON.stringify({queries:[]}))});const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({...request,onUsage})).rejects.toThrow();
 expect(requestUrl).toHaveBeenCalledTimes(1);expect(onUsage).toHaveBeenCalledOnce();
});

it('returns a grounded near match even when no exact technique fits',async()=>{
 search();requestUrl.mockResolvedValueOnce({status:200,json:body(JSON.stringify({action:'no_match',message:'No exact match',recommendations:[],clarificationId:'',alternatives:[{id:'image-round',reason:'Only affects images, not text.'}]}))});
 const result=await new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request);
 expect(result.decision.alternatives?.[0].id).toBe('image-round');
});
it.each([
 [{id:'invented',reason:'Wrong ID'}],
 [{id:'image-round',reason:'Wrong effect',command:'apply'}],
 [{id:'image-round',reason:'One'},{id:'image-round',reason:'Duplicate'}],
].map(alternatives=>({alternatives})))('rejects invented, executable or duplicate near matches',async ({alternatives})=>{
 search();requestUrl.mockResolvedValueOnce({status:200,json:body(JSON.stringify({action:'no_match',message:'No',recommendations:[],alternatives}))});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration(request)).rejects.toThrow();
});
