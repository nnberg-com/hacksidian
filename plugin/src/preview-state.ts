export class PreviewState {
  enabled = true;
  private listeners = new Set<() => void>();
  set(enabled: boolean): void { this.enabled = enabled; for (const listener of this.listeners) listener(); }
  subscribe(listener: () => void): () => void { this.listeners.add(listener); return () => this.listeners.delete(listener); }
}
const views = new WeakMap<Element, Map<string, PreviewState>>();
/** Share controls only within the current note view, never across open panes. */
export function previewState(el: HTMLElement, directory: string): PreviewState {
  const root = el.closest('.markdown-preview-view, .markdown-source-view') || el;
  let cards = views.get(root); if (!cards) { cards = new Map(); views.set(root, cards); }
  let state = cards.get(directory); if (!state) { state = new PreviewState(); cards.set(directory, state); }
  return state;
}
