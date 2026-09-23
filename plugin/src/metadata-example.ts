import { Component } from 'obsidian';
import { metadataDocument } from './metadata-model';
import { resolveParameterVariants } from './parameter-variants';

export class MetadataExample extends Component {
  private frame!: HTMLIFrameElement;
  private style?: HTMLStyleElement;
  private cleanFrame?: () => void;
  constructor(private el: HTMLElement, private model: string, private css: string, private enabled: boolean, private ru: boolean) { super(); }
  onload(): void {
    this.el.createEl('small',{text:this.ru ? 'HTML-модель · значения и фокус можно менять внутри примера' : 'HTML simulation · edit values and focus fields inside this example'});
    const viewport=this.el.createDiv({cls:'hacksidian-live-viewport'});
    this.frame=viewport.createEl('iframe',{cls:'hacksidian-metadata-model',attr:{title:this.ru?'Демонстрация свойств заметки':'Properties simulation',sandbox:'allow-same-origin'}});
    const computed=getComputedStyle(this.el),tokens:Record<string,string>={};
    for(let i=0;i<computed.length;i++){const key=computed[i];if(key.startsWith('--'))tokens[key]=computed.getPropertyValue(key);}
    this.registerDomEvent(this.frame,'load',()=>{
      this.cleanFrame?.();
      const doc=this.frame.contentDocument;if(!doc)return;
      this.style=doc.createElement('style');doc.head.appendChild(this.style);this.update(this.enabled);
      const click=(event:MouseEvent)=>{
        const el=event.target as Element;
        if(el.closest('a'))event.preventDefault();
        const line=el.closest('.cm-line');
        if(line){doc.querySelectorAll('.cm-active').forEach(n=>n.classList.remove('cm-active'));line.classList.add('cm-active');}
      };
      doc.addEventListener('click',click);
      // Fit the sample initially and when details, text or responsive layout change.
      const resize=()=>{this.frame.style.height=Math.min(560,Math.max(140,doc.body.scrollHeight+8))+'px';};
      const observer=new ResizeObserver(resize);observer.observe(doc.body);resize();
      this.cleanFrame=()=>{observer.disconnect();doc.removeEventListener('click',click);};
    });
    this.frame.srcdoc=metadataDocument(this.model,'',tokens);
  }
  update(enabled:boolean): void {this.enabled=enabled;if(this.style)this.style.textContent=enabled?resolveParameterVariants(this.css):'';}
  onunload(): void {this.cleanFrame?.();this.el.empty();}
}
