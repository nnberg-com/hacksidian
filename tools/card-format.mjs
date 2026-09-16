import fs from 'node:fs';
import path from 'node:path';
import {parse, stringify} from '../plugin/node_modules/yaml/dist/index.js';
export const removedProperties=['digest','source_anchor','example','template','interactive','id','language','translation_status','group'];
const hiddenSections=new Set(['Пояснения из HTML-атласа','Использование в Obsidian','Данные исходного каталога','Опора на стандартную тему','Уточнение опорных переменных']);
const labels=new Map([['Зачем','Зачем'],['Как работает','Как работает'],['Ограничения исходного приёма','Ограничения']]);
export const normalizeTag=tag=>typeof tag==='string'?tag.replace(/^(#?)atlas\//,'$1hacksidian_').replace(/^(#?hacksidian_[^\s]*)\//g,'$1_'):tag;
export function themeCode(value){
 if(/^[a-z0-9][a-z0-9_-]*$/.test(value))return value;
 const match=value.match(/^\[\[(?:.*\/)?! themes\/([^|\]#/]+?)(?:\.md)?(?:\|[^\]]*)?\]\]$/);
 if(!match)throw Error('Invalid theme code: '+value);return match[1];
}
// Headings inside code fences are sample content, never card structure.
function sections(body){
 const result=[{heading:'',lines:[]}];let fence=null;
 for(const line of body.split('\n')){
  const mark=line.match(/^\s{0,3}(`{3,}|~{3,})/);
  if(mark){if(!fence)fence=mark[1];else if(mark[1][0]===fence[0]&&mark[1].length>=fence.length)fence=null;}
  const heading=!fence&&!mark&&line.match(/^## (.+)\s*$/);
  if(heading)result.push({heading:heading[1],lines:[]});
  else if(!fence&&!mark&&/^# /.test(line))continue;
  else result.at(-1).lines.push(line);
 }
 return result.map(s=>({heading:s.heading,text:s.lines.join('\n').trim()}));
}
const bullet=(label,text)=>`- **${label}:**\n\n${text.trim().split('\n').map(line=>line?'  '+line:'').join('\n')}`;
export function formatCard(markdown,previous={}){
 const match=markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n)?/);if(!match)throw Error('Missing card frontmatter');
 const meta=parse(match[1]),provenance=structuredClone(previous);
 provenance.removedProperties??={};provenance.sections??={};
 for(const key of removedProperties)if(Object.hasOwn(meta,key)){provenance.removedProperties[key]=meta[key];delete meta[key];}
 const tags=(Array.isArray(meta.tags)?meta.tags:[]).map(normalizeTag);
 const themes=[...new Set((meta.themes??meta['Встречается в темах']??[]).map(themeCode))];
 delete meta.tags;const title=meta.title;delete meta.title;delete meta['Встречается в темах'];delete meta.themes;
 const ordered={tags,title,...meta,themes};
 const blocks=sections(markdown.slice(match[0].length));
 const oldExplanation=blocks.find(s=>s.heading==='Пояснения из HTML-атласа')?.text;
 const info={};
 const raw=blocks.find(s=>s.heading==='Данные исходного каталога')?.text.match(/```json\n([\s\S]*?)\n```/)?.[1];
 if(raw){try{const data=JSON.parse(raw);Object.assign(info,{why:data.why,how:data.how,note:data.note});}catch{}}
 if(oldExplanation){
  for(const para of oldExplanation.split(/\n\s*\n/)){
   if(/^Зачем/.test(para))info.why??=para.replace(/^Зачем[.:\s]*/,'');
   else if(/^Как/.test(para))info.how??=para.replace(/^Как[.:\s]*/,'');
  }
 }
 const present=new Set(blocks.map(s=>s.heading));
 const existingBody=blocks.map(s=>s.text).join('\n');
 const additions=[];
 for(const [key,heading,label]of [['why','Зачем','Зачем'],['how','Как работает','Как работает'],['note','Ограничения исходного приёма','Ограничения']]){
  if(info[key]&&!present.has(heading)&&!(key==='note'&&present.has('Ограничения'))&&!existingBody.includes(`- **${label}:**`))additions.push(bullet(label,String(info[key])));
 }
 const result=[];
 for(const block of blocks){
  if(hiddenSections.has(block.heading)){
   provenance.sections[block.heading]=block.text;
   if(block.heading==='Пояснения из HTML-атласа')result.push(...additions);
   continue;
  }
  let text=block.text;
  if(!block.heading)text=text.split('\n').filter(line=>!line.includes('[Открыть Markdown-пример]')).join('\n').trim();
  if(labels.has(block.heading))result.push(bullet(labels.get(block.heading),text));
  else if(block.heading==='Живой пример в Obsidian')result.push(text);
  else result.push((block.heading?`## ${block.heading}\n\n`:'')+text);
 }
 return {markdown:'---\n'+stringify(ordered,{lineWidth:0})+'---\n\n'+result.filter(Boolean).join('\n\n').trim()+'\n',provenance};
}


export function writeCard(file,markdown){
 const history=path.join(path.dirname(file),'provenance.json');
 const previous=fs.existsSync(history)?JSON.parse(fs.readFileSync(history,'utf8')):{};
 const result=formatCard(markdown,previous);
 fs.writeFileSync(file,result.markdown);
 if(Object.keys(result.provenance.removedProperties).length||Object.keys(result.provenance.sections).length||fs.existsSync(history))fs.writeFileSync(history,JSON.stringify(result.provenance,null,2)+'\n');
}
