import { Component, MarkdownRenderChild, Plugin } from 'obsidian';
import type { FavouriteControls } from './favourites';
import { belongsToCategory } from './category-examples';
import { parsePaletteInfo, type PaletteInfo } from './palette';
import { PaletteExample } from './palette-example';
import { TechniqueBlock } from './source-blocks';

type Entry = {path: string; directory: string; info: PaletteInfo};
export class PaletteGallery extends MarkdownRenderChild {
  private stopped = false;
  private epoch = 0;
  private renderOwner?: Component;
  constructor(el: HTMLElement, private plugin: Plugin, private sourcePath: string, private controls?: FavouriteControls) {super(el);}
  onload(): void {
    this.registerEvent(this.plugin.app.metadataCache.on('resolved',()=>void this.render()));
    this.registerEvent(this.plugin.app.vault.on('modify',file=>{if (/\/palette\.json$/.test(file.path)) void this.render();}));
    void this.render();
  }
  onunload(): void {this.stopped=true;this.epoch++;}
  private async render(): Promise<void> {
    const epoch=++this.epoch;
    try {
      const root=this.sourcePath.match(/^(.*(?:^|\/)atlas)\//)?.[1];if(!root)throw new Error('Некорректный путь атласа');
      const files=this.plugin.app.vault.getMarkdownFiles().filter(f=>belongsToCategory(f.path,root,'palette',this.plugin.app.metadataCache.getFileCache(f)?.frontmatter||{}));
      const adapter=this.plugin.app.vault.adapter;
      const entries: Entry[]=await Promise.all(files.map(async file=>{
        const directory=file.path.slice(0,file.path.lastIndexOf('/'));
        const info=parsePaletteInfo(await adapter.read(`${directory}/palette.json`));
        return {path:file.path,directory,info};
      }));
      entries.sort((a,b)=>a.info.family.localeCompare(b.info.family)||(a.info.mode === b.info.mode ? 0 : a.info.mode === 'light' ? -1 : 1)||a.info.variant.localeCompare(b.info.variant));
      if(this.stopped||epoch!==this.epoch)return;
      if(this.renderOwner)this.removeChild(this.renderOwner);
      const owner=new Component();this.renderOwner=owner;this.addChild(owner);this.containerEl.empty();
      if(!entries.length){this.containerEl.createEl('p',{text:'Палитры ещё индексируются.'});return;}
      for (const familyId of new Set(entries.map(entry => entry.info.familyId))) {
        const family = entries.filter(entry => entry.info.familyId === familyId);
        this.containerEl.createEl('h2', {text: family[0].info.family});
        for (const entry of family) {
          const section = this.containerEl.createEl('section', {
            cls: 'hacksidian-category-example is-loaded',
            attr: {'aria-label': `${entry.info.family} — ${entry.info.variant}`, 'data-palette-mode': entry.info.mode},
          });
          owner.addChild(new TechniqueBlock(section.createDiv(), this.plugin, entry.directory, 'id', entry.path, this.controls, true));
          owner.addChild(new PaletteExample(section.createDiv(), this.plugin, entry.directory));
        }
      }
    }catch(e){if(!this.stopped&&epoch===this.epoch)this.containerEl.setText(`Не удалось показать палитры: ${String(e)}`);}
  }
}
