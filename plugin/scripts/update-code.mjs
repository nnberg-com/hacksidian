import { readFile, lstat, mkdtemp, writeFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Update runtime code and bundled CSS in an existing installation. No vault migration.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.length !== 1 || !path.isAbsolute(args[0])) {
  throw new Error('Usage: node scripts/update-code.mjs /absolute/path/to/vault');
}
const vault = args[0];
const config = process.env.HACKSIDIAN_CONFIG_DIR || '.obsidian';
if (path.isAbsolute(config) || config.split(/[\\/]/).some(part => part === '..')) {
  throw new Error('HACKSIDIAN_CONFIG_DIR must be a relative directory inside the vault.');
}
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
if (!/^[a-z0-9][a-z0-9-]*$/.test(manifest.id)) throw new Error('Invalid plugin ID.');
const destination = path.join(vault, config, 'plugins', manifest.id);
const installed = JSON.parse(await readFile(path.join(destination, 'manifest.json'), 'utf8'));
if (installed.id !== manifest.id || installed.name !== manifest.name) {
  throw new Error('The installed plugin does not match this project; no files changed.');
}
// Validate both artifacts before replacing either of them.
const artifacts = await Promise.all(['main.js', 'styles.css'].map(async name => {
  const target = path.join(destination, name);
  const stat = await lstat(target);
  if (!stat.isFile()) throw new Error(`Installed ${name} must be a regular file; no files changed.`);
  const content = await readFile(path.join(root, 'dist', name));
  if (!content.length) throw new Error(`Built ${name} is empty; no files changed.`);
  return { name, target, mode: stat.mode & 0o777, content, before: await readFile(target) };
}));
const changed = artifacts.filter(item => !item.before.equals(item.content));
if (!changed.length) {
  console.log(`Already up to date: ${destination}`);
} else {
  const staging = await mkdtemp(path.join(destination, '.code-update-'));
  const replaced = [];
  try {
    for (const item of changed) {
      await writeFile(path.join(staging, item.name), item.content, { mode: item.mode });
      await writeFile(path.join(staging, item.name + '.backup'), item.before, { mode: item.mode });
    }
    try {
      for (const item of changed) {
        await rename(path.join(staging, item.name), item.target);
        replaced.push(item);
      }
    } catch (error) {
      for (const item of replaced.reverse()) await rename(path.join(staging, item.name + '.backup'), item.target);
      throw error;
    }
  } catch (error) {
    // Retain backups if replacement or recovery fails.
    throw new Error(`Update failed; recovery files: ${staging}`, { cause: error });
  }
  await rm(staging, { recursive: true, force: true });
  for (const item of changed) console.log(`Updated: ${item.target}`);
}
console.log('Reload Hacksidian in Obsidian to load the update. User snippets, settings, manifest and links were not changed.');
