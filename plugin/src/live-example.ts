import { installCodeWrapMarkers } from './code-wrap-markers';
import { watchCodeLineHighlights } from './code-line-ranges';
import { parameterExample, parameterMarkdown } from './parameter-variants';
import { readParameters, parameterValue } from './parameters';
import { ParameterControls } from './parameter-controls';
import type { FavouriteControls } from './favourites';
import { previewState } from './preview-state';
import { createLiveExampleSurface } from './live-example-surface';
import { installInlineCodeSelection } from './inline-code-selection';
import { loadPreviewFont } from './live-example-font';
import { activatePreviewTarget } from './live-example-target';
import { Component, MarkdownRenderChild, MarkdownRenderer, Notice, Plugin, TFile } from 'obsidian';
import { liveExampleIssue, resolveLiveUrls, scopeLiveExample } from './live-example-css';
import { MetadataExample } from './metadata-example';
import { PaletteExample } from './palette-example';
export class LiveExample extends MarkdownRenderChild {
  private previewEl!: HTMLElement;
  private epoch = 0;
  private stopped = false;
  private renderer: Component | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;
  constructor(el: HTMLElement, private plugin: Plugin, private directory: string, private language: 'ru' | 'en', private controls?: FavouriteControls, private values?: Record<string, string>) { super(el); }
  onload(): void {
    this.previewEl = this.containerEl.createDiv();
    if (!this.values) this.addChild(new ParameterControls(this.containerEl.createDiv(), this.plugin, this.directory, this.controls));
    this.registerEvent(this.plugin.app.vault.on('modify', file => {
      if ([`${this.directory}/recipe.css`, `${this.directory}/markdown.md`, `${this.directory}/Model.ru.html`].includes(file.path)) {
        clearTimeout(this.timer); this.timer = setTimeout(() => void this.render(), 150);
      }
    }));
    if (this.plugin.app.workspace) this.registerEvent(this.plugin.app.workspace.on('css-change', () => {
      clearTimeout(this.timer); this.timer = setTimeout(() => void this.render(), 150);
    }));
    void this.render();
  }
  onunload(): void { this.stopped = true; this.epoch++; clearTimeout(this.timer); this.containerEl.empty(); }
  private async render(): Promise<void> {
    const epoch = ++this.epoch, ru = this.language === 'ru';
    try {
      const adapter = this.plugin.app.vault.adapter;
      const spec = JSON.parse(await adapter.read(`${this.directory}/hack.json`));
      if (spec.group === 'metadata' && await adapter.exists(`${this.directory}/Model.ru.html`)) {
        const [model,rawCss] = await Promise.all([adapter.read(`${this.directory}/Model.ru.html`),adapter.read(`${this.directory}/recipe.css`)]);
        if (this.stopped || epoch !== this.epoch) return;
        if (this.renderer) this.removeChild(this.renderer);
        this.previewEl.empty();
        const state=previewState(this.previewEl,this.directory);
        const example=new MetadataExample(this.previewEl.createDiv(),model,parameterExample(rawCss,this.values ?? {}),state.enabled,ru);
        this.renderer=example;this.addChild(example);
        example.register(state.subscribe(()=>example.update(state.enabled)));
        return;
      }
      const interfaceExample = ['interface', 'metadata', 'meta'].includes(spec.group);
      if (interfaceExample || (spec.group !== 'palette' && !await adapter.exists(`${this.directory}/markdown.md`))) {
        if (this.stopped || epoch !== this.epoch) return;
        if (this.renderer) { this.removeChild(this.renderer); this.renderer = null; }
        this.previewEl.empty();
        this.previewEl.createEl('p', { cls: 'setting-item-description', text: interfaceExample
          ? (ru ? 'Этот приём изменяет интерфейс Obsidian. Его эффект нельзя показать внутри сообщения; способ проверки описан на странице приёма.' : 'This technique changes the Obsidian interface. Its effect cannot be shown inside a message; see the technique page for verification steps.')
          : (ru ? 'Для этого приёма пока нет встроенного примера. Подробности — на странице приёма.' : 'This technique has no embedded example yet. See its page for details.') });
        return;
      }
      if (spec.preview === 'semantic-colors') {
        const parameters = readParameters(parameterExample(await adapter.read(`${this.directory}/recipe.css`), this.values ?? {}));
        if (this.stopped || epoch !== this.epoch) return;
        if (this.renderer) { this.removeChild(this.renderer); this.renderer = null; }
        this.previewEl.empty();
        const owner = new Component(); this.renderer = owner; this.addChild(owner);
        const state = previewState(this.previewEl, this.directory);
        const grid = this.previewEl.createDiv({ cls: 'hacksidian-semantic-colors' });
        for (const parameter of parameters) {
          const color = parameterValue(parameter, parameter.value);
          const tile = grid.createDiv();
          const swatch = tile.createDiv({ cls: 'hacksidian-semantic-swatch' });
          const update = () => { swatch.style.backgroundColor = state.enabled ? color : `var(--color-${parameter.variable.replace('--hacksidian-semantic-', '')})`; };
          owner.register(state.subscribe(update)); update();
          tile.createDiv({ text: (!ru && parameter.labelEn) || parameter.label });
          tile.createEl('code', { text: color });
        }
        this.previewEl.createEl('hr', { cls: 'hacksidian-live-separator' });
        return;
      }
      if (spec.group === 'palette') {
        if (this.stopped || epoch !== this.epoch) return;
        if (this.renderer) this.removeChild(this.renderer);
        this.previewEl.empty();
        this.renderer = new PaletteExample(this.previewEl.createDiv(), this.plugin, this.directory, this.values);
        this.addChild(this.renderer);
        return;
      }
      const [markdown, rawCss] = await Promise.all([adapter.read(`${this.directory}/markdown.md`), adapter.read(`${this.directory}/recipe.css`)]);
      const css = parameterExample(rawCss, this.values ?? {});
      const issue = liveExampleIssue(spec.group, markdown, css);
      if (issue) throw new Error(issue);
      if (this.stopped || epoch !== this.epoch) return;
      const id = `hacksidian-live-${crypto.randomUUID()}`, scoped = resolveLiveUrls(scopeLiveExample(css, id), this.directory, file => adapter.getResourcePath(file));
      if (this.renderer) this.removeChild(this.renderer);
      const owner = new Component(); this.renderer = owner; this.addChild(owner);
      this.previewEl.empty(); this.previewEl.addClass('hacksidian-live-example');
      const preview = previewState(this.previewEl, this.directory);
      this.previewEl.createEl('hr', { cls: 'hacksidian-live-separator' });
      const viewport = this.previewEl.createDiv({ cls: 'hacksidian-live-viewport' });
      const surface = createLiveExampleSurface(viewport);
      const sample = surface.createDiv({ cls: 'markdown-preview-view markdown-rendered hacksidian-live-sample' }); sample.id = id;
      if (spec.previewFont) {
        await loadPreviewFont(sample, spec.previewFont, file => adapter.readBinary(`${this.directory}/${file}`), owner);
        if (this.stopped || epoch !== this.epoch) return;
      }
      const pageSized = /\.markdown-preview-sizer|\.is-readable-line-width/.test(css);
      if (pageSized) sample.addClass('is-readable-line-width');
      const content = pageSized ? sample.createDiv({ cls: 'markdown-preview-sizer hacksidian-live-page' }) : sample;
      // Keep checkbox experiments local; don't let the renderer write to the source Markdown.
      owner.registerDomEvent(sample, 'click', event => {
        const target = event.target as HTMLInputElement | null;
        if (!target || target.tagName !== 'INPUT' || target.type !== 'checkbox') return;
        event.preventDefault(); event.stopPropagation();
        const checked = target.checked;
        // Canceled activation restores the old value after dispatch: update after that rollback.
        queueMicrotask(() => {
          if (!sample.isConnected) return;
          target.checked = checked;
          const item = target.closest('li');
          if (item) { item.classList.toggle('is-checked', checked); item.setAttribute('data-task', checked ? 'x' : ' '); }
        });
      }, { capture: true });
      // Simulate :target only inside this example; never navigate the host note.
      owner.registerDomEvent(sample, 'click', event => {
        const link = (event.target as Element | null)?.closest('a');
        const href = link?.getAttribute('href') || link?.getAttribute('data-href') || '';
        if (!link) return;
        const target = activatePreviewTarget(sample, href);
        if (!target) return;
        event.preventDefault(); event.stopPropagation();
        target.scrollIntoView({ block: 'nearest' });
      }, { capture: true });
      const style = surface.createEl('style');
      this.previewEl.createEl('hr', { cls: 'hacksidian-live-separator' });
      let refreshWrapMarkers = () => {};
      let refreshSelection = () => {};
      const update = () => { style.textContent = preview.enabled ? scoped : ''; refreshWrapMarkers(); refreshSelection(); };
      owner.register(preview.subscribe(update)); update();
      await MarkdownRenderer.render(this.plugin.app, parameterMarkdown(markdown.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, ''), css), content, `${this.directory}/markdown.md`, owner);
      if (this.stopped || epoch !== this.epoch) return;
      watchCodeLineHighlights(sample, owner);
      refreshWrapMarkers = installCodeWrapMarkers(sample, owner);
      refreshSelection = installInlineCodeSelection(sample, owner);
      sample.querySelectorAll<HTMLInputElement>('input[type=checkbox]').forEach(input => { input.disabled = false; });
      if (/:target\b/.test(css)) this.previewEl.createEl('small', { text: ru ? 'Нажмите ссылку или номер сноски внутри примера: эффект появится у выбранной цели.' : 'Click a link or footnote number inside the example to select its target.' });
      if (this.directory.endsWith('/link-e025')) this.previewEl.createEl('small', { text: ru ? 'Наведите курсор на ссылку. Если подчёркивание отключено в вашем оформлении, этот приём сам его не включает.' : 'Hover over the link. This technique does not enable underlines if your styling disables them.' });
    } catch (error) {
      if (!this.stopped && epoch === this.epoch) {
        if (this.renderer) { this.removeChild(this.renderer); this.renderer = null; }
        this.previewEl.empty(); this.previewEl.createEl('p', { text: `${ru ? 'Не удалось показать пример' : 'Could not render example'}: ${String(error)}` });
      }
    }
  }
}
export function registerLiveExamples(plugin: Plugin, controls?: FavouriteControls): void {
  plugin.registerMarkdownCodeBlockProcessor('hacksidian-live', (source, el, ctx) => {
    const id = source.trim(), match = ctx.sourcePath.match(/^(.*(?:^|\/)atlas)\//);
    if (!match || !/^[a-z0-9][a-z0-9-]*$/.test(id)) { el.setText('Некорректный идентификатор примера / Invalid example ID'); return; }
    const directory = ctx.sourcePath.endsWith(`/${id}.md`) ? ctx.sourcePath.slice(0, ctx.sourcePath.lastIndexOf('/')) : `${match[1]}/! hacks/${id}`;
    ctx.addChild(new LiveExample(el, plugin, directory, ctx.sourcePath.endsWith('.en.md') ? 'en' : 'ru', controls));
  });
  plugin.addCommand({ id: 'open-live-examples', name: 'Открыть живые примеры / Open live examples', callback: async () => {
    const file = plugin.app.vault.getMarkdownFiles().find(f => /(?:^|\/)atlas\/Живые примеры.md$/.test(f.path));
    if (file instanceof TFile) await plugin.app.workspace.getLeaf(false).openFile(file, { state: { mode: 'preview' } });
    else new Notice('Живые примеры.md: файл не найден / file not found');
  } });
}
