import { describe, expect, it } from "vitest";
import { validateGeneratedCss } from "../src/css";

describe("validateGeneratedCss", () => {
  it("accepts CSS scoped to Reading view", () => {
    expect(
      validateGeneratedCss('.markdown-reading-view h1 { color: var(--text-normal); font-family: Georgia, serif; }'),
    ).toEqual([]);
  });

  it("accepts application-wide CSS", () => {
    expect(validateGeneratedCss("body { color: red; }")).toEqual([]);
  });

  it("accepts external resources", () => {
    expect(validateGeneratedCss('.markdown-reading-view { background: url("https://example.com/a.png"); }')).toEqual([]);
  });

  it("rejects a font outside the locale-compatible inventory", () => {
    expect(validateGeneratedCss('.markdown-reading-view { font-family: Papyrus, serif; }', ["Georgia", "serif"]))
      .toContain("Шрифт не прошёл проверку выбранных локалей: papyrus.");
  });

  it("accepts font shorthand with an allowed font", () => {
    expect(validateGeneratedCss('.markdown-reading-view { font: 16px/1.5 Georgia, serif; }', ['Georgia', 'serif']))
      .toEqual([]);
  });
});

it("allows new CSS features and hiding elements throughout the application", () => {
  expect(validateGeneratedCss('@import "theme.css"; @font-face {font-family: Georgia; src:url(font.woff2)} @media print {body a {text-decoration-style:wavy!important} .callmered-panel {display:none;visibility:hidden}}', ["Georgia"])).toEqual([]);
});

it("rejects unsupported fonts in shorthand, variables and font-face", () => {
  for (const css of [
    'a {font: italic 700 16px/1.5 Papyrus, serif}',
    'a {font: 16px / 1.5 Papyrus}',
    ':root {--family: Papyrus} a {font-family: var(--family)}',
    '@font-face {font-family: Papyrus; src:url(font.woff2)}',
  ]) expect(validateGeneratedCss(css, ["Georgia", "serif"]).join(" ")).toContain("papyrus");
});

it("accepts permitted fonts in shorthand and variables", () => {
  expect(validateGeneratedCss(':root {--family: Georgia} a {font-family:var(--family); font:italic 700 16px / 1.5 Georgia, serif}', ["Georgia", "serif"])).toEqual([]);
});
