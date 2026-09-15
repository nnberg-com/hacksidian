import { beforeEach, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS } from "../src/constants";
import { OpenAIResponsesProvider } from "../src/provider";

const { requestUrl } = vi.hoisted(() => ({ requestUrl: vi.fn() }));
vi.mock("obsidian", () => ({ requestUrl }));

beforeEach(() => vi.clearAllMocks());

it("completes an iteration with text and the current view image", async () => {
  const decision = {
    action: "no_change", message: "Готово.", modules: [], targetColoring: "",
  };
  requestUrl.mockResolvedValue({
    status: 200,
    json: {
      id: "resp_with_image", status: "completed",
      output: [{ content: [{ type: "output_text", text: JSON.stringify(decision) }] }],
    },
  });
  const provider = new OpenAIResponsesProvider({ ...DEFAULT_SETTINGS, apiKey: "test-key" });
  const result = await provider.createIteration({ instructions: "Instructions", prompt: "Markdown and CSS context", screenshotBase64: "cG5n" });
  const body = JSON.parse(requestUrl.mock.calls[0][0].body);
  expect(body.input).toEqual([
    { role: "user", content: [
      { type: "input_text", text: "Markdown and CSS context" },
      { type: "input_image", image_url: "data:image/png;base64,cG5n", detail: "high" },
    ] },
  ]);
  expect(result.decision).toEqual(decision);
  expect(result.responseId).toBe("resp_with_image");
});

it.each([false, true])("sends text only without an image (enabled=%s)", async (sendScreenshot) => {
  requestUrl.mockResolvedValue({status:200,json:{status:"completed",output:[{content:[{type:"output_text",text:JSON.stringify({action:"no_change",message:"",modules: [],targetColoring:""})}]}]}});
  const provider=new OpenAIResponsesProvider({...DEFAULT_SETTINGS,sendScreenshot,apiKey:"other-key",model:"custom-model"});
  await provider.createIteration({instructions:"Instructions",prompt:"Context",...(sendScreenshot ? {} : {screenshotBase64:"must-not-send"})});
  const request=requestUrl.mock.calls[0][0];
  const body=JSON.parse(request.body);
  expect(body.input[0].content).toEqual([{type:"input_text",text:"Context"}]);
  expect(body.model).toBe("custom-model");
  expect(request.headers.Authorization).toBe("Bearer other-key");
});

it.each(['google','xai','anthropic'] as const)('uses the correct %s API and normalizes usage',async(providerId)=>{
 const {createProvider}=await import('../src/provider');
 const decision={action:'no_change',message:'',modules: [],targetColoring:''};
 const claude=providerId==='anthropic';
 requestUrl.mockResolvedValue({status:200,json:claude ? {
   id:'claude-id',stop_reason:'end_turn',content:[{type:'text',text:JSON.stringify(decision)}],usage:{input_tokens:80,cache_read_input_tokens:20,output_tokens:10},
 } : {id:'chat-id',choices:[{finish_reason:'stop',message:{content:JSON.stringify(decision)}}],usage:{prompt_tokens:100,completion_tokens:10,total_tokens:110,prompt_tokens_details:{cached_tokens:20}}}});
 const provider=createProvider({...DEFAULT_SETTINGS,provider:providerId,apiKey:'provider-specific-key',model:'selected-model',autoPricing:false});
 const result=await provider.createIteration({instructions:'Instructions',prompt:'Context',screenshotBase64:'cG5n'});
 const req=requestUrl.mock.calls[0][0], body=JSON.parse(req.body);
 expect(req.url).toBe(claude ? 'https://api.anthropic.com/v1/messages' : providerId==='google' ? 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions' : 'https://api.x.ai/v1/chat/completions');
 expect(body.model).toBe('selected-model');
 expect(claude ? body.output_config.format.type : body.response_format.type).toBe('json_schema');
 expect(req.headers[claude?'x-api-key':'Authorization']).toBe(claude?'provider-specific-key':'Bearer provider-specific-key');
 expect(JSON.stringify(body)).toContain('cG5n');
 expect(result.usage).toMatchObject({inputTokens:100,cachedInputTokens:20,outputTokens:10,totalTokens:110});
 expect(result.decision).toEqual(decision);
});

it.each(['google','xai','anthropic'] as const)('rejects truncated %s output',async(provider)=>{
 const {createProvider}=await import('../src/provider');
 requestUrl.mockResolvedValue({status:200,json:provider==='anthropic'?{stop_reason:'max_tokens'}:{choices:[{finish_reason:'length'}]}});
 await expect(createProvider({...DEFAULT_SETTINGS,provider,apiKey:'key',model:'model'}).createIteration({instructions:'',prompt:''})).rejects.toThrow('лимиту');
});

it.each(['openai','google','xai','anthropic'] as const)('saves %s usage before rejecting a truncated paid response',async(provider)=>{
 const {createProvider}=await import('../src/provider');
 const body=provider==='openai'?{id:'paid',status:'incomplete',incomplete_details:{reason:'max_output_tokens'},usage:{input_tokens:100,output_tokens:20}}
 :provider==='anthropic'?{id:'paid',stop_reason:'max_tokens',usage:{input_tokens:100,output_tokens:20}}
 :{id:'paid',choices:[{finish_reason:'length'}],usage:{prompt_tokens:100,completion_tokens:20}};
 requestUrl.mockResolvedValue({status:200,json:body});
 const onUsage=vi.fn(async()=>{});
 await expect(createProvider({...DEFAULT_SETTINGS,provider,apiKey:'test',model:'test',autoPricing:false}).createIteration({instructions:'',prompt:'',onUsage})).rejects.toThrow();
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({inputTokens:100,outputTokens:20,estimatedCostUsd:0.00044}),'paid');
});
it('records usage before rejecting malformed structured output',async()=>{
 requestUrl.mockResolvedValue({status:200,json:{id:'bad',status:'completed',usage:{input_tokens:10,output_tokens:2},output:[{content:[{type:'output_text',text:'invalid'}]}]}});
 const onUsage=vi.fn(async()=>{});
 await expect(new OpenAIResponsesProvider({...DEFAULT_SETTINGS,apiKey:'test'}).createIteration({instructions:'',prompt:'',onUsage})).rejects.toThrow();
 expect(onUsage).toHaveBeenCalledWith(expect.objectContaining({inputTokens:10,outputTokens:2}),'bad');
});

it.each(['openai', 'google', 'xai', 'anthropic'] as const)(
  'allows one clarification and removes that action on the answer for %s',
  async (providerId) => {
    const { createProvider } = await import('../src/provider');
    const decision = { action: 'no_change', message: 'Done', modules: [], targetColoring: '' };
    const text = JSON.stringify(decision);
    requestUrl.mockResolvedValue({ status: 200, json: providerId === 'openai'
      ? { status: 'completed', output: [{ content: [{ type: 'output_text', text }] }] }
      : providerId === 'anthropic'
        ? { stop_reason: 'end_turn', content: [{ type: 'text', text }] }
        : { choices: [{ finish_reason: 'stop', message: { content: text } }] } });
    const provider = createProvider({ ...DEFAULT_SETTINGS, provider: providerId, apiKey: 'test', model: 'test' });
    for (const allowClarification of [true, false, true]) {
      await provider.createIteration({ instructions: '', prompt: '', allowClarification });
      const body = JSON.parse(requestUrl.mock.calls.at(-1)![0].body);
      const schema = providerId === 'openai' ? body.text.format.schema
        : providerId === 'anthropic' ? body.output_config.format.schema : body.response_format.json_schema.schema;
      expect(schema.properties.action.enum.includes('ask_question')).toBe(allowClarification);
      expect(schema.properties.action.enum).toContain('update_css');
    }
  },
);
