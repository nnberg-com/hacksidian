import { t } from "../i18n";
import { mkdir, writeFile, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import type { App } from "obsidian";
import { readFileStyle } from "./file-style";
import { groupManifest, splitLegacyStyle } from "./snippet-groups";

declare const __HACKSIDIAN_TEMPLATES__: Record<string, string>;

// Embedded at build time: the installed plugin never reads or writes project templates.
export async function installSnippetTemplates(directory: string, templates = __HACKSIDIAN_TEMPLATES__): Promise<string[]> {
  await mkdir(directory, { recursive: true });
  const created: string[] = [];
  for (const [file, content] of Object.entries(templates)) {
    if (!/^hacksidian-[a-zA-Z0-9-]+\.(css|json)$/.test(file)) throw new Error(t("snippets.invalid_snippet_template_path"));
    try {
      await writeFile(path.join(directory, file), content, { encoding: "utf8", flag: "wx" });
      if (file.endsWith(".css")) created.push(file.slice(0, -4));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
  }
  return created;
}

// Obsidian's internal snippet manager; keep this integration in one place.
export async function refreshNativeSnippets(app: App, enable: string[] = []): Promise<void> {
  const manager = (app as unknown as { customCss: {
    readSnippets(): Promise<void>;
    loadSnippets(): Promise<void>;
    setCssEnabledStatus(name: string, enabled: boolean): void;
    csscache: Map<string, string>;
  } }).customCss;
  await manager.readSnippets();
  for (const name of enable) manager.setCssEnabledStatus(name, true);
  for (const key of manager.csscache.keys()) {
    if (key.startsWith(`${app.vault.configDir}/snippets/hacksidian-`)) manager.csscache.delete(key);
  }
  await manager.loadSnippets();
}

// Install the new schema from the user's current CSS, never from factory defaults.
export async function migrateSnippetGroups(directory: string): Promise<string[]> {
  const manifestPath = path.join(directory, "hacksidian-manifest.json");
  const raw = await readFile(manifestPath, "utf8");
  const old = JSON.parse(raw);
  if (old.structure === 2) {
    const retired = old.modules.filter((entry: {id: string}) => !groupManifest.modules.some(current => current.id === entry.id));
    const preserved = new Map<string, string>();
    // Missing renamed files and empty retired slots must not prevent startup.
    // Do not silently discard CSS that still needs a deliberate migration.
    for (const entry of retired) {
      if (!/^hacksidian-[a-zA-Z0-9-]+\.css$/.test(entry.file)) throw new Error(t('file-style.invalid_or_duplicate_css_path'));
      const css = await readFile(path.join(directory, entry.file), 'utf8').catch(error => {
        if (error.code === 'ENOENT') return '';
        throw error;
      });
      if (css.trim()) {
        // This category was renamed without changing its CSS semantics.
        const replacement = entry.id === 'g-pseudo-task'
          ? groupManifest.modules.find(current => current.id === 'g-taskplus') : undefined;
        if (!replacement) throw new Error(`Retired snippet contains CSS; move it to a current category before migration: ${entry.file}`);
        const existing = await readFile(path.join(directory, replacement.file), 'utf8').catch(error => {
          if (error.code === 'ENOENT') return null;
          throw error;
        });
        if (existing !== null && existing !== css) throw new Error(`Conflicting renamed snippet: ${replacement.file}; no files changed.`);
        if (existing === null && old.modules.some((m: {id: string}) => m.id === replacement.id)) {
          throw new Error(`Missing current snippet: ${replacement.file}; no files changed.`);
        }
        preserved.set(replacement.file, css);
      }
    }
    const missing = groupManifest.modules.filter(entry => !old.modules.some((m: {id: string}) => m.id === entry.id));
    if (!missing.length && !retired.length) return [];
    const created: string[] = [];
    try {
      for (const entry of missing) {
        if (old.modules.some((m: {file: string}) => m.file === entry.file)) throw new Error(t('file-style.invalid_or_duplicate_css_path'));
        try {
          await writeFile(path.join(directory, entry.file), preserved.get(entry.file) ?? '', {flag: 'wx'});
          created.push(entry.file);
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
        }
      }
      if (await readFile(manifestPath, 'utf8') !== raw) throw new Error(t('snippets.css_changed_while_updating_the_structure'));
      await writeFile(manifestPath + '.tmp', JSON.stringify({...old, modules: [...old.modules.filter((entry: {id: string}) => !retired.includes(entry)), ...missing]}, null, 2) + '\n');
      await rename(manifestPath + '.tmp', manifestPath);
    } catch (error) {
      await Promise.all(created.map(file => unlink(path.join(directory, file))));
      throw error;
    }
    for (const entry of retired) await unlink(path.join(directory, entry.file)).catch(error => {
      if (error.code !== 'ENOENT') throw error;
    });
    return created.map(file => file.slice(0, -4));
  }
  const before = await readFileStyle(directory);
  const next = splitLegacyStyle(before);
  const created: string[] = [];
  try {
    for (const entry of groupManifest.modules) {
      const file = path.join(directory, entry.file);
      await writeFile(file, next.modules.find(m => m.id === entry.id)!.css, {flag: "wx"});
      created.push(file);
    }
    if (JSON.stringify(await readFileStyle(directory)) !== JSON.stringify(before)) throw new Error(t("snippets.css_changed_while_updating_the_structure"));
    await writeFile(manifestPath + ".tmp", JSON.stringify(groupManifest, null, 2) + "\n");
    await rename(manifestPath + ".tmp", manifestPath);
  } catch (error) {
    await Promise.all(created.map(file => unlink(file)));
    throw error;
  }
  // The committed manifest points only at new files. Remove the old active copies.
  for (const entry of old.modules) await unlink(path.join(directory, entry.file));
  return groupManifest.modules.map(e => e.file.slice(0, -4));
}
