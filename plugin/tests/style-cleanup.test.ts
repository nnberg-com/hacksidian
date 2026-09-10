import { readFileSync } from "node:fs";
import postcss from "postcss";
import { expect, it } from "vitest";
import { validateCssPreservation } from "../src/css-preservation";
import { validateGeneratedCss } from "../src/css";

const read = (name: string) => readFileSync(new URL(`../style-recovery/2026-09-07/${name}.css`, import.meta.url), "utf8");
it("preserves selector/property coverage while removing the external radius dependency", () => {
  const css = read("cleaned");
  expect(validateCssPreservation(read("normalized"), css)).toEqual([]);
  expect(validateGeneratedCss(css)).toEqual([]);
  expect(css).not.toContain("var(--radius-l)");
});

it("allows mark typography to change independently of code and tags", () => {
  const root = postcss.parse(read("cleaned"));
  const fonts = new Map<string, string>();
  root.walkRules(rule => {
    for (const node of rule.nodes) {
      if (node.type === "decl" && node.prop === "font-family") {
        for (const selector of rule.selectors) fonts.set(selector, node.value);
      }
    }
  });
  const scope = ".markdown-preview-view.callmered-coloring";
  expect(fonts.get(`${scope} mark`)).toBe("var(--cmr-mark-font-family)");
  expect(fonts.get(`${scope} :not(pre) > code`)).toBe("var(--cmr-inline-code-font-family)");
  expect(fonts.get(`${scope} a.tag`)).toBe("var(--cmr-tag-font-family)");
});
