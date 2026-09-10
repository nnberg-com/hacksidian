import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, expect, test } from 'vitest';
import { readFileStyle, writeFileStyle } from '../src/file-style';
import { replaceStyleModule } from '../src/style-modules';
const dirs: string[] = [];
async function fixture() {
 const d=await mkdtemp(path.join(tmpdir(),'hacksidian-'));dirs.push(d);
 await writeFile(path.join(d,'hacksidian-manifest.json'),JSON.stringify({format:1,modules:[{id:'foundation',component:'foundation',file:'00-settings.css'},{id:'text',component:'text',file:'10-text.css'}]}));
 await writeFile(path.join(d,'00-settings.css'),'.markdown-preview-view { color: red; }\n');
 await writeFile(path.join(d,'10-text.css'),'.markdown-preview-view p { color: blue; }\n');
 return d;
}
afterEach(async()=>{await Promise.all(dirs.splice(0).map(d=>rm(d,{recursive:true,force:true})));});
test('disk edits are authoritative; update preserves neighbour bytes',async()=>{const d=await fixture();await writeFile(path.join(d,'10-text.css'),'.markdown-preview-view p { color: green; }\n');const old=await readFileStyle(d);const next=replaceStyleModule(old,'foundation',old.modules[0].css.replace('red','black'));await writeFileStyle(d,old,next);expect((await readFileStyle(d)).modules[1].css).toBe(old.modules[1].css);expect((await readFileStyle(d)).modules[0].css).toContain('black');});
test('stale response cannot overwrite manual edit',async()=>{const d=await fixture();const old=await readFileStyle(d);const next=replaceStyleModule(old,'foundation',old.modules[0].css.replace('red','black'));await writeFile(path.join(d,'10-text.css'),'.markdown-preview-view p { color: yellow; }');await expect(writeFileStyle(d,old,next)).rejects.toThrow('изменились');expect(await readFile(path.join(d,'00-settings.css'),'utf8')).toContain('red');});
test('manifest paths cannot escape source directory',async()=>{const d=await fixture();await writeFile(path.join(d,'hacksidian-manifest.json'),JSON.stringify({format:1,modules:[{id:'bad',component:'bad',file:'../secret.css'}]}));await expect(readFileStyle(d)).rejects.toThrow('путь');});
test('missing and malformed files fail rather than restoring state',async()=>{const d=await fixture();await writeFile(path.join(d,'10-text.css'),'p {');await expect(readFileStyle(d)).rejects.toThrow();});
test('undo can restore preceding single-file snapshot',async()=>{const d=await fixture();const old=await readFileStyle(d);const next=replaceStyleModule(old,'foundation',old.modules[0].css.replace('red','black'));await writeFileStyle(d,old,next);await writeFileStyle(d,next,old);expect(await readFileStyle(d)).toEqual(old);});
test('existing hidden component does not block changing another module',async()=>{const d=await fixture();await writeFile(path.join(d,'10-text.css'),'.markdown-preview-view .metadata-container { display: none; }');const old=await readFileStyle(d);expect(()=>replaceStyleModule(old,'foundation',old.modules[0].css.replace('red','black'))).not.toThrow();expect(()=>replaceStyleModule(old,'foundation','.markdown-preview-view { color: url(https://example.com); }')).toThrow();});
