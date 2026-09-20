import {expect,test} from 'vitest';
import {readFileSync,readdirSync} from 'node:fs';
import {parse} from 'yaml';
import {lexicalCandidates,searchCandidates} from '../src/catalog-search';
import {techniqueEntry,type CatalogEntry,type CatalogSnapshot} from '../src/catalog';
const entry=(id:string,title:string,text:string):CatalogEntry=>({id,title,text,kind:'technique',applyAvailable:true,path:`atlas/${id}.md`});
const marker=entry('example-marker','Неровный маркер','Подсветка текста наклонным маркером.');
const heading=entry('heading','След маркера','Фон курсива в заголовке H3.');
const other=entry('other','Свойства страницы','Скрывает метаданные заметки.');
test('inflected words find nonparameterized recipes without a special-case ID',()=>{
 expect(lexicalCandidates('Сделай подсветку как маркером',[heading,other,marker])[0].id).toBe(marker.id);
});
test('retains lexical candidates absent from remote hits and full source instead of chunks',()=>{
 const snapshot:CatalogSnapshot={entries:[marker,heading,other],documents:[{name:'h',entryId:'heading',fileId:'f',hash:'h',text:''}],revision:'r',storeId:'s',createdAt:''};
 const found=searchCandidates(snapshot,'Подсветка маркером',[{file_id:'f',score:1,content:[{type:'text',text:'wrong partial content'}]}]);
 expect(found.map(e=>e.id)).toContain(marker.id);expect(found.find(e=>e.id==='heading')?.text).toBe(heading.text);
});
test('unknown identifiers and unavailable CSS are not privileged candidates',()=>{
 expect(lexicalCandidates('Маркер',[{...marker,applyAvailable:false}])).toEqual([]);
});
test('real marker recipe is searchable by ordinary Russian and English words',()=>{
 const base=new URL('../../content/atlas/! hacks/emphasis-s19/',import.meta.url);
 const real=techniqueEntry('atlas/! hacks/emphasis-s19/emphasis-s19.md',readFileSync(new URL('emphasis-s19.md',base),'utf8'),{title:'19 · Неровный маркер'}, {hasCss:true},readFileSync(new URL('recipe.css',base),'utf8'));
 for(const query of ['Сделай подсветку наискосок, как будто маркером','slanted highlighter background']) expect(lexicalCandidates(query,[other,heading,real])[0].id).toBe('emphasis-s19');
});


test('independent queries retain a candidate displaced by unrelated expansion terms',()=>{
 const exact=entry('sparkle','Sparkle','A distinctive decoration.');
 const noisy=Array.from({length:30},(_,i)=>entry(`other-${i}`,'Rounded photo border shadow','Rounded photo border shadow layout decoration.'));
 const background=Array.from({length:100},(_,i)=>entry(`background-${i}`,'Generic effect','Sparkle is mentioned in this longer description of a different effect.'));
 const entries=[exact,...noisy,...background];
 const snapshot:CatalogSnapshot={entries,documents:[],revision:'r',storeId:'s',createdAt:''};
 expect(lexicalCandidates('sparkle rounded photo border shadow',entries).map(e=>e.id)).not.toContain('sparkle');
 expect(searchCandidates(snapshot,['sparkle','rounded photo border shadow'],[]).map(e=>e.id)).toContain('sparkle');
});
test('source-theme research cannot claim an effect for the local recipe',()=>{
 const unrelated=entry('unrelated','Plain box','Category: callout\nPlain border.\n###### Подтверждения в темах — исследование\nSparkle chat bubbles sparkle sparkle.\nRequirements: none\nSelectors (scope evidence): .callout\nAuthored CSS declarations (values): border: 1px solid;\nAdjustable parameters: none');
 expect(lexicalCandidates('sparkle',[unrelated])).toEqual([]);
});
test('dialogue callout matches the reported request and retains its activation condition',()=>{
 const base=new URL('../../content/atlas/! hacks/callout-dialogue/',import.meta.url);
 const real=techniqueEntry('atlas/! hacks/callout-dialogue/callout-dialogue.md',readFileSync(new URL('callout-dialogue.md',base),'utf8'),{title:'Переписка',category:'callout'},{hasCss:true},readFileSync(new URL('recipe.css',base),'utf8'));
 const decoys=Array.from({length:80},(_,i)=>entry(`callout-${i}`,'Специальное оформление callout','Category: callout\nСпециально оформленные блоки.'));
 const query="Хочу, чтобы некоторые callout'ы (специально оформленные) отображались как диалоги в чате. Сделай.";
 expect(lexicalCandidates(query,[...decoys,real])[0].id).toBe('callout-dialogue');
 expect(real.text).toContain('[!dialogue]');expect(real.text).toContain('остальные callout');
});

test('reported callout request reaches the candidate set across the full repository atlas',()=>{
 const root=new URL('../../content/atlas/! hacks/',import.meta.url);
 const entries=readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory()).flatMap(d=>{
  const folder=new URL(`${d.name}/`,root);
  const spec=JSON.parse(readFileSync(new URL('hack.json',folder),'utf8'));
  if(!spec.hasCss) return [];
  const md=readFileSync(new URL(`${d.name}.md`,folder),'utf8');
  const meta=parse(md.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '') ?? {};
  return [techniqueEntry(`atlas/! hacks/${d.name}/${d.name}.md`,md,meta,spec,readFileSync(new URL('recipe.css',folder),'utf8'))];
 });
 const query="Хочу, чтобы некоторые callout'ы (специально оформленные) отображались как диалоги в чате. Сделай.";
 expect(entries.length).toBeGreaterThan(1400);
 expect(lexicalCandidates(query,entries)[0].id).toBe('callout-dialogue');
});
