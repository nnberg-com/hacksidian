import { prepareCodeLanguageLabels } from './code-language-label';
/** Parse 1-based Markdown line selections without expanding large ranges. */
export function codeLineRanges(source: string, lineCount: number): [number, number][] {
  if (!source.trim() || source.length > 4096 || !Number.isSafeInteger(lineCount) || lineCount < 1) return [];
  const ranges: [number, number][] = [];
  for (const token of source.split(',')) {
    const match = token.trim().match(/^([1-9]\d*)(?:\s*-\s*([1-9]\d*))?$/);
    if (!match) return [];
    const start = Number(match[1]), end = Number(match[2] ?? match[1]);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || end < start) return [];
    if (start <= lineCount) ranges.push([start, Math.min(end, lineCount)]);
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1] + 1) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range]);
  }
  return merged;
}

export function codeLineBackground(source: string, lineCount: number): string {
  return codeLineRanges(source, lineCount).map(([start, end]) =>
    `linear-gradient(transparent 0 ${start - 1}lh, var(--hacksidian-code-line-highlight) ${start - 1}lh ${end}lh, transparent ${end}lh)`
  ).join(', ') || 'none';
}

/** Only derived CSS data: no token wrapping or changes to copied source text. */
export function prepareCodeLineHighlights(element: HTMLElement): void {
  prepareCodeLanguageLabels(element);
  const selector = '.callout[data-callout="code-line"]';
  const callouts = new Set<Element>(Array.from(element.querySelectorAll(selector)));
  const parent = element.closest(selector);
  if (parent) callouts.add(parent);
  for (const callout of callouts) {
    const metadata = callout.getAttribute('data-callout-metadata') ?? '';
    for (const node of Array.from(callout.querySelectorAll<HTMLElement>(':scope > .callout-content pre > code'))) {
      if (node.closest(selector) !== callout) continue;
      const text = node.textContent ?? '';
      const count = text.replace(/\n$/, '').split('\n').length;
      const value = codeLineBackground(metadata, count);
      if (node.style.getPropertyValue('--hacksidian-code-line-bands') !== value)
        node.style.setProperty('--hacksidian-code-line-bands', value);
    }
  }
}

export function watchCodeLineHighlights(element: HTMLElement, owner: {register(dispose: () => void): void}): void {
  prepareCodeLineHighlights(element);
  const observer = new MutationObserver(() => prepareCodeLineHighlights(element));
  observer.observe(element, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['data-callout-metadata'] });
  owner.register(() => observer.disconnect());
}
