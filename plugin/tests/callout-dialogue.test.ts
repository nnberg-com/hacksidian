import {test,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {readParameters,updateParameter} from '../src/parameters';
import {scopeLiveExample} from '../src/live-example-css';
const css=readFileSync(new URL('../../content/atlas/! hacks/composition-dialogue/recipe.css',import.meta.url),'utf8');
test('dialogue exposes semantic palette choices with cyan default and a scoped live preview',()=>{
 const [p]=readParameters(css);
 expect(p.type).toBe('select');expect(p.default).toBe('var(--color-cyan)');
 expect(p.options.map(o=>o.value)).toEqual(['red','orange','yellow','green','cyan','blue','purple','pink'].map(c=>`var(--color-${c})`));
 for(const option of p.options){const changed=updateParameter(css,p.variable,option.value);expect(readParameters(changed)[0].value).toBe(option.value);expect(()=>scopeLiveExample(changed,'hacksidian-live-dialogue')).not.toThrow();}
 expect(()=>updateParameter(css,p.variable,'#123456')).toThrow();
});
