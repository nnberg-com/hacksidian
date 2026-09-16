import { expect, test, vi } from 'vitest';
vi.mock('obsidian',async()=>({requestUrl:vi.fn(),parseYaml:(await import('yaml')).parse}));
import { collectCatalog } from '../src/catalog-source';
import { buildCatalog, techniqueEntry, variableEntries, type CatalogState, type CatalogEntry } from '../src/catalog';
import { syncCatalog, type CatalogApi } from '../src/catalog-api';
const entry:CatalogEntry={id:'image-round',kind:'technique',title:'Rounded',path:'image-round.md',text:'Round photographs'};
function api(){let file=0,store=0;return {upload:vi.fn(async()=>`file_${++file}`),json:vi.fn(async(endpoint:string,method='GET')=>{
 if(endpoint==='/vector_stores')return {id:`vs_${++store}`};
 if(endpoint.endsWith('/file_batches'))return {id:'batch',status:'completed',file_counts:{failed:0}};
 return {status:'completed'};
})} as unknown as CatalogApi;}
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
test('new snapshot becomes active only after indexing and persists its upload journal',async()=>{
 const remote=api(),state:CatalogState={garbage:[]},saved:CatalogState[]=[];
 await syncCatalog(remote,state,buildCatalog([entry]),async()=>{saved.push(structuredClone(state));},()=>{});
 expect(saved.some(s=>s.pending?.fileIds.length===1&&!s.active)).toBe(true);
 expect(state.active?.entries).toEqual([entry]);expect(state.pending).toBeUndefined();
 await syncCatalog(remote,state,buildCatalog([entry]),async()=>{},()=>{});
 expect(remote.upload).toHaveBeenCalledTimes(1);
});
test('failed indexing keeps the old snapshot; retry removes abandoned resources and reuses unchanged files',async()=>{
 const remote=api(),state:CatalogState={garbage:[]},save=async()=>{};
 await syncCatalog(remote,state,buildCatalog([entry]),save,()=>{});
 const old=structuredClone(state.active);
 const original=vi.mocked(remote.json).getMockImplementation()!;
 vi.mocked(remote.json).mockImplementationOnce(async()=>({id:'vs_failed'})).mockImplementationOnce(async()=>({id:'batch',status:'failed'}));
 await expect(syncCatalog(remote,state,buildCatalog([{...entry,text:'new'}]),save,()=>{})).rejects.toThrow('индексацию');
 expect(state.active).toEqual(old);expect(state.pending?.storeId).toBe('vs_failed');
 vi.mocked(remote.json).mockImplementation(original);
 await syncCatalog(remote,state,buildCatalog([{...entry,path:'moved.md'}]),save,()=>{});
 expect(state.active?.documents[0].fileId).toBe(old?.documents[0].fileId);
 expect(remote.json).toHaveBeenCalledWith('/vector_stores/vs_failed','DELETE');
 expect(remote.json).not.toHaveBeenCalledWith(`/files/${old?.documents[0].fileId}`,'DELETE');
 expect(state.garbage).toEqual([]);
});
test('deletion excludes the record and removes its obsolete remote file after committing the new snapshot',async()=>{
 const remote=api(),state:CatalogState={garbage:[]};
 const second={...entry,id:'text-columns'};
 await syncCatalog(remote,state,buildCatalog([entry,second]),async()=>{},()=>{});
 const deleted=state.active!.documents.find(d=>d.text.includes('ID: text-columns'))!.fileId;
 await syncCatalog(remote,state,buildCatalog([entry]),async()=>{},()=>{});
 expect(state.active!.entries).toEqual([entry]);expect(remote.json).toHaveBeenCalledWith(`/files/${deleted}`,'DELETE');
});

test('recreates an expired/deleted store even if local content is unchanged',async()=>{
 const remote=api(),state:CatalogState={garbage:[]};const catalog=buildCatalog([entry]);
 await syncCatalog(remote,state,catalog,async()=>{},()=>{});
 vi.mocked(remote.json).mockRejectedValueOnce(Object.assign(new Error('gone'),{status:404}));
 await syncCatalog(remote,state,catalog,async()=>{},()=>{});
 expect(state.active?.storeId).toBe('vs_2');expect(remote.upload).toHaveBeenCalledTimes(1);
});
test('an access error never silently creates a replacement store',async()=>{
 const remote=api(),state:CatalogState={garbage:[]};const catalog=buildCatalog([entry]);
 await syncCatalog(remote,state,catalog,async()=>{},()=>{});
 vi.mocked(remote.json).mockRejectedValueOnce(Object.assign(new Error('forbidden'),{status:403}));
 await expect(syncCatalog(remote,state,catalog,async()=>{},()=>{})).rejects.toThrow('forbidden');
 expect(state.active?.storeId).toBe('vs_1');
});


test('catalog export reads only tagged technique cards and the configured variables file',async()=>{
 const adapter={read:vi.fn(async(path:string)=>{
  if(path.endsWith('/image-round.md'))return '---\nid: image-round\ntitle: Rounded\ntags: [atlas/technique]\n---\n## Зачем\nRounded photos';
  if(path.endsWith('/hack.json'))return JSON.stringify({format:2,hasCss:true,target:'g-image'});
  if(path.endsWith('/recipe.css'))return 'img {border-radius:8px}';
  if(path==='vars.css')return 'body {--text-normal: black}';
  throw Error('Unexpected private file read: '+path);
 })};
 const result=await collectCatalog(adapter,[{path:'private/diary.md',basename:'diary'},{path:'atlas/! hacks/image-round/notes.md',basename:'notes'},{path:'atlas/! hacks/image-round/image-round.md',basename:'image-round'}],'atlas','vars.css');
 expect(result.entries.filter(entry=>entry.kind==='technique').map(entry=>entry.id)).toEqual(['image-round']);
 expect(adapter.read).toHaveBeenCalledTimes(4);expect(result.entries.some(entry=>entry.id==='setting-accent')).toBe(true);
});
