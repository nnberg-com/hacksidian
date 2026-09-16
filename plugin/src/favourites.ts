/** Frontmatter is the source of truth; this service stores no separate list. */
export interface FavouriteCards {
  list(): string[];
  has(path: string): boolean;
  toggle(path: string): Promise<void>;
}
export class Favourites {
  private listeners = new Set<() => void>();
  private pending: Promise<void> = Promise.resolve();
  constructor(private cards: FavouriteCards) {}
  list(): string[] { return this.cards.list(); }
  has(path: string): boolean { return this.cards.has(path); }
  subscribe(listener: () => void): () => void { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  refresh(): void { for (const listener of this.listeners) listener(); }
  toggle(path: string): Promise<void> {
    const operation = this.pending.then(async () => { await this.cards.toggle(path); this.refresh(); });
    this.pending = operation.catch(() => {});
    return operation;
  }
}
export interface FavouriteControls {
  openEnabled?(): void;
  technique?: {
    get(path: string): Promise<{ installed: boolean; hasCss: boolean } | null>;
    set(path: string, enabled: boolean): Promise<unknown>;
    subscribe(listener: () => void): () => void;
  };
  store: Favourites;
  open(): void;
  english(): boolean;
}
