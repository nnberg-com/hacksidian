import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { inspectMarkdownCoverage } from "../src/coverage";

describe("inspectMarkdownCoverage", () => {
  it("reports absent visual questions without changing the document", () => {
    const result = inspectMarkdownCoverage("# Только заголовок\n\nТекст.");
    expect(result.missing).toContain("H1, один H2-intro и внутренние H3+");
    expect(result.missing).toContain("таблица");
  });

  it("ships a calibration article containing every monitored Markdown feature", () => {
    const markdown = readFileSync(new URL("../templates/Длинная статья.md", import.meta.url), "utf8");
    const result = inspectMarkdownCoverage(markdown);

    expect(result.present).toHaveLength(result.total);
    expect(result.missing).toEqual([]);
  });

  it("ships a separate coloring containing every built-in callout variant", () => {
    const markdown = readFileSync(new URL("../templates/Выноски.md", import.meta.url), "utf8");
    const result = inspectMarkdownCoverage(markdown);

    expect(result.present).toHaveLength(result.total);
    expect(result.missing).toEqual([]);
  });

  it("ships a separate coloring containing the selected Mermaid diagram set", () => {
    const markdown = readFileSync(new URL("../templates/Диаграммы Mermaid в тексте.md", import.meta.url), "utf8");
    const result = inspectMarkdownCoverage(markdown);

    expect(result.present).toHaveLength(result.total);
    expect(result.missing).toEqual([]);
  });

  it("ships a separate coloring containing every selected code language", () => {
    const markdown = readFileSync(new URL("../templates/Код в длинном тексте.md", import.meta.url), "utf8");
    const result = inspectMarkdownCoverage(markdown);

    expect(result.present).toHaveLength(result.total);
    expect(result.missing).toEqual([]);
  });

  for (const templateName of [
    "Структура и типографика длинной статьи.md",
    "Ссылки и изображения в длинной статье.md",
    "Цитаты в длинной статье.md",
    "Списки и задачи в длинной статье.md",
    "Таблицы в длинной статье.md",
    "Формулы и сноски в длинной статье.md",
  ]) {
    it(`ships a complete ${templateName} coloring`, () => {
      const markdown = readFileSync(new URL(`../templates/${templateName}`, import.meta.url), "utf8");
      const result = inspectMarkdownCoverage(markdown);

      expect(result.present).toHaveLength(result.total);
      expect(result.missing).toEqual([]);
    });
  }
});
