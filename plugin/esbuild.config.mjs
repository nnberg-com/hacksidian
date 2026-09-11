import { readFile, mkdir, writeFile } from "node:fs/promises";
import esbuild from "esbuild";
import process from "node:process";
import builtins from "builtin-modules";

const production = process.argv[2] === "production";

await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
await writeFile(new URL("./dist/styles.css", import.meta.url),
  await readFile(new URL("./styles.css", import.meta.url), "utf8"));

const snippetsRoot = new URL("../snippets/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("hacksidian-manifest.json", snippetsRoot), "utf8"));
const templates = { "hacksidian-manifest.json": JSON.stringify(manifest, null, 2) + "\n" };
for (const entry of manifest.modules) templates[entry.file] = await readFile(new URL(entry.file, snippetsRoot), "utf8");

const context = await esbuild.context({
  entryPoints: ["src/main.ts"],
  define: { __HACKSIDIAN_TEMPLATES__: JSON.stringify(templates) },
  bundle: true,
  conditions: ["node", "import", "default"],
  external: ["obsidian", "electron", ...builtins],
  format: "cjs",
  target: "es2022",
  logLevel: "info",
  sourcemap: production ? false : "inline",
  treeShaking: true,
  outfile: "dist/main.js",
});

if (production) {
  await context.rebuild();
  await context.dispose();
  await esbuild.build({
    entryPoints: ["scripts/style-cli.ts"], bundle: true, platform: "node",
    format: "cjs", target: "es2022", outfile: "dist/style-cli.cjs",
  });
} else {
  await context.watch();
}
