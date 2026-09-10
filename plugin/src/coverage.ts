export interface CoverageResult {
  present: string[];
  missing: string[];
  total: number;
}

type CoverageProbe = RegExp | ((markdown: string) => boolean);
type CoverageCheck = [string, CoverageProbe];

const CALLOUT_TYPES = [
  "note", "abstract", "summary", "tldr", "info", "todo", "tip", "hint", "important", "success", "check",
  "done", "question", "help", "faq", "warning", "caution", "attention", "failure", "fail", "missing",
  "danger", "error", "bug", "example", "quote", "cite",
];

function countMatches(markdown: string, probe: RegExp): number {
  return [...markdown.matchAll(probe)].length;
}

function hasAllHeadings(markdown: string): boolean {
  return [1, 2, 3, 4, 5, 6].every((level) => new RegExp(`^#{${level}}(?!#)\\s+\\S`, "m").test(markdown));
}

function hasArticleHeadingContract(markdown: string): boolean {
  return countMatches(markdown, /^#(?!#)\s+\S/gm) === 1
    && countMatches(markdown, /^##(?!#)\s+\S/gm) === 1
    && /^###\s+\S/m.test(markdown);
}

function hasAllCalloutTypes(markdown: string): boolean {
  const present = new Set(
    [...markdown.matchAll(/^>\s*\[!([^\]]+)\][+-]?/gim)].map((match) => match[1]?.toLowerCase()),
  );
  return CALLOUT_TYPES.every((type) => present.has(type));
}

function hasOneCodeBlock(markdown: string): boolean {
  const languages = [...markdown.matchAll(/^\`\`\`([^\s\`]*)[^\n]*\n[\s\S]*?^\`\`\`\s*$/gm)]
    .map((match) => match[1]?.toLowerCase())
    .filter((language) => language !== "mermaid");
  return languages.length === 1;
}

function hasOverviewLinks(markdown: string): boolean {
  return [
    "Структура и типографика длинной статьи",
    "Ссылки и изображения в длинной статье",
    "Цитаты в длинной статье",
    "Списки и задачи в длинной статье",
    "Таблицы в длинной статье",
    "Код в длинном тексте",
    "Диаграммы Mermaid в тексте",
    "Выноски",
    "Формулы и сноски в длинной статье",
  ].every((target) => markdown.includes(`[[${target}`));
}

const ARTICLE_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["заголовки H1–H6", hasAllHeadings],
  ["жирное выделение", /\*\*[^*]+\*\*/],
  ["курсив", /(^|[^*])\*[^*\n]+\*/m],
  ["жирный курсив", /\*\*\*[^*\n]+\*\*\*/],
  ["зачёркивание", /~~[^~]+~~/],
  ["подсветка", /==[^=\n]+==/],
  ["внешняя ссылка", /\[[^\]]+\]\(https?:\/\/[^)]+\)/],
  ["внутренняя ссылка", /\[\[[^\]]+\]\]/],
  ["изображение", /!\[[^\]]*\]\([^)]+\)/],
  ["тег", /(^|\s)#[\p{L}\p{N}_/-]+/mu],
  ["цитата", /^>\s+(?!\[!)[^\n]+/m],
  ["ровно одна выноска", (markdown) => countMatches(markdown, /^>\s*\[![^\]]+\]/gm) === 1],
  ["маркированный список", /^\s*[-*+]\s+\S/m],
  ["нумерованный список", /^\s*\d+[.)]\s+\S/m],
  ["задачи", /^\s*[-*+]\s+\[[ xX]\]\s+/m],
  ["инлайн-код", /\`[^\`\n]+\`/],
  ["ровно один блок кода", hasOneCodeBlock],
  ["ровно одна диаграмма Mermaid", (markdown) => countMatches(markdown, /^\`\`\`mermaid\s*$/gm) === 1],
  ["таблица", /^\|.+\|\s*\n\|?\s*:?-/m],
  ["математика", /\$\$[\s\S]+?\$\$|\$[^$\n]+\$/],
  ["сноска", /\[\^[^\]]+\]/],
  ["горизонтальная линия", /^\s*(?:---|___|\*\*\*)\s*$/m],
  ["жёсткий перенос", / {2}\n(?!\n)/],
  ["экранирование Markdown", /\\[*_#`|~.]/],
  ["ссылки на подробные раскраски", hasOverviewLinks],
];

const STRUCTURE_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["заголовки H1–H6", hasAllHeadings],
  ["жирное выделение", /\*\*[^*]+\*\*/],
  ["курсив", /(^|[^*])\*[^*\n]+\*/m],
  ["жирный курсив", /\*\*\*[^*\n]+\*\*\*/],
  ["зачёркивание", /~~[^~]+~~/],
  ["подсветка", /==[^=\n]+==/],
  ["инлайн-код", /\`[^\`\n]+\`/],
  ["жёсткий перенос", / {2}\n(?!\n)/],
  ["горизонтальная линия", /^\s*(?:---|___|\*\*\*)\s*$/m],
  ["экранирование Markdown", /\\[*_#\`|~.]/],
];

const LINK_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["внешняя ссылка", /\[[^\]]+\]\(https?:\/\/[^)]+\)/],
  ["внутренняя ссылка", /\[\[[^\]]+\]\]/],
  ["Markdown-ссылка", /\[[^\]]+\]\((?!https?:\/\/)[^)]+\.md\)/],
  ["несуществующая ссылка", /\[\[Несуществующая заметка\]\]/],
  ["ссылка на заголовок", /\[\[#[^\]]+\]\]/],
  ["теги", /(^|\s)#[\p{L}\p{N}_/-]+/mu],
  ["Markdown-изображение", /!\[[^\]]*\]\([^)]+\)/],
  ["wikilink-изображение", /!\[\[[^\]]+\]\]/],
  ["ссылка на блок", /\[\[#\^[^\]|]+(?:\|[^\]]+)?\]\]/],
  ["идентификатор блока", /(?:^|\s)\^[\p{L}\p{N}-]+\s*$/mu],
];

const QUOTE_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["несколько цитат", (markdown) => countMatches(markdown, /^>\s+\S/gm) >= 5],
  ["многоабзацная цитата", /^>[^\n]+\n>\s*\n>\s+\S/m],
  ["цитата с форматированием", /^>.*(?:\*\*|\*[^*]|\`|\[[^\]]+\]\()/m],
  ["цитата со списком", /^>\s*[-*+]\s+\S/m],
  ["вложенная цитата", /^>\s*>\s+\S/m],
];

const LIST_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["маркированный список", /^\s*[-*+]\s+\S/m],
  ["нумерованный список", /^\s*\d+[.)]\s+\S/m],
  ["задачи", /^\s*[-*+]\s+\[[ xX?\-]\]\s+/m],
  ["выполненная задача", /^\s*[-*+]\s+\[[xX]\]\s+/m],
  ["нестандартное состояние задачи", /^\s*[-*+]\s+\[[?\-]\]\s+/m],
  ["вложенный список", /^ {2,}(?:[-*+]\s+|\d+[.)]\s+)\S/m],
  ["вложенная задача", /^ {2,}[-*+]\s+\[[ xX?\-]\]\s+/m],
];

const TABLE_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["несколько таблиц", (markdown) => countMatches(markdown, /^\|?\s*:?-{2,}[^\n]*\|/gm) >= 4],
  ["выравнивание колонок", /^\|\s*:?-+\s*\|\s*:-+:\s*\|\s*-+:\s*\|/m],
  ["форматирование в ячейках", /^\|.*(?:\*\*|\*[^*]|\`|==).*\|/m],
  ["ссылка в таблице", /^\|.*\[\[[^\]]+\]\].*\|/m],
  ["длинный текст в ячейках", /^\|[^\n]{100,}\|/m],
];

const MATH_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["несколько inline-формул", (markdown) => countMatches(markdown, /(?<!\$)\$[^$\n]+\$(?!\$)/g) >= 3],
  ["несколько блочных формул", (markdown) => countMatches(markdown, /^\$\$\s*$/gm) >= 4],
  ["обычная сноска", /\[\^[^\]]+\]/],
  ["несколько определений сносок", (markdown) => countMatches(markdown, /^\[\^[^\]]+\]:/gm) >= 3],
  ["многострочная сноска", /^\[\^[^\]]+\]:[^\n]*\n {4}\S/m],
  ["inline-сноска", /\^\[[^\]]+\]/],
];

const CALLOUT_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["все стандартные callout-типы", hasAllCalloutTypes],
  ["раскрытый сворачиваемый callout", /^>\s*\[![^\]]+\]\+/m],
  ["закрытый сворачиваемый callout", /^>\s*\[![^\]]+\]-/m],
  ["callout без содержимого", /^>\s*\[![^\]]+\][^\n]*\n(?:\s*\n|$)/m],
  ["вложенный callout", /^>\s*>\s*\[![^\]]+\]/m],
];

const MERMAID_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["блок-схема", /^\`\`\`mermaid\s*\n\s*(?:flowchart|graph)\b[\s\S]+?^\`\`\`/m],
  ["диаграмма состояний", /^\`\`\`mermaid\s*\n\s*stateDiagram(?:-v2)?\b[\s\S]+?^\`\`\`/m],
  ["mindmap", /^\`\`\`mermaid\s*\n\s*mindmap\b[\s\S]+?^\`\`\`/m],
  ["Sankey", /^\`\`\`mermaid\s*\n\s*sankey(?:-beta)?\b[\s\S]+?^\`\`\`/m],
  ["диаграмма Гантта", /^\`\`\`mermaid\s*\n\s*gantt\b[\s\S]+?^\`\`\`/m],
  ["диаграмма последовательности", /^\`\`\`mermaid\s*\n\s*sequenceDiagram\b[\s\S]+?^\`\`\`/m],
  ["временная шкала", /^\`\`\`mermaid\s*\n\s*timeline\b[\s\S]+?^\`\`\`/m],
  ["XY-диаграмма", /^\`\`\`mermaid\s*\n\s*xychart-beta\b[\s\S]+?^\`\`\`/m],
  ["user journey", /^\`\`\`mermaid\s*\n\s*journey\b[\s\S]+?^\`\`\`/m],
  ["квадрантная диаграмма", /^\`\`\`mermaid\s*\n\s*quadrantChart\b[\s\S]+?^\`\`\`/m],
  ["GitGraph", /^\`\`\`mermaid\s*\n\s*gitGraph\b[\s\S]+?^\`\`\`/m],
  ["Kanban", /^\`\`\`mermaid\s*\n\s*kanban\b[\s\S]+?^\`\`\`/m],
  ["радарная диаграмма", /^\`\`\`mermaid\s*\n\s*radar-beta\b[\s\S]+?^\`\`\`/m],
  ["Treemap", /^\`\`\`mermaid\s*\n\s*treemap-beta\b[\s\S]+?^\`\`\`/m],
  ["Venn", /^\`\`\`mermaid\s*\n\s*venn-beta\b[\s\S]+?^\`\`\`/m],
  ["диаграмма Исикавы", /^\`\`\`mermaid\s*\n\s*ishikawa-beta\b[\s\S]+?^\`\`\`/m],
];

const CODE_CHECKS: CoverageCheck[] = [
  ["H1, один H2-intro и внутренние H3+", hasArticleHeadingContract],
  ["C", /^\`\`\`c\s*[\s\S]+?^\`\`\`/m],
  ["Bash", /^\`\`\`(?:bash|sh)\s*[\s\S]+?^\`\`\`/m],
  ["Python", /^\`\`\`python\s*[\s\S]+?^\`\`\`/m],
  ["JavaScript", /^\`\`\`javascript\s*[\s\S]+?^\`\`\`/m],
  ["TypeScript", /^\`\`\`typescript\s*[\s\S]+?^\`\`\`/m],
];

function checksFor(markdown: string): CoverageCheck[] {
  if (/^\s*-\s+callmered-structure\s*$/m.test(markdown)) return STRUCTURE_CHECKS;
  if (/^\s*-\s+callmered-links\s*$/m.test(markdown)) return LINK_CHECKS;
  if (/^\s*-\s+callmered-quotes\s*$/m.test(markdown)) return QUOTE_CHECKS;
  if (/^\s*-\s+callmered-lists\s*$/m.test(markdown)) return LIST_CHECKS;
  if (/^\s*-\s+callmered-tables\s*$/m.test(markdown)) return TABLE_CHECKS;
  if (/^\s*-\s+callmered-math\s*$/m.test(markdown)) return MATH_CHECKS;
  if (/^\s*-\s+callmered-callouts\s*$/m.test(markdown)) return CALLOUT_CHECKS;
  if (/^\s*-\s+callmered-mermaid\s*$/m.test(markdown)) return MERMAID_CHECKS;
  if (/^\s*-\s+callmered-code\s*$/m.test(markdown)) return CODE_CHECKS;
  return ARTICLE_CHECKS;
}

export function inspectMarkdownCoverage(markdown: string): CoverageResult {
  const present: string[] = [];
  const missing: string[] = [];
  const checks = checksFor(markdown);

  for (const [label, probe] of checks) {
    const found = probe instanceof RegExp ? probe.test(markdown) : probe(markdown);
    (found ? present : missing).push(label);
  }

  return { present, missing, total: checks.length };
}
