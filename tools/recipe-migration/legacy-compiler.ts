// One-time import of the retired template format. Not part of the plugin build.
import { t } from "../../plugin/i18n";
import postcss from 'postcss';
import type { ModularStyle } from './style-modules';

export interface HackSpec {
  format: number;
  target: string;
  atlas?: { scope: string; class: string; [key: string]: string };
  snippet?: { scope: string; class: string; [key: string]: string };
  requirements?: string[];
  hasCss: boolean;
}
export interface HackContext {
  id: string;
  title: string;
  path: string;
  spec: HackSpec;
  css?: string;
  template: string;
  dependencies: string;
}

export function hackId(path: string, tags: unknown): string | null {
  const match = path.match(/(?:^|\/)atlas\/! hacks\/([a-z0-9][a-z0-9-]*)\/([^/]+)\.md$/);
  const tagged = Array.isArray(tags) && tags.some(t => t === 'hacksidian_technique' || t === '#hacksidian_technique');
  return match && (match[1] === match[2] || /^Description\.(ru|en)$/.test(match[2])) && tagged ? match[1] : null;
}

export function bindTemplate(template: string, bindings: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    if (typeof bindings[key] !== 'string') throw new Error(t("hacks.missing_css_parameter", { p0: key }));
    return bindings[key];
  });
}

export function compileHack(hack: HackContext): string {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(hack.id)) throw new Error(t("hacks.invalid_technique_format"));
  if (!hack.spec.hasCss) throw new Error(t("hacks.this_technique_has_no_css_of_its"));
  if (hack.spec.format === 2) {
    if (typeof hack.css !== 'string') throw new Error(t("hacks.invalid_technique_format"));
    postcss.parse(hack.css);
    return hack.css;
  }
  if (hack.spec.format !== 1 || !hack.spec.snippet) throw new Error(t("hacks.invalid_technique_format"));
  const nativeVariable = /^--(?:background|text|font|color|metadata|callout|code|link|interactive|h[1-6])-/;
  const dependencies = postcss.parse(bindTemplate(hack.dependencies, hack.spec.snippet));
  dependencies.walkDecls(d => { if (nativeVariable.test(d.prop)) d.remove(); });
  dependencies.walkRules(r => { if (!r.nodes.length) r.remove(); });
  const root = postcss.parse(dependencies.toString() + '\n' + bindTemplate(hack.template, hack.spec.snippet));
  const variables = new Map<string, string>();
  const animations = new Map<string, string>();
  const counters = new Map<string, string>();
  root.walkAtRules('counter-style', rule => { counters.set(rule.params.trim(), `hack-${hack.id}-${rule.params.trim()}`); });
  root.walkDecls(d => { if (d.prop.startsWith('--') && !nativeVariable.test(d.prop)) variables.set(d.prop, `--hack-${hack.id}-${d.prop.slice(2)}`); });
  root.walkAtRules(/keyframes$/i, rule => { animations.set(rule.params.trim(), `hack-${hack.id}-${rule.params.trim()}`); });
  root.walkDecls(d => {
    if (variables.has(d.prop)) d.prop = variables.get(d.prop)!;
    d.value = d.value.replace(/var\(\s*(--[\w-]+)/g, (full, name: string) => variables.has(name) ? full.replace(name, variables.get(name)!) : full);
    if (/^(?:-webkit-)?animation(?:-name)?$/.test(d.prop)) d.value = d.value.replace(/[a-zA-Z_][\w-]*/g, name => animations.get(name) ?? name);
    if (/^list-style(?:-type)?$/.test(d.prop) || ['system','fallback'].includes(d.prop)) d.value = d.value.replace(/[a-zA-Z_][\w-]*/g, name => counters.get(name) ?? name);
    if (/url\(\s*["']?(?!data:)[^\s"')]/i.test(d.value)) throw new Error(t("hacks.the_technique_contains_an_external_or_relative"));
  });
  root.walkAtRules(rule => {
    if (/keyframes$/i.test(rule.name)) rule.params = animations.get(rule.params.trim())!;
    else if (rule.name === 'counter-style') rule.params = counters.get(rule.params.trim())!;
    else if (!['media','supports','container','layer','starting-style'].includes(rule.name.toLowerCase())) throw new Error(t("hacks.unsupported_rule", { p0: rule.name }));
  });
  root.walkRules(rule => {
    let parent = rule.parent;
    while (parent && parent.type !== 'root') {
      if (parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return;
      parent = parent.parent;
    }
    // Inspect top-level comma groups with PostCSS (commas in :is() stay intact).
    for (const selector of rule.selectors) {
      if (!selector.includes('.callmered-coloring') || /\.atlas-|\.meta-[\w-]+/.test(selector)) throw new Error(t("hacks.the_technique_selector_is_not_scoped_to"));
      if (!selector.includes('.markdown-preview-view') && !selector.includes('.markdown-source-view')) throw new Error(t("hacks.no_obsidian_display_mode_was_specified"));
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
