import { test, expect, afterEach } from 'vitest';
import { mkdtemp, mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
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
