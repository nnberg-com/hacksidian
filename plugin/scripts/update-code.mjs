import { readFile, lstat, mkdtemp, writeFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Update only main.js in an existing installation. No installer or vault migration.
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
const target = path.join(destination, 'main.js');
const stat = await lstat(target);
if (!stat.isFile()) throw new Error('Installed main.js must be a regular file; no files changed.');
const code = await readFile(path.join(root, 'dist', 'main.js'));
if (!code.length) throw new Error('Built main.js is empty; no files changed.');
if ((await readFile(target)).equals(code)) {
  console.log(`Already up to date: ${target}`);
} else {
  // Stage on the same filesystem so replacement is atomic. Leave old code intact on failure.
  const staging = await mkdtemp(path.join(destination, '.code-update-'));
  try {
    const pending = path.join(staging, 'main.js');
    await writeFile(pending, code, { mode: stat.mode & 0o777 });
    await rename(pending, target);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
  console.log(`Updated code: ${target}`);
}
console.log('Reload Hacksidian in Obsidian to load the code. CSS, settings, manifest and links were not changed.');
