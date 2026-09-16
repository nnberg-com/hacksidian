/** Select a fragment inside one example without changing the document URL. */
export function activatePreviewTarget(root: ParentNode, href: string): HTMLElement | null {
  if (!href.startsWith('#')) return null;
  let id: string;
  try { id = decodeURIComponent(href.slice(1)); } catch { return null; }
  const target = Array.from(root.querySelectorAll<HTMLElement>('[id]')).find(node => node.id === id);
  if (!target) return null;
  root.querySelectorAll('[data-hacksidian-target]').forEach(node => node.removeAttribute('data-hacksidian-target'));
  target.setAttribute('data-hacksidian-target', '');
  return target;
}
