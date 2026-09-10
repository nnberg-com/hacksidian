import postcss, { type ChildNode } from "postcss";
import { validateGeneratedCss } from "./css";

export interface StyleModule { id: string; component: string; css: string }
export interface ModularStyle { format: 1; modules: StyleModule[] }

// Only used when importing a legacy stylesheet. Never regroup a stored style:
// repeated component segments preserve their original positions in the cascade.
function component(node: ChildNode): string {
  if (node.type !== "rule") return "foundation";
  const selector = node.selector;
  if (node.nodes.some(child => child.type === "decl" && child.prop === "--cmr-font-text")) return "foundation";
  if (selector.includes(".footnotes")) return "footnotes";
  if (selector.includes("pre code :is(")) return "syntax";
  if (selector.includes(".metadata-container")) return "obsidian";
  if (/^\.markdown-preview-view\.callmered-coloring$/.test(selector)) return "foundation";
  if (/:is\(p, li, table/.test(selector)) return "typography";
  if (/h[1-6]|\.el-h[1-6]/.test(selector)) return "typography";
  if (/blockquote|\.callout/.test(selector)) return "quotes-callouts";
  if (/task-list|\bul\b|\bol\b|li::marker/.test(selector)) return "lists";
  if (/\btable\b|\.el-table/.test(selector)) return "tables";
  if (/\bimg\b/.test(selector)) return "media";
  if (/\bpre\b/.test(selector) && !/:not\(pre\)/.test(selector)) return "code";
  if (/\ba\b|\bmark\b|\bcode\b|\bdel\b|\bs\b/.test(selector)) return "links-inline";
  return "typography";
}

export function importStyle(css: string): ModularStyle {
  const root = postcss.parse(css);
  const modules: StyleModule[] = [];
  let current = "foundation";
  let start = 0;
  const push = (end: number) => {
    if (end <= start) return;
    modules.push({ id: `${current}-${String(modules.length + 1).padStart(2, "0")}`, component: current, css: css.slice(start, end) });
    start = end;
  };
  for (const node of root.nodes) {
    if (node.type === "comment") continue;
    const next = component(node);
    if (next !== current) {
      push(node.source!.start!.offset);
      current = next;
    }
  }
  push(css.length);
  if (!modules.length) modules.push({ id: "foundation-01", component: "foundation", css });
  return { format: 1, modules };
}

export function compileStyle(style: ModularStyle): string {
  if (style.format !== 1 || !Array.isArray(style.modules) || !style.modules.length) throw new Error("Неверный формат модульного стиля.");
  const ids = new Set<string>();
  for (const module of style.modules) {
    if (!/^[a-z][a-z0-9-]*$/.test(module.id) || ids.has(module.id)) throw new Error("Неверный или повторный ID CSS-модуля.");
    if (typeof module.css !== "string" || typeof module.component !== "string") throw new Error("Неверный CSS-модуль.");
    ids.add(module.id);
    postcss.parse(module.css);
  }
  const css = style.modules.map(module => module.css).join("");
  postcss.parse(css);
  return css;
}

// Freeze rule order, selectors, at-rule conditions, properties and importance.
// Values are the only editable part of an established module in this first version.
function contract(css: string): string {
  const root = postcss.parse(css);
  const shape = (node: ChildNode): unknown => {
    if (node.type === "comment") return null;
    if (node.type === "decl") return ["decl", node.prop, !!node.important];
    if (node.type === "rule") return ["rule", node.selectors, node.nodes.map(shape).filter(Boolean)];
    return ["at", node.name, node.params, node.nodes?.map(shape).filter(Boolean)];
  };
  return JSON.stringify(root.nodes.map(shape).filter(Boolean));
}

export function replaceStyleModule(style: ModularStyle, id: string, css: string, fonts?: string[]): ModularStyle {
  compileStyle(style);
  const selected = style.modules.find(module => module.id === id);
  if (!selected) throw new Error(`Неизвестный CSS-модуль: ${id}.`);
  const bootstrap = style.modules.length === 1 && contract(selected.css) === "[]";
  if (!bootstrap && contract(selected.css) !== contract(css)) {
    throw new Error("Изменён структурный контракт CSS-модуля. Разрешено менять значения, сохраняя селекторы и свойства.");
  }
  const candidate = postcss.parse(css);
  if (!bootstrap) {
    const oldDeclarations: string[] = [];
    postcss.parse(selected.css).walkDecls(d => { oldDeclarations.push(d.toString()); });
    let index = 0;
    candidate.walkDecls(d => { if (d.toString() === oldDeclarations[index++]) d.remove(); });
  }
  const errors = validateGeneratedCss(candidate.toString(), fonts);
  if (errors.length) throw new Error(errors.join(" "));
  const next: ModularStyle = { format: 1, modules: style.modules.map(module => module.id === id ? { ...module, css } : { ...module }) };
  // Parse and validate the assembled result too, not just the replacement fragment.
  compileStyle(next);
  return bootstrap ? importStyle(compileStyle(next)) : next;
}
