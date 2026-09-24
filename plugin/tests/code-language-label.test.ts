import {expect, test} from 'vitest';
import {codeLanguageLabel} from '../src/code-language-label';
test('extracts one language independent of class order and loading state',()=>{
 expect(codeLanguageLabel('language-sh is-loaded')).toBe('Shell');
 expect(codeLanguageLabel('is-loaded custom language-cpp')).toBe('C++');
 expect(codeLanguageLabel('language-rust is-loaded')).toBe('rust');
 expect(codeLanguageLabel('is-loaded custom')).toBe('');
});

test('language attribute is synchronized on code and pre, including removal', async () => {
 const {prepareCodeLanguageLabels} = await import('../src/code-language-label');
 const makeNode = () => ({
  attrs: new Map<string,string>(),
  setAttribute(key:string,value:string){this.attrs.set(key,value);},
  removeAttribute(key:string){this.attrs.delete(key);},
 });
 const pre=makeNode();
 const code={...makeNode(), className:'language-rust', parentElement:pre};
 const root={querySelectorAll:()=>[code],matches:()=>false} as unknown as HTMLElement;
 prepareCodeLanguageLabels(root);
 expect(pre.attrs.get('data-hacksidian-language')).toBe('rust');
 expect(code.attrs.get('data-hacksidian-language')).toBe('rust');
 code.className='is-loaded';
 prepareCodeLanguageLabels(root);
 expect(pre.attrs.has('data-hacksidian-language')).toBe(false);
 expect(code.attrs.has('data-hacksidian-language')).toBe(false);
});

test('language label and shell prompt occupy different pseudo-elements', async () => {
 const {readFileSync}=await import('node:fs');
 const {default:postcss}=await import('postcss');
 const read=(id:string)=>readFileSync(new URL(`../../content/atlas/! hacks/${id}/recipe.css`, import.meta.url),'utf8');
 const label=postcss.parse(read('code-language'));
 let labels=0;
 label.walkRules(rule=>{
  if(!rule.selector.endsWith('::before'))return;
  labels++;
  expect(rule.selector).toMatch(/ pre(?:\[data-hacksidian-language\]|:has\(> code:is\([^)]*\)\))::before$/);
 });
 expect(labels).toBe(15);
 expect(read('code-e054')).toContain('pre > code:is(.language-sh,.language-bash,.language-shell)[class]::before');
 expect(read('code-e054')).toContain('@container style(--hacksidian-code-language-color)');
});


test('shell prompt moves inside the first source-line wrapper when wrapping is enabled', async () => {
 const {readFileSync}=await import('node:fs');
 const {default:postcss}=await import('postcss');
 const css=postcss.parse(readFileSync(new URL('../../content/atlas/! hacks/code-e054/recipe.css', import.meta.url),'utf8'));
 let inlinePrompt=false, outsidePromptDisabled=false;
 css.walkRules(rule=>{
  if(rule.selector.includes(' > .hacksidian-source-line:first-child::before')) {
   const values=Object.fromEntries(rule.nodes.filter(n=>n.type==='decl').map(d=>[d.prop,d.value]));
   expect(values.content).toBe('"$ "');
   expect(values.display).toBe('inline');
   inlinePrompt=true;
  }
  if(rule.selector.endsWith(':has(> .hacksidian-source-line)::before')) {
   const values=Object.fromEntries(rule.nodes.filter(n=>n.type==='decl').map(d=>[d.prop,d.value]));
   expect(values.content).toBe('none');
   expect(values.display).toBe('none');
   outsidePromptDisabled=true;
  }
 });
 expect(inlinePrompt && outsidePromptDisabled).toBe(true);
});
