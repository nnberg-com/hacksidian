import { lstat, realpath, readlink, mkdir, symlink, unlink, rmdir } from 'node:fs/promises';
import path from 'node:path';
const inside = (parent, child) => child === parent || child.startsWith(parent + path.sep);
async function stat(file) {
  try { return await lstat(file); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
// Planning is read-only. Refuse all collisions before installing the plugin.
export async function planContentLinks(vault, content, settings = {}) {
  const vaultRoot = await realpath(vault);
  const links = [];
  for (const [name, relative] of [['atlas', settings.atlasFolder ?? 'Hacksidian/atlas'], ['playground', settings.coloringsFolder ?? 'Hacksidian/playground']]) {
    if (typeof relative !== 'string' || !relative || /[\\:\x00-\x1f]/.test(relative) || relative.split('/').some(p => !p || p === '.' || p === '..' || p.startsWith('.'))) throw new Error(`Invalid content folder: ${relative}`);
    const target = await realpath(path.join(content, name));
    if (!(await lstat(target)).isDirectory()) throw new Error(`Not a content directory: ${target}`);
    if (inside(vaultRoot, target) || inside(target, vaultRoot)) throw new Error('Vault and source content must be disjoint.');
    const dest = path.join(vaultRoot, relative);
    let parent = path.dirname(dest);
    while (parent !== vaultRoot) {
      const entry = await stat(parent);
      if (entry && (!entry.isDirectory() || entry.isSymbolicLink())) throw new Error(`Content parent is not a real directory: ${parent}`);
      parent = path.dirname(parent);
    }
    const entry = await stat(dest);
    if (entry && (!entry.isSymbolicLink() || path.resolve(path.dirname(dest), await readlink(dest)) !== target)) throw new Error(`Content destination already exists: ${dest}. No files changed.`);
    links.push({ dest, target, exists: !!entry });
  }
  const [a,b] = links.map(link => link.dest.normalize('NFC').toLowerCase());
  if (inside(a,b) || inside(b,a)) throw new Error('Content destinations must be separate.');
  return links;
}
export async function createContentLinks(links) {
  const created = [], directories = [];
  const rollback = async () => {
    for (const link of [...created].reverse()) {
      // Never remove a replacement made by another process.
      if ((await stat(link.dest))?.isSymbolicLink() && await readlink(link.dest) === link.target) await unlink(link.dest);
    }
    for (const directory of [...directories].reverse()) {
      await rmdir(directory).catch(error => { if (!['ENOTEMPTY','ENOENT'].includes(error.code)) throw error; });
    }
  };
  async function ensureDirectory(directory) {
    if (await stat(directory)) return;
    await ensureDirectory(path.dirname(directory));
    await mkdir(directory); directories.push(directory);
  }
  try {
    for (const link of links) {
      if (link.exists) continue;
      await ensureDirectory(path.dirname(link.dest));
      await symlink(link.target, link.dest, 'dir'); created.push(link);
    }
  } catch (error) { await rollback(); throw error; }
  return rollback;
}
