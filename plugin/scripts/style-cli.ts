import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { compileStyle, importStyle, type ModularStyle } from "../src/style-modules";

async function main(): Promise<void> {
  const [mode, source, target] = process.argv.slice(2);
  if (!source || !target || !["import", "build"].includes(mode)) throw new Error("Usage: style-cli import CSS DIRECTORY | build DIRECTORY CSS");
  if (mode === "import") {
    const style = importStyle(await readFile(source, "utf8"));
    await mkdir(target, { recursive: true });
    for (const module of style.modules) await writeFile(path.join(target, `${module.id}.css`), module.css);
    await writeFile(path.join(target, "manifest.json"), JSON.stringify({
      format: 1, modules: style.modules.map(({id, component}) => ({id, component, file: `${id}.css`})),
    }, null, 2) + "\n");
    console.log(`Imported ${style.modules.length} ordered modules into ${target}`);
  } else {
    const manifest = JSON.parse(await readFile(path.join(source, "manifest.json"), "utf8"));
    if (manifest.format !== 1 || !Array.isArray(manifest.modules)) throw new Error("Invalid manifest");
    const style: ModularStyle = { format: 1, modules: [] };
    for (const item of manifest.modules) {
      if (!/^[a-z][a-z0-9-]*$/.test(item.id) || item.file !== `${item.id}.css`) throw new Error("Invalid module path");
      style.modules.push({ id: item.id, component: item.component, css: await readFile(path.join(source, item.file), "utf8") });
    }
    const css = compileStyle(style);
    await writeFile(target, css);
    console.log(`Built ${style.modules.length} modules into ${target}`);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
