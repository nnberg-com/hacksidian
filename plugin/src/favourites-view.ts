import { App, MarkdownRenderChild, Notice, TFile } from 'obsidian';
import type { Favourites } from './favourites';
export class FavouritesBlock extends MarkdownRenderChild {
  private unsubscribe?: () => void;
  constructor(el: HTMLElement, private app: App, private store: Favourites, private english: boolean) { super(el); }
  onload(): void {
    const en = this.english;
    const search = this.containerEl.createEl('input', { type: 'search', placeholder: en ? 'Search by title or code' : 'Поиск по названию или коду', cls: 'hacksidian-favourites-search', attr: { 'aria-label': en ? 'Search favourites' : 'Поиск в избранном' } });
    const list = this.containerEl.createDiv();
    const render = () => {
      list.empty();
      const paths = this.store.list();
      let visible = 0;
      for (const path of paths) {
        const file = this.app.vault.getAbstractFileByPath(path);
        const id = path.split('/').pop()!.replace(/\.md$/, '');
        const title = file instanceof TFile ? String(this.app.metadataCache.getFileCache(file)?.frontmatter?.title || id) : id;
        if (!`${title} ${id}`.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase())) continue;
        visible++;
        const row = list.createDiv({ cls: 'hacksidian-favourite-row' });
        const text = row.createDiv();
        if (file instanceof TFile) {
          const link = text.createEl('a', { text: title, href: path, cls: 'internal-link' });
          link.addEventListener('click', event => { event.preventDefault(); void this.app.workspace.getLeaf(false).openFile(file).catch(error => new Notice(String(error))); });
        } else text.createEl('span', { text: `${title} — ${en ? 'file not found' : 'файл не найден'}` });
        text.createEl('small', { text: id });
        const remove = row.createEl('button', { text: '★', attr: { 'aria-label': en ? `Remove ${title} from favourites` : `Убрать «${title}» из избранного`, title: en ? 'Remove from favourites' : 'Убрать из избранного' } });
        remove.addEventListener('click', () => { remove.disabled = true; void this.store.toggle(path).catch(error => { remove.disabled = false; new Notice(String(error)); }); });
      }
      if (!visible) list.createEl('p', { text: paths.length ? (en ? 'No matches.' : 'Ничего не найдено.') : (en ? 'Click the star beside a technique code to save it here.' : 'Нажмите звёздочку рядом с кодом приёма, чтобы сохранить его здесь.') });
    };
    search.addEventListener('input', render);
    this.unsubscribe = this.store.subscribe(render);
    render();
  }
  onunload(): void { this.unsubscribe?.(); this.containerEl.empty(); }
}
