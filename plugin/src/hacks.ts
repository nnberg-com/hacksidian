import { t } from "../i18n";
import postcss from 'postcss';
import type { ModularStyle } from './style-modules';

export interface HackSpec {
  format: number;
  target: string;
  requirements?: string[];
  hasCss: boolean;
  /** Mutually exclusive recipes, independently for light/dark palettes. */
  exclusiveGroup?: string;
}
export interface HackContext {
  installed?: boolean;
  id: string;
  title: string;
  path: string;
  spec: HackSpec;
  css: string;
}

export function hackId(path: string, tags: unknown): string | null {
  const match = path.match(/(?:^|\/)atlas\/! hacks\/([a-z0-9][a-z0-9-]*)\/([^/]+)\.md$/);
  const tagged = Array.isArray(tags) && tags.some(t => t === 'hacksidian_technique' || t === '#hacksidian_technique');
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
  const original = style;
  if (hack.spec.exclusiveGroup) {
    if (!/^palette-(light|dark)$/.test(hack.spec.exclusiveGroup) || hack.spec.target !== 'g-palette' || !hack.css.includes(`/* hacksidian:exclusive:${hack.spec.exclusiveGroup} */`)) throw new Error(t('hacks.invalid_technique_format'));
    // Ownership is stored inside the removable recipe block, never in a second registry.
    const selectedModule = style.modules.find(m => m.id === hack.spec.target);
    const blocks = [...(selectedModule?.css.matchAll(/\/\* hacksidian:hack:([a-z0-9-]+):start \*\/([\s\S]*?)\/\* hacksidian:hack:\1:end \*\//g) ?? [])];
    const marker = `/* hacksidian:exclusive:${hack.spec.exclusiveGroup} */`;
    if ((selectedModule?.css.split(marker).length ?? 1) - 1 !== blocks.filter(b => b[2].includes(marker)).length) throw new Error(t('hacks.invalid_technique_format'));
    for (const block of blocks) {
      if (block[1] !== hack.id && block[2].includes(`/* hacksidian:exclusive:${hack.spec.exclusiveGroup} */`)) style = removeHack(style, block[1]).style;
    }
  }
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
    if (updated === installed.css) return { style, changed: style !== original };
    return { changed: true, style: { ...style, modules: style.modules.map(m => m === installed ? { ...m, css: updated } : m) } };
  }
  return { changed: true, style: { ...style, modules: style.modules.map(m => m.id !== selected.id ? m : {
    ...m, css: m.css.trimEnd() + '\n\n' + marker + '\n' + css + `/* hacksidian:hack:${hack.id}:end */\n`,
  }) } };
}

export function hasHack(style: ModularStyle | undefined, id: string): boolean {
  return !!style?.modules.some(m => m.css.includes(`/* hacksidian:hack:${id}:start */`) || m.css.includes(`/* hacksidian:hack:${id}:end */`));
}

export function removeHack(style: ModularStyle, id: string): { style: ModularStyle; changed: boolean } {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error(t('hacks.invalid_technique_format'));
  const startMarker = `/* hacksidian:hack:${id}:start */`, endMarker = `/* hacksidian:hack:${id}:end */`;
  const matches = style.modules.filter(m => m.css.includes(startMarker) || m.css.includes(endMarker));
  if (!matches.length) return { style, changed: false };
  const module = matches[0], start = module.css.indexOf(startMarker), end = module.css.indexOf(endMarker);
  if (matches.length !== 1 || start < 0 || end < start || module.css.split(startMarker).length !== 2 || module.css.split(endMarker).length !== 2) throw new Error(t('hacks.invalid_technique_format'));
  if (module.css.slice(start + startMarker.length, end).includes('/* hacksidian:hack:')) throw new Error(t('hacks.invalid_technique_format'));
  return { changed: true, style: { ...style, modules: style.modules.map(m => m !== module ? m : { ...m, css: m.css.slice(0, start) + m.css.slice(end + endMarker.length) }) } };
}
