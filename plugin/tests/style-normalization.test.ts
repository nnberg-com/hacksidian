import { readFileSync } from "node:fs";
import postcss from "postcss";
import { expect, it } from "vitest";
import { validateCssPreservation } from "../src/css-preservation";
import { validateGeneratedCss } from "../src/css";

const read = (name: string) => readFileSync(new URL(`../style-recovery/2026-09-07/${name}.css`, import.meta.url), "utf8");
it("keeps resolved declaration values, selector order and importance during token extraction", () => {
  const values = (css: string) => {
    const root = postcss.parse(css);
    const tokens = new Map<string, string>();
    const scope = root.nodes.find(node => node.type === "rule")!;
    if (scope.type !== "rule") throw new Error("Missing scope");
    for (const node of scope.nodes) if (node.type === "decl" && node.prop.startsWith("--")) tokens.set(node.prop, node.value);
    const expand = (value: string, seen = new Set<string>()): string => value.replace(/var\((--[\w-]+)\)/g, (match, name) => {
      if (!tokens.has(name)) return match;
      if (seen.has(name)) throw new Error(`Token cycle: ${name}`);
      return expand(tokens.get(name)!, new Set([...seen, name]));
    });
    const result: unknown[] = [];
    root.walkDecls(declaration => {
      if (declaration.parent === scope && declaration.prop.startsWith("--")) return;
      const value = expand(declaration.value).replace("calc(40px + 16px * 2)", "72px");
      const parent = declaration.parent;
      result.push([parent?.type === "rule" ? parent.selector : "", declaration.prop, value, !!declaration.important]);
    });
    return { result, expand };
  };
  const before = values(read("restored"));
  const after = values(read("normalized"));
  expect(after.result).toEqual(before.result);
  expect(after.expand("var(--cmr-page-margin)")).toBe("72px");
  expect(before.expand("var(--cmr-page-margin)")).toBe("calc(40px + 16px * 2)");
  expect(validateCssPreservation(read("restored"), read("normalized"))).toEqual([]);
  expect(validateGeneratedCss(read("normalized"))).toEqual([]);
});
