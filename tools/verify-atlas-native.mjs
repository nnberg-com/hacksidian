import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import postcss from '../plugin/node_modules/postcss/lib/postcss.mjs';
const [atlas,stockFile]=process.argv.slice(2);const stock=postcss.parse(fs.readFileSync(stockFile,'utf8'));
function context(n){const a=[];for(let p=n.parent;p&&p.type!=='root';p=p.parent)if(p.type==='atrule')a.unshift('@'+p.name+(p.params?' '+p.params:''));return a;}
const key=d=>JSON.stringify([d.parent.selector,context(d),d.prop,d.value,!!d.important]);const exact=new Set();stock.walkDecls(d=>exact.add(key(d)));
const before=JSON.parse(fs.readFileSync(path.join(atlas,'! defaults/atlas-before-native.json'),'utf8'));let count=0,decls=0,changed=0;const status={},issues=[];
for(const [id,original]of Object.entries(before)){
 if(!fs.existsSync(path.join(atlas,'! hacks',id,'hack.json')))continue;
 const dir=path.join(atlas,'! hacks',id),css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8'),tree=postcss.parse(css),baseline=JSON.parse(fs.readFileSync(path.join(dir,'baseline.json'),'utf8'));
 count++;changed+=css.trim()!==original.trim();status[baseline.status]=(status[baseline.status]||0)+1;
 const declared=new Set();tree.walkDecls(d=>{if(d.prop.startsWith('--'))declared.add(d.prop);});
 tree.walkDecls(d=>{for(const m of d.value.matchAll(/var\(\s*(--[\w-]+)/g)){assert.notEqual(d.prop,m[1],id+' self reference');if(m[1].startsWith('--hack-'+id+'-'))assert(declared.has(m[1]),id+' missing '+m[1]);}});
 postcss.parse(fs.readFileSync(path.join(dir,'Default.css'),'utf8')).walkDecls(d=>{assert(exact.has(key(d)),id+' fabricated default '+key(d));decls++;});
 assert.equal(baseline.defaultRole,'reference-only');
 for(const lang of ['ru'])assert(fs.readFileSync(path.join(dir,`${id}.md`),'utf8').includes('./Default.css'));
}
console.log(JSON.stringify({recipes:count,changedRecipesThisPass:changed,verifiedStockDeclarations:decls,status},null,2));
