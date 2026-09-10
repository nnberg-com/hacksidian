import path from "node:path";
import { FileSystemAdapter } from "obsidian";
import type CallMeRedPlugin from "./main";

export function basePath(plugin: CallMeRedPlugin): string {
  const adapter = plugin.app.vault.adapter;
  if (!(adapter instanceof FileSystemAdapter)) throw new Error("Hacksidian требует локальный filesystem vault.");
  return adapter.getBasePath();
}

export function styleDirectory(plugin: CallMeRedPlugin): string {
  return path.join(basePath(plugin), plugin.app.vault.configDir, "snippets");
}
