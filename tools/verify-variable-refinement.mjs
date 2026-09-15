import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const [atlas]=process.argv.slice(2);
const report=JSON.parse(fs.readFileSync(path.join(atlas,'! defaults/variable-refinement.json')));
// Fixed, version-pinned stock values. em is evaluated at 16px on both sides;
// this verifies the conversion algebra, not the live DOM's inherited font size.
const base={'--font-text-size':16,'--code-size':14,'--table-text-size':16,'--tag-size':14,'--line-height-normal':1.5,'--table-line-height':1.3,'--size-4-1':4,'--radius-s':4,'--code-radius':4,'--callout-radius':4,'--tag-radius':32,'--tag-padding-y':4,'--tag-padding-x':10.4,'--table-border-width':1,'--blockquote-border-thickness':2};
function normalize(s){
 s=s.replace(/var\((--[\w-]+)\)/g,(all,v)=>{if(!(v in base)&&(/color/.test(v)||/^--(?:text-|background-|interactive-)/.test(v)))return 'COLOR';assert(v in base,'Unknown numeric base '+v);return String(base[v]);});
 s=s.replace(/(-?[\d.]+)(rem|em|px)\b/g,(_,n,u)=>String(Number(n)*(u==='px'?1:16)));
 s=s.replace(/calc\(([^()]*)\)/g,(_,expression)=>{assert(/^[\d.\s+*/-]+$/.test(expression));return String(Function('return ('+expression+')')());});
 return s;
}
let checked=0;
for(const r of report.recipes)for(const c of r.changes){
 if(!/^(font-size|line-height|padding.*|margin.*|.*gap|border.*)$/.test(c.property)||/color/.test(c.property))continue;
 const a=normalize(c.from),b=normalize(c.to), nums=s=>[...s.matchAll(/-?(?:\d+\.?\d*|\.\d+)/g)].map(m=>Number(m[0]));
 const aa=nums(a),bb=nums(b);assert.equal(aa.length,bb.length,r.id+' '+c.property);
 for(let i=0;i<aa.length;i++)assert(Math.abs(aa[i]-bb[i])<1e-5,r.id+' '+c.property+' '+a+' != '+b);
 checked++;
}
console.log(JSON.stringify({numericConversionsChecked:checked,recipes:report.recipes.length}));
