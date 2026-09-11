import {test,expect} from 'vitest';
import {compileHack,addHack,hackId,type HackContext} from '../src/hacks';
const hack:HackContext={id:'text-demo',title:'Demo',path:'atlas/! hacks/text-demo/text-demo.md',spec:{format:2,target:'g-text',hasCss:true},css:'/* authored CSS */\n.markdown-preview-view p { color: var(--text-accent); }\n'};
test('binds only actual tagged cards and localized descriptions',()=>{
 expect(hackId(hack.path,['atlas/technique'])).toBe(hack.id);
 expect(hackId(hack.path,[])).toBeNull();
 expect(hackId('atlas/! hacks/text-demo/Description.en.md',['atlas/technique'])).toBe(hack.id);
 expect(hackId('atlas/! hacks/text-demo/Markdown.ru.md',['atlas/technique'])).toBeNull();
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
