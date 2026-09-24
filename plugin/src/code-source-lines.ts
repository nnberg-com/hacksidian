/** Split rendered token trees into source lines while preserving textContent exactly. */
export function ensureSourceLines(code: HTMLElement): void {
  if (code.querySelector(':scope > .hacksidian-source-line')) return;
  const fragment = document.createDocumentFragment();
  let line = document.createElement('span'); line.className = 'hacksidian-source-line'; fragment.appendChild(line);
  let clones = new Map<Element, Element>();
  const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const ancestors: Element[] = [];
    for (let p = node.parentElement; p && p !== code; p = p.parentElement) ancestors.unshift(p);
    const parts = (node.textContent ?? '').split('\n');
    parts.forEach((part, index) => {
      if (index) {
        fragment.appendChild(document.createTextNode('\n'));
        line = document.createElement('span'); line.className = 'hacksidian-source-line'; fragment.appendChild(line); clones = new Map();
      }
      let target: Element = line;
      for (const ancestor of ancestors) {
        let clone = clones.get(ancestor);
        if (!clone) { clone = ancestor.cloneNode(false) as Element; clones.set(ancestor, clone); target.appendChild(clone); }
        target = clone;
      }
      if (part) target.appendChild(document.createTextNode(part));
    });
  }
  // The final line after a trailing newline has no visual content.
  if (!line.textContent && (code.textContent ?? '').endsWith('\n')) line.remove();
  code.replaceChildren(fragment);
}

export function unwrapSourceLines(code: HTMLElement): void {
  for (const line of Array.from(code.querySelectorAll(':scope > .hacksidian-source-line'))) line.replaceWith(...Array.from(line.childNodes));
}
