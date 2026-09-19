import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {readParameters,parameterValue,updateParameter} from '../src/parameters';
import {applyParameterDecision} from '../src/parameter-chat';
import {compileHack} from '../src/hacks';
const directory=new URL('../../content/atlas/! hacks/semantic-palette-custom/',import.meta.url);
const css=readFileSync(new URL('recipe.css',directory),'utf8');
it('exposes exactly the eight named Obsidian colors as validated color inputs',()=>{
 const params=readParameters(css);
 expect(params.map(p=>p.variable)).toEqual(['red','orange','yellow','green','cyan','blue','purple','pink'].map(c=>'--hacksidian-semantic-'+c));
 for(const p of params){expect(p.type).toBe('color');expect(parameterValue(p,p.default)).toBe(p.default);}
 expect(compileHack({id:'semantic-palette-custom',title:'Palette',path:'card.md',spec:JSON.parse(readFileSync(new URL('hack.json',directory),'utf8')),css})).toBe(css);
});
it('saves a real CSS color rather than a quoted string and shares validation with chat',()=>{
 const p=readParameters(css)[0];
 const result=applyParameterDecision(css,{action:'update_parameters',message:'',changes:[{variable:p.variable,input:'#AABBCC'}]});
 expect(readParameters(result.css)[0].value).toBe('#aabbcc');
 expect(result.css).toContain('--color-red: var(--hacksidian-semantic-red)');
 for(const input of ['red','"#aabbcc"','#fff','transparent','#abcdef; color:red'])expect(()=>parameterValue(p,input)).toThrow();
 expect(css.replace('#e93147;', '#aabbcc;')).toBe(result.css);
});
