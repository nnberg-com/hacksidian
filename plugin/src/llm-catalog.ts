import type { CallMeRedSettings, ProviderId, ProviderProfile } from './types';

export const PROVIDERS = {
  openai: { name: 'OpenAI · GPT', models: { 'gpt-5.6-terra': 'GPT-5.6 Terra', 'gpt-5.6-luna': 'GPT-5.6 Luna', 'gpt-5.6-sol': 'GPT-5.6 Sol', 'gpt-6-astra': 'GPT-6 Astra' } },
  anthropic: { name: 'Anthropic · Claude', models: { 'claude-sonnet-5': 'Claude Sonnet 5', 'claude-opus-5': 'Claude Opus 5', 'claude-haiku-4-5': 'Claude Haiku 4.5' } },
  google: { name: 'Google · Gemini', models: { 'gemini-3.8-flash': 'Gemini 3.8 Flash', 'gemini-3.1-flash-lite': 'Gemini 3.1 Flash-Lite', 'gemini-2.5-flash': 'Gemini 2.5 Flash' } },
  xai: { name: 'xAI · Grok', models: { 'grok-4.20-0309-non-reasoning': 'Grok 4.20 (Non-Reasoning)', 'grok-4.20-0309-reasoning': 'Grok 4.20 (Reasoning)' } },
} as const;

export function switchProvider(settings: CallMeRedSettings, provider: ProviderId): void {
  const profile: ProviderProfile = {
    apiKey: settings.apiKey, model: settings.model, customModel: settings.customModel,
    inputPricePerMillion: settings.inputPricePerMillion,
    cachedInputPricePerMillion: settings.cachedInputPricePerMillion,
    outputPricePerMillion: settings.outputPricePerMillion,
  };
  settings.providerProfiles = { ...settings.providerProfiles, [settings.provider]: profile };
  Object.assign(settings, settings.providerProfiles[provider] ?? {
    apiKey: '', model: Object.keys(PROVIDERS[provider].models)[0], customModel: false,
    inputPricePerMillion: 0, cachedInputPricePerMillion: 0, outputPricePerMillion: 0,
  });
  settings.provider = provider;
  settings.pricing = undefined;
}
