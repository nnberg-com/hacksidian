import { expect, test, vi } from 'vitest';
vi.mock('obsidian',async()=>({requestUrl:vi.fn(),parseYaml:(await import('yaml')).parse}));
import { collectCatalog } from '../src/catalog-source';
import { buildCatalog, techniqueEntry, variableEntries, type CatalogState, type CatalogEntry } from '../src/catalog';
import { syncCatalog, type CatalogApi } from '../src/catalog-api';
const entry:CatalogEntry={id:'image-round',kind:'technique',title:'Rounded',path:'image-round.md',text:'Round photographs'};
test('extracts explanations and selectors without historical CSS/HTML or generated reports',()=>{
 const card=techniqueEntry('atlas/! hacks/link-pdf/link-pdf.md','---\nid: link-pdf\n---\n# PDF icon\n## Зачем\nDistinguish PDF links\n## Ограничения\nReading only\n## Исходный CSS рецепта\n```css\na {bad:old}\n```\n## HTML исходного образца\n<p>history</p>',{id:'link-pdf',title:'PDF icon',category:'link'},{hasCss:true,requirements:['PDF extension']},'a[href$=".pdf"]::before {content:"PDF"}');
 expect(card.text).toContain('Reading only');expect(card.text).toContain('[href$=".pdf"]');expect(card.text).not.toContain('bad:old');expect(card.text).not.toContain('<p>');
});
test('variables retain selector scope and exact manual source',()=>{
 const [item]=variableEntries('.obsidian/snippets/palette.css','.example {--text-color: red}');
 expect(item.text).toContain('Scope selector: .example');expect(item.text).toContain('red');expect(item.path).toBe('.obsidian/snippets/palette.css');
});
test('catalog revisions cover changed descriptions, moved paths and deletions; duplicate IDs fail',()=>{
 const a=buildCatalog([entry]),b=buildCatalog([{...entry,text:'different'}]),c=buildCatalog([{...entry,path:'moved.md'}]);
 expect(a.revision).not.toBe(b.revision);expect(a.revision).not.toBe(c.revision);expect(a.documents[0].hash).toBe(c.documents[0].hash);
 expect(()=>buildCatalog([entry,entry])).toThrow('Duplicate');
});
test('catalog export reads only tagged technique cards and the configured variables file',async()=>{
 const adapter={read:vi.fn(async(path:string)=>{
  if(path.endsWith('/image-round.md'))return '---\nid: image-round\ntitle: Rounded\ntags: [hacksidian_technique]\n---\n## Зачем\nRounded photos';
  if(path.endsWith('/hack.json'))return JSON.stringify({format:2,hasCss:true,target:'g-image'});
  if(path.endsWith('/recipe.css'))return 'img {border-radius:8px}';
  if(path==='vars.css')return 'body {--text-normal: black}';
  throw Error('Unexpected private file read: '+path);
 })};
 const result=await collectCatalog(adapter,[{path:'private/diary.md',basename:'diary'},{path:'atlas/! hacks/image-round/notes.md',basename:'notes'},{path:'atlas/! hacks/image-round/image-round.md',basename:'image-round'}],'atlas','vars.css');
 expect(result.entries.filter(entry=>entry.kind==='technique').map(entry=>entry.id)).toEqual(['image-round']);
 expect(adapter.read).toHaveBeenCalledTimes(4);expect(result.entries.some(entry=>entry.id==='setting-accent')).toBe(true);
});

test('theme catalog resolves explicit source links and indexes theme descriptions without leaking other notes',async()=>{
 const contents:Record<string,string>={
  'atlas/! themes/minimal.md':'---\nid: theme-minimal\ntitle: Minimal\nauthor: kepano\ntags: [hacksidian_theme]\nrepo: kepano/obsidian-minimal\ncommunity_url: https://community.obsidian.md/themes/minimal\ndescription: A customizable theme\nmodes: [dark, light]\n---',
  'atlas/! hacks/image-round/image-round.md':'---\nid: image-round\ntitle: Rounded\ntags: [hacksidian_technique]\nthemes: [minimal]\n---\n## Зачем\nRounded photos',
  'atlas/! hacks/image-round/hack.json':JSON.stringify({format:2,hasCss:true}),
  'atlas/! hacks/image-round/recipe.css':'img {border-radius:8px}',
  'vars.css':'body {--text-normal:black}',
 };
 const files=Object.keys(contents).filter(p=>p.endsWith('.md')).map(p=>({path:p,basename:p.split('/').at(-1)!.slice(0,-3)}));
 files.push({path:'private/theme-notes.md',basename:'theme-notes'});
 const adapter={read:vi.fn(async(p:string)=>{if(!(p in contents))throw Error('Unexpected read');return contents[p]})};
 const result=await collectCatalog(adapter,files,'atlas','vars.css');
 const theme=result.entries.find(e=>e.id==='theme-minimal')!;
 expect(theme.helpUrl).toBe('https://community.obsidian.md/themes/minimal');
 expect(theme.text).toContain('A customizable theme');expect(theme.text).toContain('Rounded');
 expect(result.entries.find(e=>e.id==='image-round')?.themeIds).toEqual(['theme-minimal']);
 expect(adapter.read).not.toHaveBeenCalledWith('private/theme-notes.md');
 contents['atlas/! hacks/image-round/image-round.md']=contents['atlas/! hacks/image-round/image-round.md'].replace('themes: [minimal]','themes: [missing]');
 await expect(collectCatalog(adapter,files,'atlas','vars.css')).rejects.toThrow('Unresolved theme link');
});


test('search descriptions distinguish wavy and dotted links using explanations and authored values',()=>{
 const make=(value:string)=>techniqueEntry('atlas/! hacks/link-example/link-example.md',
  `# Line
## Пояснения из HTML-атласа
Как. text-decoration-style:${value} задаёт рисунок линии.
Зачем. Обозначить тип ссылки.
## Исходный CSS рецепта
old historical CSS`,
  {title:'Line',category:'link'},{hasCss:true},`a {text-decoration-style:${value};text-decoration-thickness:1.5px}`);
 const wavy=make('wavy'),dotted=make('dotted');
 expect(wavy.text).toContain('Зачем. Обозначить тип ссылки.');
 expect(wavy.text).toContain('text-decoration-style: wavy');
 expect(dotted.text).toContain('text-decoration-style: dotted');
 expect(wavy.text).not.toContain('text-decoration-style: dotted');
 expect(wavy.text).not.toContain('old historical CSS');
 expect(buildCatalog([wavy]).documents[0].text).toContain('text-decoration-style: wavy');
});

test('CSS evidence preserves functions and importance while excluding embedded binary payloads',()=>{
 const card=techniqueEntry('atlas/! hacks/example/example.md','# Example',{}, {hasCss:true},
  'a {text-decoration: underline wavy red !important; color:var(--text-accent); background:url("data:image/png;base64,ABC123"); mask:url(data:image/png;base64,XYZ456)}');
 expect(card.text).toContain('text-decoration: underline wavy red !important');
 expect(card.text).toContain('color: var(--text-accent)');
 expect(card.text).toContain('[embedded data]');
 expect(card.text).not.toContain('ABC123');expect(card.text).not.toContain('XYZ456');
});


test('each search document contains only one card and edits preserve unrelated files',()=>{
 const entries=[entry,{...entry,id:'quote-underline',text:'Wavy bold text in quotes'}, {...entry,id:'link-e023',text:'Wavy links'}];
 const catalog=buildCatalog(entries);
 expect(catalog.documents).toHaveLength(3);
 for(const document of catalog.documents){
  expect([...document.text.matchAll(/^# ID: /gm)]).toHaveLength(1);
  expect(document.text).toContain(`# ID: ${document.entryId}\n`);
 }
 const changed=buildCatalog(entries.map(e=>e.id==='link-e023'?{...e,text:'Updated wavy links'}:e));
 expect(changed.documents.find(d=>d.entryId==='quote-underline')).toEqual(catalog.documents.find(d=>d.entryId==='quote-underline'));
});

test('theme-only findings and empty recipes never become technique entries',async()=>{
 const {collectCatalog}=await import('../src/catalog-source');
 const data:Record<string,string>={'vars.css':'body {--text-normal: black}'};
 const files=['ready','theme-only','empty'].map(id=>{
  const dir=`atlas/! hacks/${id}`;
  data[`${dir}/${id}.md`]='---\ntags: [hacksidian_technique]\n---';
  data[`${dir}/hack.json`]=JSON.stringify({format:2,hasCss:id!=='theme-only'});
  data[`${dir}/recipe.css`]=id==='ready'?'a {color:red}':'';
  return {path:`${dir}/${id}.md`,basename:id};
 });
 const result=await collectCatalog({read:async path=>data[path]},files,'atlas','vars.css');
 expect(result.entries.filter(entry=>entry.kind==='technique').map(entry=>entry.id)).toEqual(['ready']);
});
