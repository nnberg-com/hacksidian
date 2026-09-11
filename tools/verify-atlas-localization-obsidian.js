(async () => {
  const plugin=app.plugins.plugins['hacksidian'];
  if(!plugin || plugin.historyBusy)throw Error('Plugin unavailable or busy');
  const root='! P R O/hacksidian/atlas/! hacks/link-e001';
  const results=[];
  for(const name of ['link-e001.md','Description.ru.md']) {
    const file=app.vault.getAbstractFileByPath(root+'/'+name);
    if(!file)throw Error('Missing native note '+name);
    const context={app:plugin.app,contentLanguage:'ru',findMarkdownView:()=>({file})};
    const hack=await plugin.getCurrentHack.call(context);
    if(hack?.id!=='link-e001'||!hack.title||hack.title==='link-e001')throw Error('Localized hack failed: '+name);
    results.push({note:name,id:hack.id,title:hack.title,target:hack.spec.target});
  }
  const saved=JSON.parse(await app.vault.adapter.read(app.vault.configDir+'/plugins/hacksidian/data.json'));
  if(saved.localization?.interfaceLanguage!==plugin.interfaceLanguage)throw Error('Effective interface language was not persisted');
  require('fs').writeFileSync('/tmp/hacksidian-atlas-native-verification.json',JSON.stringify({results,localization:saved.localization}));
})().catch(error=>require('fs').writeFileSync('/tmp/hacksidian-atlas-native-verification.json',JSON.stringify({error:String(error)})))
