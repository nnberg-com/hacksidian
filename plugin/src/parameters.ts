import postcss, { type Declaration } from 'postcss';

export interface CssParameter {
  variable: string;
  label: string;
  labelEn?: string;
  type: 'number' | 'select' | 'text' | 'color';
  value: string;
  default: string;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
  maxLength: number;
  options: { value: string; label: string; labelEn?: string }[];
}

function safeValue(value: string): boolean {
  if (!value || /[;{}\n\r]|\/\*|\*\/|!important|url\s*\(/i.test(value)) return false;
  try {
    const tree = postcss.parse(`a { --value: ${value}; }`);
    return tree.nodes.length === 1 && tree.first?.type === 'rule' && tree.first.nodes.length === 1;
  } catch { return false; }
}

/** Only a Doxygen block immediately preceding a unique custom property exposes a field. */
function definitions(css: string): { parameter: CssParameter; declaration: Declaration }[] {
  const tree = postcss.parse(css);
  const result: { parameter: CssParameter; declaration: Declaration }[] = [];
  const counts = new Map<string, number>();
  tree.walkDecls(d => { counts.set(d.prop, (counts.get(d.prop) ?? 0) + 1); });
  tree.walkComments(comment => {
    if (!comment.text.startsWith('*') || !/@parameter\b/.test(comment.text)) return;
    const tags = new Map<string, string[]>();
    for (const line of comment.text.split('\n')) {
      const match = line.replace(/^\s*\*?\s*/, '').match(/^@([\w-]+)\s+(.+)$/);
      if (match) tags.set(match[1], [...(tags.get(match[1]) ?? []), match[2].trim()]);
    }
    const one = (key: string) => {
      const entries = tags.get(key) ?? [];
      if (entries.length > 1) throw Error(`Duplicate @${key}`);
      return entries[0];
    };
    const declaration = comment.next();
    if (declaration?.type !== 'decl' || !/^--hacksidian-[a-z0-9-]+$/.test(declaration.prop) || counts.get(declaration.prop) !== 1 || declaration.important) {
      throw Error('Parameter must precede one unique --hacksidian-* declaration');
    }
    const type = one('type');
    if (type !== 'number' && type !== 'select' && type !== 'text' && type !== 'color') throw Error(`Invalid parameter type: ${type}`);
    const numeric = (key: string) => {
      const value = one(key);
      if (value === undefined) return undefined;
      if (!value.trim() || !Number.isFinite(Number(value))) throw Error(`Invalid @${key}`);
      return Number(value);
    };
    const options = (tags.get('option') ?? []).map(line => {
      const [value, label, labelEn] = line.split('|').map(part => part.trim());
      if (!safeValue(value) || !label) throw Error('Invalid @option');
      return { value, label, labelEn };
    });
    const parameter: CssParameter = {
      variable: declaration.prop, label: one('parameter')!, labelEn: one('label-en'), type,
      value: declaration.value, default: one('default') ?? '',
      unit: one('unit') ?? '', min: numeric('min'), max: numeric('max'), step: numeric('step'),
      maxLength: numeric('maxlength') ?? 40, options,
    };
    if (!parameter.label || !parameter.default || !['', 'px', 'em', 'rem', '%', 'ch', 'ms', 's', 'deg'].includes(parameter.unit) ||
        (parameter.min !== undefined && parameter.max !== undefined && parameter.min > parameter.max) ||
        (parameter.step !== undefined && parameter.step <= 0) || !Number.isInteger(parameter.maxLength) || parameter.maxLength < 1 ||
        (type === 'select' && (!options.length || new Set(options.map(o => o.value)).size !== options.length))) throw Error('Invalid parameter metadata');
    // Invalid current values remain visible/editable; authored defaults must be valid.
    parameterValue(parameter, parameterInput({ ...parameter, value: parameter.default }));
    result.push({ parameter, declaration });
  });
  return result;
}

export function readParameters(css: string): CssParameter[] { return definitions(css).map(item => item.parameter); }
export function parameterInput(parameter: CssParameter): string {
  if (parameter.type === 'text') {
    try { const value: unknown = JSON.parse(parameter.value); return typeof value === 'string' ? value : parameter.value; } catch { return parameter.value; }
  }
  return parameter.type === 'number' && parameter.unit && parameter.value.endsWith(parameter.unit)
    ? parameter.value.slice(0, -parameter.unit.length) : parameter.value;
}
export function parameterValue(parameter: CssParameter, input: string): string {
  if (parameter.type === 'color') {
    if (!/^#[0-9a-f]{6}$/i.test(input)) throw Error('Введите цвет #RRGGBB / Enter a #RRGGBB color');
    return input.toLowerCase();
  }
  if (parameter.type === 'text') {
    if (input.includes('/* hacksidian:')) throw Error('Reserved recipe marker');
    if (input.length > parameter.maxLength || /[\n\r\u0000-\u001f]/.test(input)) throw Error(`Максимум ${parameter.maxLength} символов / characters`);
    // CSS string escaping, not code interpolation. Backslashes and quotes are literals.
    return JSON.stringify(input);
  }
  if (parameter.type === 'select') {
    if (!parameter.options.some(option => option.value === input)) throw Error('Выберите значение из списка / Select an option');
    return input;
  }
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(input.trim())) throw Error('Введите число / Enter a number');
  const value = Number(input);
  if (!Number.isFinite(value) || (parameter.min !== undefined && value < parameter.min) || (parameter.max !== undefined && value > parameter.max)) throw Error(`Диапазон / Range: ${parameter.min ?? '−∞'} … ${parameter.max ?? '∞'}`);
  if (parameter.step !== undefined) {
    const steps = (value - (parameter.min ?? 0)) / parameter.step;
    if (Math.abs(steps - Math.round(steps)) > 1e-7) throw Error(`Шаг / Step: ${parameter.step}`);
  }
  return `${value}${parameter.unit}`;
}

/** Replace only the selected declaration's value; preserve all other source bytes. */
export function updateParameter(css: string, variable: string, input: string, expected?: string): string {
  const entry = definitions(css).find(item => item.parameter.variable === variable);
  if (!entry) throw Error(`Unknown parameter: ${variable}`);
  if (expected !== undefined && entry.parameter.value !== expected) throw Error('Значение изменено в другой карточке. Повторите ввод. / Value changed in another card. Retry.');
  const value = parameterValue(entry.parameter, input);
  const declaration = entry.declaration;
  const start = declaration.source?.start?.offset;
  const end = declaration.source?.end?.offset;
  if (start === undefined || end === undefined) throw Error('Missing CSS source location');
  const original = css.slice(start, end + 1);
  const colon = original.indexOf(':');
  const leading = original.slice(colon + 1).match(/^\s*/)?.[0] ?? '';
  const valueStart = start + colon + 1 + leading.length;
  const rawValue = declaration.raws.value?.raw ?? declaration.value;
  return css.slice(0, valueStart) + value + css.slice(valueStart + rawValue.length);
}
