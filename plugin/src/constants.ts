import type { CallMeRedSettings, PersistedState } from "./types";

export const VIEW_TYPE_CALLMERED = "callmered-conversation";
export const PROMPT_VERSION = "atlas-4-technique-commands";

export const DEFAULT_SETTINGS: CallMeRedSettings = {
  interfaceLanguage: "auto",
  contentLanguage: "auto",
  provider: "openai",
  providerProfiles: {},
  customModel: false,
  autoPricing: true,
  sendScreenshot: false,
  atlasFolder: "Hacksidian/atlas",
  globalVariablesFile: "",
  apiKey: "",
  model: "gpt-5.6-terra",
  inputPricePerMillion: 2,
  cachedInputPricePerMillion: 0.2,
  outputPricePerMillion: 12,
  coloringsFolder: "Hacksidian/playground",
  supportedLocales: ["ru-Cyrl"],
};

export const DEFAULT_CSS = `/* Hacksidian starts from Obsidian's default light appearance. */\n`;

export const DEFAULT_STATE: PersistedState = {
  activeCss: DEFAULT_CSS,
  turns: [],
};
