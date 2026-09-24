interface Owner { register(dispose: () => void): void }

/** Test text coverage, including selections whose boundaries are inside text nodes. */
export function fullySelected(code: HTMLElement, selection: Selection | null): boolean {
  if (!selection || selection.isCollapsed || !code.textContent) return false;
  const content = code.ownerDocument.createRange(); content.selectNodeContents(code);
  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i);
    if (!range.intersectsNode(code)) continue;
    const intersection = range.cloneRange();
    if (intersection.compareBoundaryPoints(0, content) < 0) intersection.setStart(content.startContainer, content.startOffset);
    if (intersection.compareBoundaryPoints(2, content) > 0) intersection.setEnd(content.endContainer, content.endOffset);
    if (intersection.toString() === code.textContent) return true;
  }
  return false;
}

/** Paint the selected code box without changing its text, geometry or clipboard data. */
export function installInlineCodeSelection(root: HTMLElement, owner: Owner): () => void {
  const doc = root.ownerDocument, win = doc.defaultView!;
  let frame = 0;
  const marked = new Set<HTMLElement>();
  const refresh = () => {
    const tree = root.getRootNode() as Document | (ShadowRoot & { getSelection?: () => Selection | null });
    const selection = tree.getSelection?.() ?? doc.getSelection();
    const codes = Array.from(root.querySelectorAll<HTMLElement>('code:not(pre code)'));
    if (root.matches('code:not(pre code)')) codes.push(root);
    const next = new Set<HTMLElement>();
    for (const code of codes) {
      if (win.getComputedStyle(code).getPropertyValue('--hacksidian-inline-code-select-all').trim() === '1' && fullySelected(code, selection)) {
        code.setAttribute('data-hacksidian-selected', ''); next.add(code);
      }
    }
    for (const code of marked) if (!next.has(code)) code.removeAttribute('data-hacksidian-selected');
    marked.clear(); for (const code of next) marked.add(code);
  };
  const schedule = () => {
    win.cancelAnimationFrame(frame);
    frame = win.requestAnimationFrame(() => { frame = 0; refresh(); });
  };
  doc.addEventListener('selectionchange', schedule);
  owner.register(() => {
    doc.removeEventListener('selectionchange', schedule); win.cancelAnimationFrame(frame);
    for (const code of marked) code.removeAttribute('data-hacksidian-selected');
  });
  refresh();
  return refresh;
}
