import { ensureSourceLines, unwrapSourceLines } from './code-source-lines';
interface Owner { register(dispose: () => void): void }

/** Measure soft wraps without inserting characters into the source or Prism tokens. */
export function installCodeWrapMarkers(root: HTMLElement, owner: Owner): () => void {
  let frame = 0, stopped = false;
  const watched = new Set<HTMLElement>();
  const panels = new Set<HTMLElement>();
  const resize = new ResizeObserver(() => schedule());
  function render(): void {
    frame = 0;
    if (stopped) return;
    const codes = Array.from(root.querySelectorAll<HTMLElement>('pre > code'));
    if (root.matches('pre > code')) codes.push(root);
    for (const code of watched) if (!root.contains(code) && code !== root) { resize.unobserve(code); watched.delete(code); }
    for (const code of codes) {
      if (!watched.has(code)) { watched.add(code); resize.observe(code); }
      const pre = code.parentElement!;
      const old = pre.querySelector(':scope > .hacksidian-wrap-markers');
      const style = getComputedStyle(code);
      if (style.getPropertyValue('--hacksidian-code-wrap-markers').trim() !== '1') { old?.remove(); unwrapSourceLines(code); continue; }
      // Bound layout work for huge logs. Source is always preserved.
      if ((code.textContent?.length ?? 0) > 30000) { old?.remove(); unwrapSourceLines(code); continue; }
      ensureSourceLines(code);
      const points: { x: number; y: number; height: number; color: string; font: string; letterSpacing: string }[] = [];
      const preRect = pre.getBoundingClientRect();
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5;
      const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      let previous: DOMRect | null = null;
      let previousStyle: CSSStyleDeclaration | null = null;
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent ?? '';
        const tokenStyle = getComputedStyle(node.parentElement!);
        for (let i = 0; i < text.length;) {
          const char = String.fromCodePoint(text.codePointAt(i)!);
          const end = i + char.length;
          if (char === '\n' || char === '\r') { previous = null; i = end; continue; }
          range.setStart(node, i); range.setEnd(node, end);
          const rect = range.getBoundingClientRect();
          if (rect.height && rect.width) {
            if (previous && previousStyle && rect.top - previous.top > lineHeight * .5)
              points.push({x: previous.right - preRect.left + pre.scrollLeft - pre.clientLeft, y: previous.top - preRect.top + pre.scrollTop - pre.clientTop,
                height: previous.height, color: previousStyle.color, font: previousStyle.font, letterSpacing: previousStyle.letterSpacing});
            previous = rect;
            previousStyle = tokenStyle;
          }
          i = end;
        }
      }
      const signature = JSON.stringify(points);
      if (old?.getAttribute('data-positions') === signature) continue;
      old?.remove();
      if (!points.length) continue;
      const overlay = document.createElement('span'); overlay.className = 'hacksidian-wrap-markers'; pre.appendChild(overlay);
      overlay.setAttribute('aria-hidden', 'true'); overlay.setAttribute('data-positions', signature);
      panels.add(pre);
      for (const point of points) {
        const marker = document.createElement('i'); overlay.appendChild(marker);
        marker.style.left = point.x + 'px'; marker.style.top = point.y + 'px';
        // Match the preceding token's glyph box, not the pre's line box.
        marker.style.font = point.font;
        marker.style.lineHeight = point.height + 'px';
        marker.style.color = point.color;
        marker.style.letterSpacing = point.letterSpacing;
        marker.style.textIndent = '0';
      }
    }
  }
  function schedule(): void { if (!stopped && !frame) frame = requestAnimationFrame(render); }
  const observer = new MutationObserver(records => {
    if (records.some(record => record.type === 'characterData' || !(record.target instanceof Element && record.target.closest('.hacksidian-wrap-markers')) &&
      Array.from(record.addedNodes).concat(Array.from(record.removedNodes)).some(node => !(node instanceof Element && node.classList.contains('hacksidian-wrap-markers'))))) schedule();
  });
  observer.observe(root, {childList: true, subtree: true, characterData: true});
  owner.register(() => { stopped = true; cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); for (const code of watched) unwrapSourceLines(code); for (const pre of panels) pre.querySelector(':scope > .hacksidian-wrap-markers')?.remove(); });
  schedule();
  return schedule;
}
