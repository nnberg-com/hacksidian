// Read-only checks; Markdown is authored directly, not normalized or regenerated.
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {parse} from '../plugin/node_modules/yaml/dist/index.js';
const atlas=process.argv[2]||'/Users/op/vaults/op/! P R O/hacksidian/atlas';
let cards=0,filesBlocks=0,sourcesBlocks=0,idBlocks=0;
function visit(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,item.name);if(item.isDirectory()){visit(file);continue;}
 assert(!['baseline.json','provenance.json','config.json','default.css'].includes(item.name),'Technical file in published card folder: '+file);
 if(!file.endsWith('.md'))continue;
 const text=fs.readFileSync(file,'utf8');const meta=parse(text.match(/^---\n([\s\S]*?)\n---/)?.[1]??'')??{};
 if(!meta.tags?.includes('hacksidian_technique'))continue;
 cards++;const id=path.basename(file,'.md');assert.equal(id,path.basename(dir));
 const config=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8'));assert.equal(config.format,2);assert.equal(typeof config.hasCss,'boolean');
 for(const kind of ['files','sources','id']){
  const matches=[...text.matchAll(new RegExp('```hacksidian-'+kind+'\\n([^\\n]+)\\n[\\s\\S]*?```','g'))];assert.equal(matches.length,1,file+' '+kind);assert.equal(matches[0][1],id);
  if(kind==='files')filesBlocks++;else if(kind==='sources')sourcesBlocks++;else idBlocks++;
 }
 assert(!text.includes('## Исходный CSS рецепта'),file);
}}
visit(path.join(atlas,'! hacks'));console.log(JSON.stringify({cards,filesBlocks,sourcesBlocks,idBlocks,configsInCardFolders:true}));
