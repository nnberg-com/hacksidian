import { parseYaml } from 'obsidian';
import { t } from '../i18n';
import { buildCatalog, techniqueEntry, variableEntries, settingEntries, type CatalogEntry } from './catalog';
import { hackId, type HackSpec } from './hacks';
export async function collectCatalog(adapter: { read(path: string): Promise<string> }, files: Array<{path: string; basename: string}>, atlasFolder: string, globalVariablesFile: string) {
    const root = atlasFolder.replace(/\/+$/, '');
    if (!root || root.split('/').includes('..') || root.startsWith('/')) throw new Error(t('catalog.invalid_folder'));
    const entries: CatalogEntry[] = [];
    for (const file of files) {
      if (!file.path.startsWith(`${root}/! hacks/`)) continue;
      const directory = file.path.slice(0, file.path.lastIndexOf('/'));
      const id = directory.split('/').at(-1)!;
      if (file.basename !== id) continue;
      const markdown = await adapter.read(file.path);
      const meta = parseYaml(markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '') ?? {};
      if (!hackId(file.path, meta.tags)) continue;
      if (meta.id && meta.id !== id) throw new Error(`Catalog ID mismatch: ${file.path}`);
      const spec = JSON.parse(await adapter.read(`${directory}/hack.json`)) as HackSpec;
      if (spec.format !== 2 || typeof spec.hasCss !== 'boolean') throw new Error(`Invalid technique format: ${file.path}`);
      const css = spec.hasCss ? await adapter.read(`${directory}/recipe.css`) : '';
      entries.push(techniqueEntry(file.path, markdown, meta, spec, css));
    }
    if (!entries.length) throw new Error(t('catalog.empty'));
    const variablesPath = globalVariablesFile;
    if (!variablesPath || variablesPath.startsWith('/') || variablesPath.split('/').includes('..')) throw new Error(t('catalog.invalid_variables'));
    entries.push(...variableEntries(variablesPath, await adapter.read(variablesPath)));
    entries.push(...settingEntries());
    return buildCatalog(entries);
}
