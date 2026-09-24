import { test, expect, vi } from 'vitest';
vi.mock('obsidian', () => ({
  TFile: class { path = ''; },
  MarkdownRenderChild: class {
    constructor(public containerEl: unknown) {}
    register() {} registerEvent() {}
    registerDomEvent(el: any, event: string, callback: Function) { el.events[event] = callback; }
  },
}));
import { TFile } from 'obsidian';
import { ParameterControls } from '../src/parameter-controls';
import { readFileSync } from 'node:fs';
import { numericParameterCss } from './fixtures/numeric-parameter';
import { readParameters } from '../src/parameters';
class Element {
  children: Element[] = []; events: Record<string, Function> = {}; attrs: Record<string, string> = {};
  checked = false; type = '';
  tag = ''; text = ''; value = ''; hidden = false; disabled = false; id = '';
  createEl(tag: string, options: any = {}) { const el = new Element(); Object.assign(el, options); el.tag = tag; el.attrs = options.attr ?? {}; el.id = el.attrs.id ?? ''; this.children.push(el); return el; }
  createDiv(options: any = {}) { return this.createEl('div', options); }
  createSpan(options: any = {}) { return this.createEl('span', options); }
  appendChild(el: Element) { this.children = this.children.filter(child => child !== el); this.children.push(el); }
  addClass() {} setAttribute(k: string, v: string) { this.attrs[k] = v; } removeAttribute(k: string) { delete this.attrs[k]; }
  setText(text: string) { this.text = text; } empty() { this.children = []; this.text = ''; }
  all(tag: string): Element[] { return this.children.flatMap(el => [...(el.tag === tag ? [el] : []), ...el.all(tag)]); }
}
const flush = () => new Promise(resolve => setTimeout(resolve, 10));
async function fixture(id = 'test-numeric-parameter') {
  const directory = `atlas/! hacks/${id}`;
  let css = id === 'test-numeric-parameter' ? numericParameterCss : readFileSync(new URL(`../../content/atlas/! hacks/${id}/recipe.css`, import.meta.url), 'utf8');
  let fail = false;
  const listeners: Function[] = [];
  const file = Object.assign(new TFile(), { path: `${directory}/recipe.css` });
  const vault = {
    adapter: { read: async () => css }, getAbstractFileByPath: () => file,
    on: (_name: string, fn: Function) => { listeners.push(fn); return {}; },
    process: async (_file: unknown, fn: (css: string) => string) => {
      if (fail) throw Error('Disk failure');
      css = fn(css); for (const listener of listeners) listener(file);
    },
  };
  const technique = { get: async () => ({ installed: true, hasCss: true }), update: vi.fn(async () => {}), subscribe: () => () => {} };
  const mount = async () => {
    const el = new Element();
    const child = new ParameterControls(el as any, { app: { vault } } as any, directory, { english: () => false, technique } as any);
    child.onload(); await flush(); return { el, child };
  };
  return { ...await mount(), mount, technique, source: () => css, fail: (value: boolean) => { fail = value; } };
}
test('valid input saves immediately, invalid input retains source, update is explicit, reset restores default', async () => {
  const f = await fixture(), input = f.el.all('input')[0];
  const update = f.el.all('button').find(el => el.text === 'Обновить уже существующий стиль')!;
  input.value = '5'; input.events.input(); await flush();
  expect(readParameters(f.source())[0].value).toBe('5em'); expect(f.technique.update).not.toHaveBeenCalled();
  input.value = '99'; input.events.input(); await flush();
  expect(update.disabled).toBe(true); expect(input.attrs['aria-invalid']).toBe('true'); expect(readParameters(f.source())[0].value).toBe('5em');
  input.value = '6'; input.events.input(); await flush();
  expect(update.disabled).toBe(false); update.events.click(); await flush();
  expect(f.technique.update).toHaveBeenCalledWith('atlas/! hacks/test-numeric-parameter/test-numeric-parameter.md');
  f.el.all('button').find(el => el.text === 'Сбросить')!.events.click(); await flush();
  expect(readParameters(f.source())[0].value).toBe('4em');
});
test('another open editor follows persisted values; rapid keystrokes preserve final input', async () => {
  const f = await fixture(), second = await f.mount();
  const input = f.el.all('input')[0];
  input.value = '5'; input.events.input(); input.value = '6'; input.events.input(); await flush();
  expect(readParameters(f.source())[0].value).toBe('6em');
  expect(second.el.all('input')[0].value).toBe('6');
});
test('a write failure is visible, blocks update, and can be retried', async () => {
  const f = await fixture(), input = f.el.all('input')[0];
  const update = f.el.all('button').find(el => el.text === 'Обновить уже существующий стиль')!;
  f.fail(true); input.value = '5'; input.events.input(); await flush();
  expect(update.disabled).toBe(true); expect(readParameters(f.source())[0].value).toBe('4em');
  expect(f.el.all('div').some(el => el.text.includes('Disk failure'))).toBe(true);
  f.fail(false); input.events.input(); await flush();
  expect(readParameters(f.source())[0].value).toBe('5em'); expect(update.disabled).toBe(false);
});
test('selection fields show declared options and persist a selection', async () => {
  const f = await fixture('quote-dashed'), select = f.el.all('select')[1];
  expect(select.all('option').map(el => el.value)).toEqual(['dashed', 'dotted', 'solid']);
  select.value = 'dotted'; select.events.change(); await flush();
  expect(readParameters(f.source())[1].value).toBe('dotted');
});

test('concurrent edits of different parameters converge in both editors', async () => {
  const f = await fixture('quote-dashed'), second = await f.mount();
  const firstWidth = f.el.all('select')[0], secondStyle = second.el.all('select')[1];
  firstWidth.value = '4px'; firstWidth.events.change();
  secondStyle.value = 'dotted'; secondStyle.events.change();
  await flush();
  expect(f.el.all('select').map(el => el.value)).toEqual(['4px', 'dotted']);
  expect(second.el.all('select').map(el => el.value)).toEqual(['4px', 'dotted']);
});

 test.each([['right', true], ['line', false]] as const)('background checkbox for %s saves, syncs and resets', async (side, enabled) => {
  const f = await fixture('callout-technical-'+side), second = await f.mount();
  const checkbox = f.el.all('input').find(el => el.type === 'checkbox')!;
  const other = second.el.all('input').find(el => el.type === 'checkbox')!;
  const parameter = () => readParameters(f.source()).find(p => p.control === 'checkbox')!;
  expect(checkbox.checked).toBe(enabled);
  checkbox.checked = !enabled; checkbox.events.change(); await flush();
  expect(parameter().value).toBe(parameter().options[!enabled ? 0 : 1].value);
  expect(other.checked).toBe(!enabled);
  f.el.all('button').filter(el => el.text === 'Сбросить').at(-1)!.events.click(); await flush();
  expect(parameter().value).toBe(parameter().default);
  expect(checkbox.checked).toBe(enabled); expect(other.checked).toBe(enabled);
 });
