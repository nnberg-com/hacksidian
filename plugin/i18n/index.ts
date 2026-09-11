import { ru } from './ru';
import { en } from './en';

export type Language = 'ru' | 'en';
export type InterfaceLanguage = 'auto' | Language;
export type ContentLanguage = 'auto' | Language;
export type TranslationKey = keyof typeof ru;
export type Parameters = Record<string, string | number>;

export function normalizeLanguage(value: string | undefined): Language {
  return value?.toLowerCase().split(/[-_]/)[0] === 'ru' ? 'ru' : 'en';
}
export function resolveInterfaceLanguage(preference: string | undefined, obsidianLanguage: string): Language {
  return normalizeLanguage(preference === 'ru' || preference === 'en' ? preference : obsidianLanguage);
}
export function resolveContentLanguage(preference: string | undefined, interfaceLanguage: Language): Language {
  return preference === 'ru' || preference === 'en' ? preference : interfaceLanguage;
}
export function translate(language: Language, key: TranslationKey, parameters: Parameters = {}): string {
  const template = (language === 'ru' ? ru[key] : en[key]) ?? en[key];
  return template.replace(/\{(\w+)\}/g, (match, name: string) => Object.hasOwn(parameters, name) ? String(parameters[name]) : match);
}
// Obsidian runs each vault in its own plugin runtime. Resolve lazily so a setting
// change also affects helpers and errors without rebuilding their objects.
let languageResolver: () => Language = () => 'en';
export function setLanguageResolver(resolve: () => Language): void { languageResolver = resolve; }
export function currentLanguage(): Language { return languageResolver(); }
export function t(key: TranslationKey, parameters?: Parameters): string { return translate(currentLanguage(), key, parameters); }
export function numberLocale(): string { return currentLanguage() === 'ru' ? 'ru-RU' : 'en-US'; }
