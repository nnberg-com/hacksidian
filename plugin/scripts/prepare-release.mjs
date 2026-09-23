import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { validateVersion, readVersionFiles } from './release-version.mjs';

export async function prepareRelease(root, env = process.env) {
  const files = await readVersionFiles(root);
  const manifest = files['plugin/manifest.json'];
  validateVersion(manifest.version);
  if (JSON.stringify(manifest) !== JSON.stringify(files['manifest.json'])) {
    throw new Error('Root and plugin manifests must match.');
  }
  const lock = files['plugin/package-lock.json'];
  if ([files['plugin/package.json'].version, lock.version, lock.packages[''].version]
    .some(version => version !== manifest.version)) {
    throw new Error('Package and manifest versions must match. Run release:version.');
  }
  if (env.GITHUB_REF_TYPE === 'tag' && env.GITHUB_REF_NAME !== manifest.version) {
    throw new Error('Tag must equal manifest.version (without v prefix).');
  }
  // Read all inputs before replacing the package. Never include vault content or data.json.
  const artifacts = await Promise.all([
    ['plugin/dist/main.js', 'main.js'],
    ['plugin/dist/styles.css', 'styles.css'],
    ['plugin/manifest.json', 'manifest.json'],
  ].map(async ([source, name]) => ({ name, data: await readFile(path.join(root, source)) })));
  const out = path.join(root, 'build/release');
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const { name, data } of artifacts) await writeFile(path.join(out, name), data);
  return { version: manifest.version, out };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { version, out } = await prepareRelease(fileURLToPath(new URL('../../', import.meta.url)));
  console.log(`Release ${version} prepared in ${out}. Nothing published.`);
}
