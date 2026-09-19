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

async function releaseFixture() {
 const release = await mkdtemp(path.join(tmpdir(), 'hacksidian-downloaded-')); roots.push(release);
 await writeFile(path.join(release, 'manifest.json'), JSON.stringify({id:'hacksidian',name:'Hacksidian',version:'0.2.0',minAppVersion:'1.8.7'}));
 await writeFile(path.join(release, 'main.js'), 'downloaded release code');
 await writeFile(path.join(release, 'styles.css'), 'downloaded release styles');
 await writeFile(path.join(release, 'data.json'), 'must not install');
 return release;
}
function installRelease(vault: string, release: string) {
 return execFileSync(process.execPath, [installer, '--release', release], {env:{...process.env,HACKSIDIAN_VAULT:vault,HACKSIDIAN_CONFIG_DIR:'.obsidian'},encoding:'utf8',stdio:'pipe'});
}
test('installs downloaded release and links local repository content without building', async () => {
 const vault = await mkdtemp(path.join(tmpdir(), 'hacksidian-release-vault-')); roots.push(vault);
 const release = await releaseFixture();
 installRelease(vault, release);
 const dest = path.join(vault,'.obsidian/plugins/hacksidian');
 expect(await readFile(path.join(dest,'main.js'),'utf8')).toBe('downloaded release code');
 expect(JSON.parse(await readFile(path.join(dest,'manifest.json'),'utf8')).version).toBe('0.2.0');
 expect((await readdir(dest)).sort()).toEqual(['main.js','manifest.json','styles.css']);
 for (const name of ['atlas','playground']) {
  const link=path.join(vault,'Hacksidian',name);
  expect((await lstat(link)).isSymbolicLink()).toBe(true);
  expect(await realpath(link)).toBe(await realpath(path.resolve(import.meta.dirname,'../../content',name)));
 }
});
test('release update preserves custom folder settings, history, CSS and existing links', async () => {
 const {vault,config,old}=await fixture();
 const data=JSON.stringify({settings:{atlasFolder:'Work/atlas',coloringsFolder:'Work/playground'},state:{versions:[{id:'keep'}]}});
 await writeFile(path.join(old,'data.json'),data);
 await mkdir(path.join(config,'snippets'));
 await writeFile(path.join(config,'snippets/mine.css'),'body { color: red; }');
 const release=await releaseFixture();
 installRelease(vault,release);
 const before=await lstat(path.join(vault,'Work/atlas'));
 installRelease(vault,release);
 expect((await lstat(path.join(vault,'Work/atlas'))).ino).toBe(before.ino);
 expect(await readFile(path.join(config,'plugins/hacksidian/data.json'),'utf8')).toBe(data);
 expect(await readFile(path.join(config,'snippets/mine.css'),'utf8')).toBe('body { color: red; }');
 expect(await realpath(path.join(vault,'Work/playground'))).toBe(await realpath(path.resolve(import.meta.dirname,'../../content/playground')));
});
test('incomplete or unrelated release does not change vault or create links', async () => {
 const {vault,old,data}=await fixture();
 const release=await releaseFixture();
 await rm(path.join(release,'styles.css'));
 expect(()=>installRelease(vault,release)).toThrow();
 await expect(lstat(path.join(vault,'Hacksidian'))).rejects.toMatchObject({code:'ENOENT'});
 expect(await readFile(path.join(old,'data.json'),'utf8')).toBe(data);
 await writeFile(path.join(release,'manifest.json'),JSON.stringify({id:'../other',name:'Hacksidian',version:'0.2.0'}));
 expect(()=>installRelease(vault,release)).toThrow();
 expect(await readFile(path.join(old,'data.json'),'utf8')).toBe(data);
});
test('downloaded release refuses existing content directories without changing plugin files', async () => {
 const {vault,old,data}=await fixture();
 const release=await releaseFixture();
 await mkdir(path.join(vault,'Hacksidian/atlas'),{recursive:true});
 await writeFile(path.join(vault,'Hacksidian/atlas/mine.md'),'keep');
 expect(()=>installRelease(vault,release)).toThrow();
 expect(await readFile(path.join(old,'data.json'),'utf8')).toBe(data);
 expect(await readFile(path.join(vault,'Hacksidian/atlas/mine.md'),'utf8')).toBe('keep');
});
