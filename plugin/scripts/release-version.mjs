import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export function validateVersion(version) {
  if (typeof version !== 'string' || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) {
    throw new Error('Use a version in X.Y.Z format, without a v prefix.');
  }
}

export async function readVersionFiles(root) {
  const names = ['manifest.json', 'plugin/manifest.json', 'plugin/package.json', 'plugin/package-lock.json'];
  return Object.fromEntries(await Promise.all(names.map(async name =>
    [name, JSON.parse(await readFile(path.join(root, name), 'utf8'))])));
}

export async function setReleaseVersion(root, version) {
  validateVersion(version);
  const files = await readVersionFiles(root);
  const publicManifest = { ...files['manifest.json'] };
  const pluginManifest = { ...files['plugin/manifest.json'] };
  delete publicManifest.version;
  delete pluginManifest.version;
  if (JSON.stringify(publicManifest) !== JSON.stringify(pluginManifest)) {
    throw new Error('Manifests differ beyond version; reconcile them before changing the version.');
  }
  files['plugin/package-lock.json'].packages[''].version = version;
  for (const value of Object.values(files)) value.version = version;
  for (const [name, value] of Object.entries(files)) {
    await writeFile(path.join(root, name), JSON.stringify(value, null, 2) + '\n');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 3) throw new Error('Usage: npm run release:version -- X.Y.Z');
  await setReleaseVersion(fileURLToPath(new URL('../../', import.meta.url)), process.argv[2]);
  console.log(`Plugin version set to ${process.argv[2]}. No commit, tag or push created.`);
}
