import {readFileSync,existsSync} from 'node:fs';
import {expect,test} from 'vitest';
import {readParameters,updateParameter,parameterInput} from '../src/parameters';
import {addHack,hasHack} from '../src/hacks';
import {scopeLiveExample} from '../src/live-example-css';
const directory=new URL('../../content/atlas/! hacks/text-dropcap/',import.meta.url);
const css=readFileSync(new URL('recipe.css',directory),'utf8');
const spec=JSON.parse(readFileSync(new URL('hack.json',directory),'utf8'));
const hack={id:'text-dropcap',title:'Буквица',path:'atlas/! hacks/text-dropcap/text-dropcap.md',spec,css};
test('one drop cap supports every height in both automatic rendering branches',()=>{
 const [p]=readParameters(css);
 for(const height of ['2','3','4','5','6']) {
  const updated=updateParameter(css,p.variable,height);
  expect(parameterInput(readParameters(updated)[0])).toBe(height);
  const scoped=scopeLiveExample(updated,'hacksidian-live-dropcap');
  expect(scoped).toContain(`--hacksidian-dropcap-lines: ${height}`);
  expect(scoped).toContain('initial-letter: var(--hacksidian-dropcap-lines)');
  expect(scoped).toContain('font-size: calc(1em * var(--hacksidian-dropcap-lines) * 1.333333)');
 }
 for(const input of ['1','7','2.5']) expect(()=>updateParameter(css,p.variable,input)).toThrow();
 expect(existsSync(new URL('../text-initial-letter/hack.json',directory))).toBe(false);
});
test('applying the merged drop cap replaces the old technique without touching neighboring styles',()=>{
 const style={format:1 as const,modules:[{id:'g-text',component:'text',css:'/* keep before */\n/* hacksidian:hack:text-initial-letter:start */\np {initial-letter:3}\n/* hacksidian:hack:text-initial-letter:end */\n/* keep after */'},{id:'g-link',component:'link',css:'a {color:red}'}]};
 const result=addHack(style,hack);
 expect(result.changed).toBe(true);
 expect(hasHack(result.style,'text-initial-letter')).toBe(false);
 expect(hasHack(result.style,'text-dropcap')).toBe(true);
 expect(hasHack(style,'text-initial-letter')).toBe(true);
 expect(result.style.modules[0].css).toContain('/* keep before */');
 expect(result.style.modules[0].css).toContain('/* keep after */');
 expect(result.style.modules[1]).toEqual(style.modules[1]);
 expect(addHack(result.style,hack).changed).toBe(false);
});
