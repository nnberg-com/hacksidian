import { t } from "../i18n";
import postcss from 'postcss';
import type { ModularStyle } from './style-modules';

export interface HackSpec {
  format: number;
  target: string;
  requirements?: string[];
  hasCss: boolean;
}
export interface HackContext {
  id: string;
  title: string;
  path: string;
  spec: HackSpec;
  css: string;
}

export function hackId(path: string, tags: unknown): string | null {
  const match = path.match(/(?:^|\/)atlas\/! hacks\/([a-z0-9][a-z0-9-]*)\/([^/]+)\.md$/);
  const tagged = Array.isArray(tags) && tags.some(t => t === 'atlas/technique' || t === '#atlas/technique');
  return match && (match[1] === match[2] || /^Description\.(ru|en)$/.test(match[2])) && tagged ? match[1] : null;
}

// Recipes are trusted local CSS files, like manually authored snippets.
// Parse syntax, then preserve the source exactly; do not rewrite its selectors.
export function compileHack(hack: HackContext): string {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(hack.id) || hack.spec.format !== 2 || typeof hack.css !== 'string') {
    throw new Error(t("hacks.invalid_technique_format"));
  }
  if (!hack.spec.hasCss) throw new Error(t("hacks.this_technique_has_no_css_of_its"));
  postcss.parse(hack.css);
  return hack.css;
}

export function addHack(style: ModularStyle, hack: HackContext): { style: ModularStyle; changed: boolean } {
  const selected = style.modules.find(m => m.id === hack.spec.target);
  if (!selected) throw new Error(t("hacks.target_snippet_was_not_found", { p0: hack.spec.target }));
  const marker = `/* hacksidian:hack:${hack.id}:start */`;
  const installed = style.modules.find(m => m.css.includes(marker));
  const css = compileHack(hack);
  if (installed) {
    const endMarker = `/* hacksidian:hack:${hack.id}:end */`;
    const start = installed.css.indexOf(marker);
    const end = installed.css.indexOf(endMarker, start + marker.length);
    if (installed.id !== selected.id || end < 0 || installed.css.indexOf(marker, start + marker.length) >= 0 ||
        style.modules.some(m => m !== installed && m.css.includes(marker))) {
      throw new Error(t("hacks.invalid_technique_format"));
    }
    const updated = installed.css.slice(0, start) + marker + '\n' + css + endMarker + installed.css.slice(end + endMarker.length);
    if (updated === installed.css) return { style, changed: false };
    return { changed: true, style: { ...style, modules: style.modules.map(m => m === installed ? { ...m, css: updated } : m) } };
  }
  return { changed: true, style: { ...style, modules: style.modules.map(m => m.id !== selected.id ? m : {
    ...m, css: m.css.trimEnd() + '\n\n' + marker + '\n' + css + `/* hacksidian:hack:${hack.id}:end */\n`,
  }) } };
}
