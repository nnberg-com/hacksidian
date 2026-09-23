import { parameterExample } from './parameter-variants';
import { Component, MarkdownRenderChild, Plugin } from 'obsidian';
import { paletteVariables, parsePaletteInfo, contrastRatio, type PaletteInfo } from './palette';
import { PALETTE_TEMPLATE } from './palette-template';
import { previewState } from './preview-state';

export class PaletteExample extends MarkdownRenderChild {
  private stopped = false;
  private epoch = 0;
  private owner?: Component;
  constructor(el: HTMLElement, private plugin: Plugin, private directory: string, private values?: Record<string, string>) { super(el); }
  onload(): void {
    this.registerEvent(this.plugin.app.vault.on('modify', file => {
      if (file.path === `${this.directory}/palette.json` || file.path === `${this.directory}/recipe.css`) void this.render();
    }));
    void this.render();
  }
  onunload(): void { this.stopped = true; this.epoch++; }
  private async render(): Promise<void> {
    const epoch = ++this.epoch;
    try {
      const adapter = this.plugin.app.vault.adapter;
      const [raw, rawCss] = await Promise.all([adapter.read(`${this.directory}/palette.json`), adapter.read(`${this.directory}/recipe.css`)]);
      const css = parameterExample(rawCss, this.values ?? {});
      const info = parsePaletteInfo(raw, css), values = paletteVariables(css, info.mode);
      if (this.stopped || epoch !== this.epoch) return;
      if (this.owner) this.removeChild(this.owner);
      const owner = new Component(); this.owner = owner; this.addChild(owner);
      this.containerEl.empty();
      mountPaletteExample(this.containerEl, info, values, owner, this.directory);
    } catch (e) { if (!this.stopped && epoch === this.epoch) this.containerEl.setText(`Не удалось показать палитру: ${String(e)}`); }
  }
}

/** Shadow boundary isolates palette models from the active theme and other examples. */
export function mountPaletteExample(el: HTMLElement, info: PaletteInfo, values: Record<string, string>, owner: Component, directory: string): void {
  const doc = el.ownerDocument;
  const controls = el.createDiv({cls: 'hacksidian-palette-controls'});
  const label = controls.createEl('label', {text: 'Акцент в примере '});
  const accent = label.createEl('select');
  accent.createEl('option', {value: 'native', text: 'Из настроек Obsidian'});
  accent.createEl('option', {value: 'author', text: 'Из палитры · только пример'});
  const description = el.createEl('p', {cls: 'setting-item-description', text: info.note});
  description.createEl('a', {text: ' Первоисточник ↗', href: info.source});
  el.createEl('p', {cls: 'setting-item-description', text: 'Светлый режим. Включение сохраняет ваш акцент. Выбор акцента здесь меняет только пример.'});
  const host = el.createDiv({cls: 'hacksidian-palette-model'});
  const shadow = host.attachShadow({mode: 'open'});
  shadow.innerHTML = PALETTE_TEMPLATE;
  const sample = shadow.querySelector<HTMLElement>('.workspace')!;
  const ratios = el.createDiv({cls: 'hacksidian-palette-ratios'});
  const swatches = el.createDiv({cls: 'hacksidian-palette-swatches'});
  const details = el.createEl('details');
  details.createEl('summary', {text: 'Соответствие переменным Obsidian'});
  const table = details.createEl('table', {cls: 'hacksidian-palette-mapping'});
  const head = table.createEl('thead').createEl('tr');
  for (const title of ['Переменная', 'Значение', 'Источник / адаптация']) head.createEl('th', {text: title});
  const body = table.createEl('tbody');
  const canvas = doc.createElement('canvas');canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', {willReadFrequently: true});
  const rgb = (color: string): number[] => {
    if (!context) return [0,0,0];
    context.clearRect(0,0,1,1); context.fillStyle = color; context.fillRect(0,0,1,1);
    return Array.from(context.getImageData(0,0,1,1).data).slice(0,3);
  };
  const state = previewState(el, directory);
  const update = () => {
    const native = doc.defaultView!.getComputedStyle(doc.body);
    sample.removeAttribute('style');
    // Custom properties inherit across Shadow DOM; compare the source palette,
    // not the manual semantic overrides currently active on the host page.
    if (state.enabled) for (const color of ['red','orange','yellow','green','cyan','blue','purple','pink']) {
      sample.style.setProperty(`--hacksidian-semantic-${color}`, 'initial');
    }
    const selected = state.enabled ? values : Object.fromEntries(Object.keys(values).map(k => [k, native.getPropertyValue(k)]));
    for (const [key, value] of Object.entries(selected)) sample.style.setProperty(key, value);
    // These aliases are explicitly local. Installed recipes leave Obsidian's accent logic intact.
    sample.style.setProperty('--color-accent', state.enabled && accent.value === 'author' ? info.accent : native.getPropertyValue('--color-accent').trim());
    for (const [key, value] of Object.entries({
      '--text-accent':'var(--color-accent)', '--text-accent-hover':'color-mix(in oklch, var(--color-accent) 80%, var(--text-normal))',
      '--interactive-accent':'var(--color-accent)', '--interactive-accent-hover':'var(--text-accent-hover)',
      '--text-selection':'color-mix(in oklch, var(--color-accent) 25%, transparent)',
    })) sample.style.setProperty(key,value);
    const computed = doc.defaultView!.getComputedStyle(sample);
    const a = rgb(computed.getPropertyValue('--color-accent'));
    sample.style.setProperty('--text-on-accent', contrastRatio(a,[255,255,255]) > contrastRatio(a,[0,0,0]) ? '#fff' : '#000');
    shadow.querySelector('#op-mode')!.textContent = state.enabled ? 'Светлый режим' : 'Текущее оформление';
    const bg = rgb(computed.getPropertyValue('--background-primary'));
    ratios.empty();
    for (const [title,key] of [['Основной текст','--text-normal'],['Приглушённый','--text-muted'],['Ссылка','--color-accent']]) {
      const ratio = contrastRatio(rgb(computed.getPropertyValue(key)),bg);
      ratios.createSpan({text: `${title}: ${ratio.toFixed(2)}:1${ratio < 4.5 ? ' · ниже 4.5:1' : ''}`});
    }
    swatches.empty();
    for (const color of ['red','orange','yellow','green','cyan','blue','purple','pink']) {
      const chip = swatches.createDiv();chip.createDiv({cls:'hacksidian-palette-swatch'}).style.background = computed.getPropertyValue('--color-'+color);chip.createSpan({text:color});
    }
    body.empty();
    for (const [key,value] of Object.entries(values)) {
      const row = body.createEl('tr');
      for (const text of [key,value,info.refs[key.slice(2)] || (value.includes('color-mix') ? 'Смешение · адаптация Hacksidian' : value.startsWith('var(') ? 'Связь штатных ролей' : 'Адаптация Hacksidian')]) row.createEl('td',{text});
    }
  };
  owner.registerDomEvent(accent,'change',update);
  const observer = new MutationObserver(update);observer.observe(doc.body,{attributes:true,attributeFilter:['class','style']});owner.register(()=>observer.disconnect());
  owner.register(state.subscribe(update));update();
  const save = shadow.querySelector<HTMLButtonElement>('#op-save')!;
  owner.registerDomEvent(save,'click',()=>{shadow.querySelector('#op-saved')!.textContent='Сохранено · демонстрация';});
  owner.registerDomEvent(shadow.querySelector<HTMLButtonElement>('#op-more')!,'click',()=>{const caption=shadow.querySelector<HTMLElement>('#op-caption')!;caption.hidden=!caption.hidden;});
  owner.registerDomEvent(shadow.querySelector<HTMLAnchorElement>('a')!,'click',event=>{event.preventDefault();shadow.querySelector('#op-related')!.scrollIntoView({block:'nearest'});});
}
