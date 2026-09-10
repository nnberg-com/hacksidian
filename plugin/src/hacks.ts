import postcss from 'postcss';
import type { ModularStyle } from './style-modules';

export interface HackSpec {
  format: number;
  target: string;
  atlas: { scope: string; class: string };
  snippet: { scope: string; class: string };
  hasCss: boolean;
}
export interface HackContext {
  id: string;
  title: string;
  path: string;
  spec: HackSpec;
  template: string;
  dependencies: string;
}

export function hackId(path: string, tags: unknown): string | null {
  const match = path.match(/(?:^|\/)atlas\/! hacks\/([a-z0-9][a-z0-9-]*)\/([^/]+)\.md$/);
  const tagged = Array.isArray(tags) && tags.some(t => t === 'atlas/technique' || t === '#atlas/technique');
  return match && match[1] === match[2] && tagged ? match[1] : null;
}

export function bindTemplate(template: string, bindings: HackSpec['snippet']): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    if (key !== 'scope' && key !== 'class') throw new Error(`Неизвестный параметр CSS: ${key}`);
    if (typeof bindings[key] !== 'string') throw new Error(`Не задан параметр CSS: ${key}`);
    return bindings[key];
  });
}

export function compileHack(hack: HackContext): string {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(hack.id) || hack.spec.format !== 1) throw new Error('Неверный формат приёма.');
  if (!hack.spec.hasCss) throw new Error('У этого приёма нет собственного CSS: он демонстрирует возможности разметки.');
  const nativeVariable = /^--(?:background|text|font|color|metadata|callout|code|link|interactive|h[1-6])-/;
  const dependencies = postcss.parse(bindTemplate(hack.dependencies, hack.spec.snippet));
  dependencies.walkDecls(d => { if (nativeVariable.test(d.prop)) d.remove(); });
  dependencies.walkRules(r => { if (!r.nodes.length) r.remove(); });
  const root = postcss.parse(dependencies.toString() + '\n' + bindTemplate(hack.template, hack.spec.snippet));
  const variables = new Map<string, string>();
  const animations = new Map<string, string>();
  root.walkDecls(d => { if (d.prop.startsWith('--') && !nativeVariable.test(d.prop)) variables.set(d.prop, `--hack-${hack.id}-${d.prop.slice(2)}`); });
  root.walkAtRules(/keyframes$/i, rule => { animations.set(rule.params.trim(), `hack-${hack.id}-${rule.params.trim()}`); });
  root.walkDecls(d => {
    if (variables.has(d.prop)) d.prop = variables.get(d.prop)!;
    d.value = d.value.replace(/var\(\s*(--[\w-]+)/g, (full, name: string) => variables.has(name) ? full.replace(name, variables.get(name)!) : full);
    if (/^(?:-webkit-)?animation(?:-name)?$/.test(d.prop)) d.value = d.value.replace(/[a-zA-Z_][\w-]*/g, name => animations.get(name) ?? name);
    if (/url\(\s*["']?(?!data:)[^\s"')]/i.test(d.value)) throw new Error('Приём содержит внешний или относительный CSS-ресурс.');
  });
  root.walkAtRules(rule => {
    if (/keyframes$/i.test(rule.name)) rule.params = animations.get(rule.params.trim())!;
    else if (!['media','supports','container','layer','starting-style'].includes(rule.name.toLowerCase())) throw new Error(`Неподдерживаемое правило @${rule.name}.`);
  });
  root.walkRules(rule => {
    let parent = rule.parent;
    while (parent && parent.type !== 'root') {
      if (parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return;
      parent = parent.parent;
    }
    // Inspect top-level comma groups with PostCSS (commas in :is() stay intact).
    for (const selector of rule.selectors) {
      if (!selector.includes('.callmered-coloring') || /\.atlas-|\.meta-[\w-]+/.test(selector)) throw new Error('Селектор приёма не привязан к рабочей области Hacksidian.');
      if (!selector.includes('.markdown-preview-view') && !selector.includes('.markdown-source-view')) throw new Error('Не задан режим отображения Obsidian.');
    }
  });
  // Exact duplicate rules inherited from the old catalogue are not needed at runtime.
  const seen = new Set<string>();
  for (const node of [...root.nodes]) {
    if (node.type === 'comment') { node.remove(); continue; }
    const key = node.toString();
    if (seen.has(key)) node.remove(); else seen.add(key);
  }
  return root.toString().trim() + '\n';
}

export function addHack(style: ModularStyle, hack: HackContext): { style: ModularStyle; changed: boolean } {
  const selected = style.modules.find(m => m.id === hack.spec.target);
  if (!selected) throw new Error(`Не найден целевой сниппет ${hack.spec.target}.`);
  const marker = `/* hacksidian:hack:${hack.id}:start */`;
  if (style.modules.some(m => m.css.includes(marker))) return { style, changed: false };
  const css = compileHack(hack);
  return { changed: true, style: { ...style, modules: style.modules.map(m => m.id !== selected.id ? m : {
    ...m, css: m.css.trimEnd() + '\n\n' + marker + '\n' + css + `/* hacksidian:hack:${hack.id}:end */\n`,
  }) } };
}
