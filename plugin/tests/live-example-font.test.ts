import {expect,test,vi} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import * as fontkit from 'fontkit';
import {loadPreviewFont} from '../src/live-example-font';
import {liveExampleIssue} from '../src/live-example-css';
const atlas=path.resolve(import.meta.dirname,'../../content/atlas/! hacks');
test('restored font examples have attached working OpenType features and accepted live recipes',()=>{
 for(const id of ['06','07']){
  const dir=path.join(atlas,'inline-code-ex-'+id),spec=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));
  const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8'),md=fs.readFileSync(path.join(dir,'markdown.md'),'utf8');
  expect(liveExampleIssue('inline-code',md,css)).toBeNull();
  expect(fs.readFileSync(path.join(dir,'inline-code-ex-'+id+'.md'),'utf8')).toContain('```hacksidian-live');
  const font=fontkit.openSync(path.join(dir,spec.previewFont)) as fontkit.Font;
  const text=id==='06'?'!=':'0';
  const on:Record<string,boolean>=id==='06'?{calt:true,liga:true}:{zero:true},off:Record<string,boolean>=id==='06'?{calt:false,liga:false}:{zero:false};
  expect(font.layout(text,on).glyphs.map(g=>g.id)).not.toEqual(font.layout(text,off).glyphs.map(g=>g.id));
  expect(css).not.toContain('font-family');expect(css).not.toContain('nth-of-type');
 }
});
test('preview fonts are local, released on unload, and never registered after cancellation',async()=>{
 const cleanups:Array<()=>void>=[],fonts={add:vi.fn(),delete:vi.fn()};let finish!:()=>void;
 class Face {constructor(public family:string){}load(){return new Promise<void>(resolve=>{finish=resolve;});}}
 const sample={id:'hacksidian-live-font-test',ownerDocument:{fonts,defaultView:{FontFace:Face}},style:{setProperty:vi.fn()}} as any;
 const read=vi.fn(async()=>new ArrayBuffer(1)),owner={register:(fn:()=>void)=>cleanups.push(fn)};
 const pending=loadPreviewFont(sample,'assets/JetBrainsMono-Regular.ttf',read,owner);await Promise.resolve();finish();await pending;
 expect(fonts.add).toHaveBeenCalledOnce();expect(sample.style.setProperty).toHaveBeenCalledWith('--font-monospace','"hacksidian-live-font-test-font"');cleanups.pop()!();expect(fonts.delete).toHaveBeenCalledOnce();
 fonts.add.mockClear();const cancelled=loadPreviewFont(sample,'assets/JetBrainsMono-Regular.ttf',read,owner);await Promise.resolve();cleanups.pop()!();finish();await cancelled;expect(fonts.add).not.toHaveBeenCalled();
 for(const file of ['../font.ttf','https://example.org/font.ttf','assets/../../font.ttf'])await expect(loadPreviewFont(sample,file,read,owner)).rejects.toThrow('Invalid attached');
});
