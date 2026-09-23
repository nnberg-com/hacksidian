import { MarkdownRenderChild, type Plugin } from 'obsidian';
import type { FavouriteControls } from './favourites';
import { LiveExample } from './live-example';
import { parseExpandedValues, parameterExample, resolveParameterVariants } from './parameter-variants';
import { readParameters, updateParameter } from './parameters';
import { processParameterSource } from './parameter-storage';

export class ExpandedExample extends MarkdownRenderChild {
  private stopped = false;
  constructor(el: HTMLElement, private plugin: Plugin, private directory: string, private values: Record<string, string>, private controls?: FavouriteControls) { super(el); }
  onunload(): void { this.stopped = true; }
  async onload(): Promise<void> {
    try {
      const path = `${this.directory}/recipe.css`;
      const source = await this.plugin.app.vault.adapter.read(path);
      resolveParameterVariants(parameterExample(source, this.values));
      if (this.stopped) return;
      const en = this.controls?.english() ?? false;
      const expected = new Map(readParameters(source).map(p => [p.variable, p.value]));
      this.addChild(new LiveExample(this.containerEl.createDiv(), this.plugin, this.directory, en ? 'en' : 'ru', this.controls, this.values));
      const choose = this.containerEl.createEl('button', { text: en ? 'Choose this variant' : 'Выбрать этот вариант' });
      const status = this.containerEl.createDiv({ attr: { role: 'status', 'aria-live': 'polite' } });
      const synchronize = async () => {
        const current = readParameters(await this.plugin.app.vault.adapter.read(path));
        if (this.stopped) return;
        for (const parameter of current) expected.set(parameter.variable, parameter.value);
      };
      this.registerEvent(this.plugin.app.vault.on('modify', file => { if (file.path === path) void synchronize().catch(e => status.setText(String(e))); }));
      this.registerDomEvent(choose, 'click', () => {
        choose.disabled = true;
        const before = new Map(expected);
        void processParameterSource(this.plugin.app.vault, path, css => {
          for (const [variable, input] of Object.entries(this.values)) css = updateParameter(css, variable, input, before.get(variable));
          resolveParameterVariants(css);
          return css;
        }).then(() => {
          if (!this.stopped) status.setText(en ? 'Saved. Enable or update the style on the technique card.' : 'Выбор сохранён. Включите или обновите стиль на карточке приёма.');
        }).catch(error => { if (!this.stopped) status.setText(String(error)); }).finally(() => { choose.disabled = false; });
      });
    } catch (error) { if (!this.stopped) this.containerEl.setText(String(error)); }
  }
}

export function registerExpandedExamples(plugin: Plugin, controls?: FavouriteControls): void {
  plugin.registerMarkdownCodeBlockProcessor('hacksidian-expanded', (source, el, ctx) => {
    try {
      const match = ctx.sourcePath.match(/^(.*(?:^|\/)atlas\/! hacks\/[a-z0-9-]+)\/expanded\.md$/);
      if (!match) throw Error('Expanded examples belong in the technique’s expanded.md');
      ctx.addChild(new ExpandedExample(el, plugin, match[1], parseExpandedValues(source), controls));
    } catch (error) { el.setText(String(error)); }
  });
}
