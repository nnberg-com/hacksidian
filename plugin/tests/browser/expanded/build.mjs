import fs from 'node:fs';
import path from 'node:path';
import {build} from 'esbuild';
const here=import.meta.dirname,repo=path.resolve(here,'../../../..');
const destination=process.argv[2],stock=process.argv[3];if(!destination||!stock)throw Error('Pass a temporary output directory and extracted native app.css');fs.mkdirSync(destination,{recursive:true});
await build({entryPoints:[path.join(here,'app.ts')],bundle:true,format:'esm',platform:'browser',outfile:path.join(destination,'app.js'),alias:{obsidian:path.join(here,'obsidian.ts'),'node:path':path.join(here,'path.ts')}});
fs.copyFileSync(path.join(here,'index.html'),path.join(destination,'index.html'));
const files={};for(const id of ['text-system','palette'])for(const name of ['recipe.css','hack.json','markdown.md',...(id==='palette'?['palette.json']:[])])files[`atlas/! hacks/${id}/${name}`]=fs.readFileSync(path.join(repo,'content/atlas/! hacks',id,name),'utf8');
fs.writeFileSync(path.join(destination,'files.json'),JSON.stringify(files));

fs.copyFileSync(path.join(repo,'tools/text-systems/sources.json'),path.join(destination,'expected.json'));

fs.copyFileSync(stock,path.join(destination,'app.css'));
