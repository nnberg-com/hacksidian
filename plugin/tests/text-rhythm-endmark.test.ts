import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
import postcss from 'postcss';
import { scopeLiveExample, liveExampleIssue } from '../src/live-example-css';
import { readParameters, updateParameter, parameterInput } from '../src/parameters';
const read=(id:string)=>readFileSync(new URL(`../../content/atlas/! hacks/${id}/recipe.css`,import.meta.url),'utf8');
test('rhythm changes only adjoining block margins and remains locally scopeable',()=>{
 const css=read('text-rhythm');
 postcss.parse(css).walkDecls(d=>{expect(['margin-block-start','margin-block-end']).toContain(d.prop);});
 expect(scopeLiveExample(css,'hacksidian-live-rhythm')).toContain('#hacksidian-live-rhythm');
 expect(liveExampleIssue('text','Example',css)).toBeNull();
});
test('end mark round-trips punctuation, quotes, and an empty value without injecting rules',()=>{
 const css=read('text-endmark'),[p]=readParameters(css);
 for(const value of ['◆','■','✦','***','','"; color:red;']) {
  const next=updateParameter(css,p.variable,value);
  expect(parameterInput(readParameters(next)[0])).toBe(value);
  expect(postcss.parse(next).nodes.length).toBe(postcss.parse(css).nodes.length);
  expect(scopeLiveExample(next,'hacksidian-live-endmark')).toContain('content: " " var(--hacksidian-endmark-symbol)');
 }
});
test.each(['text-book-composition','text-letter-composition','text-measure'])('%s accepts page sizing in its live example',id=>{
 expect(liveExampleIssue('text','Example',read(id))).toBeNull();
});
