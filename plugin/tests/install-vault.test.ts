import { test, expect, afterEach } from 'vitest';
import { mkdtemp, mkdir, readFile, writeFile, readdir, rm, lstat, realpath, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const roots: string[] = [];
const previousId = 'hacksidian-prototype';
const installer = path.resolve(import.meta.dirname, '../scripts/install-vault.mjs');
async function fixture() {
 const vault = await mkdtemp(path.join(tmpdir(), 'hacksidian-install-test-')); roots.push(vault);
 const config = path.join(vault, '.obsidian');
 const old = path.join(config, 'plugins', previousId);
 await mkdir(old, { recursive: true });
 await writeFile(path.join(old, 'manifest.json'), JSON.stringify({ id: previousId, name: 'Hacksidian' }));
 const data = '{ "settings": {"apiKey":"test-only-value"}, "state":{"versions":[{"id":"old"}],"turns":[]} }\n';
 await writeFile(path.join(old, 'data.json'), data);
 await writeFile(path.join(old, 'custom-file.txt'), 'preserve me');
 await writeFile(path.join(config, 'community-plugins.json'), JSON.stringify(['other', previousId]));
 await writeFile(path.join(config, 'workspace.json'), JSON.stringify({ ribbon: { [previousId + ':open']: false }, unrelated: 'unchanged' }));
 await writeFile(path.join(config, 'hotkeys.json'), JSON.stringify({ [previousId + ':next-coloring']: [{key:'N',modifiers:['Mod']}] }));
 return { vault, config, old, data };
}
function install(vault: string) {
 return execFileSync(process.execPath, [installer], {env:{...process.env,HACKSIDIAN_VAULT:vault,HACKSIDIAN_CONFIG_DIR:'.obsidian'},encoding:'utf8',stdio:'pipe'});
}
afterEach(async()=>{await Promise.all(roots.splice(0).map(root=>rm(root,{recursive:true,force:true})));});
test('renames previous installation, preserves private data, migrates references and remains repeatable',async()=>{
 const {vault,config,data}=await fixture();
 expect(install(vault)).toContain('/plugins/hacksidian');
 expect(await readdir(path.join(config,'plugins'))).toEqual(['hacksidian']);
 const dest=path.join(config,'plugins/hacksidian');
 expect(await readFile(path.join(dest,'data.json'),'utf8')).toBe(data);
 expect(await readFile(path.join(dest,'custom-file.txt'),'utf8')).toBe('preserve me');
 expect(JSON.parse(await readFile(path.join(dest,'manifest.json'),'utf8')).id).toBe('hacksidian');
 expect(JSON.parse(await readFile(path.join(config,'community-plugins.json'),'utf8'))).toEqual(['other','hacksidian']);
 expect(JSON.parse(await readFile(path.join(config,'workspace.json'),'utf8'))).toEqual({ribbon:{'hacksidian:open':false},unrelated:'unchanged'});
 expect(JSON.parse(await readFile(path.join(config,'hotkeys.json'),'utf8'))['hacksidian:next-coloring']).toEqual([{key:'N',modifiers:['Mod']}]);
 expect(await readdir(config)).not.toContain(expect.stringContaining('.hacksidian-install-'));
 install(vault);
 expect(await readFile(path.join(dest,'data.json'),'utf8')).toBe(data);
});
test('refuses conflicting installations before modifying either copy',async()=>{
 const {vault,config,old,data}=await fixture();
 const dest=path.join(config,'plugins/hacksidian');await mkdir(dest);await writeFile(path.join(dest,'data.json'),'newer');
 expect(()=>install(vault)).toThrow();
 expect(await readFile(path.join(old,'data.json'),'utf8')).toBe(data);
 expect(await readFile(path.join(dest,'data.json'),'utf8')).toBe('newer');
});
test('fresh install enables the current ID',async()=>{
 const vault=await mkdtemp(path.join(tmpdir(),'hacksidian-fresh-test-'));roots.push(vault);
 install(vault);
 expect(JSON.parse(await readFile(path.join(vault,'.obsidian/community-plugins.json'),'utf8'))).toEqual(['hacksidian']);
});
test('requires an explicit vault path and creates two repeatable content links',async()=>{
 expect(()=>execFileSync(process.execPath,[installer],{env:{...process.env,HACKSIDIAN_VAULT:''},stdio:'pipe'})).toThrow();
 const vault=await mkdtemp(path.join(tmpdir(),'hacksidian-explicit-test-'));roots.push(vault);
 install(vault); install(vault);
 for (const name of ['atlas','playground']) {
  const link=path.join(vault,'Hacksidian',name);
  expect((await lstat(link)).isSymbolicLink()).toBe(true);
  expect(await realpath(link)).toBe(await realpath(path.resolve(import.meta.dirname,'../../content',name)));
 }
 await expect(readFile(path.join(vault,'.obsidian/plugins/hacksidian/content.json.gz'))).rejects.toMatchObject({code:'ENOENT'});
});
test('refuses an existing content folder before changing the installed plugin',async()=>{
 const {vault,old,data}=await fixture();
 await mkdir(path.join(vault,'Hacksidian/playground'),{recursive:true});
 await writeFile(path.join(vault,'Hacksidian/playground/mine.md'),'keep');
 expect(()=>install(vault)).toThrow();
 expect(await readFile(path.join(old,'data.json'),'utf8')).toBe(data);
 expect(await readFile(path.join(vault,'Hacksidian/playground/mine.md'),'utf8')).toBe('keep');
 await expect(lstat(path.join(vault,'Hacksidian/atlas'))).rejects.toMatchObject({code:'ENOENT'});
});
test('uses existing folder settings and removes only the obsolete package',async()=>{
 const {vault,old}=await fixture();
 const data=JSON.stringify({settings:{atlasFolder:'Work/atlas',coloringsFolder:'Work/playground',apiKey:'test-only'}});
 await writeFile(path.join(old,'data.json'),data);
 await writeFile(path.join(old,'content.json.gz'),'obsolete');
 await writeFile(path.join(old,'content-state.json'),'preserve');
 install(vault);
 expect((await lstat(path.join(vault,'Work/atlas'))).isSymbolicLink()).toBe(true);
 const dest=path.join(vault,'.obsidian/plugins/hacksidian');
 expect(await readFile(path.join(dest,'data.json'),'utf8')).toBe(data);
 expect(await readFile(path.join(dest,'content-state.json'),'utf8')).toBe('preserve');
 await expect(readFile(path.join(dest,'content.json.gz'))).rejects.toMatchObject({code:'ENOENT'});
});
test('refuses links to another source and unsafe folder settings',async()=>{
 const {vault,old}=await fixture();
 await mkdir(path.join(vault,'Hacksidian'));
 await symlink(path.resolve(import.meta.dirname,'../../content/playground'),path.join(vault,'Hacksidian/atlas'));
 expect(()=>install(vault)).toThrow();
 await rm(path.join(vault,'Hacksidian/atlas'));
 await writeFile(path.join(old,'data.json'),JSON.stringify({settings:{atlasFolder:'../escape'}}));
 expect(()=>install(vault)).toThrow();
});
