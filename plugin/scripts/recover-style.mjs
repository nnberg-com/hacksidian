import { readFile, writeFile } from "node:fs/promises";
import postcss from "postcss";

// Frozen evidence, never the mutable active snippet. Running twice gives identical output.
const directory = new URL("../style-recovery/2026-09-07/", import.meta.url);
const base = postcss.parse(await readFile(new URL("full-before.css", directory), "utf8"));
const palette = postcss.parse(await readFile(new URL("palette-before.css", directory), "utf8"));
const scope = ".markdown-preview-view.callmered-coloring";
const baseTokens = base.nodes.find(node => node.type === "rule" && node.selector === scope);
const paletteTokens = palette.nodes.find(node => node.type === "rule" && node.selector === scope);
if (!baseTokens || !paletteTokens) throw new Error("Missing token scope");
const tokens = paletteTokens.nodes.filter(node => node.type === "decl" && node.prop.startsWith("--code-"));
const rules = palette.nodes.filter(node => node.type === "rule" && node.selector.startsWith(`${scope} pre code :is(`));
if (tokens.length !== 11 || rules.length !== 5) throw new Error("Unexpected palette source structure");
for (const token of tokens) baseTokens.append(token.clone());
// Append only syntax token rules. Every original rule and declaration stays intact.
for (const rule of rules) base.append(rule.clone());
await writeFile(new URL("restored.css", directory), base.toString());
console.log(`Restored ${base.nodes.filter(node => node.type === "rule").length} rules; added ${tokens.length} syntax variables and ${rules.length} token rules.`);
