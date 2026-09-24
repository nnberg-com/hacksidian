import { test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { readParameters, updateParameter, parameterValue, parameterInput } from '../src/parameters';
import { addHack, removeHack, compileHack } from '../src/hacks';
import { scopeLiveExample } from '../src/live-example-css';
import { numericParameterCss } from './fixtures/numeric-parameter';
const read = (id: string) => readFileSync(new URL(`../../content/atlas/! hacks/${id}/recipe.css`, import.meta.url), 'utf8');
const ids = ['quote-dashed', 'text-dropcap', 'quote-corner-marks', 'text-system',
  'image-e016', 'link-e014', 'table-e015', 'code-e011', 'unordered-e010', 'heading-e019',
  'tag-e008', 'task-e09', 'hr-e070', 'callout-technical-round', 'callout-technical-line', 'callout-technical-padding', 'callout-technical-dots', 'callout-technical-square', 'callout-technical-hatch'];
test('all experiment defaults round-trip exactly and remain independently scopeable', () => {
  for (const id of ids) {
    const css = read(id);
    const parameters = readParameters(css);
    expect(parameters.length).toBeGreaterThan(0);
    for (const p of parameters) expect(updateParameter(css, p.variable, parameterInput(p))).toBe(css);
    expect(scopeLiveExample(css, 'hacksidian-live-params')).toContain('--hacksidian-');
  }
});
test('changes only one value, retains Doxygen defaults, and rejects concurrent overwrites', () => {
  const css = numericParameterCss, p = readParameters(css)[0];
  const updated = updateParameter(css, p.variable, '5.2', p.value);
  expect(updated).toBe(css.replace(`${p.variable}: 4em`, `${p.variable}: 5.2em`));
  expect(readParameters(updated)[0].default).toBe('4em');
  expect(() => updateParameter(updated, p.variable, '6', p.value)).toThrow('другой карточке');
  for (const value of ['', 'NaN', 'Infinity', '1', '9', '4.05', '4; color:red', '4em']) expect(() => updateParameter(css, p.variable, value)).toThrow();
});
test('select permits only declared options; quoted strings cannot inject declarations', () => {
  const css = read('quote-dashed'), p = readParameters(css)[1];
  expect(readParameters(updateParameter(css, p.variable, 'solid'))[1].value).toBe('solid');
  expect(() => updateParameter(css, p.variable, 'red; color:red')).toThrow();
  const textCss = read('quote-corner-marks'), text = readParameters(textCss)[0];
  for (const input of ['";}', '\\', '«', '']) {
    const next = updateParameter(textCss, text.variable, input);
    expect(parameterInput(readParameters(next)[0])).toBe(input);
    let before = 0, after = 0;
    postcss.parse(textCss).walkDecls(() => { before++; }); postcss.parse(next).walkDecls(() => { after++; });
    expect(after).toBe(before);
  }
  expect(() => parameterValue(text, '12345')).toThrow();
  expect(() => parameterValue(text, '\n')).toThrow();
});
test('ambiguous definitions fail; ordinary CSS without metadata is unaffected', () => {
  const css = numericParameterCss, p = readParameters(css)[0];
  expect(() => readParameters(css + `.other { ${p.variable}: 3em; }`)).toThrow();
  expect(() => readParameters(css.replace('@type number', '@type code'))).toThrow();
  expect(readParameters('a { --x: 2; color: red; }')).toEqual([]);
  expect(() => readParameters(css.replace('@min 2', '@min 20'))).toThrow();
});
test('editing source does not mutate applied style; explicit update replaces only its block', () => {
  const css = numericParameterCss;
  const hack = { id: 'test-numeric-parameter', title: 'Drop cap', path: 'atlas/! hacks/test-numeric-parameter/test-numeric-parameter.md', spec: { format: 2, target: 'g-text', hasCss: true }, css };
  const base = { format: 1 as const, modules: [{ id: 'g-text', component: 'text', css: '/* manual */\n' }, { id: 'g-quote', component: 'quote', css: '/* untouched */\n' }] };
  const installed = addHack(base, hack).style;
  const p = readParameters(css)[0];
  const changed = { ...hack, css: updateParameter(css, p.variable, '6') };
  expect(installed.modules[0].css).toContain(`${p.variable}: 4em`);
  const updated = addHack(installed, changed).style;
  expect(updated.modules[0].css).toContain(`${p.variable}: 6em`);
  expect(updated.modules[1]).toBe(base.modules[1]);
  expect(addHack(updated, changed).changed).toBe(false);
  expect(removeHack(updated, hack.id).style.modules[0].css).toContain('/* manual */');
  expect(changed.css).toContain(`${p.variable}: 6em`);
  expect(() => compileHack({ ...hack, css: css.replace(`${p.variable}: 4em`, `${p.variable}: 90em`) })).toThrow();
});
