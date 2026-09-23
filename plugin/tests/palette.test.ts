import {expect, test} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import {addHack, hasHack, removeHack, compileHack} from '../src/hacks';
import {paletteVariables, parsePaletteInfo, contrastRatio} from '../src/palette';
import {liveExampleIssue} from '../src/live-example-css';
import {readParameters,updateParameter} from '../src/parameters';
const root=path.resolve(import.meta.dirname,'../../content/atlas/! hacks/palette');
const css=fs.readFileSync(path.join(root,'recipe.css'),'utf8');
const spec=JSON.parse(fs.readFileSync(path.join(root,'hack.json'),'utf8'));
const info=fs.readFileSync(path.join(root,'palette.json'),'utf8');
const hack=(css:string)=>({id:'palette',title:'Палитра',path:'atlas/! hacks/palette/palette.md',spec,css});
const empty=()=>({format:1 as const,modules:[{id:'g-palette',component:'palette',css:'/* user CSS */\n.user { color: red; }\n'},{id:'g-text',component:'text',css:'untouched'}]});
test('one recipe contains eleven light palettes with the same native role coverage',()=>{
 const p=readParameters(css)[0];expect(p.options).toHaveLength(11);const families=new Set();let shape:string[]|undefined;
 for(const option of p.options){
  const selected=updateParameter(css,p.variable,option.value),meta=parsePaletteInfo(info,selected),vars=paletteVariables(selected,'light');families.add(meta.familyId);
  expect(meta.mode).toBe('light');
  const names=Object.keys(vars).sort();if(shape)expect(names).toEqual(shape);else shape=names;
  expect(names.some(k=>/-(?:rgb|hsl)$/.test(k))).toBe(false);
  expect(names.filter(k=>k.startsWith('--color-base-'))).toHaveLength(12);
  expect(names.some(k=>/^--(?:accent-|color-accent|mono-|font-|h[1-6]-)/.test(k))).toBe(false);
  expect(liveExampleIssue('palette','',selected)).toBeNull();
  postcss.parse(compileHack(hack(selected))).walkDecls(d=>{for(const m of d.value.matchAll(/var\((--[\w-]+)/g))if (!/^--hacksidian-semantic-(red|orange|yellow|green|cyan|blue|purple|pink)$/.test(m[1])) expect(vars[m[1]],m[1]).toBeDefined();});
 }
 expect(families.size).toBe(10);
});
test('switching palette updates one owned block and preserves other snippets and manual CSS',()=>{
 const p=readParameters(css)[0];const first=addHack(empty(),hack(css)).style;
 const next=addHack(first,hack(updateParameter(css,p.variable,'solarized-1'))).style;
 expect(next.modules[0].css.match(/hacksidian:hack:palette:start/g)).toHaveLength(1);
 expect(next.modules[0].css).toContain('.user { color: red; }');expect(next.modules[1].css).toBe('untouched');
 expect(addHack(next,hack(updateParameter(css,p.variable,'solarized-1'))).changed).toBe(false);
 expect(hasHack(removeHack(next,'palette').style,'palette')).toBe(false);
});
test('palette preview rejects global scopes, dark mode, non-color properties and resource loads',()=>{
 const compiled=compileHack(hack(css));
 for(const bad of [compiled.replace('body.theme-light','body'),compiled.replace('body.theme-light','body.theme-dark'),compiled+' @import "https://example.com";',compiled.replace('--text-normal:', 'font-family:'),compiled.replace('--text-normal: var(--hacksidian-palette-text-normal)','--text-normal: url(https://example.com)')])expect(()=>paletteVariables(bad,'light')).toThrow();
 expect(()=>parsePaletteInfo(JSON.stringify({format:1,mode:'dark'}))).toThrow();
});
test('contrast ratio has known endpoints',()=>{expect(contrastRatio([0,0,0],[255,255,255])).toBe(21);expect(contrastRatio([34,56,78],[34,56,78])).toBe(1);});

test('each palette respects manual semantic colors and updating removes obsolete RGB declarations',()=>{
 const colors=['red','orange','yellow','green','cyan','blue','purple','pink'];
 const p=readParameters(css)[0];
 for(const option of p.options){
  const vars=paletteVariables(updateParameter(css,p.variable,option.value),'light');
  for(const color of colors)expect(vars['--color-'+color]).toBe(`var(--hacksidian-semantic-${color}, var(--hacksidian-palette-color-${color}))`);
 }
 const prior=addHack(empty(),hack(css)).style;
 prior.modules[0].css=prior.modules[0].css.replace('body.theme-light {','body.theme-light {\n --color-red-rgb: 1, 2, 3;\n --text-highlight-bg-rgb: 4, 5, 6;');
 const updated=addHack(prior,hack(css)).style;
 expect(updated.modules[0].css).not.toMatch(/--[\w-]+-(?:rgb|hsl)\b/);
 expect(updated.modules[0].css).toContain('.user { color: red; }');
});
