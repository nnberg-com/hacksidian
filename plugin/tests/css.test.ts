import { describe, expect, it } from "vitest";
import { validateGeneratedCss } from "../src/css";

describe("validateGeneratedCss", () => {
  it("accepts CSS scoped to Reading view", () => {
    expect(
      validateGeneratedCss('.markdown-reading-view h1 { color: var(--text-normal); font-family: Georgia, serif; }'),
    ).toEqual([]);
  });

  it("rejects CSS that leaks into the application shell", () => {
    expect(validateGeneratedCss("body { color: red; }")).not.toEqual([]);
  });

  it("rejects external resources", () => {
    expect(validateGeneratedCss('.markdown-reading-view { background: url("https://example.com/a.png"); }')).not.toEqual([]);
  });

  it("rejects a font outside the locale-compatible inventory", () => {
    expect(validateGeneratedCss('.markdown-reading-view { font-family: Papyrus, serif; }', ["Georgia", "serif"]))
      .toContain("Шрифт не прошёл проверку выбранных локалей: papyrus.");
  });

  it("always rejects the font shorthand", () => {
    expect(validateGeneratedCss('.markdown-reading-view { font: 16px/1.5 Georgia, serif; }'))
      .toContain("Сокращённое свойство font запрещено; используйте отдельные свойства, включая font-family.");
  });
});
