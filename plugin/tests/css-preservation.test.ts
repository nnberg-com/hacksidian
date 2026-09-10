import { readFileSync } from "node:fs";
import postcss from "postcss";
import { describe, expect, it } from "vitest";
import { validateCssPreservation } from "../src/css-preservation";
import { validateGeneratedCss } from "../src/css";

const fixture = (name: string) => readFileSync(new URL(`../style-recovery/2026-09-07/${name}.css`, import.meta.url), "utf8");

describe("CSS preservation", () => {
  it("rejects the actual September 3 loss of accepted components", () => {
    const errors = validateCssPreservation(fixture("full-before"), fixture("palette-before"));
    for (const component of ["task-list", "callout", "footnotes", "blockquote", ".el-table"])
      expect(errors.some(error => error.includes(component))).toBe(true);
  });

  it("restores every original declaration in order and adds only the syntax palette", () => {
    const restored = postcss.parse(fixture("restored"));
    const original = postcss.parse(fixture("full-before"));
    const palette = postcss.parse(fixture("palette-before"));
    const addedRules = restored.nodes.slice(original.nodes.length);
    expect(addedRules.map(node => node.toString())).toEqual(
      palette.nodes.filter(node => node.type === "rule" && node.selector.includes("pre code :is(")).map(node => node.toString()),
    );
    addedRules.forEach(node => node.remove());
    const addedTokens: string[] = [];
    restored.walkDecls(/^--code-/, declaration => { addedTokens.push(declaration.toString()); declaration.remove(); });
    const expectedTokens: string[] = [];
    palette.walkDecls(/^--code-/, declaration => { expectedTokens.push(declaration.toString()); });
    expect(addedTokens).toEqual(expectedTokens);
    expect(restored.toString()).toBe(original.toString());
    expect(validateCssPreservation(fixture("full-before"), fixture("restored"))).toEqual([]);
    expect(validateGeneratedCss(fixture("restored"))).toEqual([]);
  });

  it("allows value changes and additions, including splitting grouped selectors", () => {
    expect(validateCssPreservation("a, b {color:red}", "a {color:blue} b {color:blue; padding:0}")).toEqual([]);
  });

  it("rejects lost declarations, tokens, empty styles and moved conditional rules", () => {
    for (const after of ["", "a {}", "a {color:blue}", "@media print {a {color:red; --x:1}}"])
      expect(validateCssPreservation("a {color:red; --x:1}", after).length).toBeGreaterThan(0);
    expect(validateCssPreservation("@media print {a {color:red}}", "a {color:red}").length).toBeGreaterThan(0);
  });
});
