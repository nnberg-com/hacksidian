import { t } from "../i18n";
import { requestUrl } from 'obsidian';
import type { PricingQuote, ProviderId, TokenPrices } from './types';

export const pricingKey = (provider: ProviderId, model: string): string => `${provider}:${model.trim()}`;
const TTL = 24 * 60 * 60 * 1000;
const pending = new Map<string, Promise<PricingQuote>>();

function money(cell: string): number {
  const match = cell.match(/\$\s*([\d]+(?:\.\d+)?)/);
  if (!match) throw new Error(t("pricing.price_not_found_in_the_official_table"));
  return Number(match[1]);
}
function row(text: string, label: string): string[] {
  const cells = text.split('\n').filter(l => l.trim().startsWith('|')).map(l => l.split('|').slice(1, -1).map(c => c.trim()));
  const result = cells.find(c => c[0] === label);
  if (!result) throw new Error(t("pricing.pricing_row_was_not_found", { p0: label }));
  return result;
}
function escaped(value: string): string { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

export function pricingSource(provider: ProviderId, model: string): string {
  if (!/^[a-zA-Z0-9._-]+$/.test(model)) throw new Error(t("pricing.enter_a_model_id_to_load_pricing"));
  if (provider === 'openai') return `https://developers.openai.com/api/docs/models/${model}.md`;
  if (provider === 'anthropic') return 'https://platform.claude.com/docs/en/about-claude/pricing.md';
  if (provider === 'google') return 'https://ai.google.dev/gemini-api/docs/pricing?hl=en';
  return `https://docs.x.ai/developers/models/${model}.md`;
}

/** Parses the provider's standard paid text/image rates, never batch/audio rates. */
export function parsePricing(provider: ProviderId, model: string, text: string, now = new Date()): PricingQuote {
  let prices: TokenPrices;
  let expiresAt: string | undefined;
  let highContext: PricingQuote['highContext'];
  if (provider === 'openai' || provider === 'xai') {
    if (!text.includes('`' + model + '`')) throw new Error(t("pricing.the_pricing_page_belongs_to_a_different"));
    const section = text.split('## Pricing')[1]?.split('\n## ')[0];
    if (!section) throw new Error(t("pricing.pricing_section_not_found"));
    const input = row(section, 'Input'), cached = row(section, 'Cached input'), output = row(section, 'Output');
    prices = { input: money(input[1]), cached: money(cached[1]), output: money(output[1]) };
    if (provider === 'openai') {
      const tier = section.match(/(?:>|more than)\s*([\d,]+)K input tokens[^\n]*?(\d+(?:\.\d+)?)x input(?: and cache rates)? and (\d+(?:\.\d+)?)x output/i);
      if (tier) highContext = { threshold: Number(tier[1].replaceAll(',', '')) * 1000 + 1, input: prices.input * Number(tier[2]), cached: prices.cached * Number(tier[2]), output: prices.output * Number(tier[3]) };
      const cacheWriteRow = section.split('\n').find(line => /^\|\s*Cache writes\s*\|/.test(line));
      if (cacheWriteRow) {
        prices.cacheWrite = money(cacheWriteRow.split('|')[2]);
        if (highContext) highContext.cacheWrite = prices.cacheWrite * Number(tier![2]);
      }
      const write = section.match(/Cache writes are billed at ([\d.]+)x/);
      if (write) {
        prices.cacheWrite = prices.input * Number(write[1]);
        if (highContext) highContext.cacheWrite = highContext.input * Number(write[1]);
      }
      if (/prompts with|long.context/i.test(section) && !tier) throw new Error(t("pricing.could_not_parse_long_context_pricing"));
    } else if (/≥/.test(section)) {
      const threshold = section.match(/≥\s*([\d,]+)k/);
      if (!threshold) throw new Error(t("pricing.could_not_parse_the_long_context_threshold"));
      highContext = { threshold: Number(threshold[1].replaceAll(',', '')) * 1000, input: money(input[2]), cached: money(cached[2]), output: money(output[2]) };
    }
  } else if (provider === 'anthropic') {
    // Explicit aliases avoid accidentally pricing a different generation/snapshot.
    const names: Record<string, string> = { 'claude-sonnet-5': 'Claude Sonnet 5', 'claude-opus-5': 'Claude Opus 5', 'claude-haiku-4-5': 'Claude Haiku 4.5' };
    if (!names[model]) throw new Error(t("pricing.automatic_pricing_is_not_yet_available_for"));
    const cells = row(text.split('## Model pricing')[1]?.split('\n## ')[0] ?? '', names[model]);
    prices = { input: money(cells[1]), cacheWrite: money(cells[2]), cached: money(cells[4]), output: money(cells[5]) };
  } else {
    const section = text.match(new RegExp('<h2[^>]*id="' + escaped(model) + '"[\\s\\S]*?(?=<h2|$)'))?.[0];
    const table = section?.match(/<h3[^>]*data-text="Standard"[\s\S]*?<table[\s\S]*?<\/table>/)?.[0];
    if (!table || !table.includes('Paid Tier')) throw new Error(t("pricing.standard_paid_pricing_for_this_gemini_model"));
    const rows = [...table.matchAll(/<tr[\s\S]*?<\/tr>/g)].map(r => [...r[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(c => c[1].replace(/<br\s*\/?\s*>/g, '\n').replace(/<[^>]+>/g, '').trim()));
    const rate = (label: string): number => {
      const cell = rows.find(r => r[0]?.startsWith(label))?.[2];
      if (!cell) throw new Error(t("pricing.gemini_pricing_was_not_found", { p0: label }));
      const lines = cell.split('\n').filter(l => l.includes('$') && !/audio|per hour|storage/i.test(l));
      if (lines.some(l => /prompt|200k|128k|≤|&gt;|&le;/.test(l))) throw new Error(t("pricing.this_gemini_price_requires_support_for_context"));
      const dated = lines.filter(l => /through|starting/.test(l));
      if (dated.length) {
        for (const line of dated) {
          const date = line.match(/(through|starting) ([A-Za-z]+ \d{1,2}, \d{4})/);
          if (!date) throw new Error(t("pricing.could_not_parse_the_pricing_validity_period"));
          const boundary = Date.parse(date[2] + ' 00:00:00 GMT');
          if ((date[1] === 'through' && now.getTime() < boundary + 86400000) || (date[1] === 'starting' && now.getTime() >= boundary)) {
            if (date[1] === 'through') expiresAt = new Date(boundary + 86400000).toISOString();
            return money(line);
          }
        }
        throw new Error(t("pricing.this_price_is_not_valid_on_the"));
      }
      if (lines.length !== 1) throw new Error(t("pricing.official_pricing_is_ambiguous"));
      return money(lines[0]);
    };
    prices = { input: rate('Input price'), cached: rate('Context caching price'), output: rate('Output price') };
  }
  if (Object.values(prices).some(p => !Number.isFinite(p) || p < 0)) throw new Error(t("pricing.the_source_contains_invalid_prices"));
  return { ...prices, highContext, key: pricingKey(provider, model), source: pricingSource(provider, model), fetchedAt: now.toISOString(), expiresAt };
}

export async function loadPricing(provider: ProviderId, model: string, cached?: PricingQuote, force = false): Promise<PricingQuote> {
  const key = pricingKey(provider, model);
  const age = cached ? Date.now() - Date.parse(cached.fetchedAt) : Infinity;
  if (!force && cached?.key === key && age >= 0 && age < TTL && (!cached.expiresAt || Date.now() < Date.parse(cached.expiresAt))) return cached;
  const existing = pending.get(key);
  if (existing) return existing;
  const work = (async () => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const response = await Promise.race([requestUrl({ url: pricingSource(provider, model), method: 'GET', headers: { Accept: '*/*', 'Accept-Language': 'en', 'User-Agent': 'Mozilla/5.0' }, throw: false }), new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error(t("pricing.the_pricing_source_did_not_respond_within"))), 15000); })]).finally(() => { if (timer) clearTimeout(timer); });
    if (response.status !== 200) throw new Error(t("pricing.the_pricing_source_returned_http", { p0: response.status }));
    return parsePricing(provider, model, response.text);
  })();
  pending.set(key, work);
  try { return await work; } finally { pending.delete(key); }
}
