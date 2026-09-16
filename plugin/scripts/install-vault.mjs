import { cp, mkdir, readFile, writeFile, readdir, rename, rm, mkdtemp } from 'node:fs/promises';
import path from 'node:path';
import { planContentLinks, createContentLinks } from './content-links.mjs';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vault = process.env.HACKSIDIAN_VAULT;
if (!vault || !path.isAbsolute(vault)) throw new Error('Set HACKSIDIAN_VAULT to an explicit absolute vault path.');
const config = path.join(vault, process.env.HACKSIDIAN_CONFIG_DIR || '.obsidian');
const plugins = path.join(config, 'plugins');
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
const id = manifest.id;
const dest = path.join(plugins, id);

async function optionalRead(file) {
  try { return await readFile(file, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

// Discover previous IDs by product identity instead of retaining retired names.
// Run with Obsidian closed so it cannot overwrite migrated configuration.
const candidates = [];
for (const entry of await readdir(plugins, { withFileTypes: true }).catch(error => {
  if (error.code === 'ENOENT') return []; throw error;
})) {
  if (!entry.isDirectory()) continue;
  const raw = await optionalRead(path.join(plugins, entry.name, 'manifest.json'));
  if (!raw) continue;
  let existing;
  try { existing = JSON.parse(raw); } catch { continue; }
  if (existing.name === manifest.name && existing.id !== id) {
    candidates.push({ directory: path.join(plugins, entry.name), id: existing.id });
  }
}
if (candidates.length > 1) throw new Error('Multiple previous Hacksidian installations found; no files changed.');
const previous = candidates[0];
const destinationExists = (await readdir(plugins).catch(error => {
  if (error.code === 'ENOENT') return []; throw error;
})).includes(id);
if (previous && destinationExists) throw new Error('Both current and previous Hacksidian installations exist; no files changed.');
const source = previous?.directory ?? (destinationExists ? dest : null);
const previousId = previous?.id;
const savedData = source ? await optionalRead(path.join(source, 'data.json')) : null;
const links = await planContentLinks(vault, path.join(root, '../content'), savedData ? JSON.parse(savedData).settings : undefined);
const migrateString = value => previousId && (value === previousId || value.startsWith(previousId + ':'))
  ? id + value.slice(previousId.length) : value;
function migrate(value) {
  if (typeof value === 'string') return migrateString(value);
  if (Array.isArray(value)) return value.map(migrate);
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, child] of Object.entries(value)) {
      const nextKey = migrateString(key);
      if (Object.hasOwn(result, nextKey)) throw new Error('Conflicting plugin references; no files changed.');
      result[nextKey] = migrate(child);
    }
    return result;
  }
  return value;
}
// Read and validate everything before modifying the installation.
const configs = [];
for (const name of ['community-plugins.json', 'hotkeys.json', 'workspace.json', 'workspace-mobile.json', 'workspaces.json']) {
  const file = path.join(config, name), before = await optionalRead(file);
  if (before === null && name !== 'community-plugins.json') continue;
  let value = migrate(JSON.parse(before ?? '[]'));
  if (name === 'community-plugins.json') {
    if (!Array.isArray(value)) throw new Error('Invalid enabled-plugin list; no files changed.');
    value = [...new Set([...value, id])];
  }
  const after = JSON.stringify(value, null, 2) + '\n';
  if (before !== after) configs.push({ file, before, after });
}
const artifacts = await Promise.all([
  ['dist/main.js', 'main.js'], ['manifest.json', 'manifest.json'], ['dist/styles.css', 'styles.css'],
].map(async ([from, to]) => ({ to, content: await readFile(path.join(root, from)) })));
await mkdir(plugins, { recursive: true });
const staging = await mkdtemp(path.join(config, '.hacksidian-install-'));
const prepared = path.join(staging, 'prepared'), backup = path.join(staging, 'previous');
let moved = false, installed = false, committed = false;
const changedConfigs = [];
let rollbackLinks = async () => {};
try {
  if (source) await cp(source, prepared, { recursive: true });
  else await mkdir(prepared);
  for (const artifact of artifacts) await writeFile(path.join(prepared, artifact.to), artifact.content);
  // Retire only the old generated package; preserve settings, reports and backups.
  await rm(path.join(prepared, 'content.json.gz'), { force: true });
  rollbackLinks = await createContentLinks(links);
  if (source) { await rename(source, backup); moved = true; }
  await rename(prepared, dest); installed = true;
  for (const item of configs) {
    changedConfigs.push(item);
    await writeFile(item.file, item.after);
  }
  committed = true;
} catch (error) {
  await rollbackLinks();
  for (const item of changedConfigs.reverse()) {
    if (item.before === null) await rm(item.file, { force: true });
    else await writeFile(item.file, item.before);
  }
  if (installed) await rm(dest, { recursive: true, force: true });
  if (moved) await rename(backup, source);
  throw error;
} finally {
  // Keep a rollback copy if recovery itself failed.
  if (committed || !moved || await optionalRead(path.join(source, 'manifest.json')) !== null) {
    await rm(staging, { recursive: true, force: true });
  }
}
console.log(`Installed in ${dest}. Start Obsidian to load Hacksidian.`);
for (const link of links) console.log(`${link.dest} -> ${link.target}`);
