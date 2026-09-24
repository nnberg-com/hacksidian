import {test, expect} from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

async function fixture(run) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'hacksidian-code-test-'));
  try {
    const project = path.join(dir, 'project'), vault = path.join(dir, 'vault with spaces');
    const dest = path.join(vault, '.obsidian/plugins/hacksidian');
    await fs.mkdir(path.join(project, 'scripts'), {recursive:true});
    await fs.mkdir(path.join(project, 'dist'));
    await fs.mkdir(dest, {recursive:true});
    const manifest = JSON.stringify({id:'hacksidian',name:'Hacksidian',version:'0.1.0'});
    await fs.writeFile(path.join(project, 'manifest.json'), manifest);
    await fs.writeFile(path.join(dest, 'manifest.json'), manifest);
    await fs.copyFile(new URL('../scripts/update-code.mjs', import.meta.url), path.join(project, 'scripts/update-code.mjs'));
    await fs.writeFile(path.join(project, 'dist/main.js'), 'new code');
    await fs.writeFile(path.join(dest, 'main.js'), 'old code');
    const command = (...args) => execFileSync(process.execPath, [path.join(project, 'scripts/update-code.mjs'), ...args], {
      env:{...process.env,HACKSIDIAN_CONFIG_DIR:'.obsidian'}, stdio:'pipe',
    });
    await run({project,vault,dest,command,manifest});
  } finally { await fs.rm(dir, {recursive:true,force:true}); }
}

test('updates only code, preserves CSS, data, manifest and symlinks; repeated update is a no-op', async()=>{
  await fixture(async({vault,dest,command,manifest})=>{
    const files = {'styles.css':'custom CSS','data.json':'{"custom":true}','manifest.json':manifest};
    for(const [name,content] of Object.entries(files)) await fs.writeFile(path.join(dest,name),content);
    await fs.mkdir(path.join(vault,'.obsidian/snippets'));
    const snippet=path.join(vault,'.obsidian/snippets/mine.css');
    await fs.writeFile(snippet,'user snippet');
    const link=path.join(vault,'atlas');await fs.symlink('existing-catalog',link);
    const inode=(await fs.lstat(link)).ino;
    command(vault);
    expect(await fs.readFile(path.join(dest,'main.js'),'utf8')).toBe('new code');
    for(const [name,content] of Object.entries(files)) expect(await fs.readFile(path.join(dest,name),'utf8')).toBe(content);
    expect(await fs.readFile(snippet,'utf8')).toBe('user snippet');
    expect(await fs.readlink(link)).toBe('existing-catalog');expect((await fs.lstat(link)).ino).toBe(inode);
    const modified=(await fs.stat(path.join(dest,'main.js'))).mtimeMs;
    expect(command(vault).toString()).toContain('Already up to date');
    expect((await fs.stat(path.join(dest,'main.js'))).mtimeMs).toBe(modified);
    expect((await fs.readdir(dest)).sort()).toEqual(['data.json','main.js','manifest.json','styles.css']);
  });
});

test('invalid target and empty build leave existing code untouched',async()=>{
  await fixture(async({vault,dest,project,command})=>{
    expect(()=>command()).toThrow();expect(()=>command('relative-vault')).toThrow();expect(()=>command(path.join(vault,'missing'))).toThrow();
    await fs.writeFile(path.join(project,'dist/main.js'),'');
    expect(()=>command(vault)).toThrow();
    expect(await fs.readFile(path.join(dest,'main.js'),'utf8')).toBe('old code');
    await fs.writeFile(path.join(project,'dist/main.js'),'new code');
    await fs.writeFile(path.join(dest,'manifest.json'),'{"id":"another","name":"Another"}');
    expect(()=>command(vault)).toThrow();
    expect(await fs.readFile(path.join(dest,'main.js'),'utf8')).toBe('old code');
  });
});
