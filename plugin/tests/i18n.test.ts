import { afterEach, expect, test } from 'vitest';
import { en } from '../i18n/en';
import { ru } from '../i18n/ru';
import { resolveInterfaceLanguage, resolveContentLanguage, setLanguageResolver, t, translate } from '../i18n';
import { selectColoringPaths } from '../src/content-language';
import { buildTurnPrompt, SYSTEM_PROMPT, type PromptContext } from '../src/prompt';
import { formatCost } from '../src/cost';

afterEach(() => setLanguageResolver(() => 'ru'));

test('follows Obsidian, normalizes regional locales, and falls back to English', () => {
  expect(resolveInterfaceLanguage('auto', 'ru')).toBe('ru');
  expect(resolveInterfaceLanguage(undefined, 'ru-RU')).toBe('ru');
  expect(resolveInterfaceLanguage('auto', 'de')).toBe('en');
  expect(resolveInterfaceLanguage('ru', 'en')).toBe('ru');
  expect(resolveInterfaceLanguage('en', 'ru')).toBe('en');
  expect(resolveInterfaceLanguage('invalid', 'en')).toBe('en');
  expect(resolveContentLanguage('ru', 'en')).toBe('ru');
  expect(resolveContentLanguage('en', 'ru')).toBe('en');
  expect(resolveContentLanguage('auto', 'en')).toBe('en');
});

test('dictionaries have identical keys and placeholder contracts', () => {
  expect(Object.keys(en).sort()).toEqual(Object.keys(ru).sort());
  for (const key of Object.keys(ru) as Array<keyof typeof ru>) {
    const params = (value: string) => [...value.matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort();
    expect(en[key].trim(), key).not.toBe('');
    expect(params(en[key]), key).toEqual(params(ru[key]));
    expect(en[key], key).not.toMatch(/[А-Яа-яЁё]/);
  }
  expect(translate('en', 'main.sample_not_found', {p0: '{p1} $&'})).toBe('Sample not found: {p1} $&');
});

test('a language switch affects helpers immediately', () => {
  let language: 'ru' | 'en' = 'ru';
  setLanguageResolver(() => language);
  expect(t('view.ready')).toBe('Готово к работе.');
  expect(formatCost(null)).toBe('стоимость неизвестна');
  language = 'en';
  expect(t('view.ready')).toBe('Ready.');
  expect(formatCost(null)).toBe('cost unknown');
});

test('sample navigation excludes the other language, unlocalized files, assets and entry pages', () => {
  const paths = ['playground/ru/a.md', 'playground/en/b.md', 'playground/legacy.md', 'playground/en/p000.md', 'playground/en/assets/asset.md', 'playground/enough/c.md'];
  expect(selectColoringPaths(paths, 'playground/', 'en')).toEqual(['playground/en/b.md']);
  expect(selectColoringPaths(paths, 'playground', 'ru')).toEqual(['playground/ru/a.md']);
  expect(selectColoringPaths(['playground/ru/a.md'], 'playground', 'en')).toEqual([]);
});

test('chat instructions prioritize the latest question language and use UI language only as fallback', () => {
  expect(SYSTEM_PROMPT).toContain('language of their latest question');
  expect(SYSTEM_PROMPT).toContain('If that language cannot be determined');
  const context: PromptContext = {userText: '👍', interfaceLanguage: 'ru', coloringPath: 'en/sample.md', markdown: 'English document', modulesJson: '[]', computedStyles: '', conversation: [], availableColorings: [], compatibleFonts: [], localeLabels: []};
  expect(buildTurnPrompt(context)).toContain('Russian (ru)');
  expect(buildTurnPrompt({...context, interfaceLanguage: 'en', userText: 'Сделай крупнее'})).toContain('English (en)');
  expect(buildTurnPrompt(context)).toContain('English document');
});
