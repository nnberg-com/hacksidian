import { ParameterControls } from './parameter-controls';
import { Component, MarkdownRenderChild, Plugin } from 'obsidian';
import { TechniqueBlock } from './source-blocks';
import { LiveExample } from './live-example';
import { liveExampleIssue } from './live-example-css';
import type { FavouriteControls } from './favourites';
export function belongsToCategory(path: string, root: string, category: string, meta: Record<string, unknown>): boolean {
  const parts = path.split('/'), filename = parts.pop(), folder = parts.pop();
  return path.startsWith(`${root}/! hacks/`) && filename === `${folder}.md` && meta.category === category && Array.isArray(meta.tags) && meta.tags.includes('hacksidian_technique');
}
export class CategoryExamples extends MarkdownRenderChild {
  private owner?: Component;
  private timer?: ReturnType<typeof setTimeout>;
  private signature = '';
  private stopped = false;
  private epoch = 0;
  constructor(el: HTMLElement, private plugin: Plugin, private sourcePath: string, private category: string, private controls?: FavouriteControls) { super(el); }
  onload(): void {
    const refresh = () => { clearTimeout(this.timer); this.timer = setTimeout(() => void this.render(), 150); };
    this.registerEvent(this.plugin.app.metadataCache.on('changed', refresh));
    this.registerEvent(this.plugin.app.metadataCache.on('resolved', refresh));
    this.registerEvent(this.plugin.app.vault.on('delete', refresh));
    this.registerEvent(this.plugin.app.vault.on('rename', refresh));
    void this.render();
  }
  onunload(): void { this.stopped = true; this.epoch++; clearTimeout(this.timer); }
  private async render(): Promise<void> {
    const epoch = this.epoch + 1;
    try {
      const root = this.sourcePath.match(/^(.*(?:^|\/)atlas)\//)?.[1];
      if (!root || !/^[a-z0-9][a-z0-9-]*$/.test(this.category)) throw new Error('Некорректная категория');
      const cards = this.plugin.app.vault.getMarkdownFiles().map(file => ({file, meta: this.plugin.app.metadataCache.getFileCache(file)?.frontmatter || {}}))
        .filter(({file,meta}) => belongsToCategory(file.path,root,this.category,meta))
        .sort((a,b)=>String(a.meta.title||a.file.basename).localeCompare(String(b.meta.title||b.file.basename),'ru'));
      const signature = JSON.stringify(cards.map(({file,meta})=>[file.path,meta.title]));
      if (this.stopped || signature === this.signature) return;
      this.epoch = epoch;
      this.signature = signature;
      if (this.owner) this.removeChild(this.owner);
      const owner = new Component(); this.owner = owner; this.addChild(owner); this.containerEl.empty();
      if (!cards.length) { this.containerEl.createEl('p',{text:'В этой категории пока нет сниппетов.'}); return; }
      const pending = new Map<Element, () => void>();
      const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) { pending.get(entry.target)?.(); pending.delete(entry.target); observer!.unobserve(entry.target); }
      },{rootMargin:'600px'});
      if (observer) owner.register(()=>observer.disconnect());
      for (const {file,meta} of cards) {
        const section = this.containerEl.createEl('section',{cls:'hacksidian-category-example'});
        section.createEl('p',{text:String(meta.title||file.basename)});
        const mount = async () => {
          try {
            const card = await this.plugin.app.vault.read(file);
            if (this.stopped || epoch !== this.epoch) return;
            section.empty(); section.addClass('is-loaded');
            const directory = file.path.slice(0,file.path.lastIndexOf('/'));
            owner.addChild(new TechniqueBlock(section.createDiv(),this.plugin,directory,'id',file.path,this.controls,true));
            if (/^```hacksidian-live\s*$/m.test(card)) owner.addChild(new LiveExample(section.createDiv(),this.plugin,directory,'ru',this.controls));
            else {
              const adapter=this.plugin.app.vault.adapter;
              const md=await adapter.exists(`${directory}/markdown.md`) ? await adapter.read(`${directory}/markdown.md`) : '';
              const css=await adapter.read(`${directory}/recipe.css`);
              if (this.stopped || epoch !== this.epoch) return;
              const reason=liveExampleIssue(String(meta.category),md,css);
              section.createEl('p',{cls:'setting-item-description',text:`Встроенный пример недоступен. ${reason || 'Условия демонстрации описаны в карточке приёма.'}`});
              owner.addChild(new ParameterControls(section.createDiv(),this.plugin,directory,this.controls));
            }
          } catch (error) { if (!this.stopped && epoch === this.epoch) section.createEl('p',{text:String(error)}); }
        };
        if (observer) { pending.set(section,()=>void mount()); observer.observe(section); } else void mount();
      }
    } catch (error) { if (!this.stopped) this.containerEl.setText(String(error)); }
  }
}
