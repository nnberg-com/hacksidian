(async () => {
  const p = app.plugins.plugins['hacksidian'];
  if (!p || p.historyBusy) throw Error('Plugin unavailable or busy');
  const tab = app.setting.pluginTabs.find(t => t.plugin === p);
  const original = {interfaceLanguage:p.settings.interfaceLanguage, contentLanguage:p.settings.contentLanguage};
  const results = [];
  try {
    for (const language of ['en','ru']) {
      p.settings.interfaceLanguage = language;
      p.settings.contentLanguage = language === 'en' ? 'ru' : 'en';
      await p.updateLanguage();
      tab.display();
      const names = [...tab.containerEl.querySelectorAll('.setting-item-name')].map(el=>el.textContent);
      const expected = language === 'en' ? 'Interface language' : 'Язык интерфейса';
      if (!names.includes(expected)) throw Error('Missing translated setting: '+expected);
      const files = p.getColoringFiles();
      if (files.length !== 10 || files.some(f=>!f.path.includes('/'+p.contentLanguage+'/'))) throw Error('Content language selection failed');
      const panel = app.workspace.getLeavesOfType('callmered-conversation')[0]?.view;
      results.push({interfaceLanguage:p.interfaceLanguage, contentLanguage:p.contentLanguage, sampleCount:files.length,
        settingNames:names, panelPlaceholder:panel?.contentEl.querySelector('textarea')?.placeholder,
        command:app.commands.commands['hacksidian:next-coloring']?.name});
    }
    const root = p.settings.coloringsFolder.replace(/\/$/,'');
    let checked = 0;
    for (const file of app.vault.getMarkdownFiles().filter(f=>f.path.startsWith(root+'/ru/')||f.path.startsWith(root+'/en/'))) {
      const lang=file.path.slice(root.length+1).split('/')[0];
      for (const link of app.metadataCache.getFileCache(file)?.links ?? []) {
        if (link.link.startsWith('#') || ['Missing note','Несуществующая заметка'].includes(link.link)) continue;
        const target=app.metadataCache.getFirstLinkpathDest(link.link,file.path);
        if(!target || !target.path.startsWith(root+'/'+lang+'/')) throw Error('Unresolved or cross-language link: '+file.path+' -> '+link.link);
        checked++;
      }
    }
    return JSON.stringify({results, nativeLinksChecked:checked});
  } finally {
    Object.assign(p.settings,original);
    await p.updateLanguage();
    tab.display();
  }
})()
.then(result => require("fs").writeFileSync("/tmp/hacksidian-language-verification.json", result), error => require("fs").writeFileSync("/tmp/hacksidian-language-verification.json", JSON.stringify({error:String(error),stack:error.stack})))
