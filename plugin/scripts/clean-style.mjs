import { readFile, writeFile } from "node:fs/promises";
import postcss from "postcss";

const directory = new URL("../style-recovery/2026-09-07/", import.meta.url);
const root = postcss.parse(await readFile(new URL("normalized.css", directory), "utf8"));
const scope = root.nodes.find(node => node.type === "rule");
if (!scope) throw new Error("Missing style scope");
const additions = [];
function token(prop, value) {
  additions.push(postcss.decl({ prop, value, raws: { before: "\n  " } }));
  return `var(${prop})`;
}

// Observed in Obsidian 1.13.7 on 2026-09-07; preserve the rendered 12px,
// rather than the audit's hypothetical 8px. Base radius remains independently 4px.
const radius = token("--cmr-radius-inline", "12px");
const headingLeading = token("--cmr-line-height-heading", "1.12");
root.walkDecls(declaration => {
  if (declaration.prop === "--cmr-inline-radius") declaration.value = radius;
  if (declaration.prop === "line-height" && declaration.value === "1.12") declaration.value = headingLeading;
});

// Shared padding/radius stays shared. Typography belongs to each component.
const inline = root.nodes.find(node => node.type === "rule" &&
  node.selectors.includes(`${scope.selector} mark`) && node.nodes.some(child => child.type === "decl" && child.prop === "padding-top"));
if (!inline) throw new Error("Missing shared inline geometry rule");
const typography = inline.nodes.filter(node => node.type === "decl" && ["font-family", "font-size", "line-height"].includes(node.prop));
if (typography.length !== 3) throw new Error("Unexpected inline typography structure");
const groups = [
  ["inline-code", inline.selectors.filter(selector => selector.endsWith(":not(pre) > code"))],
  ["mark", inline.selectors.filter(selector => selector.endsWith(" mark"))],
  ["tag", inline.selectors.filter(selector => !selector.endsWith(" mark") && !selector.endsWith(":not(pre) > code"))],
];
for (const [name, selectors] of groups) {
  if (!selectors.length) throw new Error(`Missing ${name} selectors`);
  const rule = postcss.rule({ selectors, raws: { before: "\n\n" } });
  for (const declaration of typography) {
    const value = declaration.prop === "font-family"
      ? token(`--cmr-${name}-font-family`, declaration.value)
      : declaration.value;
    rule.append(declaration.clone({ value }));
  }
  inline.before(rule);
}
typography.forEach(declaration => declaration.remove());
scope.prepend(...additions);
await writeFile(new URL("cleaned.css", directory), root.toString());
console.log("Removed external radius dependency and separated inline component typography.");
