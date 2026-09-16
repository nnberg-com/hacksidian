import { t } from '../i18n';
import { requestUrl } from 'obsidian';
import { calculateUsage } from './cost';
import { parseModelDecision, type OpenAIResponse } from './response';
import type { CallMeRedSettings, ModelDecision, UsageRecord } from './types';
import type { CatalogSnapshot } from './catalog';

export interface ProviderRequest {
  instructions: string;
  prompt: string;
  catalog: CatalogSnapshot;
  onUsage?: (usage: UsageRecord, responseId: string) => Promise<void>;
}
export interface ProviderResult {
  decision: ModelDecision; usage: UsageRecord; responseId: string;
  retrievedIds: string[]; searchQueries: string[];
}
export interface ModelProvider { createIteration(request: ProviderRequest): Promise<ProviderResult> }
const RESPONSE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    action: { type: 'string', enum: ['recommend', 'ask_question', 'no_match'] },
    message: { type: 'string' },
    recommendations: { type: 'array', maxItems: 6, items: {
      type: 'object', additionalProperties: false,
      properties: { id: { type: 'string' }, reason: { type: 'string' }, instructions: { type: 'string' } },
      required: ['id', 'reason', 'instructions'],
    } },
  }, required: ['action', 'message', 'recommendations'],
};
// https://developers.openai.com/api/docs/pricing — checked 2026-09-16.
// Storage is billed separately by OpenAI; it cannot be attributed to one turn.
export const FILE_SEARCH_CALL_USD = 0.0025;
export class OpenAIResponsesProvider implements ModelProvider {
  constructor(private readonly settings: CallMeRedSettings) {}
  async createIteration(request: ProviderRequest): Promise<ProviderResult> {
    if (!this.settings.apiKey.trim()) throw new Error(t('provider.add_an_openai_api_key_in_hacksidian'));
    if (!this.settings.model.trim()) throw new Error(t('provider.select_an_openai_model_in_hacksidian_settings'));
    if (!request.catalog.storeId) throw new Error(t('catalog.missing'));
    const response = await requestUrl({ url: 'https://api.openai.com/v1/responses', method: 'POST',
      headers: { Authorization: `Bearer ${this.settings.apiKey.trim()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: this.settings.model.trim(), store: false, instructions: request.instructions,
        input: [{ role: 'user', content: [{ type: 'input_text', text: request.prompt }] }],
        tools: [{ type: 'file_search', vector_store_ids: [request.catalog.storeId], max_num_results: 6 }],
        tool_choice: 'required', include: ['file_search_call.results'],
        text: { format: { type: 'json_schema', name: 'hacksidian_recommendation', strict: true, schema: RESPONSE_SCHEMA } },
        max_output_tokens: 4000,
      }), throw: false });
    const body = response.json as OpenAIResponse;
    const calls = body?.output?.filter(item => item.type === 'file_search_call') ?? [];
    const usage = calculateUsage(body?.usage, this.settings);
    usage.fileSearchCalls = calls.length;
    usage.fileSearchCostUsd = calls.length * FILE_SEARCH_CALL_USD;
    if (usage.estimatedCostUsd !== null) usage.estimatedCostUsd += usage.fileSearchCostUsd;
    await request.onUsage?.(usage, body?.id ?? '');
    if (response.status < 200 || response.status >= 300) throw new Error(t('provider.openai_api_returned', { p0: response.status, p1: body?.error?.message ?? '' }));
    const decision = parseModelDecision(body);
    if (!calls.length || calls.some(call => call.status && call.status !== 'completed')) throw new Error(t('catalog.search_failed'));
    const validFiles = new Set(request.catalog.documents.map(doc => doc.fileId));
    const retrieved = calls.flatMap(call => call.results ?? []).filter(result => validFiles.has(result.file_id));
    const ids = new Set<string>();
    // A chunk can omit the record heading. Single-record files still identify
    // their source reliably; legacy mixed files must use explicit text markers.
    for (const result of retrieved) {
      const entryId = request.catalog.documents.find(doc => doc.fileId === result.file_id)?.entryId;
      if (entryId) ids.add(entryId);
      else for (const match of result.text.matchAll(/(?:^|\n)(?:# |END )?ID: ([a-z0-9_-]+)\b/g)) ids.add(match[1]);
    }
    const known = new Set(request.catalog.entries.map(entry => entry.id));
    const retrievedIds = [...ids].filter(id => known.has(id));
    if (decision.recommendations.some(item => !retrievedIds.includes(item.id))) throw new Error(t('catalog.invalid_recommendation'));
    return { decision, usage, responseId: body.id ?? '', retrievedIds, searchQueries: calls.flatMap(call => call.queries ?? []) };
  }
}
export function createProvider(settings: CallMeRedSettings): ModelProvider {
  if (settings.provider !== 'openai') throw new Error('The atlas engine supports OpenAI only.');
  return new OpenAIResponsesProvider(settings);
}
