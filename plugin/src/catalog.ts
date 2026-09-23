import { createHash } from 'node:crypto';
import postcss from 'postcss';
import { readParameters } from './parameters';

export interface CatalogEntry {
  id: string;
  kind: 'technique' | 'setting' | 'variable' | 'theme';
  title: string;
  path: string;
  text: string;
  helpUrl?: string;
  menuPath?: string;
  applyAvailable?: boolean;
  themeIds?: string[];
}
export interface CatalogDocument { name: string; hash: string; text: string; fileId?: string; entryId?: string }
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
  sync?: { storeId: string; documents: CatalogDocument[]; entries?: CatalogEntry[] };
  pending?: CatalogResources;
  garbage: CatalogResources[];
}
export const digest = (text: string): string => createHash('sha256').update(text).digest('hex');

export function themeEntry(path: string, meta: Record<string, unknown>): CatalogEntry {
  const id = String(meta.id ?? '');
  const url = String(meta.community_url ?? '');
  if (!/^theme-[a-z0-9_-]+$/.test(id) || !/^https:\/\/community\.obsidian\.md\/themes\/[a-z0-9_-]+$/.test(url)
    || typeof meta.title !== 'string' || typeof meta.description !== 'string' || typeof meta.repo !== 'string') {
    throw new Error(`Invalid theme card: ${path}`);
  }
  return { id, kind: 'theme', title: meta.title, path, helpUrl: url, text: [
    `Community theme by ${meta.author ?? 'unspecified'}. ${meta.description}`,
    `Declared color modes: ${Array.isArray(meta.modes) ? meta.modes.join(', ') : 'unspecified'}.`,
    `Community: ${url}\nAuthor repository: https://github.com/${meta.repo}`,
    `Metadata checked: ${meta.checked ?? 'unspecified'}. Downloads are popularity, not a quality or compatibility guarantee.`,
    'A complete theme changes appearance across the vault. Inspect its Community page and install manually via Settings → Appearance → Themes → Manage. No automatic installation or activation.',
    'Only recommend features documented here. Source relationships describe provenance and adaptations, not verified identical behavior in the current theme.',
  ].join('\n') };
}

export function relatedThemes(entry: CatalogEntry, entries: CatalogEntry[]): CatalogEntry[] {
  return [...new Set(entry.themeIds ?? [])].map(id => entries.find(candidate => candidate.id === id && candidate.kind === 'theme'))
    .filter((theme): theme is CatalogEntry => !!theme);
}

// Keep authored explanations, requirements and examples. Historical HTML/CSS and
// generated reports are not search descriptions and must not drown out intent.
export function techniqueEntry(path: string, markdown: string, meta: Record<string, unknown>, spec: { hasCss: boolean; requirements?: string[] }, css: string): CatalogEntry {
  const id = path.split('/').at(-1)!.replace(/\.md$/, '');
  const title = typeof meta.title === 'string' ? meta.title : id;
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, '');
  const sections = body.split(/(?=^## )/m).filter(section => !/^## (?:Живой пример|Исходный CSS|Данные исходного|HTML исходного|Опора на стандартную|Источники|Использование в Obsidian|Live example|Original CSS|Source catalog|Source HTML|Sources)/i.test(section));
  const description = sections.join('\n').replace(/^(`{3,})hacksidian-details\n([\s\S]*?)^\1\s*$/gm, '$2').replace(/```hacksidian-(?:live|css|markdown|files|sources|id)[\s\S]*?```/g, '').replace(/^.*\[Открыть Markdown-пример\].*$/gm, '').trim();
  const selectors = new Set<string>(), properties = new Set<string>(), declarations = new Set<string>();
  if (spec.hasCss) {
    const root = postcss.parse(css);
    root.walkRules(rule => { selectors.add(rule.selector); });
    root.walkDecls(decl => {
      properties.add(decl.prop);
      // Search needs values (wavy vs dotted), not embedded image/font payloads.
      const value = decl.value.replace(/url\(\s*(["']?)data:[\s\S]*?\1\s*\)/gi, 'url("[embedded data]")');
      declarations.add(`${decl.prop}: ${value}${decl.important ? ' !important' : ''}`);
    });
  }
  return { id, kind: 'technique', title, path, applyAvailable: spec.hasCss, text: [
    `Category: ${meta.category ?? ''}`,
    description,
    `Parameter choices for discovery: ${readParameters(css).filter(p => p.type === "select").map(p => `${p.label}: ${p.options.map(o => [o.label, o.labelEn, o.value].filter(Boolean).join(" / ")).join("; ")}`).join(" | ")}`,
    `Requirements: ${(spec.requirements ?? []).join('; ') || 'Not specified; do not infer compatibility.'}`,
    `Apply: ${spec.hasCss ? 'The card supports application. Current chat command rules decide whether to show or apply; an explicit user command can enable or update this technique.' : 'No applicable CSS; follow the card instructions manually.'}`,
    `Selectors (scope evidence): ${[...selectors].join(' | ')}`,
    `CSS properties: ${[...properties].join(', ')}`,
    `Authored CSS declarations (values are evidence, not configurable options; conditions and cascade still apply): ${[...declarations].join('; ')}`,
    'Adjustable parameters, if any, are supplied separately in current LOCAL PARAMETER CONTEXT. These CSS declarations alone do not authorize edits. Do not invent options or claim combinations were tested.',
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
  // One record per file: unrelated cards must never share a retrieval chunk.
  const documents = sorted.map(entry => {
    const text = `# ID: ${entry.id}\nType: ${entry.kind}\nTitle: ${entry.title}\n${entry.text}\nEND ID: ${entry.id}`;
    return { name: `${entry.kind}-${digest(entry.id)}.md`, entryId: entry.id, hash: digest(text), text };
  });
  // Packaging changes must invalidate snapshots even when entries are identical.
  return { revision: digest(JSON.stringify({ format: 'one-record-per-file-v1', entries: sorted })), documents, entries: sorted };
}

/** Use only recorded sources from the selected store, including interrupted uploads. */
export function searchableCatalog(state: CatalogState, currentEntries: CatalogEntry[] = []): CatalogSnapshot | undefined {
  if (!state.sync) return state.active;
  const sync = state.sync;
  const active = state.active?.storeId === sync.storeId ? state.active : undefined;
  const documents = [...(active?.documents ?? []), ...sync.documents].filter(doc => !!doc.fileId);
  const sourceIds = new Set(documents.map(doc => doc.entryId).filter(Boolean));
  const entries = new Map((active?.entries ?? []).map(entry => [entry.id, entry]));
  for (const entry of sync.entries ?? currentEntries) {
    if (sourceIds.has(entry.id)) entries.set(entry.id, entry);
  }
  if (!documents.length || !entries.size) return undefined;
  return { storeId: sync.storeId, createdAt: active?.createdAt ?? new Date().toISOString(),
    revision: digest(JSON.stringify(documents.map(doc => [doc.fileId, doc.hash]))),
    documents, entries: [...entries.values()] };
}

/** Resolve explicit IDs as complete tokens, independently of semantic ranking. */
export function explicitlyNamedTechniques(userText: string, entries: CatalogEntry[]): CatalogEntry[] {
  const tokens = new Set(userText.match(/[a-z0-9_-]+/gi)?.map(token => token.toLowerCase()) ?? []);
  return entries.filter(entry => entry.kind === 'technique' && entry.applyAvailable && tokens.has(entry.id));
}
