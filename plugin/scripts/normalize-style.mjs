import { readFile, writeFile } from "node:fs/promises";
import postcss from "postcss";

const directory = new URL("../style-recovery/2026-09-07/", import.meta.url);
const root = postcss.parse(await readFile(new URL("restored.css", directory), "utf8"));
const scope = root.nodes.find(node => node.type === "rule");
const additions = [];
function token(prop, value) {
  additions.push(postcss.decl({ prop, value, raws: { before: "\n  " } }));
  return `var(${prop})`;
}

// Raw colors retain their exact accepted values. Existing names remain aliases.
const colors = new Map();
for (const declaration of scope.nodes) {
  if (declaration.type !== "decl" || !/^#[0-9a-f]{6}$/i.test(declaration.value)) continue;
  const value = declaration.value;
  if (!colors.has(value)) colors.set(value, token(`--cmr-color-${declaration.prop.slice(6)}`, value));
  declaration.value = colors.get(value);
}
const textFont = token("--cmr-font-text", "'Onest', ui-sans-serif, system-ui, sans-serif");
const codeFont = token("--cmr-font-code", "'MesloLGS Nerd Font Mono', ui-monospace, monospace");
const textSize = token("--cmr-text-size", "18px");
const bodyLeading = token("--cmr-line-height-body", "1.5");

root.walkDecls(declaration => {
  if (["font-family", "--font-text", "--font-interface", "--font-monospace"].includes(declaration.prop)) {
    if (declaration.value.startsWith("'Onest'")) declaration.value = textFont;
    else if (declaration.value.startsWith("'MesloLGS")) declaration.value = codeFont;
  }
  if (declaration.prop === "font-size" && declaration.value === "18px") declaration.value = textSize;
  if (declaration.prop === "line-height" && declaration.value === "1.5") declaration.value = bodyLeading;
  if (declaration.prop === "--cmr-page-margin") declaration.value = token("--cmr-page-gutter", "72px");
});

// Keep the accepted five syntax color groups; both integration paths use them.
const syntax = new Map([
  ["var(--cmr-purple)", token("--cmr-syntax-keyword", "var(--cmr-purple)")],
  ["var(--cmr-green)", token("--cmr-syntax-string-comment", "var(--cmr-green)")],
  ["var(--cmr-yellow)", token("--cmr-syntax-name-value", "var(--cmr-yellow)")],
  ["var(--cmr-red)", token("--cmr-syntax-tag-important", "var(--cmr-red)")],
  ["var(--cmr-code-text)", token("--cmr-syntax-normal", "var(--cmr-code-text)")],
]);
root.walkDecls(declaration => {
  const parent = declaration.parent;
  if (declaration.prop.startsWith("--code-") ||
      (parent.type === "rule" && parent.selector.includes("pre code :is(") && declaration.prop === "color")) {
    if (!syntax.has(declaration.value)) throw new Error(`Unmapped syntax value: ${declaration.value}`);
    declaration.value = syntax.get(declaration.value);
  }
});
scope.prepend(...additions);
await writeFile(new URL("normalized.css", directory), root.toString());
console.log(`Normalized style; added ${additions.length} owned tokens without changing selectors.`);
