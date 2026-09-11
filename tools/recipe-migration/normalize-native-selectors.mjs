// One-time selector adaptation. Never imported by the runtime.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(new URL('../../plugin/package.json',import.meta.url));
const postcss=require('postcss');
const root=process.env.HACKSIDIAN_ATLAS||'/Users/op/vaults/op/! P R O/hacksidian/atlas';
const changed=[];
for(const id of fs.readdirSync(path.join(root,'! hacks'))){
 const file=path.join(root,'! hacks',id,'recipe.css');if(!fs.existsSync(file))continue;
 const before=fs.readFileSync(file,'utf8'),css=postcss.parse(before);
 css.walkRules(rule=>{
  const result=[];
  for(const original of rule.selectors){
   // Markdown strikethrough may use s; authored HTML can still use del.
   let s=original.replaceAll(':is(del,s)',':is(KEEP_STRIKE)')
    .replace(/(?<![\w.#-])del(?=[\s>+~:),]|$)/g,':is(del,s)').replaceAll(':is(KEEP_STRIKE)',':is(del,s)');
   s=s.replace(/a\[href\^=(["'])\.\/assets\/\1\]/g,'a:is([href^="./assets/"],[href^="assets/"],[data-href^="assets/"])');
   result.push(s);
   if(!s.includes('.markdown-alert'))continue;
   let native=s.replace(/\.markdown-alert-title\b/g,'.callout-title')
    .replace(/\.markdown-alert-(note|tip|important|warning|caution)\b/g,'.callout[data-callout="$1"]')
    .replace(/\.markdown-alert(?![\w-])/g,'.callout')
    .replace(/\.callout\s*>\s*p\b/g,'.callout > .callout-content > p');
   if(native!==s)result.push(native);
   if(/\.markdown-alert\s*>\s*p/.test(s)&&rule.nodes.some(n=>n.type==='decl'&&n.prop==='display'&&n.value==='inline')){
    result.push(native.replace(/\.callout-content\s*>\s*p.*$/,'.callout-content'));
   }
  }
  rule.selectors=[...new Set(result)];
 });
 const after=css.toString();if(after!==before){fs.writeFileSync(file,after);changed.push(id);}
}
fs.writeFileSync(new URL('../../build/recipe-native-selector-adaptations.json',import.meta.url),JSON.stringify(changed,null,2)+'\n');
console.log('Native selector adaptations:',changed.length);
