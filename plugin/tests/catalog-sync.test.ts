import { expect, test, vi } from 'vitest';
vi.mock('obsidian', () => ({ requestUrl: vi.fn() }));
import { syncCatalog, type CatalogApi } from '../src/catalog-api';
import { buildCatalog, type CatalogEntry, type CatalogState } from '../src/catalog';
const entry: CatalogEntry = { id: 'one', kind: 'technique', title: 'One', path: 'one.md', text: 'First' };
function server() {
 let n = 0;
 const stores = new Map<string, any>();
 const files = new Map<string, {filename: string; text: string}>();
 const attached = new Map<string, Map<string, any>>();
 const api = {
  upload: vi.fn(async (filename: string, text: string) => { const id = `file_${++n}`; files.set(id, {filename, text}); return id; }),
  json: vi.fn(async (url: string, method = 'GET', body?: any): Promise<any> => {
   const [pathname] = url.split('?'); const p = pathname.split('/').filter(Boolean);
   if(p[0] === 'files' && p[2] === 'content') throw Object.assign(Error('Not allowed to download files of purpose: assistants'), {status:400});
   if(p[0] === 'files') { if(!files.has(p[1])) throw Object.assign(Error('gone'), {status:404}); return files.get(p[1]); }
   if(p.length === 1) {
    if(method === 'GET') return {data:[...stores.values()], has_more:false};
    const id = `vs_${++n}`, store = {id,status:'completed', ...body}; stores.set(id,store); attached.set(id,new Map()); return store;
   }
   if(!stores.has(p[1])) throw Object.assign(Error('gone'), {status:404});
   const store=stores.get(p[1]), rows=attached.get(p[1])!;
   if(p.length === 2) { if(method === 'POST') Object.assign(store,body); return store; }
   if(p.length === 3) {
    if(method === 'GET') return {data:[...rows.values()],has_more:false};
    const row={id:body.file_id,status:'completed',attributes:body.attributes}; rows.set(row.id,row); return row;
   }
   if(p[4] === 'content') return {data:[{type:'text',text:files.get(p[3])!.text}],has_more:false,next_page:null};
   if(method === 'DELETE') { rows.delete(p[3]); return {}; }
   const row=rows.get(p[3]);
   if(method === 'POST') Object.assign(row,body);
   return row;
  }),
 } as unknown as CatalogApi;
 return {api,stores,files,attached};
}
const save=async()=>{}, progress=()=>{};
const state=():CatalogState=>({garbage:[]});
test('fresh install discovers remote catalog without uploads or indexing; subsequent no-op performs no writes', async()=>{
 const s=server(), first=state(), catalog=buildCatalog([entry]);
 await syncCatalog(s.api,first,catalog,save,progress);
 const second=state();vi.mocked(s.api.json).mockClear();vi.mocked(s.api.upload).mockClear();
 await syncCatalog(s.api,second,catalog,save,progress);
 expect(second.active?.storeId).toBe(first.active?.storeId);
 expect(s.api.upload).not.toHaveBeenCalled();
 expect(vi.mocked(s.api.json).mock.calls.every(c=>!c[1]||c[1]==='GET')).toBe(true);
 expect(vi.mocked(s.api.json).mock.calls.some(c=>c[0].endsWith('/content'))).toBe(false);
});
test('one change among 1500 performs one upload and one attachment; unchanged IDs are preserved', async()=>{
 const s=server(), st=state();const entries=Array.from({length:1500},(_,i)=>({...entry,id:`card-${i}`}));
 await syncCatalog(s.api,st,buildCatalog(entries),save,progress);
 const old=st.active!.documents.map(d=>d.fileId);const storeId=st.active!.storeId;
 vi.mocked(s.api.upload).mockClear();vi.mocked(s.api.json).mockClear();
 entries[15]={...entries[15],text:'updated'};
 await syncCatalog(s.api,st,buildCatalog(entries),save,progress);
 expect(s.api.upload).toHaveBeenCalledTimes(1);
 expect(st.active!.documents.filter(d=>old.includes(d.fileId))).toHaveLength(1499);
 expect(st.active!.storeId).toBe(storeId);
 expect(vi.mocked(s.api.json).mock.calls.filter(c=>c[0]===`/vector_stores/${storeId}/files`&&c[1]==='POST')).toHaveLength(1);
 expect(vi.mocked(s.api.json).mock.calls.filter(c=>c[1]==='DELETE')).toHaveLength(1);
});
test('deletion detaches only; path-only changes do not upload or index', async()=>{
 const s=server(),st=state();await syncCatalog(s.api,st,buildCatalog([entry,{...entry,id:'two'}]),save,progress);
 vi.mocked(s.api.upload).mockClear();vi.mocked(s.api.json).mockClear();
 await syncCatalog(s.api,st,buildCatalog([{...entry,path:'new/path.md'}]),save,progress);
 expect(s.api.upload).not.toHaveBeenCalled();
 const mutations=vi.mocked(s.api.json).mock.calls.filter(c=>c[1]&&c[1]!=='GET');
 expect(mutations).toHaveLength(1);expect(mutations[0][1]).toBe('DELETE');expect(mutations[0][0]).toContain('/vector_stores/');
 expect(s.files.size).toBe(2);
});
test('legacy inventory recovers hashes from original content without reindexing', async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);await syncCatalog(s.api,st,catalog,save,progress);
 const store=s.stores.get(st.active!.storeId);store.metadata={};store.name=`Hacksidian ${catalog.revision.slice(0,12)}`;
 for(const row of s.attached.get(store.id)!.values())row.attributes={};
 vi.mocked(s.api.upload).mockClear();
 const fresh=state();await syncCatalog(s.api,fresh,catalog,save,progress);
 expect(fresh.active?.storeId).toBe(store.id);expect(s.api.upload).not.toHaveBeenCalled();expect(vi.mocked(s.api.json).mock.calls.some(c=>c[0]===`/vector_stores/${store.id}/files/${fresh.active!.documents[0].fileId}/content`)).toBe(true);
});
test('multiple stores require selection; cancellation writes nothing',async()=>{
 const s=server();await s.api.json('/vector_stores','POST',{name:'Hacksidian'});await s.api.json('/vector_stores','POST',{name:'Hacksidian'});
 vi.mocked(s.api.json).mockClear();
 await expect(syncCatalog(s.api,state(),buildCatalog([entry]),save,progress,{chooseStore:async()=>''})).rejects.toThrow();
 expect(s.api.upload).not.toHaveBeenCalled();expect(vi.mocked(s.api.json).mock.calls.every(c=>!c[1])).toBe(true);
 const id=[...s.stores.keys()][1], st=state();
 await syncCatalog(s.api,st,buildCatalog([entry]),save,progress,{chooseStore:async()=>id});expect(st.active?.storeId).toBe(id);
});
test('failed attachment resumes from saved upload without uploading again or deleting store',async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);const original=vi.mocked(s.api.json).getMockImplementation()!;
 let fail=true;
 vi.mocked(s.api.json).mockImplementation(async(url,method,body)=>{if(fail&&url.endsWith('/files')&&method==='POST'){fail=false;throw Error('network');}return original(url,method,body);});
 await expect(syncCatalog(s.api,st,catalog,save,progress)).rejects.toThrow('network');
 expect(st.sync?.documents).toHaveLength(1);expect(st.active).toBeUndefined();
 await syncCatalog(s.api,st,catalog,save,progress);expect(s.api.upload).toHaveBeenCalledTimes(1);expect(st.sync).toBeUndefined();
});
test('network and permission failures never trigger a rebuild',async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);await syncCatalog(s.api,st,catalog,save,progress);
 for(const status of [403,429,500]){
  vi.mocked(s.api.json).mockRejectedValueOnce(Object.assign(Error('offline'),{status}));
  await expect(syncCatalog(s.api,st,catalog,save,progress)).rejects.toThrow('offline');
 }
 expect(s.stores.size).toBe(1);expect(s.api.upload).toHaveBeenCalledTimes(1);
});
test('unknown files block reconciliation without removing anything',async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);await syncCatalog(s.api,st,catalog,save,progress);
 const id=await s.api.upload('private.md','private');s.attached.get(st.active!.storeId)!.set(id,{id,status:'completed'});
 vi.mocked(s.api.json).mockClear();
 await expect(syncCatalog(s.api,st,catalog,save,progress)).rejects.toThrow();
 expect(vi.mocked(s.api.json).mock.calls.some(c=>c[1]==='DELETE')).toBe(false);expect(st.sync).toBeDefined();
});
test('pagination discovers a store on a later page',async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);await syncCatalog(s.api,st,catalog,save,progress);
 const original=vi.mocked(s.api.json).getMockImplementation()!;
 vi.mocked(s.api.json).mockImplementation(async(url,method,body)=>{
  if(url==='/vector_stores?limit=100')return {data:[{id:'other',name:'Unrelated'}],has_more:true,last_id:'other'};
  if(url==='/vector_stores?limit=100&after=other')return {data:[...s.stores.values()],has_more:false};
  return original(url,method,body);
 });
 const fresh=state();await syncCatalog(s.api,fresh,catalog,save,progress);expect(fresh.active?.storeId).toBe(st.active?.storeId);expect(s.api.upload).toHaveBeenCalledTimes(1);
});
test('confirmed missing store can be recreated; expired stores are not selected',async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);await syncCatalog(s.api,st,catalog,save,progress);
 const id=st.active!.storeId;s.stores.get(id).status='expired';
 await syncCatalog(s.api,st,catalog,save,progress);expect(st.active!.storeId).not.toBe(id);
 s.stores.delete(st.active!.storeId);
 await syncCatalog(s.api,st,catalog,save,progress);expect(s.stores.has(st.active!.storeId)).toBe(true);
});
test('commit failure keeps recovery journal; retry does not repeat successful uploads',async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);let fail=true;
 const commit=async()=>{if(st.active&&!st.sync&&fail){fail=false;throw Error('disk full');}};
 await expect(syncCatalog(s.api,st,catalog,commit,progress)).rejects.toThrow('disk full');
 expect(st.sync).toBeDefined();expect(st.active).toBeUndefined();
 await syncCatalog(s.api,st,catalog,save,progress);expect(s.api.upload).toHaveBeenCalledTimes(1);
});
test('failed indexing keeps old attachments until replacement is ready',async()=>{
 const s=server(),st=state();await syncCatalog(s.api,st,buildCatalog([entry]),save,progress);
 const previous=st.active;const oldId=previous!.documents[0].fileId!;
 const original=vi.mocked(s.api.json).getMockImplementation()!;let fail=true;
 vi.mocked(s.api.json).mockImplementation(async(url,method,body)=>{
  const row=await original(url,method,body);
  if(fail&&url.endsWith('/files')&&method==='POST')row.status='failed';
  return row;
 });
 const next=buildCatalog([{...entry,text:'changed'}]);
 await expect(syncCatalog(s.api,st,next,save,progress)).rejects.toThrow();
 expect(st.active).toBe(previous);expect(st.sync).toBeDefined();expect(s.attached.get(previous!.storeId)!.has(oldId)).toBe(true);
 fail=false;await syncCatalog(s.api,st,next,save,progress);
 expect(s.api.upload).toHaveBeenCalledTimes(2);expect(s.attached.get(previous!.storeId)!.has(oldId)).toBe(false);
});
test('assistants files restore through vector-store content with normalized outer whitespace',async()=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);await syncCatalog(s.api,st,catalog,save,progress);
 const row=[...s.attached.get(st.active!.storeId)!.values()][0];row.attributes={};
 const file=s.files.get(row.id)!;file.text='\uFEFF'+file.text.replace(/\n/g,'\r\n')+'\n';
 vi.mocked(s.api.json).mockClear();vi.mocked(s.api.upload).mockClear();
 const fresh=state();await syncCatalog(s.api,fresh,catalog,save,progress);
 expect(s.api.upload).not.toHaveBeenCalled();expect(fresh.active!.documents[0].hash).toBe(catalog.documents[0].hash);
 expect(vi.mocked(s.api.json).mock.calls.some(c=>c[0]===`/files/${row.id}/content`)).toBe(false);
});
test.each([
 {data:[{type:'text',text:'# ID: one\npartial'}],has_more:true,next_page:'next'},
 {data:[],has_more:false},
 {data:[{type:'text',text:'first'},{type:'text',text:'second'}],has_more:false},
])('partial or ambiguous indexed content never triggers destructive reconciliation: %j',async response=>{
 const s=server(),st=state(),catalog=buildCatalog([entry]);await syncCatalog(s.api,st,catalog,save,progress);
 const row=[...s.attached.get(st.active!.storeId)!.values()][0];row.attributes={};
 const original=vi.mocked(s.api.json).getMockImplementation()!;
 vi.mocked(s.api.json).mockImplementation(async(url,method,body)=>url.endsWith('/content')?response:original(url,method,body));
 vi.mocked(s.api.json).mockClear();vi.mocked(s.api.upload).mockClear();
 await expect(syncCatalog(s.api,state(),catalog,save,progress)).rejects.toThrow();
 expect(s.api.upload).not.toHaveBeenCalled();expect(vi.mocked(s.api.json).mock.calls.every(c=>!c[1]||c[1]==='GET')).toBe(true);
});

test('stop preserves an in-flight upload in the journal and resume reuses it', async()=>{
 const s=server(), st=state(), controller=new AbortController();
 const catalog=buildCatalog([entry,{...entry,id:'two'}]);
 const upload=vi.mocked(s.api.upload).getMockImplementation()!;
 vi.mocked(s.api.upload).mockImplementation(async(name,text)=>{
  const id=await upload(name,text);controller.abort();return id;
 });
 await expect(syncCatalog(s.api,st,catalog,save,progress,{signal:controller.signal})).rejects.toThrow('остановлено');
 expect(st.active).toBeUndefined();expect(st.sync?.documents).toHaveLength(1);
 expect([...s.attached.values()][0].size).toBe(0);
 vi.mocked(s.api.upload).mockImplementation(upload);
 await syncCatalog(s.api,st,catalog,save,progress);
 expect(s.api.upload).toHaveBeenCalledTimes(2);
 expect(st.active?.documents).toHaveLength(2);expect(st.sync).toBeUndefined();
});
test('stop between completed files keeps active snapshot and skips cleanup',async()=>{
 const s=server(), st=state();await syncCatalog(s.api,st,buildCatalog([entry]),save,progress);
 const active=st.active;const controller=new AbortController();
 const next=buildCatalog([{...entry,text:'Changed'},{...entry,id:'two'}]);
 await expect(syncCatalog(s.api,st,next,save,(done)=>{if(done===1)controller.abort();},{signal:controller.signal})).rejects.toThrow('остановлено');
 expect(st.active).toBe(active);expect(st.sync?.documents).toHaveLength(1);
 expect([...s.attached.values()][0].has(active!.documents[0].fileId!)).toBe(true);
});
