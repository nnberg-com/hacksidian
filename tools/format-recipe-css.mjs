import fs from 'node:fs';import path from 'node:path';
import prettier from '../plugin/node_modules/prettier/index.mjs';
import postcss from '../plugin/node_modules/postcss/lib/postcss.mjs';
if (!process.argv[2]) throw new Error('Usage: node tools/format-recipe-css.mjs /path/to/atlas');
const root=path.join(process.argv[2], '! hacks');
function fingerprint(node){return JSON.stringify(node.toJSON(),(k,v)=>['raws','source','inputs','inputId'].includes(k)?undefined:v);}
let count=0,fallback=0;
for(const item of fs.readdirSync(root,{recursive:true})){
 if(!item.endsWith('/recipe.css'))continue;const file=path.join(root,item),before=fs.readFileSync(file,'utf8');if(!before.trim())continue;
 const tree=postcss.parse(before);let after=await prettier.format(before,{parser:'css'});
 if(fingerprint(tree)!==fingerprint(postcss.parse(after))){
 fallback++;
 function layout(parent,depth=0){parent.raws.after='\n'+'  '.repeat(Math.max(0,depth-1));parent.raws.semicolon=true;for(const [i,n] of (parent.nodes||[]).entries()){n.raws.before=(depth===0&&i===0?'':'\n')+'  '.repeat(depth);if(n.type==='decl')n.raws.between=': ';else if(n.nodes)n.raws.between=' ';if(n.nodes)layout(n,depth+1);}}
 layout(tree);after=tree.toString()+'\n';
 }
 if(fingerprint(postcss.parse(before))!==fingerprint(postcss.parse(after)))throw Error(file);
 fs.writeFileSync(file,after);count++;
}
console.log({count,fallback,identicalAST:true});
