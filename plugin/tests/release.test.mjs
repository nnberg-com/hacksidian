import { afterEach, expect, test } from 'vitest';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { prepareRelease } from '../scripts/prepare-release.mjs';
import { setReleaseVersion } from '../scripts/release-version.mjs';

const roots = [];
async function put(root, name, value) {
  await mkdir(path.dirname(path.join(root, name)), { recursive: true });
  await writeFile(path.join(root, name), typeof value === 'string' ? value : JSON.stringify(value));
}
async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'hacksidian-release-'));
  roots.push(root);
  const manifest = { id: 'hacksidian', version: '0.1.0', minAppVersion: '1.8.7' };
  for (const name of ['manifest.json', 'plugin/manifest.json']) await put(root, name, manifest);
  await put(root, 'plugin/package.json', { version: '0.1.0', scripts: { test: 'vitest run' } });
  await put(root, 'plugin/package-lock.json', { version: '0.1.0', packages: { '': { version: '0.1.0' }, dep: { version: '9.0.0' } } });
  await put(root, 'plugin/dist/main.js', 'compiled code');
  await put(root, 'plugin/dist/styles.css', 'plugin CSS');
  return root;
}
afterEach(async () => { await Promise.all(roots.splice(0).map(root => rm(root, { recursive: true, force: true }))); });

test('packages exactly three files, removes stale content and leaves sources untouched', async () => {
  const root = await fixture();
  for (const name of ['build/release/data.json', 'build/release/content.json.gz', 'build/release/atlas/card.md', 'plugin/dist/data.json', 'content/atlas/card.md', 'content/playground/page.md']) {
    await put(root, name, 'must not ship');
  }
  const { out } = await prepareRelease(root, {});
  expect((await readdir(out)).sort()).toEqual(['main.js', 'manifest.json', 'styles.css']);
  expect(await readFile(path.join(out, 'main.js'), 'utf8')).toBe('compiled code');
  expect(await readFile(path.join(root, 'content/atlas/card.md'), 'utf8')).toBe('must not ship');
  expect(await readFile(path.join(root, 'content/playground/page.md'), 'utf8')).toBe('must not ship');
});

test('changes all version records without changing dependency versions or other fields', async () => {
  const root = await fixture();
  await setReleaseVersion(root, '1.2.3');
  for (const name of ['manifest.json', 'plugin/manifest.json', 'plugin/package.json', 'plugin/package-lock.json']) {
    expect(JSON.parse(await readFile(path.join(root, name), 'utf8')).version).toBe('1.2.3');
  }
  const lock = JSON.parse(await readFile(path.join(root, 'plugin/package-lock.json'), 'utf8'));
  expect(lock.packages[''].version).toBe('1.2.3');
  expect(lock.packages.dep.version).toBe('9.0.0');
  expect(JSON.parse(await readFile(path.join(root, 'plugin/package.json'), 'utf8')).scripts.test).toBe('vitest run');
  await prepareRelease(root, { GITHUB_REF_TYPE: 'tag', GITHUB_REF_NAME: '1.2.3' });
});

test.each(['v1.2.3', '1.2', '01.2.3', '../1.2.3', '1.2.3-beta.1'])('rejects invalid version %s before writing', async version => {
  const root = await fixture();
  await expect(setReleaseVersion(root, version)).rejects.toThrow('X.Y.Z');
  expect(JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8')).version).toBe('0.1.0');
});

test('rejects manifest drift and package drift', async () => {
  const root = await fixture();
  await put(root, 'manifest.json', { version: '0.1.0', id: 'other' });
  await expect(setReleaseVersion(root, '0.2.0')).rejects.toThrow('Manifests differ');
  await expect(prepareRelease(root, {})).rejects.toThrow('manifests must match');
  await put(root, 'manifest.json', JSON.parse(await readFile(path.join(root, 'plugin/manifest.json'), 'utf8')));
  await put(root, 'plugin/package.json', { version: '0.2.0' });
  await expect(prepareRelease(root, {})).rejects.toThrow('versions must match');
});

test('rejects nonmatching tags and permits branch builds', async () => {
  const root = await fixture();
  for (const tag of ['v0.1.0', '0.2.0', 'plugin-0.1.0', 'vault-9.0.0']) {
    await expect(prepareRelease(root, { GITHUB_REF_TYPE: 'tag', GITHUB_REF_NAME: tag })).rejects.toThrow('Tag must equal');
  }
  await prepareRelease(root, { GITHUB_REF_TYPE: 'branch', GITHUB_REF_NAME: 'main' });
});

test('missing build input leaves the previous package intact', async () => {
  const root = await fixture();
  await put(root, 'build/release/main.js', 'previous release');
  await rm(path.join(root, 'plugin/dist/styles.css'));
  await expect(prepareRelease(root, {})).rejects.toMatchObject({ code: 'ENOENT' });
  expect(await readFile(path.join(root, 'build/release/main.js'), 'utf8')).toBe('previous release');
});
