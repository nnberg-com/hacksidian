import { Component, MarkdownRenderChild, MarkdownRenderer, Notice, Plugin, TFile } from 'obsidian';
import { liveExampleIssue, resolveLiveUrls, scopeLiveExample } from './live-example-css';
class LiveExample extends MarkdownRenderChild {
  private epoch = 0;
  private stopped = false;
  private renderer: Component | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private enabled = true;
  constructor(el: HTMLElement, private plugin: Plugin, private directory: string, private language: 'ru' | 'en') { super(el); }
  onload(): void {
    this.registerEvent(this.plugin.app.vault.on('modify', file => {
      if ([`${this.directory}/recipe.css`, `${this.directory}/Markdown.${this.language}.md`].includes(file.path)) {
        clearTimeout(this.timer); this.timer = setTimeout(() => void this.render(), 150);
      }
    }));
    void this.render();
  }
  onunload(): void { this.stopped = true; this.epoch++; clearTimeout(this.timer); this.containerEl.empty(); }
  private async render(): Promise<void> {
    const epoch = ++this.epoch, ru = this.language === 'ru';
    try {
      const adapter = this.plugin.app.vault.adapter;
      const [markdown, css, rawSpec] = await Promise.all([adapter.read(`${this.directory}/Markdown.${this.language}.md`), adapter.read(`${this.directory}/recipe.css`), adapter.read(`${this.directory}/hack.json`)]);
      const issue = liveExampleIssue(JSON.parse(rawSpec).group, markdown, css);
      if (issue) throw new Error(issue);
      if (this.stopped || epoch !== this.epoch) return;
      const id = `hacksidian-live-${crypto.randomUUID()}`, scoped = resolveLiveUrls(scopeLiveExample(css, id), this.directory, file => adapter.getResourcePath(file));
      if (this.renderer) this.removeChild(this.renderer);
      const owner = new Component(); this.renderer = owner; this.addChild(owner);
      this.containerEl.empty(); this.containerEl.addClass('hacksidian-live-example');
      const toolbar = this.containerEl.createDiv({ cls: 'hacksidian-live-toolbar' });
      toolbar.createEl('strong', { text: ru ? 'Живой пример' : 'Live example' });
      const button = toolbar.createEl('button');
      button.disabled = !css.trim();
      const status = toolbar.createEl('span', { attr: { 'aria-live': 'polite' } });
      const viewport = this.containerEl.createDiv({ cls: 'hacksidian-live-viewport' });
      const sample = viewport.createDiv({ cls: 'markdown-preview-view markdown-rendered hacksidian-live-sample' }); sample.id = id;
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
      const style = this.containerEl.createEl('style');
      const update = () => {
        style.textContent = this.enabled ? scoped : '';
        button.textContent = ru ? 'С приёмом' : 'With technique';
        button.setAttribute('aria-pressed', String(this.enabled));
        status.textContent = !css.trim() ? (ru ? 'Штатный пример без дополнительного CSS' : 'Native example without additional CSS') : this.enabled ? (ru ? 'Приём включён' : 'Technique on') : (ru ? 'Исходное оформление' : 'Current styling');
      };
      owner.registerDomEvent(button, 'click', () => { this.enabled = !this.enabled; update(); }); update();
      await MarkdownRenderer.render(this.plugin.app, markdown.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, ''), sample, `${this.directory}/Markdown.${this.language}.md`, owner);
      if (this.stopped || epoch !== this.epoch) return;
      sample.querySelectorAll<HTMLInputElement>('input[type=checkbox]').forEach(input => { input.disabled = false; });
      this.containerEl.createEl('small', { text: ru ? 'Нажмите «С приёмом», чтобы сравнить. Ширину примера можно менять за нижний правый угол.' : 'Toggle “With technique” to compare. Drag the bottom-right corner to change the sample width.' });
      if (this.directory.endsWith('/link-e025')) this.containerEl.createEl('small', { text: ru ? 'Наведите курсор на ссылку. Если подчёркивание отключено в вашем оформлении, этот приём сам его не включает.' : 'Hover over the link. This technique does not enable underlines if your styling disables them.' });
    } catch (error) {
      if (!this.stopped && epoch === this.epoch) {
        if (this.renderer) { this.removeChild(this.renderer); this.renderer = null; }
        this.containerEl.empty(); this.containerEl.createEl('p', { text: `${ru ? 'Не удалось показать пример' : 'Could not render example'}: ${String(error)}` });
      }
    }
  }
}
export function registerLiveExamples(plugin: Plugin): void {
  plugin.registerMarkdownCodeBlockProcessor('hacksidian-live', (source, el, ctx) => {
    const id = source.trim(), match = ctx.sourcePath.match(/^(.*(?:^|\/)atlas)\//);
    if (!match || !/^[a-z0-9][a-z0-9-]*$/.test(id)) { el.setText('Некорректный идентификатор примера / Invalid example ID'); return; }
    ctx.addChild(new LiveExample(el, plugin, `${match[1]}/! hacks/${id}`, ctx.sourcePath.endsWith('.en.md') ? 'en' : 'ru'));
  });
  plugin.addCommand({ id: 'open-live-examples', name: 'Открыть живые примеры / Open live examples', callback: async () => {
    const file = plugin.app.vault.getMarkdownFiles().find(f => /(?:^|\/)atlas\/Живые примеры.md$/.test(f.path));
    if (file instanceof TFile) await plugin.app.workspace.getLeaf(false).openFile(file, { state: { mode: 'preview' } });
    else new Notice('Живые примеры.md: файл не найден / file not found');
  } });
}
