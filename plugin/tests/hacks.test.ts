import {test,expect} from 'vitest';
import {compileHack,addHack,hackId,bindTemplate,type HackContext} from '../src/hacks';
const hack:HackContext={id:'text-demo',title:'Demo',path:'atlas/! hacks/text-demo/text-demo.md',spec:{format:1,target:'g-text',hasCss:true,atlas:{scope:'.atlas-demo',class:'.atlas-demo'},snippet:{scope:'.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)',class:'.callmered-coloring'}},dependencies:'{{scope}} {--ink:red;--text-normal:black;} @keyframes pulse {to{opacity:.5}}',template:'{{scope}} p {color:var(--ink);animation:pulse 1s}'};
test('binds only an actual tagged hack card',()=>{
 expect(hackId(hack.path,['atlas/technique'])).toBe(hack.id);
 expect(hackId(hack.path,[])).toBeNull();expect(hackId('atlas/! hacks/text-demo/Markdown.ru.md',['atlas/technique'])).toBeNull();
});
test('keeps values literal, requires each parameter, namespaces private variables and animations',()=>{
 expect(bindTemplate('{{scope}} {{target}}',{scope:'.x',class:'.x',target:'p'})).toBe('.x p');
 expect(()=>bindTemplate('{{missing}}',hack.spec.snippet)).toThrow('Не задан');
 const css=compileHack(hack);expect(css).toContain('--hack-text-demo-ink');expect(css).toContain('animation:hack-text-demo-pulse');expect(css).not.toContain('--text-normal');
});
test('adds once to the linked group and leaves other groups byte-identical',()=>{
 const before={format:1 as const,modules:[{id:'g-text',component:'text',css:'/* text */\n'},{id:'g-link',component:'link',css:'/* links */\n'}]};
 const result=addHack(before,hack);expect(result.changed).toBe(true);expect(result.style.modules[1]).toEqual(before.modules[1]);expect(before.modules[0].css).toBe('/* text */\n');expect(addHack(result.style,hack)).toEqual({style:result.style,changed:false});
});
test('rejects escaping selectors and external resources; permits data URLs',()=>{
 for(const template of ['body {color:red}','{{scope}} p {background:url(https://example.com/image)}','{{scope}} p {background:url("../file.png")}'])expect(()=>compileHack({...hack,template})).toThrow();
 expect(()=>compileHack({...hack,template:'{{scope}} p {background:url("data:image/svg+xml,abc")}'})).not.toThrow();
 expect(()=>compileHack({...hack,spec:{...hack.spec,hasCss:false}})).toThrow('нет собственного CSS');
});
test('namespaces counter styles and references',()=>{
 const css=compileHack({...hack,template:'@counter-style brackets {system:extends decimal;suffix:"] "} {{scope}} ol {list-style:brackets}'});
 expect(css).toContain('@counter-style hack-text-demo-brackets');expect(css).toContain('list-style:hack-text-demo-brackets');
});
