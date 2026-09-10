import { beforeEach, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS } from "../src/constants";
import { OpenAIResponsesProvider } from "../src/provider";

const { requestUrl } = vi.hoisted(() => ({ requestUrl: vi.fn() }));
vi.mock("obsidian", () => ({ requestUrl }));

beforeEach(() => vi.clearAllMocks());

it("completes an iteration with text and the current view image", async () => {
  const decision = {
    action: "no_change", message: "Готово.", css: "", moduleId: "", targetColoring: "",
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
  requestUrl.mockResolvedValue({status:200,json:{status:"completed",output:[{content:[{type:"output_text",text:JSON.stringify({action:"no_change",message:"",css:"",moduleId:"",targetColoring:""})}]}]}});
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
 const decision={action:'no_change',message:'',css:'',moduleId:'',targetColoring:''};
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
