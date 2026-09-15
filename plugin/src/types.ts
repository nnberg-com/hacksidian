import type { ModularStyle } from "./style-modules";

export type ModelAction = "update_css" | "switch_coloring" | "ask_question" | "no_change";
export type SupportedLocale = "ru-Cyrl" | "sr-Cyrl" | "he";

export interface ModelDecision {
  action: ModelAction;
  message: string;
  modules: import("./style-modules").StyleModule[];
  targetColoring: string;
}

export interface UsageRecord {
  inputTokens: number;
  cachedInputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUsd: number | null;
}

export interface TurnRecord {
  changedModuleId?: string;
  id: string;
  createdAt: string;
  coloringPath: string;
  userText: string;
  action: ModelAction;
  systemMessage: string;
  provider: string;
  model: string;
  promptVersion: string;
  usage: UsageRecord;
  rawResponseId: string;
}

export interface CssVersion {
  style?: ModularStyle;
  id: string;
  css: string;
  createdAt: string;
  source: "initial" | "model" | "undo" | "recovery" | "hack";
}

export interface PersistedState {
  style?: ModularStyle;
  activeCss: string;
  versions: CssVersion[];
  turns: TurnRecord[];
}

export type ProviderId = "openai" | "anthropic" | "google" | "xai";

export interface TokenPrices {
  input: number;
  cached: number;
  output: number;
  cacheWrite?: number;
}

export interface PricingQuote extends TokenPrices {
  key: string;
  source: string;
  fetchedAt: string;
  expiresAt?: string;
  highContext?: TokenPrices & { threshold: number };
}

export interface ProviderProfile {
  apiKey: string;
  model: string;
  customModel: boolean;
  inputPricePerMillion: number;
  cachedInputPricePerMillion: number;
  outputPricePerMillion: number;
}

export interface CallMeRedSettings {
  interfaceLanguage: import('../i18n').InterfaceLanguage;
  contentLanguage: import('../i18n').ContentLanguage;
  provider: ProviderId;
  providerProfiles: Partial<Record<ProviderId, ProviderProfile>>;
  customModel: boolean;
  autoPricing: boolean;
  pricing?: PricingQuote;
  spendLimitUsd: number;
  sendScreenshot: boolean;
  apiKey: string;
  model: string;
  inputPricePerMillion: number;
  cachedInputPricePerMillion: number;
  outputPricePerMillion: number;
  coloringsFolder: string;
  supportedLocales: SupportedLocale[];
}

export interface ApiAttempt {
  id: string;
  createdAt: string;
  provider: string;
  model: string;
  promptVersion: string;
  status: "pending" | "received" | "completed" | "failed" | "interrupted";
  usage: UsageRecord;
  responseId: string;
}
