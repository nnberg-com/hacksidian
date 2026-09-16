import { createHash } from 'node:crypto';
import postcss from 'postcss';

export interface CatalogEntry {
  id: string;
  kind: 'technique' | 'setting' | 'variable';
  title: string;
  path: string;
  text: string;
  helpUrl?: string;
  menuPath?: string;
  applyAvailable?: boolean;
}
export interface CatalogDocument { name: string; hash: string; text: string; fileId?: string }
export interface CatalogSnapshot {
  revision: string;
  createdAt: string;
  storeId: string;
  entries: CatalogEntry[];
  documents: CatalogDocument[];
}
export interface CatalogResources { storeId: string; fileIds: string[] }
export interface CatalogState {
  active?: CatalogSnapshot;
  pending?: CatalogResources;
  garbage: CatalogResources[];
}
export const digest = (text: string): string => createHash('sha256').update(text).digest('hex');

// Keep authored explanations, requirements and examples. Historical HTML/CSS and
// generated reports are not search descriptions and must not drown out intent.
export function techniqueEntry(path: string, markdown: string, meta: Record<string, unknown>, spec: { hasCss: boolean; requirements?: string[] }, css: string): CatalogEntry {
  const id = String(meta.id ?? path.split('/').at(-2));
  const title = typeof meta.title === 'string' ? meta.title : id;
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, '');
  const sections = body.split(/(?=^## )/m).filter(section => !/^## (?:Живой пример|Исходный CSS|Данные исходного|HTML исходного|Опора на стандартную|Источники|Пояснения из HTML|Использование в Obsidian|Live example|Original CSS|Source catalog|Source HTML|Sources)/i.test(section));
  const description = sections.join('\n').replace(/```hacksidian-live[\s\S]*?```/g, '').replace(/^.*\[Открыть Markdown-пример\].*$/gm, '').trim();
  const selectors = new Set<string>(), properties = new Set<string>();
  if (spec.hasCss) {
    const root = postcss.parse(css);
    root.walkRules(rule => { selectors.add(rule.selector); });
    root.walkDecls(decl => { properties.add(decl.prop); });
  }
  return { id, kind: 'technique', title, path, applyAvailable: spec.hasCss, text: [
    `Category: ${meta.category ?? ''}`,
    description,
    `Requirements: ${(spec.requirements ?? []).join('; ') || 'Not specified; do not infer compatibility.'}`,
    `Apply: ${spec.hasCss ? 'Open card and press Apply technique. No automatic application from chat.' : 'No applicable CSS; follow the card instructions manually.'}`,
    `Selectors (scope evidence): ${[...selectors].join(' | ')}`,
    `CSS properties: ${[...properties].join(', ')}`,
    'Parameter adaptation is unavailable. Do not invent configurable options or claim combinations were tested.',
  ].join('\n') };
}

export function variableEntries(path: string, css: string): CatalogEntry[] {
  const entries: CatalogEntry[] = [];
  postcss.parse(css).walkDecls(/^--/, declaration => {
    const scope = declaration.parent?.type === 'rule' ? declaration.parent.selector : 'unspecified';
    entries.push({ id: `variable-${digest(`${scope}:${declaration.prop}`).slice(0,16)}`, kind: 'variable', title: declaration.prop, path,
      text: `Global CSS variable setting. Variable: ${declaration.prop}\nCurrent authored value: ${declaration.value}\nScope selector: ${scope}\nEdit this declaration manually in ${path}. Its effect is limited to matching elements and consumers of this variable. Do not claim that it affects all of Obsidian. No automatic changes.` });
  });
  return entries;
}

export function settingEntries(): CatalogEntry[] {
  return [
    ['accent', 'Акцентный цвет / Accent color', 'Appearance → Accent color', 'Change the accent color of the interface. Изменить акцентный цвет интерфейса.'],
    ['scheme', 'Светлая и тёмная тема / Color scheme', 'Appearance → Base color scheme', 'Choose light, dark or system color scheme. Светлая, тёмная или системная тема.'],
    ['text-font', 'Шрифт текста / Text font', 'Appearance → Text font', 'Choose the text font. Изменить шрифт текста заметок.'],
    ['font-size', 'Размер шрифта / Font size', 'Appearance → Font size', 'Change text font size. Увеличить или уменьшить размер текста.'],
    ['interface-font', 'Шрифт интерфейса / Interface font', 'Appearance → Interface font', 'Change the interface font. Изменить шрифт интерфейса.'],
    ['line-length', 'Длина строки / Readable line length', 'Editor → Display → Readable line length', 'Limit line width for reading, or disable to use available width. Ограничить длину строки или использовать доступную ширину. This does not create multiple columns.'],
  ].map(([id, title, menu, description]) => ({ id: `setting-${id}`, kind: 'setting', title, path: '',
    helpUrl: 'https://obsidian.md/help/settings', menuPath: `Settings → ${menu}`,
    text: `${description}\nMenu path (English labels): Settings → ${menu}. Localized labels may differ.\nApply manually in standard Obsidian settings. No plugin or CSS needed.\nSource: https://obsidian.md/help/settings (reviewed 2026-09-16).` }));
}

export function buildCatalog(entries: CatalogEntry[]): { revision: string; documents: CatalogDocument[]; entries: CatalogEntry[] } {
  const sorted = [...entries].sort((a,b) => a.id.localeCompare(b.id));
  if (new Set(sorted.map(entry => entry.id)).size !== sorted.length) throw new Error('Duplicate catalog ID');
  const groups = new Map<string, CatalogEntry[]>();
  for (const entry of sorted) {
    // Stable buckets avoid shifting every document when a card is added/deleted.
    const bucket = `${entry.kind}-${digest(entry.id).slice(0,2)}`;
    groups.set(bucket, [...(groups.get(bucket) ?? []), entry]);
  }
  const documents = [...groups].sort(([a],[b]) => a.localeCompare(b)).map(([bucket, records]) => {
    const text = records.map(entry => `# ID: ${entry.id}\nType: ${entry.kind}\nTitle: ${entry.title}\n${entry.text}\nEND ID: ${entry.id}`).join('\n\n---\n\n');
    return { name: `${bucket}.md`, hash: digest(text), text };
  });
  return { revision: digest(JSON.stringify(sorted)), documents, entries: sorted };
}
