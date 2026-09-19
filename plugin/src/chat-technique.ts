import { MarkdownRenderChild, Notice, setIcon } from 'obsidian';
import type CallMeRedPlugin from './main';
import { LiveExample } from './live-example';

/** Chat presentation shares the card's live renderer, parameter editor and state services. */
export class ChatTechnique extends MarkdownRenderChild {
  constructor(el: HTMLElement, private heading: HTMLElement, private plugin: CallMeRedPlugin, private path: string) { super(el); }
  onload(): void {
    const controls = this.plugin.techniqueControls(), en = controls.english();
    const star = this.heading.createEl('button', { cls: 'hacksidian-favourite-toggle' });
    const updateStar = () => {
      const saved = controls.store.has(this.path);
      setIcon(star, 'star'); star.setAttribute('aria-pressed', String(saved));
      const label = saved ? (en ? 'Remove from favourites' : 'Убрать из избранного') : (en ? 'Add to favourites' : 'В избранное');
      star.setAttribute('aria-label', label); star.title = label;
    };
    this.register(controls.store.subscribe(updateStar)); updateStar();
    this.registerDomEvent(star, 'click', () => {
      star.disabled = true;
      void controls.store.toggle(this.path).catch(e => new Notice(String(e))).finally(() => { star.disabled = false; });
    });
    const apply = this.heading.createEl('button', { cls: 'hacksidian-apply-toggle' });
    let installed = false, busy = false, stopped = false, epoch = 0;
    this.register(() => { stopped = true; epoch++; });
    const refresh = async () => {
      const request = ++epoch;
      const state = await controls.technique!.get(this.path);
      if (stopped || request !== epoch) return;
      installed = !!state?.installed;
      apply.setText(installed ? (en ? 'Disable' : 'Выключить') : (en ? 'Enable' : 'Включить'));
      apply.setAttribute('aria-pressed', String(installed));
      apply.disabled = busy || !state?.hasCss;
    };
    const update = () => { void refresh().catch(e => { if (!stopped) { apply.disabled = true; apply.title = String(e); } }); };
    this.register(controls.technique!.subscribe(update)); update();
    this.registerDomEvent(apply, 'click', () => {
      busy = true; apply.disabled = true;
      void controls.technique!.set(this.path, !installed).catch(e => new Notice(String(e))).finally(() => { busy = false; update(); });
    });
    this.addChild(new LiveExample(this.containerEl, this.plugin, this.path.slice(0, this.path.lastIndexOf('/')), en ? 'en' : 'ru', controls));
  }
}
