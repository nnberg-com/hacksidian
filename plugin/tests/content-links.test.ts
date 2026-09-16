import { test, expect, afterEach } from 'vitest';
import { mkdtemp, mkdir, writeFile, readFile, rm, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
// Installer helpers are shared with the CLI rather than bundled into the plugin.
// @ts-expect-error JavaScript installer module.
import { planContentLinks, createContentLinks } from '../scripts/content-links.mjs';
const roots: string[] = [];
afterEach(async()=>{for(const root of roots.splice(0))await rm(root,{recursive:true,force:true});});
async function fixture() {
 const root=await mkdtemp(path.join(tmpdir(),'hacksidian-links-'));roots.push(root);
 const vault=path.join(root,'vault'),content=path.join(root,'content');
 for(const folder of [vault,path.join(content,'atlas'),path.join(content,'playground')])await mkdir(folder,{recursive:true});
 return {vault,content};
}
test('edits through vault links change the source; rollback removes links only',async()=>{
 const {vault,content}=await fixture();
 await writeFile(path.join(content,'atlas/a.md'),'original');
 const undo=await createContentLinks(await planContentLinks(vault,content));
 await writeFile(path.join(vault,'Hacksidian/atlas/a.md'),'edited');
 expect(await readFile(path.join(content,'atlas/a.md'),'utf8')).toBe('edited');
 await undo();
 await expect(lstat(path.join(vault,'Hacksidian/atlas'))).rejects.toMatchObject({code:'ENOENT'});
 expect(await readFile(path.join(content,'atlas/a.md'),'utf8')).toBe('edited');
});
test('rolls back the first link if the second destination becomes occupied',async()=>{
 const {vault,content}=await fixture();const plan=await planContentLinks(vault,content);
 await mkdir(path.join(vault,'Hacksidian/playground'),{recursive:true});
 await expect(createContentLinks(plan)).rejects.toMatchObject({code:'EEXIST'});
 await expect(lstat(path.join(vault,'Hacksidian/atlas'))).rejects.toMatchObject({code:'ENOENT'});
 expect((await lstat(path.join(vault,'Hacksidian/playground'))).isDirectory()).toBe(true);
});
test('rejects overlapping vault/source trees and overlapping destinations',async()=>{
 const {vault,content}=await fixture();
 await expect(planContentLinks(path.dirname(vault),content)).rejects.toThrow('disjoint');
 await expect(planContentLinks(vault,content,{atlasFolder:'Work',coloringsFolder:'Work/playground'})).rejects.toThrow('separate');
});
