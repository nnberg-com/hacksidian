import { parseYaml } from 'obsidian';
import { t } from '../i18n';
import { buildCatalog, techniqueEntry, variableEntries, settingEntries, themeEntry, type CatalogEntry } from './catalog';
import { hackId, type HackSpec } from './hacks';
export async function collectCatalog(adapter: { read(path: string): Promise<string> }, files: Array<{path: string; basename: string}>, atlasFolder: string, globalVariablesFile: string) {
    const root = atlasFolder.replace(/\/+$/, '');
    if (!root || root.split('/').includes('..') || root.startsWith('/')) throw new Error(t('catalog.invalid_folder'));
    const entries: CatalogEntry[] = [];
    const themeLinks = new Map<string, string[]>();
    for (const file of files) {
      if (!file.path.startsWith(`${root}/! themes/`) || file.path.slice(`${root}/! themes/`.length).includes('/')) continue;
      const markdown = await adapter.read(file.path);
      const meta = parseYaml(markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '') ?? {};
      if (!Array.isArray(meta.tags) || !meta.tags.includes('hacksidian_theme')) continue;
      entries.push(themeEntry(file.path, meta));
    }
    for (const file of files) {
      if (!file.path.startsWith(`${root}/! hacks/`)) continue;
      const directory = file.path.slice(0, file.path.lastIndexOf('/'));
      const id = directory.split('/').at(-1)!;
      if (file.basename !== id) continue;
      const markdown = await adapter.read(file.path);
      const meta = parseYaml(markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '') ?? {};
      if (!hackId(file.path, meta.tags)) continue;
      const spec = JSON.parse(await adapter.read(`${directory}/hack.json`)) as HackSpec;
      if (spec.format !== 2 || typeof spec.hasCss !== 'boolean') throw new Error(`Invalid technique format: ${file.path}`);
      const css = spec.hasCss ? await adapter.read(`${directory}/recipe.css`) : '';
      entries.push(techniqueEntry(file.path, markdown, meta, spec, css));
      const links = meta.themes ?? [];
      if (!Array.isArray(links) || links.some(link => typeof link !== 'string')) throw new Error(`Invalid theme links: ${file.path}`);
      themeLinks.set(id, links);
    }
    if (!entries.some(entry => entry.kind === 'technique')) throw new Error(t('catalog.empty'));
    for (const entry of entries.filter(entry => entry.kind === 'technique')) {
      entry.themeIds = [];
      for (const link of themeLinks.get(entry.id) ?? []) {
        // Theme codes are filenames in this atlas, never arbitrary vault paths.
        if (!/^[a-z0-9][a-z0-9_-]*$/.test(link)) throw new Error(`Invalid theme code in ${entry.id}: ${link}`);
        const theme = entries.find(candidate => candidate.kind === 'theme' &&
          candidate.path === `${root}/! themes/${link}.md`);
        if (!theme) throw new Error(`Unresolved theme link in ${entry.id}: ${link}`);
        if (entry.themeIds.includes(theme.id)) continue;
        entry.themeIds.push(theme.id);
        entry.text += `\nRelated source theme: ${theme.title} (theme ID: ${theme.id}). Inspect the whole theme for broader context; this does not establish current feature equivalence.`;
        theme.text += `\nRelated adapted technique: ${entry.title} (technique ID: ${entry.id}). Source relationship only, not a current feature guarantee.`;
      }
    }
    const variablesPath = globalVariablesFile;
    if (!variablesPath || variablesPath.startsWith('/') || variablesPath.split('/').includes('..')) throw new Error(t('catalog.invalid_variables'));
    entries.push(...variableEntries(variablesPath, await adapter.read(variablesPath)));
    entries.push(...settingEntries());
    return buildCatalog(entries);
}
