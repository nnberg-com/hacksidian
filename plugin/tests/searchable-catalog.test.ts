import { expect, it } from 'vitest';
import { searchableCatalog, type CatalogState } from '../src/catalog';
const entry = {id:'image-round',kind:'technique' as const,title:'Round',path:'image-round.md',text:'Round'};
const old = {entryId:entry.id,name:'old',hash:'old',fileId:'old',text:''};
const fresh = {...old,name:'new',hash:'new',fileId:'new'};
const state = (): CatalogState => ({garbage:[],active:{storeId:'store',revision:'old',createdAt:'now',entries:[entry],documents:[old]},sync:{storeId:'store',entries:[entry],documents:[fresh]}});
it('allows both recorded versions during incomplete synchronization',()=>{
 const result=searchableCatalog(state())!;
 expect(result.documents.map(d=>d.fileId)).toEqual(['old','new']);
 expect(result.entries).toEqual([entry]);expect(result.revision).not.toBe('old');
});
it('supports the first partial upload without an active snapshot',()=>{
 const value=state();delete value.active;
 expect(searchableCatalog(value)?.documents).toEqual([fresh]);
});
it('never trusts files from an active snapshot belonging to another store',()=>{
 const value=state();value.sync!.storeId='another';
 expect(searchableCatalog(value)?.documents).toEqual([fresh]);
});
it('uses local metadata for legacy journals only for recorded sources',()=>{
 const value=state();delete value.active;delete value.sync!.entries;
 expect(searchableCatalog(value,[entry,{...entry,id:'unuploaded'}])?.entries).toEqual([entry]);
});
it('requires at least one recorded file and preserves normal completed snapshots',()=>{
 const value=state();delete value.sync;
 expect(searchableCatalog(value)).toBe(value.active);
 expect(searchableCatalog({garbage:[],sync:{storeId:'s',documents:[],entries:[entry]}})).toBeUndefined();
});
