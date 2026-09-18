import {expect, test} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import {addHack, hasHack, removeHack, type HackContext} from '../src/hacks';
import {paletteVariables, parsePaletteInfo, contrastRatio} from '../src/palette';
import {liveExampleIssue} from '../src/live-example-css';
const root=path.resolve(import.meta.dirname,'../../content/atlas/! hacks');
const ids=fs.readdirSync(root).filter(id=>id.startsWith('palette-'));
const load=(id:string):HackContext=>({id,title:id,path:`atlas/! hacks/${id}/${id}.md`,spec:JSON.parse(fs.readFileSync(path.join(root,id,'hack.json'),'utf8')),css:fs.readFileSync(path.join(root,id,'recipe.css'),'utf8')});
const empty=()=>({format:1 as const,modules:[{id:'g-palette',component:'palette',css:'/* user CSS */\n.user { color: red; }\n'},{id:'g-text',component:'text',css:'untouched'}]});
test('every approved source has a standalone recipe and isolated preview contract',()=>{
 expect(ids).toHaveLength(26);const families=new Set<string>();
 for(const id of ids){const hack=load(id);const info=parsePaletteInfo(fs.readFileSync(path.join(root,id,'palette.json'),'utf8'));families.add(info.familyId);const vars=paletteVariables(hack.css,info.mode);
  expect(hack.spec.target).toBe('g-palette');expect(hack.spec.exclusiveGroup).toBe('palette-'+info.mode);
  expect(Object.keys(vars).filter(k=>k.startsWith('--color-base-'))).toHaveLength(12);
  expect(Object.keys(vars).some(k=>/^--(?:accent-|color-accent|mono-|font-|h[1-6]-)/.test(k))).toBe(false);
  expect(liveExampleIssue('palette','',hack.css)).toBeNull();
  expect(fs.readFileSync(path.join(root,id,id+'.md'),'utf8')).toContain('category: palette');
  // Every var() resolves locally or to a documented external native role; no private variables.
  postcss.parse(hack.css).walkDecls(d=>{for(const m of d.value.matchAll(/var\((--[\w-]+)/g))expect(vars[m[1]],`${id}: ${m[1]}`).toBeDefined();});
 }
 expect(families.size).toBe(12);
});
test('switching a light palette preserves dark palette, other snippets and handwritten CSS',()=>{
 const first=load('palette-flexoki-1'),second=load('palette-solarized-1'),dark=load('palette-flexoki-2');
 let s=addHack(empty(),first).style;s=addHack(s,dark).style;const before=s;
 const result=addHack(s,second);s=result.style;
 expect(result.changed).toBe(true);expect(hasHack(s,first.id)).toBe(false);expect(hasHack(s,second.id)).toBe(true);expect(hasHack(s,dark.id)).toBe(true);
 expect(hasHack(before,first.id)).toBe(true);expect(s.modules[0].css).toContain('.user { color: red; }');expect(s.modules[1].css).toBe('untouched');
 expect(addHack(s,second).changed).toBe(false);
 const removed=removeHack(s,second.id).style;expect(hasHack(removed,dark.id)).toBe(true);expect(hasHack(removed,second.id)).toBe(false);
});
test('corrupt exclusive blocks fail without partial replacement',()=>{
 const s=empty();s.modules[0].css+='/* hacksidian:hack:broken:start */\n/* hacksidian:exclusive:palette-light */\n';
 const before=JSON.stringify(s);expect(()=>addHack(s,load('palette-flexoki-1'))).toThrow();expect(JSON.stringify(s)).toBe(before);
});
test('palette preview refuses global selectors, non-color properties, at-rules and resource loads',()=>{
 const css=load('palette-flexoki-1').css;
 for(const bad of [css.replace('body.theme-light','body'),css+' @import "https://example.com";',css.replace('--text-normal:', 'font-family:'),css.replace('--text-normal: #100f0f','--text-normal: url(https://example.com)')])expect(()=>paletteVariables(bad,'light')).toThrow();
});
test('contrast ratio has known black/white and identity endpoints',()=>{
 expect(contrastRatio([0,0,0],[255,255,255])).toBe(21);
 expect(contrastRatio([34,56,78],[34,56,78])).toBe(1);
});
