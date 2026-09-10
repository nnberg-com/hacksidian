import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const vault=process.env.HACKSIDIAN_VAULT || '/Users/op/vaults/op';
// First plugin load seeds missing snippets; later installs never touch working CSS.
const configDir=process.env.HACKSIDIAN_CONFIG_DIR || '.obsidian';
const dest=path.join(vault,configDir,'plugins/callmered-poc');
await mkdir(dest,{recursive:true});
for(const [from,to] of [['dist/main.js','main.js'],['manifest.json','manifest.json'],['styles.css','styles.css']]) await cp(path.join(root,from),path.join(dest,to));
const settings=path.join(vault,configDir,'community-plugins.json');
let enabled=[];try{enabled=JSON.parse(await readFile(settings,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
if(!enabled.includes('callmered-poc')){enabled.push('callmered-poc');await writeFile(settings,JSON.stringify(enabled,null,2)+'\n');}
console.log(`Installed in ${dest}. Reload the plugin in Obsidian to load this build.`);
