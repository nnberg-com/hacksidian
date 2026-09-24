import { expect, test } from 'vitest';
import { isNativeReadingSheet, previewTokens } from '../src/live-example-surface';

test('isolated examples accept the native sheet, never enabled snippets or theme/plugin styles', () => {
  expect(isNativeReadingSheet('app://obsidian.md/app.css')).toBe(true);
  expect(isNativeReadingSheet('http://localhost/app.css?v=1')).toBe(true);
  for (const href of [null, 'theme.css', 'styles.css', 'hacksidian-11-unordered.css', 'app://vault/snippets/app.css.css']) {
    expect(isNativeReadingSheet(href)).toBe(false);
  }
});

test('note-level custom properties cannot leak through the shadow boundary, while body palette survives', () => {
  const style = (values: Record<string,string>) => Object.assign(Object.keys(values), {
    getPropertyValue: (key: string) => values[key] ?? '',
  }) as unknown as CSSStyleDeclaration;
  const tokens = previewTokens(style({'--h1-size':'8px','--local-marker':'"—"','--hacksidian-choice':'red'}),
    style({'--h1-size':'32px','--text-normal':'#123456','--hacksidian-semantic-red':'#ff0000'}));
  expect(tokens['--h1-size']).toBe('32px');
  expect(tokens['--text-normal']).toBe('#123456');
  expect(tokens['--local-marker']).toBe('initial');
  expect(tokens['--hacksidian-choice']).toBe('initial');
  expect(tokens['--hacksidian-semantic-red']).toBe('initial');
});
