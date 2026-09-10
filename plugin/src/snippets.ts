import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { App } from "obsidian";

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
