import {test,expect} from 'vitest';
import {compileHack,addHack,removeHack,hasHack,hackId,type HackContext} from '../src/hacks';
const hack:HackContext={id:'text-demo',title:'Demo',path:'atlas/! hacks/text-demo/text-demo.md',spec:{format:2,target:'g-text',hasCss:true},css:'/* authored CSS */\n.markdown-preview-view p { color: var(--text-accent); }\n'};
test('binds only actual tagged cards and localized descriptions',()=>{
 expect(hackId(hack.path,['hacksidian_technique'])).toBe(hack.id);
 expect(hackId(hack.path,[])).toBeNull();
 expect(hackId('atlas/! hacks/text-demo/Description.en.md',['hacksidian_technique'])).toBe(hack.id);
 expect(hackId('atlas/! hacks/text-demo/markdown.md',['hacksidian_technique'])).toBeNull();
});
test('returns authored CSS byte-for-byte and checks syntax',()=>{
 expect(compileHack(hack)).toBe(hack.css);
 expect(()=>compileHack({...hack,css:'.markdown-preview-view {'})).toThrow();
 expect(()=>compileHack({...hack,spec:{...hack.spec,hasCss:false}})).toThrow('нет собственного CSS');
});
test('updates a recipe in place, preserves other CSS, and repeating is a no-op',()=>{
 const before={format:1 as const,modules:[{id:'g-text',component:'text',css:'/* text */\n'},{id:'g-link',component:'link',css:'/* links */\n'}]};
 const added=addHack(before,hack);expect(added.changed).toBe(true);
 expect(added.style.modules[1]).toEqual(before.modules[1]);expect(before.modules[0].css).toBe('/* text */\n');
 const updated=addHack(added.style,{...hack,css:hack.css.replace('var(--text-accent)','blue')});expect(updated.changed).toBe(true);
 expect(updated.style.modules[0].css).toContain('color: blue');
 expect(updated.style.modules[0].css.split('hacksidian:hack:text-demo:start')).toHaveLength(2);
 expect(addHack(updated.style,{...hack,css:hack.css.replace('var(--text-accent)','blue')})).toEqual({style:updated.style,changed:false});
});

test('disable removes only the marked block, including manually modified CSS',()=>{
 const base={format:1 as const,modules:[{id:'g-text',component:'text',css:'prefix\n/* hacksidian:hack:text-demo:start */\n.changed{color:red}\n/* hacksidian:hack:text-demo:end */\nsuffix'},{id:'g-link',component:'link',css:'untouched'}]};
 expect(hasHack(base,hack.id)).toBe(true);
 const result=removeHack(base,hack.id);expect(result.style.modules[0].css).toBe('prefix\n\nsuffix');
 expect(result.style.modules[1]).toBe(base.modules[1]);expect(hasHack(result.style,hack.id)).toBe(false);
 expect(removeHack(result.style,hack.id).changed).toBe(false);
});
test('malformed or duplicate blocks are never partially removed',()=>{
 for(const css of ['/* hacksidian:hack:text-demo:start */ body{}','/* hacksidian:hack:text-demo:end */','/* hacksidian:hack:text-demo:start */ /* hacksidian:hack:text-demo:start */ /* hacksidian:hack:text-demo:end */']){
  expect(()=>removeHack({format:1,modules:[{id:'g-text',component:'text',css}]},hack.id)).toThrow();
 }
});

test('explicit category move removes only the old marked recipe and stays idempotent',()=>{
 const moved={...hack,spec:{...hack.spec,target:'g-composition',previousTargets:['g-text']}};
 const original={format:1 as const,modules:[{id:'g-text',component:'text',css:'/* keep */'},{id:'g-composition',component:'composition',css:''}]};
 const old=addHack(original,hack).style;
 const next=addHack(old,moved).style;
 expect(next.modules[0].css.trim()).toBe('/* keep */');
 expect(next.modules[1].css).toContain('hacksidian:hack:text-demo:start');
 expect(addHack(next,moved).changed).toBe(false);
 expect(old.modules[0].css).toContain('hacksidian:hack:text-demo:start');
 expect(()=>addHack({...old,modules:old.modules.map((m,i)=>i===0?{...m,css:m.css.replace('/* hacksidian:hack:text-demo:end */','')}:m)},moved)).toThrow();
 expect(()=>addHack({...old,modules:old.modules.map((m,i)=>i===1?{...m,css:old.modules[0].css}:m)},moved)).toThrow();
});
