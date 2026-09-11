// Run explicitly through Obsidian CLI eval in vault op. No LLM call.
// Exercises a comment-only edit and Undo; the original CSS bytes must be restored.
(async () => {
 const root = `${app.vault.configDir}/snippets`;
 if (app.vault.adapter.getBasePath() !== '/Users/op/vaults/op') throw new Error('Wrong vault');
 await app.plugins.loadManifests();
 if (!app.plugins.plugins['hacksidian']) await app.plugins.enablePlugin('hacksidian');
 const plugin = app.plugins.plugins['hacksidian'];
 if (!plugin?.reloadFileStyle) throw new Error('Reload the current Hacksidian build first');
 await plugin.reloadFileStyle();
 const manifest = JSON.parse(await app.vault.adapter.read(`${root}/hacksidian-manifest.json`));
 const readFiles = async () => Promise.all(manifest.modules.map(async m => [m.file, await app.vault.adapter.read(`${root}/${m.file}`)]));
 const before = await readFiles();
 const selected = plugin.state.style.modules[0];
 const id = crypto.randomUUID();
 try {
  await plugin.commitModuleUpdate(id, selected.id, selected.css + '\n/* CSS file Undo check */\n');
  await plugin.savePluginData();
  const after = await readFiles();
  if (after.filter((entry,i) => entry[1] !== before[i][1]).length !== 1) throw new Error('Changed more than one file');
 } finally {
  if (plugin.state.versions.at(-1)?.id === id) await plugin.undo();
 }
 if (JSON.stringify(await readFiles()) !== JSON.stringify(before)) throw new Error('Undo did not restore source files');
 const saved = await plugin.loadData();
 if ('style' in saved.state || 'activeCss' in saved.state) throw new Error('Active CSS leaked into data.json');
 const names = manifest.modules.map(m => m.file.slice(0, -4));
 if (document.querySelector('style[data-callmered-preview]')) throw new Error('Duplicate preview CSS');
 const enabledBefore = names.filter(n => app.customCss.enabledSnippets.has(n));
 const selectedName = names[0];
 try {
  app.customCss.setCssEnabledStatus(selectedName, false);
  await app.plugins.disablePlugin('hacksidian');
  await app.plugins.enablePlugin('hacksidian');
  if (app.customCss.enabledSnippets.has(selectedName)) throw new Error('Restart re-enabled a disabled snippet');
 } finally {
  app.customCss.setCssEnabledStatus(selectedName, enabledBefore.includes(selectedName));
  await app.customCss.loadSnippets();
 }
 const report = { files: before.length, undoRestoredBytes: true, activeCssStoredOnlyInFiles: true, nativeSnippets: names, enabled: enabledBefore, restartPreservesDisabled: true, duplicatePreviewElements: 0 };
 require('fs').writeFileSync('/Users/op/dev/olgapavlova/hacksidian/snippet-runtime-verification.json', JSON.stringify(report, null, 2) + '\n');
 return report;
})()
