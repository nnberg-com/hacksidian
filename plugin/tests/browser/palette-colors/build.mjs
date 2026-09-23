// Standalone browser verification against an explicitly supplied, extracted app.css.
import fs from 'node:fs';
import path from 'node:path';
import {buildSync} from 'esbuild';
import {createRequire} from 'node:module';
const [destination,stockCss]=process.argv.slice(2);
if(!destination||!stockCss)throw Error('Usage: build.mjs <temporary-directory> <extracted-obsidian-app.css>');
const repo=path.resolve(import.meta.dirname,'../../../..');
fs.mkdirSync(destination,{recursive:true});
buildSync({entryPoints:[path.join(repo,'plugin/src/parameter-variants.ts')],bundle:true,platform:'node',format:'cjs',outfile:path.join(destination,'compiler.cjs')});
const {resolveParameterVariants,parameterExample}=createRequire(import.meta.url)(path.join(destination,'compiler.cjs'));
const css=fs.readFileSync(path.join(repo,'content/atlas/! hacks/palette/recipe.css'),'utf8');
const names=[...css.matchAll(/@option ([\w-]+) \|/g)].map(m=>m[1]);
const variants=names.map(name=>({name,css:resolveParameterVariants(parameterExample(css,{'--hacksidian-palette-choice':name}))}));
const semantic=fs.readFileSync(path.join(repo,'content/atlas/! hacks/palette-semantic-palette-custom/recipe.css'),'utf8');
fs.writeFileSync(path.join(destination,'data.json'),JSON.stringify({variants,semantic}));
fs.copyFileSync(stockCss,path.join(destination,'stock.css'));
fs.copyFileSync(path.join(import.meta.dirname,'test.js'),path.join(destination,'test.js'));
fs.writeFileSync(path.join(destination,'index.html'),'<!doctype html><meta charset="utf-8"><title>Palette color contract</title><link rel="stylesheet" href="stock.css"><body class="theme-light"><pre id="result">Testing</pre><div class="callout" data-callout="error"><div class="callout-title">Error</div><div class="callout-content">Semantic color</div></div><script type="module" src="test.js"></script>');
