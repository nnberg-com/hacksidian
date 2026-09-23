import { resolveParameterVariants } from './parameter-variants';
import { readParameters } from './parameters';
import postcss from 'postcss';

export interface PaletteInfo {
  format: 1;
  family: string;
  familyId: string;
  variant: string;
  mode: 'light';
  source: string;
  note: string;
  accent: string;
  refs: Record<string, string>;
}

export function parsePaletteInfo(raw: string, css?: string): PaletteInfo {
  const data = JSON.parse(raw);
  const selected = css === undefined ? undefined : readParameters(css).find(p => p.variable === data.parameter)?.value;
  const p = data.variants ? data.variants[selected ?? ''] : data;
  if (!p) throw new Error('Не найдено описание выбранной палитры');
  if (p.format !== 1 || p.mode !== 'light' ||
      !['family', 'familyId', 'variant', 'source', 'note', 'accent'].every(k => typeof p[k] === 'string') ||
      !/^https:\/\//.test(p.source) || !p.refs || typeof p.refs !== 'object') throw new Error('Некорректная палитра');
  return p;
}

/** A variable-only contract. Never insert a body selector into the host document. */
export function paletteVariables(css: string, mode: 'light'): Record<string, string> {
  const values: Record<string, string> = {};
  const tree = postcss.parse(resolveParameterVariants(css));
  tree.walkAtRules(() => { throw new Error('Палитра не должна содержать @-правила'); });
  tree.walkRules(rule => {
    if (rule.selector !== `body.theme-${mode}` || rule.parent?.type !== 'root') throw new Error('Некорректная область палитры');
    rule.walkDecls(d => {
      if (!/^--(?:color-|background-|text-|interactive-|code-|hacksidian-)/.test(d.prop) || d.important || /url\s*\(/i.test(d.value)) throw new Error('Палитра должна менять только штатные цветовые переменные');
      values[d.prop] = d.value;
    });
  });
  for (const name of ['--background-primary', '--background-secondary', '--text-normal', '--text-muted', '--text-faint', '--background-modifier-border', ...['red','orange','yellow','green','cyan','blue','purple','pink'].map(c => `--color-${c}`)]) {
    if (!values[name]) throw new Error(`Нет цветовой роли ${name}`);
  }
  return values;
}

export function contrastRatio(a: readonly number[], b: readonly number[]): number {
  const luminance = (rgb: readonly number[]) => rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
