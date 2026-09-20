import esbuild from 'esbuild';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const out=path.join(await mkdtemp(path.join(tmpdir(),'hacksidian-retrieval-check-')),'check.mjs');
await esbuild.build({entryPoints:[new URL('./retrieval-check.ts',import.meta.url).pathname],bundle:true,platform:'node',format:'esm',outfile:out,banner:{js:"import {createRequire} from 'node:module';const require=createRequire(import.meta.url);"},
 plugins:[{name:'obsidian-cli-adapter',setup(build){build.onResolve({filter:/^obsidian$/},()=>({path:'obsidian',namespace:'shim'}));build.onLoad({filter:/.*/,namespace:'shim'},()=>({loader:'js',resolveDir:new URL('../',import.meta.url).pathname,contents:`
 import {parse} from 'yaml';
 export const parseYaml=parse;
 export async function requestUrl(options){
  const response=await fetch(options.url,{method:options.method||'GET',headers:options.headers,body:options.body,signal:AbortSignal.timeout(120000)});
  const text=await response.text();let json;try{json=JSON.parse(text)}catch{}
  return {status:response.status,text,json};
 }` }));}}]});
await import(pathToFileURL(out).href);
