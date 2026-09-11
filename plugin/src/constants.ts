import type { CallMeRedSettings, PersistedState } from "./types";

export const VIEW_TYPE_CALLMERED = "callmered-conversation";
export const CSS_UNDO_LIMIT = 50;
export const PROMPT_VERSION = "poc-4-language";

export const DEFAULT_SETTINGS: CallMeRedSettings = {
  interfaceLanguage: "auto",
  contentLanguage: "auto",
  provider: "openai",
  providerProfiles: {},
  customModel: false,
  autoPricing: true,
  sendScreenshot: true,
  apiKey: "",
  model: "gpt-5.6-terra",
  inputPricePerMillion: 2,
  cachedInputPricePerMillion: 0.2,
  outputPricePerMillion: 12,
  coloringsFolder: "! P R O/hacksidian/playground",
  supportedLocales: ["ru-Cyrl"],
};

export const DEFAULT_CSS = `/* Hacksidian starts from Obsidian's default light appearance. */\n`;

export const DEFAULT_STATE: PersistedState = {
  activeCss: DEFAULT_CSS,
  versions: [
    {
      id: "initial",
      css: DEFAULT_CSS,
      createdAt: new Date(0).toISOString(),
      source: "initial",
    },
  ],
  turns: [],
};
