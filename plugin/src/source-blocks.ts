import { previewState } from './preview-state';
import { parseDetails } from './details';
import type { FavouriteControls } from './favourites';
import { Component, MarkdownRenderChild, MarkdownRenderer, Notice, parseYaml, Plugin, TAbstractFile } from 'obsidian';
import { readTechniqueSource, techniqueDirectory } from './technique-files';
export function sourceFence(text: string, kind: string): string {
  const fence = '`'.repeat(Math.max(3, ...[...text.matchAll(/`+/g)].map(match => match[0].length + 1)));
  return `${fence}${kind}\n${text}\n${fence}`;
}
export class TechniqueBlock extends MarkdownRenderChild {
  private epoch = 0;
  private stopped = false;
  private owner: Component | null = null;
  constructor(el: HTMLElement, private plugin: Plugin, private directory: string, private kind: string, private sourcePath: string, private favourites?: FavouriteControls, private embedded = false) { super(el); }
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
      const card = ['sources', 'id'].includes(this.kind) ? await adapter.read(`${this.directory}/${id}.md`) : '';
      if (this.stopped || epoch !== this.epoch) return;
      if (this.owner) this.removeChild(this.owner);
      const owner = new Component(); this.owner = owner; this.addChild(owner);
      this.containerEl.empty();
      if (this.kind === 'id') {
        this.containerEl.addClass('hacksidian-card-header');
        const metadata = parseYaml(card.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '') || {};
        const en = this.favourites?.english() ?? false;
        const path = `${this.directory}/${id}.md`;
        const root = this.directory.match(/^(.*(?:^|\/)atlas)\//)![1];
        if (!this.embedded) {
        const nav = this.containerEl.createDiv({ cls: 'hacksidian-card-nav' });
        if (typeof metadata.category === 'string' && /^[a-z0-9-]+$/.test(metadata.category)) {
          const categoryPath = `${root}/! categories/${metadata.category}.md`;
          const categoryTitle = this.plugin.app.metadataCache.getCache(categoryPath)?.frontmatter?.title || metadata.category;
          this.internalLink(nav, String(categoryTitle), categoryPath, owner);
        }
        if (this.favourites) {
          const link = nav.createEl('a', { text: en ? 'Favourites' : 'Избранное', href: `${root}/Избранное.md`, cls: 'internal-link' });
          owner.registerDomEvent(link, 'click', event => { event.preventDefault(); this.favourites!.open(); });
          if (this.favourites.openEnabled) {
            const enabled = nav.createEl('a', { text: en ? 'Enabled' : 'Включённые', href: `${root}/Включённые.md`, cls: 'internal-link' });
            owner.registerDomEvent(enabled, 'click', event => { event.preventDefault(); this.favourites!.openEnabled!(); });
          }
        }
        }
        const row = this.containerEl.createDiv({ cls: 'hacksidian-card-row' });
        const heading = row.createEl('h2', { cls: 'hacksidian-card-title', text: this.embedded ? '' : String(metadata.title || id) });
        if (this.embedded) this.internalLink(heading, String(metadata.title || id), path, owner);
        heading.appendText(' ');
        // A genuine inline code element inherits Obsidian/theme/snippet styling unchanged.
        const code = heading.createEl('code', { text: id, cls: 'hacksidian-copy-id', attr: { role: 'button', tabindex: '0', 'aria-label': `Скопировать код ${id}` } });
        const copy = () => { void navigator.clipboard.writeText(id).then(() => new Notice(`Скопировано: ${id}`), () => new Notice('Не удалось скопировать код')); };
        owner.registerDomEvent(code, 'click', copy);
        owner.registerDomEvent(code, 'keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); copy(); } });
        if (this.favourites) {
          const { store } = this.favourites;
          const star = row.createEl('button', { cls: 'hacksidian-favourite-toggle' });
          const update = () => {
            const saved = store.has(path);
            star.textContent = saved ? '★' : '☆';
            star.setAttribute('aria-pressed', String(saved));
            const label = saved ? (en ? 'Remove from favourites' : 'Убрать из избранного') : (en ? 'Add to favourites' : 'В избранное');
            star.setAttribute('aria-label', label); star.setAttribute('title', label);
          };
          owner.register(store.subscribe(update)); update();
          owner.registerDomEvent(star, 'click', () => {
            star.disabled = true;
            void store.toggle(path).catch(error => new Notice(String(error))).finally(() => { star.disabled = false; });
          });
        }
        const actions = row.createDiv({ cls: 'hacksidian-card-actions' });
        if (/^```hacksidian-live\s*$/m.test(card)) {
          const state = previewState(this.containerEl, this.directory);
          const control = actions.createDiv({ cls: 'hacksidian-preview-control' });
          const hide = control.createEl('span', { text: en ? 'Hide' : 'Скрыть' });
          const toggle = control.createEl('button', { cls: 'hacksidian-switch', attr: { role: 'switch', 'aria-label': en ? 'Show technique in preview' : 'Показать приём в примере' } });
          const show = control.createEl('span', { text: en ? 'Show' : 'Показать' });
          const update = () => {
            toggle.setAttribute('aria-checked', String(state.enabled));
            hide.toggleClass('is-active', !state.enabled); show.toggleClass('is-active', state.enabled);
          };
          owner.register(state.subscribe(update)); update();
          owner.registerDomEvent(toggle, 'click', () => state.set(!state.enabled));
          owner.registerDomEvent(toggle, 'keydown', event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); state.set(event.key === 'ArrowRight'); }
          });
        }
        const technique = this.favourites?.technique;
        if (technique) {
          const apply = actions.createEl('button', { cls: 'hacksidian-apply-toggle' });
          let installed = false, busy = false;
          const refresh = async () => {
            const state = await technique.get(path);
            installed = state?.installed ?? false;
            apply.textContent = installed ? (en ? 'Disable' : 'Выключить') : (en ? 'Enable' : 'Включить');
            apply.disabled = busy || !state || (!state.hasCss && !installed);
            apply.setAttribute('aria-pressed', String(installed));
            apply.setAttribute('title', state && !state.hasCss ? 'У этого приёма нет самостоятельного CSS' : '');
          };
          const update = () => { void refresh().catch(error => { apply.disabled = true; apply.textContent = String(error); }); };
          owner.register(technique.subscribe(update)); update();
          owner.registerDomEvent(apply, 'click', () => {
            busy = true; apply.disabled = true;
            void technique.set(path, !installed).catch(error => new Notice(String(error))).finally(() => { busy = false; update(); });
          });
        }
        return;
      }
      if (this.kind === 'sources') {
        this.containerEl.addClass('hacksidian-columns', 'hacksidian-sources');
        const themes = this.containerEl.createDiv(), details = this.containerEl.createDiv();
        themes.createEl('h6', { text: 'Темы' }); details.createEl('h6', { text: 'Детали' });
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
        const sources = [...new Set((Array.isArray(meta.sources) ? meta.sources : []).filter((value: unknown): value is string => typeof value === 'string' && !!value.trim()))] as string[];
        const links = sources.flatMap(source => {
          try { const url = new URL(source); return ['https:', 'http:'].includes(url.protocol) ? [{ source, label: url.hostname, external: true }] : []; }
          catch { return !/^[a-z][a-z0-9+.-]*:/i.test(source) ? [{ source, label: source.split('/').pop() || source, external: false }] : []; }
        });
        if (!links.length) details.createEl('p', { text: 'Источники пока не указаны.' });
        else {
          const list = details.createEl('ul');
          for (const link of links) {
            const item = list.createEl('li');
            if (link.external) item.createEl('a', { text: link.label, href: link.source, cls: 'external-link', attr: { target: '_blank', rel: 'noopener noreferrer' } });
            else this.internalLink(item, link.label, `${this.directory}/${link.source}`, owner);
          }
        }
        return;
      }
      if (this.kind === 'files') this.containerEl.addClass('hacksidian-columns', 'hacksidian-files');
      for (const [index, kind] of kinds.entries()) {
        const column = this.containerEl.createDiv({ cls: 'hacksidian-source' });
        const header = column.createDiv({ cls: 'hacksidian-source-header' });
        const heading = header.createEl('h6', { text: kind === 'css' ? 'CSS' : '' });
        const text = texts[index];
        const path = `${this.directory}/${kind === 'css' ? 'recipe.css' : 'markdown.md'}`;
        if (text !== null) {
          if (kind === 'markdown') this.internalLink(heading, 'Markdown', path, owner, true);
          else {
            const local = adapter as typeof adapter & { getFullPath?: (path: string) => string };
            if (local.getFullPath) {
              const url = new URL('vscode://file'); url.pathname = local.getFullPath(path);
              const edit = header.createEl('button', { text: 'VSCode', cls: 'hacksidian-editor-link' });
              owner.registerDomEvent(edit, 'click', () => { window.open(url.href); });
            }
          }
        }
        if (kind === 'markdown' && text === null) heading.setText('Markdown');
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
export function registerSourceBlocks(plugin: Plugin, favourites?: FavouriteControls): void {
  plugin.registerMarkdownCodeBlockProcessor('hacksidian-category', async (source, el, ctx) => {
    const { CategoryExamples } = await import('./category-examples');
    ctx.addChild(new CategoryExamples(el, plugin, ctx.sourcePath, source.trim(), favourites));
  });
  plugin.registerMarkdownCodeBlockProcessor('hacksidian-details', (source, el, ctx) => {
    class DetailsBlock extends MarkdownRenderChild {
      async onload(): Promise<void> {
        try {
          this.containerEl.addClass('hacksidian-details');
          for (const column of parseDetails(source)) {
            const cell = this.containerEl.createDiv();
            cell.createEl('h6', { text: column.title });
            await MarkdownRenderer.render(plugin.app, column.content, cell, ctx.sourcePath, this);
          }
        } catch (error) { this.containerEl.setText(String(error)); }
      }
    }
    ctx.addChild(new DetailsBlock(el));
  });
  for (const kind of ['css', 'markdown', 'files', 'sources', 'id']) {
    plugin.registerMarkdownCodeBlockProcessor(`hacksidian-${kind}`, (source, el, ctx) => {
      const [id] = source.trim().split('\n');
      try { ctx.addChild(new TechniqueBlock(el, plugin, techniqueDirectory(ctx.sourcePath, id.trim()), kind, ctx.sourcePath, favourites)); }
      catch (error) { el.setText(String(error)); }
    });
  }
}
