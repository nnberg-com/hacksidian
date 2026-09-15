import { describe, expect, it } from "vitest";
import { parseModelDecision, type OpenAIResponse } from "../src/response";

const decision = {
  action: "update_css",
  message: "Готово.",
  modules: [{ id: "foundation-01", component: "foundation", css: "body { color: black; }" }],
  targetColoring: "",
} as const;

describe("parseModelDecision", () => {
  it("joins split output_text content before parsing", () => {
    const json = JSON.stringify(decision);
    const body: OpenAIResponse = {
      id: "resp_complete",
      status: "completed",
      output: [{ content: [{ type: "output_text", text: json.slice(0, 20) }, { type: "output_text", text: json.slice(20) }] }],
    };
    expect(parseModelDecision(body)).toEqual(decision);
  });

  it("reports output-token truncation directly", () => {
    expect(() => parseModelDecision({
      id: "resp_incomplete",
      status: "incomplete",
      incomplete_details: { reason: "max_output_tokens" },
      output: [{ content: [{ type: "output_text", text: '{"action":"update_css"' }] }],
    })).toThrow("Ответ LLM оборвался по лимиту выходных токенов. Ответ: resp_incomplete.");
  });

  it("reports refusals without trying to parse them as JSON", () => {
    expect(() => parseModelDecision({
      id: "resp_refusal",
      status: "completed",
      output: [{ content: [{ type: "refusal", refusal: "Cannot comply" }] }],
    })).toThrow("LLM отказалась формировать ответ: Cannot comply");
  });

  it("distinguishes invalid completed JSON", () => {
    expect(() => parseModelDecision({
      id: "resp_invalid",
      status: "completed",
      output: [{ content: [{ type: "output_text", text: "{not json}" }] }],
    })).toThrow("пометил ответ как завершённый, но вернул невалидный JSON");
  });

  it("validates the parsed object shape", () => {
    expect(() => parseModelDecision({
      status: "completed",
      output: [{ content: [{ type: "output_text", text: '{"action":"update_css"}' }] }],
    })).toThrow("не соответствует схеме Hacksidian");
  });
});
