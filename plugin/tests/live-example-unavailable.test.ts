import {expect,it,vi} from 'vitest';
vi.mock('obsidian',()=>({MarkdownRenderChild:class {constructor(public containerEl:any){}},Component:class {},Plugin:class {},TFile:class {}}));
import {LiveExample} from '../src/live-example';
it.each(['metadata','interface','image'])('explains unavailable %s examples without reading a missing markdown file',async group=>{
 const read=vi.fn(async(path:string)=>{
  if(path.endsWith('hack.json'))return JSON.stringify({group});
  throw Error('ENOENT');
 });
 const preview={empty:vi.fn(),createEl:vi.fn()};
 const example=new LiveExample({} as any,{app:{vault:{adapter:{read,exists:async()=>false}}}} as any,'atlas/! hacks/test','ru') as any;
 example.previewEl=preview;
 await example.render();
 expect(read).toHaveBeenCalledTimes(1);
 expect(preview.createEl.mock.calls[0][1].text).not.toContain('ENOENT');
 expect(preview.createEl.mock.calls[0][1].text).toContain(group==='image'?'нет встроенного примера':'изменяет интерфейс');
});
