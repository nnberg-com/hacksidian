import { t } from "../i18n";
import path from "node:path";
import { FileSystemAdapter } from "obsidian";
import type CallMeRedPlugin from "./main";

export function basePath(plugin: CallMeRedPlugin): string {
  const adapter = plugin.app.vault.adapter;
  if (!(adapter instanceof FileSystemAdapter)) throw new Error(t("storage.hacksidian_requires_a_local_filesystem_vault"));
  return adapter.getBasePath();
}

export function styleDirectory(plugin: CallMeRedPlugin): string {
  return path.join(basePath(plugin), plugin.app.vault.configDir, "snippets");
}
