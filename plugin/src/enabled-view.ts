import { App, MarkdownRenderChild, Notice, TFile } from 'obsidian';
export class EnabledBlock extends MarkdownRenderChild {
  private unsubscribe?: () => void;
  constructor(el: HTMLElement, private app: App, private paths: () => string[], private subscribe: (listener: () => void) => () => void) { super(el); }
  onload(): void {
    const search = this.containerEl.createEl('input', { type: 'search', placeholder: 'Поиск по названию или коду', cls: 'hacksidian-favourites-search', attr: { 'aria-label': 'Поиск включённых приёмов' } });
    const list = this.containerEl.createDiv();
    const render = () => {
      list.empty(); const paths = this.paths(); let visible = 0;
      for (const path of paths) {
        const file = this.app.vault.getAbstractFileByPath(path); if (!(file instanceof TFile)) continue;
        const id = file.basename, title = String(this.app.metadataCache.getFileCache(file)?.frontmatter?.title || id);
        if (!`${title} ${id}`.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase())) continue;
        visible++;
        const row = list.createDiv({ cls: 'hacksidian-favourite-row' }), text = row.createDiv();
        const link = text.createEl('a', { text: title, href: path, cls: 'internal-link' });
        link.addEventListener('click', event => { event.preventDefault(); void this.app.workspace.getLeaf(false).openFile(file).catch(error => new Notice(String(error))); });
        text.createEl('small', { text: id });
      }
      if (!visible) list.createEl('p', { text: paths.length ? 'Ничего не найдено.' : 'Сейчас нет включённых приёмов.' });
    };
    this.registerDomEvent(search, 'input', render);
    this.registerEvent(this.app.metadataCache.on('changed', render));
    this.unsubscribe = this.subscribe(render); render();
  }
  onunload(): void { this.unsubscribe?.(); this.containerEl.empty(); }
}
