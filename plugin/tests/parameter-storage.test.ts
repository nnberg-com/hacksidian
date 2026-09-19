import { test, expect, vi } from 'vitest';
vi.mock('obsidian', () => ({ TFile: class { constructor(public path: string) {} } }));
import { TFile, type Vault } from 'obsidian';
import { saveParameter, pendingParameters } from '../src/parameter-storage';
import { readParameters } from '../src/parameters';
const css = `a {\n/**\n * @parameter Size\n * @type number\n * @default 2px\n * @unit px\n */\n--hacksidian-size: 2px;\n/* manual */ color: red;\n}`;
function fixture() {
  let source = css;
  const file = Object.assign(new TFile(), { path: 'recipe.css' });
  const vault = {
    getAbstractFileByPath: () => file,
    process: vi.fn(async (_file: unknown, fn: (css: string) => string) => {
      await new Promise(resolve => setTimeout(resolve, 1)); source = fn(source);
    }),
  } as unknown as Vault;
  return { vault, get: () => source, edit: (value: string) => { source = value; } };
}
test('serializes rapid inputs and apply waits for the latest write', async () => {
  const f = fixture();
  const a = saveParameter(f.vault, 'recipe.css', '--hacksidian-size', '3', '2px');
  const b = saveParameter(f.vault, 'recipe.css', '--hacksidian-size', '4', '3px');
  await pendingParameters(f.vault, 'recipe.css'); await Promise.all([a,b]);
  expect(readParameters(f.get())[0].value).toBe('4px');
  expect(f.get()).toContain('/* manual */ color: red;');
});
test('rejects stale same-variable writes and recovers on a subsequent edit', async () => {
  const f = fixture();
  await saveParameter(f.vault, 'recipe.css', '--hacksidian-size', '3', '2px');
  await expect(saveParameter(f.vault, 'recipe.css', '--hacksidian-size', '4', '2px')).rejects.toThrow('другой карточке');
  expect(readParameters(f.get())[0].value).toBe('3px');
  await expect(pendingParameters(f.vault, 'recipe.css')).resolves.toBeUndefined();
  await saveParameter(f.vault, 'recipe.css', '--hacksidian-size', '5', '3px');
  expect(readParameters(f.get())[0].value).toBe('5px');
});
test('preserves concurrent manual edits outside the parameter', async () => {
  const f = fixture();
  const saving = saveParameter(f.vault, 'recipe.css', '--hacksidian-size', '3', '2px');
  f.edit(css.replace('color: red', 'color: blue'));
  await saving;
  expect(f.get()).toContain('color: blue');
});
