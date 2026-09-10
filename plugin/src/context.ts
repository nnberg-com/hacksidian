const STYLE_PROPERTIES = [
  "color",
  "background-color",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "line-height",
  "letter-spacing",
  "margin-top",
  "margin-bottom",
  "padding",
  "border-color",
  "border-width",
  "border-radius",
  "max-width",
] as const;

const REPRESENTATIVE_SELECTORS = [
  ".markdown-preview-view",
  ".markdown-preview-view h1",
  ".markdown-preview-view h2",
  ".markdown-preview-view h3",
  ".markdown-preview-view p",
  ".markdown-preview-view a",
  ".markdown-preview-view blockquote",
  ".markdown-preview-view code",
  ".markdown-preview-view pre",
  ".markdown-preview-view li",
  ".markdown-preview-view table",
  ".markdown-preview-view .callout",
];

export function collectComputedStyleContext(container: HTMLElement): string {
  const result: Record<string, Record<string, string>> = {};

  for (const selector of REPRESENTATIVE_SELECTORS) {
    const element = container.querySelector<HTMLElement>(selector);
    if (!element) continue;
    const computed = window.getComputedStyle(element);
    result[selector] = {};
    for (const property of STYLE_PROPERTIES) {
      result[selector][property] = computed.getPropertyValue(property).trim();
    }
  }

  return JSON.stringify(result, null, 2);
}
