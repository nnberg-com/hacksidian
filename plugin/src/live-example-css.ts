import path from "node:path";
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import { paletteVariables } from './palette';

/** CSS for embedded Reading-view content only. Installation still uses the unchanged recipe. */
export function scopeLiveExample(css: string, id: string): string {
  if (!/^hacksidian-live-[a-z0-9-]+$/.test(id)) throw new Error('Invalid preview ID');
  const tree = postcss.parse(css);
  const animations = new Map<string, string>();
  tree.walkAtRules(a => {
    if (/^(?:(?:-webkit-)?keyframes|counter-style)$/.test(a.name)) {
      if (!/^[\w-]+$/.test(a.params)) throw new Error('Unsupported animation name');
      const name = `${id}-${a.params}`; animations.set(a.params, name); a.params = name;
    } else if (a.name === 'media' && /^\s*\((?:min-|max-)?width\s*:[^)]+\)(?:\s+and\s+\((?:min-|max-)?width\s*:[^)]+\))*\s*$/.test(a.params)) {
      a.name = 'container'; a.params = 'preview ' + a.params;
    } else if (!['media', 'supports', 'container'].includes(a.name)) throw new Error('Global CSS resource: @' + a.name);
  });
  let readingRules = 0;
  tree.walkRules(rule => {
    if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
    if (rule.parent?.type === 'rule') throw new Error('Nested CSS selector');
    const ast = selectorParser().astSync(rule.selector);
    const keep: string[] = [];
    ast.each(selector => {
      let anchor: selectorParser.Node | undefined;
      let editorOnly = false;
      selector.each(node => {
        if (node.type === 'class' && node.value === 'markdown-preview-view') anchor = node;
        if (node.type === 'class' && node.value === 'markdown-source-view') editorOnly = true;
        if (node.type === 'pseudo' && node.value === ':is' && /^:is\(\s*\.markdown-preview-view\s*,\s*\.markdown-source-view\s*\)$/.test(node.toString().trim())) anchor = node;
      });
      if (!anchor) {
        if (editorOnly) return;
        throw new Error('Selector outside Reading-view content: ' + selector.toString());
      }
      const nodes = selector.nodes, index = nodes.findIndex(n => n === anchor);
      // Ancestors may only be the document's theme; never map interface ancestors or sibling hosts.
      const prefix = nodes.slice(0, index).map(n => n.toString()).join('').trim();
      if (prefix && !/^(?:(?:body|html|\.theme-dark|\.theme-light)(?:\.theme-dark|\.theme-light)?\s*)+$/.test(prefix)) throw new Error('Requires external container: ' + prefix);
      const nextCombinator = nodes.slice(index + 1).find(n => n.type === 'combinator');
      if (nextCombinator && !['', '>'].includes(nextCombinator.value.trim())) throw new Error('Selector escapes preview through a sibling');
      if (/\.markdown-preview-sizer|\.is-readable-line-width/.test(selector.toString())) throw new Error('Requires document navigation or page sizing');
      selector.walkPseudos(pseudo => { if (pseudo.value === ':target') pseudo.replaceWith(selectorParser().astSync('[data-hacksidian-target]').first.first.clone()); });
      anchor.replaceWith(selectorParser.id({ value: id }));
      keep.push(selector.toString());
    });
    if (keep.length) { rule.selector = keep.join(', '); readingRules++; } else rule.remove();
  });
  tree.walkDecls(d => {
    if (d.parent?.type !== 'rule' && !(d.parent?.type === 'atrule' && d.parent.name === 'counter-style')) throw new Error('Declaration outside a rule');
    if (/^(?:(?:-webkit-)?animation(?:-name)?|list-style(?:-type)?|system|fallback)$/.test(d.prop)) {
      for (const [name, scoped] of animations) d.value = d.value.replace(new RegExp('(?<![\\w-])' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w-])', 'g'), scoped);
    }
  });
  if (!readingRules && css.trim()) throw new Error('No Reading-view rules');
  return tree.toString();
}

export function liveExampleIssue(group: string, markdown: string, css: string): string | null {
  if (group === 'palette') {
    try {
      const selector = postcss.parse(css).nodes.find(node => node.type === 'rule');
      const mode = selector?.type === 'rule' && selector.selector === 'body.theme-dark' ? 'dark' : 'light';
      paletteVariables(css, mode);
      return null;
    } catch (e) { return String(e); }
  }
  if (['interface', 'metadata', 'meta'].includes(group)) return 'Части интерфейса, свойства или настройки Obsidian — вне текущего этапа.';
  if (/hacksidian-(?:source|interface|properties)-model/.test(markdown)) return 'Пример является моделью редактора или интерфейса, а не содержимым заметки.';
  if (/<(?:iframe|script|style|input|form)\b/i.test(markdown)) return 'Нужна отдельная реализация HTML-встраивания или элементов управления.';
  if (/```(?:dataviewjs|hacksidian-live)\b/.test(markdown)) return 'Пример требует отдельного исполняемого блока.';
  if (group === 'footnote' && /(?:#fn-|#fnref-)/.test(css)) return 'Селекторы используют идентификаторы сносок HTML-генератора; нужно сопоставить их с Obsidian.';
  if (/font-family\s*:[^;}]*\b(?:heading-e\d+|inline-code-ex-\d+|link-e\d+|list-e\d+|pseudo-task-e\d+)-/i.test(css)) return 'Приём требует специального шрифта, который пример пока не подключает.';
  const parsed = postcss.parse(css);
  let screen = false, print = false;
  parsed.walkRules(r => { let printing = false; for (let p = r.parent; p && p.type !== 'root'; p = p.parent) if (p.type === 'atrule' && p.name === 'media' && /\bprint\b/.test(p.params)) printing = true; if (printing) print = true; else screen = true; });
  if (print && !screen) return 'Эффект предназначен только для печати.';
  try { scopeLiveExample(css, 'hacksidian-live-check'); } catch (e) { return String(e).replace(/^Error: /, ''); }
  return null;
}

export function resolveLiveUrls(css: string, directory: string, resource: (file: string) => string): string {
  const tree = postcss.parse(css);
  tree.walkDecls(d => {
    d.value = d.value.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/gi, (full, a, b, c) => {
      const url = (a ?? b ?? c).trim();
      if (/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(url)) return full;
      return `url(${JSON.stringify(resource(path.posix.normalize(path.posix.join(directory, url))))})`;
    });
  });
  return tree.toString();
}
