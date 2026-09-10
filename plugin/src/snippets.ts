import { mkdir, writeFile, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import type { App } from "obsidian";
import { readFileStyle } from "./file-style";
import { groupManifest, splitLegacyStyle } from "./snippet-groups";

declare const __HACKSIDIAN_TEMPLATES__: Record<string, string>;

// Embedded at build time: the installed plugin never reads or writes project templates.
export async function installSnippetTemplates(directory: string, templates = __HACKSIDIAN_TEMPLATES__): Promise<string[]> {
  await mkdir(directory, { recursive: true });
  for (const [file, content] of Object.entries(templates)) {
    if (!/^hacksidian-[a-zA-Z0-9-]+\.(css|json)$/.test(file)) throw new Error("Неверный путь шаблона сниппета.");
    try {
      await writeFile(path.join(directory, file), content, { encoding: "utf8", flag: "wx" });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
  }
  return Object.keys(templates).filter(file => file.endsWith(".css")).map(file => file.slice(0, -4));
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
  if (old.structure === 2) return [];
  const before = await readFileStyle(directory);
  const next = splitLegacyStyle(before);
  const created: string[] = [];
  try {
    for (const entry of groupManifest.modules) {
      const file = path.join(directory, entry.file);
      await writeFile(file, next.modules.find(m => m.id === entry.id)!.css, {flag: "wx"});
      created.push(file);
    }
    if (JSON.stringify(await readFileStyle(directory)) !== JSON.stringify(before)) throw new Error("CSS изменился во время обновления структуры.");
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
