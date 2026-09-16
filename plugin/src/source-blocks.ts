import { Component, MarkdownRenderChild, MarkdownRenderer, Notice, parseYaml, Plugin, TAbstractFile } from 'obsidian';
import { readTechniqueSource, techniqueDirectory } from './technique-files';
export function sourceFence(text: string, kind: string): string {
  const fence = '`'.repeat(Math.max(3, ...[...text.matchAll(/`+/g)].map(match => match[0].length + 1)));
  return `${fence}${kind}\n${text}\n${fence}`;
}
class TechniqueBlock extends MarkdownRenderChild {
  private epoch = 0;
  private stopped = false;
  private owner: Component | null = null;
  constructor(el: HTMLElement, private plugin: Plugin, private directory: string, private kind: string, private details: string, private sourcePath: string) { super(el); }
  onload(): void {
    const changed = (item: TAbstractFile) => { if (item.path.startsWith(`${this.directory}/`)) void this.render(); };
    this.registerEvent(this.plugin.app.vault.on('modify', changed));
    this.registerEvent(this.plugin.app.vault.on('create', changed));
    this.registerEvent(this.plugin.app.vault.on('delete', changed));
    void this.render();
  }
  onunload(): void { this.stopped = true; this.epoch++; }
  private internalLink(el: HTMLElement, label: string, path: string, owner: Component, edit = false): void {
    const link = el.createEl('a', { text: label, cls: 'internal-link', href: path, attr: { 'data-href': path } });
    owner.registerDomEvent(link, 'click', event => {
      event.preventDefault();
      void this.plugin.app.workspace.openLinkText(path, this.sourcePath, false, edit ? { state: { mode: 'source' } } : undefined);
    });
  }
  private async render(): Promise<void> {
    const epoch = ++this.epoch;
    try {
      const adapter = this.plugin.app.vault.adapter;
      const kinds: readonly ('css' | 'markdown')[] = this.kind === 'files' ? ['css', 'markdown'] as const : this.kind === 'css' || this.kind === 'markdown' ? [this.kind] : [];
      const texts = await Promise.all(kinds.map(kind => readTechniqueSource(adapter, this.directory, kind)));
      const id = this.directory.split('/').pop()!;
      const card = this.kind === 'sources' ? await adapter.read(`${this.directory}/${id}.md`) : '';
      if (this.stopped || epoch !== this.epoch) return;
      if (this.owner) this.removeChild(this.owner);
      const owner = new Component(); this.owner = owner; this.addChild(owner);
      this.containerEl.empty();
      if (this.kind === 'id') {
        const button = this.containerEl.createEl('button', { cls: 'hacksidian-copy-id', attr: { 'aria-label': `Скопировать код ${id}` } });
        button.createEl('code', { text: id });
        owner.registerDomEvent(button, 'click', () => { void navigator.clipboard.writeText(id).then(() => new Notice(`Скопировано: ${id}`), () => new Notice('Не удалось скопировать код')); });
        return;
      }
      if (this.kind === 'sources') {
        this.containerEl.addClass('hacksidian-columns');
        const themes = this.containerEl.createDiv(), details = this.containerEl.createDiv();
        themes.createEl('h3', { text: 'Темы' }); details.createEl('h3', { text: 'Подробности' });
        const meta = parseYaml(card.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '') || {};
        const root = this.directory.match(/^(.*(?:^|\/)atlas)\//)![1];
        const slugs = Array.isArray(meta.themes) ? meta.themes.filter((slug: unknown) => typeof slug === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(slug)) : [];
        if (!slugs.length) themes.createEl('p', { text: 'Темы пока не указаны.' });
        else {
          const list = themes.createEl('ul');
          for (const slug of slugs) {
            const path = `${root}/! themes/${slug}.md`;
            const cached = this.plugin.app.metadataCache.getCache(path);
            this.internalLink(list.createEl('li'), cached?.frontmatter?.title || slug, path, owner);
          }
        }
        await MarkdownRenderer.render(this.plugin.app, this.details || 'Подробности пока не указаны.', details, this.sourcePath, owner);
        return;
      }
      if (this.kind === 'files') this.containerEl.addClass('hacksidian-columns', 'hacksidian-files');
      for (const [index, kind] of kinds.entries()) {
        const column = this.containerEl.createDiv({ cls: 'hacksidian-source' });
        const header = column.createDiv({ cls: 'hacksidian-source-header' });
        header.createEl('h3', { text: kind === 'css' ? 'CSS' : 'Markdown' });
        const text = texts[index];
        const path = `${this.directory}/${kind === 'css' ? 'recipe.css' : 'markdown.md'}`;
        if (text !== null) {
          if (kind === 'markdown') this.internalLink(header, 'Открыть в Obsidian', path, owner, true);
          else {
            const local = adapter as typeof adapter & { getFullPath?: (path: string) => string };
            if (local.getFullPath) {
              const url = new URL('vscode://file'); url.pathname = local.getFullPath(path);
              header.createEl('a', { text: 'Открыть в VSCode', href: url.href, cls: 'hacksidian-editor-link' });
            }
          }
        }
        if (!text?.trim()) { column.createEl('p', { text: kind === 'css' ? 'Для этого приёма нет отдельного CSS-рецепта.' : 'Markdown-пример для этого приёма пока не добавлен.' }); continue; }
        // A longer fence keeps nested fences and HTML literal; Obsidian supplies its normal syntax colors.
        await MarkdownRenderer.render(this.plugin.app, sourceFence(text, kind), column, path, owner);
        if (this.stopped || epoch !== this.epoch) return;
      }
    } catch (error) {
      if (!this.stopped && epoch === this.epoch) { this.containerEl.empty(); this.containerEl.createEl('p', { text: `Не удалось показать блок: ${String(error)}` }); }
    }
  }
}
export function registerSourceBlocks(plugin: Plugin): void {
  for (const kind of ['css', 'markdown', 'files', 'sources', 'id']) {
    plugin.registerMarkdownCodeBlockProcessor(`hacksidian-${kind}`, (source, el, ctx) => {
      const [id, ...details] = source.trim().split('\n');
      try { ctx.addChild(new TechniqueBlock(el, plugin, techniqueDirectory(ctx.sourcePath, id.trim()), kind, details.join('\n'), ctx.sourcePath)); }
      catch (error) { el.setText(String(error)); }
    });
  }
}
