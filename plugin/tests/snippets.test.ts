import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, expect, test, vi } from 'vitest';
import { installSnippetTemplates, refreshNativeSnippets } from '../src/snippets';
const dirs: string[] = [];
afterEach(async () => { await Promise.all(dirs.splice(0).map(d => rm(d, { recursive: true, force: true }))); });
test('initial seeding preserves existing user bytes and adds only absent templates', async () => {
 const dir = await mkdtemp(path.join(tmpdir(), 'hacksidian-seed-')); dirs.push(dir);
 await writeFile(path.join(dir, 'hacksidian-00-settings.css'), '/* user settings */');
 await writeFile(path.join(dir, 'unrelated.css'), '/* unrelated */');
 const templates = { 'hacksidian-00-settings.css': '/* default */', 'hacksidian-10-reading.css': '/* reading */', 'hacksidian-manifest.json': '{}' };
 expect(await installSnippetTemplates(dir, templates)).toEqual(['hacksidian-00-settings', 'hacksidian-10-reading']);
 expect(await readFile(path.join(dir, 'hacksidian-00-settings.css'), 'utf8')).toBe('/* user settings */');
 expect(await readFile(path.join(dir, 'hacksidian-10-reading.css'), 'utf8')).toBe('/* reading */');
 expect(await readFile(path.join(dir, 'unrelated.css'), 'utf8')).toBe('/* unrelated */');
 expect(templates['hacksidian-00-settings.css']).toBe('/* default */');
});
test('native refresh respects disabled snippets and custom configuration directory', async () => {
 const manager = { readSnippets: vi.fn(), loadSnippets: vi.fn(), setCssEnabledStatus: vi.fn(), csscache: new Map([['custom/snippets/hacksidian-00-settings.css', 'old'], ['custom/snippets/other.css', 'keep']]) };
 await refreshNativeSnippets({ vault: { configDir: 'custom' }, customCss: manager } as any);
 expect(manager.setCssEnabledStatus).not.toHaveBeenCalled();
 expect([...manager.csscache.values()]).toEqual(['keep']);
 expect(manager.loadSnippets).toHaveBeenCalledOnce();
 await refreshNativeSnippets({ vault: { configDir: 'custom' }, customCss: manager } as any, ['hacksidian-00-settings']);
 expect(manager.setCssEnabledStatus).toHaveBeenCalledWith('hacksidian-00-settings', true);
});
