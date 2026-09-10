import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { compileStyle, importStyle, replaceStyleModule } from "../src/style-modules";

const source = readFileSync(new URL("../style-recovery/2026-09-07/cleaned.css", import.meta.url), "utf8");

describe("modular CSS", () => {
  it("imports actual CSS byte for byte, preserving interleaved component order", () => {
    const style = importStyle(source);
    expect(style.modules.length).toBeGreaterThan(5);
    expect(compileStyle(style)).toBe(source);
    expect(compileStyle(JSON.parse(JSON.stringify(style)))).toBe(source);
  });

  it("updates syntax without changing even one byte of neighboring modules", () => {
    const style = importStyle(source);
    const syntax = style.modules.find(module => module.component === "syntax")!;
    const changed = syntax.css.replace("var(--cmr-syntax-keyword)", "#aabbcc");
    const next = replaceStyleModule(style, syntax.id, changed);
    for (const module of style.modules) {
      expect(next.modules.find(item => item.id === module.id)?.css).toBe(module.id === syntax.id ? changed : module.css);
    }
    expect(compileStyle(style)).toBe(source);
    // Saved snapshots retain all module boundaries for Undo without reclassification.
    expect(compileStyle(JSON.parse(JSON.stringify(style)))).toBe(source);
  });

  it("rejects a monolithic response, deletion, new selectors and altered at-rule conditions", () => {
    const style = importStyle(source);
    const syntax = style.modules.find(module => module.component === "syntax")!;
    for (const css of [source, "", syntax.css + "\n.markdown-preview-view p {color:red}", syntax.css.replace("pre code", "pre")]) {
      expect(() => replaceStyleModule(style, syntax.id, css)).toThrow("контракт");
    }
    const conditional = importStyle("@media print {.markdown-preview-view p {color:red}}");
    expect(() => replaceStyleModule(conditional, conditional.modules[0].id, "@media screen {.markdown-preview-view p {color:red}}")).toThrow("контракт");
    expect(() => replaceStyleModule(style, "missing", syntax.css)).toThrow("Неизвестный");
  });

  it("rejects broken/unsafe fragments and duplicate IDs", () => {
    const style = importStyle(source);
    const module = style.modules.find(item => item.component === "syntax")!;
    expect(() => replaceStyleModule(style, module.id, module.css.replace("var(--cmr-syntax-keyword)", "url(https://example.com)"))).toThrow("url()");
    expect(() => compileStyle({ format: 1, modules: [module, module] })).toThrow("повторный");
    expect(() => replaceStyleModule(style, module.id, "}")).toThrow();
  });

  it("bootstraps an empty legacy style, then enforces contracts", () => {
    const blank = importStyle("/* initial */\n");
    const next = replaceStyleModule(blank, blank.modules[0].id, ".markdown-preview-view {color:red}");
    expect(compileStyle(next)).toContain("color:red");
    expect(() => replaceStyleModule(next, next.modules[0].id, "")).toThrow("контракт");
  });
});
