export class ChatTechnique {
 private timer:any;
 constructor(private el:HTMLElement){}
 onload(){this.el.textContent='Пример загружается…';this.timer=setTimeout(()=>{this.el.innerHTML='<div style="height:210px;background:#e6e8ff;padding:12px">Загруженный живой пример</div>'},350)}
 onunload(){clearTimeout(this.timer)}
}
