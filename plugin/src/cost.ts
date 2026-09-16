import { t } from "../i18n";
import { pricingKey } from './pricing';
import type { CallMeRedSettings, UsageRecord, TokenPrices } from './types';

export interface RawUsage {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
  input_tokens_details?: { cached_tokens?: number; cache_write_tokens?: number };
}

export function formatCost(cost: number | null): string {
  return cost == null ? t("cost.cost_unknown") : `≈ $${cost.toFixed(2)}`;
}

export function calculateUsage(raw: RawUsage | undefined, settings: CallMeRedSettings): UsageRecord {
  const inputTokens = raw?.input_tokens ?? 0;
  const cachedInputTokens = Math.min(inputTokens, raw?.input_tokens_details?.cached_tokens ?? 0);
  const outputTokens = raw?.output_tokens ?? 0;
  let prices: TokenPrices | undefined = settings.autoPricing ? (settings.pricing?.key === pricingKey(settings.provider, settings.model) ? settings.pricing : undefined)
    : { input: settings.inputPricePerMillion, cached: settings.cachedInputPricePerMillion, output: settings.outputPricePerMillion, cacheWrite: settings.inputPricePerMillion };
  if (settings.autoPricing && settings.pricing?.highContext && inputTokens >= settings.pricing.highContext.threshold && prices) prices = settings.pricing.highContext;
  const writes = Math.min(inputTokens - cachedInputTokens, raw?.input_tokens_details?.cache_write_tokens ?? 0);
  const estimatedCostUsd = prices && raw?.input_tokens !== undefined && raw.output_tokens !== undefined
    ? ((inputTokens - cachedInputTokens - writes) * prices.input + cachedInputTokens * prices.cached + writes * (prices.cacheWrite ?? prices.input) + outputTokens * prices.output) / 1_000_000
    : null;
  return { inputTokens, cachedInputTokens, outputTokens, totalTokens: raw?.total_tokens ?? inputTokens + outputTokens, estimatedCostUsd };
}
