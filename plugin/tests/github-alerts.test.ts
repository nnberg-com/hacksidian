import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { expect, test } from 'vitest';
import { readParameters, updateParameter } from '../src/parameters';
import { scopeLiveExample } from '../src/live-example-css';

const css = readFileSync(new URL('../../content/atlas/! hacks/composition-github-alerts/recipe.css', import.meta.url), 'utf8');

test('GitHub appearance checkbox round-trips and works inside live examples', () => {
  const parameters = readParameters(css);
  expect(parameters).toHaveLength(6);
  for (const color of parameters.slice(1)) {
    const changed = updateParameter(css, color.variable, 'var(--color-pink)');
    expect(readParameters(changed).find(p => p.variable === color.variable)?.value).toBe('var(--color-pink)');
    expect(updateParameter(changed, color.variable, color.value)).toBe(css);
  }
  const [parameter] = parameters;
  expect(parameter.control).toBe('checkbox');
  expect(parameter.default).toBe('github');
  const off = updateParameter(css, parameter.variable, 'colors');
  expect(readParameters(off)[0].value).toBe('colors');
  expect(updateParameter(off, parameter.variable, parameter.value)).toBe(css);
  for (const source of [css, off]) {
    const scoped = scopeLiveExample(source, 'hacksidian-live-github-alerts');
    expect(scoped).toContain('@container style(--hacksidian-github-alert-appearance: github)');
    expect(scoped).toContain('#hacksidian-live-github-alerts');
  }
});

test('unchecked mode changes colors and icon glyphs but preserves callout layout and titles', () => {
  const tree = postcss.parse(css);
  const nativeProperties: string[] = [];
  tree.walkDecls(decl => {
    let fullAppearance = false;
    for (let parent = decl.parent; parent && parent.type !== 'root'; parent = parent.parent) {
      if (parent.type === 'atrule' && parent.name === 'container' && parent.params === 'style(--hacksidian-github-alert-appearance: github)') fullAppearance = true;
    }
    if (!fullAppearance && !decl.prop.startsWith('--hacksidian-')) {
      const selector = decl.parent?.type === 'rule' ? decl.parent.selector : '';
      if (selector.endsWith(' > .callout-icon > svg')) {
        expect(['background', '-webkit-mask', 'mask']).toContain(decl.prop);
      } else if (selector.endsWith(' > .callout-icon > svg > *')) {
        expect(decl.prop).toBe('display');
        expect(decl.value).toBe('none');
      } else nativeProperties.push(decl.prop);
    }
  });
  expect(nativeProperties).toEqual(Array(5).fill('--callout-color'));
  for (const color of ['blue', 'green', 'purple', 'yellow', 'red']) expect(css).toContain(`var(--color-${color})`);
  expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
});
