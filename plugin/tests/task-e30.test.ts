import { readFileSync } from 'node:fs';
import { test, expect } from 'vitest';
import { addHack, type HackContext } from '../src/hacks';
const root = new URL('file:///Users/op/vaults/op/!%20P%20R%20O/hacksidian/atlas/!%20hacks/task-e30/');
const hack: HackContext = {
  id: 'task-e30', title: 'Completed last', path: 'atlas/! hacks/task-e30/task-e30.md',
  spec: JSON.parse(readFileSync('/Users/op/vaults/op/! P R O/hacksidian/atlas/! hacks/task-e30/hack.json', 'utf8')),
  css: readFileSync(new URL('recipe.css', root), 'utf8'),
};
const oldBlock = '/* hacksidian:hack:task-e30:start */\n.callmered-coloring.markdown-preview-view > ul {display:flex}\n/* hacksidian:hack:task-e30:end */';
const before = { format: 1 as const, modules: [
  { id: 'g-task', component: 'task', css: '/* user before */\n' + oldBlock + '\n/* user after */\n' },
  { id: 'g-link', component: 'link', css: '/* other module */\n' },
] };
test('pilot replaces its installed block in place, preserves surrounding CSS and is idempotent', () => {
  const result = addHack(before, hack);
  expect(result.changed).toBe(true);
  expect(result.style.modules[0].css).toMatch(/^\/\* user before \*\/\n/);
  expect(result.style.modules[0].css).toMatch(/\n\/\* user after \*\/\n$/);
  expect(result.style.modules[0].css.split('hacksidian:hack:task-e30:start')).toHaveLength(2);
  expect(result.style.modules[1]).toEqual(before.modules[1]);
  expect(before.modules[0].css).toContain('> ul {display:flex}');
  expect(addHack(result.style, hack)).toEqual({ style: result.style, changed: false });
});
test('pilot refuses damaged or ambiguous markers without changing the original', () => {
  for (const css of [oldBlock.replace(':end', ':missing'), oldBlock + oldBlock]) {
    const style = { ...before, modules: [{ ...before.modules[0], css }] };
    expect(() => addHack(style, hack)).toThrow();
    expect(style.modules[0].css).toBe(css);
  }
});
test('inserts the source recipe byte-for-byte', () => {
  const css = addHack(before, hack).style.modules[0].css;
  const block = css.split('/* hacksidian:hack:task-e30:start */\n')[1].split('/* hacksidian:hack:task-e30:end */')[0];
  expect(block).toBe(hack.css);
});
