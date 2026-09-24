import fs from 'node:fs';
import path from 'node:path';
import {build} from 'esbuild';
const [output,stock]=process.argv.slice(2);if(!output||!stock)throw Error('Pass output directory and native app.css');
const here=import.meta.dirname,repo=path.resolve(here,'../../../..');fs.mkdirSync(output,{recursive:true});
await build({entryPoints:[path.join(here,'app.ts')],bundle:true,format:'esm',platform:'browser',outfile:path.join(output,'app.js'),alias:{'node:path':path.join(here,'../expanded/path.ts')}});
fs.writeFileSync(path.join(output,'recipes.json'),JSON.stringify(Object.fromEntries(['33','40','51','53'].map(id=>[id,fs.readFileSync(path.join(repo,'content/atlas/! hacks/inline-code-ex-'+id+'/recipe.css'),'utf8')]))));
fs.copyFileSync(stock,path.join(output,'app.css'));fs.copyFileSync(path.join(here,'index.html'),path.join(output,'index.html'));
