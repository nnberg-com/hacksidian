import { t } from "../i18n";
import { requestUrl } from "obsidian";
import { calculateUsage } from "./cost";
import { parseModelDecision, type OpenAIResponse } from "./response";
import type { CallMeRedSettings, ModelDecision, UsageRecord } from "./types";

export interface ProviderRequest {
  allowClarification?: boolean;
  instructions: string;
  prompt: string;
  screenshotBase64?: string;
  onUsage?: (usage: UsageRecord, responseId: string) => Promise<void>;
}

export interface ProviderResult {
  decision: ModelDecision;
  usage: UsageRecord;
  responseId: string;
}

export interface ModelProvider {
  createIteration(request: ProviderRequest): Promise<ProviderResult>;
}

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    action: {
      type: "string",
      enum: ["update_css", "switch_coloring", "ask_question", "no_change"],
    },
    message: { type: "string" },
    modules: {
      type: "array",
      description: "For update_css, only the changed existing snippets, each with full resulting CSS. Omit unchanged snippets; the program preserves them. Keep IDs and components; freely edit their CSS. Empty for other actions.",
      items: { type: "object", properties: {
        id: { type: "string" },
        component: { type: "string" },
        css: { type: "string", description: "Complete CSS for this snippet." },
      }, required: ["id", "component", "css"], additionalProperties: false },
    },
    targetColoring: { type: "string" },
  },
  required: ["action", "message", "modules", "targetColoring"],
  additionalProperties: false,
} as const;

function responseSchema(request: ProviderRequest) {
  return {
    ...RESPONSE_SCHEMA,
    properties: {
      ...RESPONSE_SCHEMA.properties,
      action: {
        ...RESPONSE_SCHEMA.properties.action,
        enum: RESPONSE_SCHEMA.properties.action.enum.filter(
          action => request.allowClarification !== false || action !== "ask_question",
        ),
      },
    },
  };
}

export class OpenAIResponsesProvider implements ModelProvider {
  constructor(private readonly settings: CallMeRedSettings) {}

  async createIteration(request: ProviderRequest): Promise<ProviderResult> {
    if (!this.settings.apiKey.trim()) throw new Error(t("provider.add_an_openai_api_key_in_hacksidian"));

    if (!this.settings.model.trim()) throw new Error(t("provider.select_an_openai_model_in_hacksidian_settings"));

    const response = await requestUrl({
      url: "https://api.openai.com/v1/responses",
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.settings.apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.settings.model.trim(),
        store: false,
        instructions: request.instructions,
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: request.prompt },
              ...(this.settings.sendScreenshot && request.screenshotBase64 ? [{
                type: "input_image",
                image_url: `data:image/png;base64,${request.screenshotBase64}`,
                detail: "high",
              }] : []),
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "callmered_iteration",
            strict: true,
            schema: responseSchema(request),
          },
        },
        max_output_tokens: 24000,
      }),
      throw: false,
    });

    await request.onUsage?.(calculateUsage(response.json?.usage, this.settings), response.json?.id ?? "");
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.text === "string" ? response.text.slice(0, 800) : "";
      throw new Error(t("provider.openai_api_returned", { p0: response.status, p1: detail }));
    }

    const body = response.json as OpenAIResponse;
    const decision = parseModelDecision(body);

    return {
      decision,
      usage: calculateUsage(body.usage, this.settings),
      responseId: body.id ?? "",
    };
  }
}

// Gemini uses OpenAI Chat Completions; Claude needs its native structured output API.
export function createProvider(settings: CallMeRedSettings): ModelProvider {
  return settings.provider === 'openai' ? new OpenAIResponsesProvider(settings) : new AlternativeProvider(settings);
}

class AlternativeProvider implements ModelProvider {
  constructor(private readonly settings: CallMeRedSettings) {}

  async createIteration(request: ProviderRequest): Promise<ProviderResult> {
    const { provider, apiKey, model } = this.settings;
    if (!apiKey.trim()) throw new Error(t("provider.add_an_api_key_for_the_selected"));
    if (!model.trim()) throw new Error(t("provider.select_a_model"));
    const image = this.settings.sendScreenshot ? request.screenshotBase64 : undefined;
    const claude = provider === 'anthropic';
    const url = claude ? 'https://api.anthropic.com/v1/messages' : provider === 'google'
      ? 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions' : 'https://api.x.ai/v1/chat/completions';
    const content = claude ? [
      { type: 'text', text: request.prompt },
      ...(image ? [{ type: 'image', source: { type: 'base64', media_type: 'image/png', data: image } }] : []),
    ] : [
      { type: 'text', text: request.prompt },
      ...(image ? [{ type: 'image_url', image_url: { url: `data:image/png;base64,${image}` } }] : []),
    ];
    const payload = claude ? {
      model: model.trim(), max_tokens: 24000, system: request.instructions,
      messages: [{ role: 'user', content }], output_config: { format: { type: 'json_schema', schema: responseSchema(request) } },
    } : {
      model: model.trim(), max_tokens: 24000,
      messages: [{ role: 'system', content: request.instructions }, { role: 'user', content }],
      response_format: { type: 'json_schema', json_schema: { name: 'callmered_iteration', strict: true, schema: responseSchema(request) } },
    };
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (claude) { headers['x-api-key'] = apiKey.trim(); headers['anthropic-version'] = '2023-06-01'; }
    else headers.Authorization = `Bearer ${apiKey.trim()}`;
    const response = await requestUrl({ url, method: 'POST', headers, body: JSON.stringify(payload), throw: false });
    const body = response.json;
    const usage = body.usage;
    const input = claude ? (usage?.input_tokens ?? 0) + (usage?.cache_read_input_tokens ?? 0) + (usage?.cache_creation_input_tokens ?? 0) : usage?.prompt_tokens;
    const normalized: OpenAIResponse = {
      id: body.id, status: 'completed', output: [{ content: [{ type: 'output_text', text: '' }] }],
      usage: usage ? {
        input_tokens: input,
        output_tokens: claude ? usage.output_tokens : usage.completion_tokens,
        total_tokens: claude ? input + usage.output_tokens : usage.total_tokens,
        input_tokens_details: {
          cached_tokens: claude ? usage.cache_read_input_tokens : usage.prompt_tokens_details?.cached_tokens,
          cache_write_tokens: claude ? usage.cache_creation_input_tokens : usage.prompt_tokens_details?.cache_write_tokens,
        },
      } : undefined,
    };
    await request.onUsage?.(calculateUsage(normalized.usage, this.settings), body.id ?? '');
    if (response.status < 200 || response.status >= 300) throw new Error(t("provider.api_returned", { p0: provider, p1: response.status, p2: response.text.slice(0, 800) }));
    const stop = claude ? body.stop_reason : body.choices?.[0]?.finish_reason;
    if (stop === 'max_tokens' || stop === 'length') throw new Error(t("provider.the_llm_response_reached_the_output_token"));
    if (stop !== (claude ? 'end_turn' : 'stop')) throw new Error(t("provider.the_llm_did_not_complete_its_response", { p0: stop ?? t("provider.no_status") }));
    const text = claude ? body.content?.filter((c: {type: string}) => c.type === 'text').map((c: {text: string}) => c.text).join('') : body.choices?.[0]?.message?.content;
    normalized.output = [{ content: [{ type: 'output_text', text: typeof text === 'string' ? text : '' }] }];
    return { decision: parseModelDecision(normalized), usage: calculateUsage(normalized.usage, this.settings), responseId: body.id ?? '' };
  }
}
