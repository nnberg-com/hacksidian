import { readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { compileStyle, type ModularStyle } from "./style-modules";

interface Entry { id: string; component: string; file: string }
export async function readFileStyle(directory: string): Promise<ModularStyle> {
  const manifest = JSON.parse(await readFile(path.join(directory, "hacksidian-manifest.json"), "utf8"));
  if (manifest.format !== 1 || !Array.isArray(manifest.modules)) throw new Error("Неверный manifest CSS.");
  const files = new Set<string>();
  const modules = await Promise.all(manifest.modules.map(async (entry: Entry) => {
    if (!/^[a-zA-Z0-9-]+\.css$/.test(entry.file) || files.has(entry.file)) throw new Error("Неверный или повторный путь CSS.");
    files.add(entry.file);
    return { id: entry.id, component: entry.component, css: await readFile(path.join(directory, entry.file), "utf8") };
  }));
  const style: ModularStyle = { format: 1, modules };
  compileStyle(style);
  return style;
}

// A conversation changes exactly one file. Never rebuild source files from saved plugin state.
export async function writeFileStyle(directory: string, expected: ModularStyle, next: ModularStyle): Promise<void> {
  compileStyle(next);
  const current = await readFileStyle(directory);
  if (JSON.stringify(current) !== JSON.stringify(expected)) throw new Error("CSS-файлы изменились. Ответ не применён; повторите запрос.");
  if (next.modules.length !== current.modules.length || next.modules.some((m, i) => m.id !== current.modules[i].id || m.component !== current.modules[i].component)) throw new Error("Изменение manifest требует отдельной миграции.");
  const changed = next.modules.filter((m, i) => m.css !== current.modules[i].css);
  if (changed.length > 1) throw new Error("За одну операцию можно изменить только один CSS-файл.");
  if (!changed.length) return;
  const manifest = JSON.parse(await readFile(path.join(directory, "hacksidian-manifest.json"), "utf8"));
  const entry = manifest.modules.find((e: Entry) => e.id === changed[0].id) as Entry;
  const filename = path.join(directory, entry.file);
  const temporary = `${filename}.${randomUUID()}.tmp`;
  // Recheck immediately before replacing the selected file.
  await writeFile(temporary, changed[0].css, "utf8");
  if (JSON.stringify(await readFileStyle(directory)) !== JSON.stringify(expected)) {
    const { unlink } = await import("node:fs/promises");
    await unlink(temporary);
    throw new Error("CSS-файлы изменились во время сохранения.");
  }
  await rename(temporary, filename);
}
