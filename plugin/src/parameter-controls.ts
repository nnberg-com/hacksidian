import { MarkdownRenderChild, type Plugin } from 'obsidian';
import type { FavouriteControls } from './favourites';
import { parameterInput, parameterValue, readParameters } from './parameters';
import { saveParameter, pendingParameters } from './parameter-storage';

/** The same editor is mounted by individual and embedded technique headers. */
export class ParameterControls extends MarkdownRenderChild {
  private stopped = false;
  private epoch = 0;
  constructor(el: HTMLElement, private plugin: Plugin, private directory: string, private controls?: FavouriteControls) { super(el); }
  onload(): void { void this.mount(); }
  onunload(): void { this.stopped = true; this.epoch++; }
  private async mount(): Promise<void> {
    const epoch = ++this.epoch;
    const cssPath = `${this.directory}/recipe.css`;
    const id = this.directory.split('/').pop()!;
    const cardPath = `${this.directory}/${id}.md`;
    const en = this.controls?.english() ?? false;
    try {
      const parameters = readParameters(await this.plugin.app.vault.adapter.read(cssPath));
      if (this.stopped || epoch !== this.epoch || !parameters.length) return;
      this.containerEl.addClass('hacksidian-parameters');
      let pending = 0, applying = false;
      const invalid = new Set<string>();
      const status = this.containerEl.createDiv({ attr: { role: 'status', 'aria-live': 'polite' } });
      const fields = new Map<string, HTMLInputElement | HTMLSelectElement>();
      const errors = new Map<string, HTMLElement>();
      const updateButton = this.containerEl.createEl('button', { text: en ? 'Update existing style' : 'Обновить уже существующий стиль' });
      updateButton.hidden = true;
      const technique = this.controls?.technique;
      let refreshEpoch = 0;
      const refresh = async () => {
        const request = ++refreshEpoch;
        const state = await technique?.get(cardPath);
        if (this.stopped || request !== refreshEpoch) return;
        updateButton.hidden = !state?.installed || !technique?.update;
        updateButton.disabled = pending > 0 || invalid.size > 0 || applying;
      };
      const report = (error: unknown) => { if (!this.stopped) status.setText(String(error)); };
      const requestRefresh = () => { void refresh().catch(report); };
      let readEpoch = 0;
      const synchronize = async () => {
        const request = ++readEpoch;
        const css = await this.plugin.app.vault.adapter.read(cssPath);
        if (this.stopped || pending || request !== readEpoch) return;
        const latest = readParameters(css);
        for (const parameter of parameters) {
          const actual = latest.find(p => p.variable === parameter.variable);
          if (!actual) { invalid.add(parameter.variable); errors.get(parameter.variable)!.setText(en ? 'Parameter removed. Reopen the card.' : 'Параметр удалён. Откройте карточку заново.'); continue; }
          if (actual.value !== parameter.value) {
            parameter.value = actual.value; fields.get(parameter.variable)!.value = parameterInput(actual);
            invalid.delete(parameter.variable); errors.get(parameter.variable)!.empty(); fields.get(parameter.variable)!.removeAttribute('aria-invalid');
            try { parameterValue(actual, parameterInput(actual)); } catch (e) { invalid.add(parameter.variable); errors.get(parameter.variable)!.setText(String(e)); }
          }
        }
        requestRefresh();
      };
      const save = (variable: string, input: string) => {
        const parameter = parameters.find(p => p.variable === variable)!;
        const field = fields.get(variable)!;
        let value: string;
        try { value = parameterValue(parameter, input); }
        catch (error) {
          invalid.add(variable); field.setAttribute('aria-invalid', 'true'); errors.get(variable)!.setText(String(error)); requestRefresh(); return;
        }
        invalid.delete(variable); field.removeAttribute('aria-invalid'); errors.get(variable)!.empty();
        if (value === parameter.value) { requestRefresh(); return; }
        const expected = parameter.value;
        parameter.value = value;
        pending++; updateButton.disabled = true;
        status.setText(en ? 'Saving…' : 'Сохраняю…');
        void saveParameter(this.plugin.app.vault, cssPath, variable, input, expected).then(() => {
          if (!this.stopped) status.setText(en ? 'Saved in recipe. Preview updated; use the button to update the applied style.' : 'Сохранено в приёме. Пример обновлён; применённый стиль обновляется кнопкой.');
        }).catch(async error => {
          if (this.stopped) return;
          invalid.add(variable); field.setAttribute('aria-invalid', 'true'); errors.get(variable)!.setText(String(error));
          // Retain the attempted input but reload the conflict baseline for the next edit.
          const actual = readParameters(await this.plugin.app.vault.adapter.read(cssPath)).find(p => p.variable === variable);
          if (actual) parameter.value = actual.value;
        }).catch(report).finally(() => { pending--; if (!pending) void synchronize().catch(report); requestRefresh(); });
      };
      for (const parameter of parameters) {
        const row = this.containerEl.createDiv({ cls: 'hacksidian-parameter' });
        const label = row.createEl('label', { text: (en ? parameter.labelEn : undefined) || parameter.label });
        let field: HTMLInputElement | HTMLSelectElement;
        if (parameter.type === 'select') {
          const select = label.createEl('select'); field = select;
          for (const option of parameter.options) select.createEl('option', { value: option.value, text: (en ? option.labelEn : undefined) || option.label });
          if (!parameter.options.some(option => option.value === parameter.value)) select.createEl('option', { value: parameter.value, text: parameter.value });
        } else {
          const input = label.createEl('input', { type: parameter.type === 'number' ? 'number' : parameter.type === 'color' ? 'color' : 'text' }); field = input;
          if (parameter.type === 'number') {
            input.step = String(parameter.step ?? 'any');
            if (parameter.min !== undefined) input.min = String(parameter.min);
            if (parameter.max !== undefined) input.max = String(parameter.max);
          } else input.maxLength = parameter.maxLength;
          if (parameter.unit) label.createSpan({ text: ` ${parameter.unit}` });
        }
        field.value = parameterInput(parameter); fields.set(parameter.variable, field);
        const error = row.createDiv({ attr: { role: 'alert', id: `parameter-error-${crypto.randomUUID()}` } });
        field.setAttribute('aria-describedby', error.id); errors.set(parameter.variable, error);
        this.registerDomEvent(field, parameter.type === 'select' || parameter.type === 'color' ? 'change' : 'input', () => save(parameter.variable, field.value));
        const reset = row.createEl('button', { text: en ? 'Reset' : 'Сбросить' });
        this.registerDomEvent(reset, 'click', () => { field.value = parameterInput({ ...parameter, value: parameter.default }); save(parameter.variable, field.value); });
        try { parameterValue(parameter, field.value); } catch (e) { invalid.add(parameter.variable); field.setAttribute('aria-invalid', 'true'); error.setText(String(e)); }
      }
      this.containerEl.appendChild(status); this.containerEl.appendChild(updateButton);
      this.registerDomEvent(updateButton, 'click', () => {
        applying = true; updateButton.disabled = true;
        void pendingParameters(this.plugin.app.vault, cssPath).then(() => technique!.update!(cardPath)).then(() => {
          if (!this.stopped) status.setText(en ? 'Applied style updated.' : 'Применённый стиль обновлён.');
        }).catch(report).finally(() => { applying = false; requestRefresh(); });
      });
      if (technique) this.register(technique.subscribe(requestRefresh));
      this.registerEvent(this.plugin.app.vault.on('modify', file => {
        if (file.path === cssPath && !pending) void synchronize().catch(report);
      }));
      requestRefresh();
    } catch (error) { if (!this.stopped) this.containerEl.setText(`Параметры / Parameters: ${String(error)}`); }
  }
}
