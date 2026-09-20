export class ItemView {
 contentEl=document.querySelector('#chat') as HTMLElement;
 addChild(c:any){c.onload?.()} removeChild(c:any){c.onunload?.()}
}
export class Notice {constructor(public text:string){}}
