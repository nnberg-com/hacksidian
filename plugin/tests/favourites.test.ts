import { expect, test } from 'vitest';
import { Favourites } from '../src/favourites';
function fixture(){
 const metadata: Record<string,{favourite?:boolean;title:string}>={'a.md':{title:'A'},'b.md':{title:'B'}};
 let fail=false;
 const store=new Favourites({list:()=>Object.keys(metadata).filter(path=>metadata[path].favourite===true),has:path=>metadata[path]?.favourite===true,toggle:async path=>{if(fail)throw Error('Write failed');metadata[path].favourite=metadata[path].favourite!==true;}});
 return {metadata,store,fail:()=>{fail=true;},recover:()=>{fail=false;}};
}
test('writes and reads card metadata, preserving other properties',async()=>{
 const {store,metadata}=fixture();await store.toggle('a.md');expect(metadata['a.md']).toEqual({title:'A',favourite:true});expect(store.list()).toEqual(['a.md']);
 await store.toggle('a.md');expect(metadata['a.md'].favourite).toBe(false);expect(store.list()).toEqual([]);
 metadata['b.md'].favourite=true;expect(store.list()).toEqual(['b.md']);
});
test('manual metadata changes refresh subscribers; rapid toggles use latest metadata',async()=>{
 const {store,metadata}=fixture();const changes:string[][]=[];const off=store.subscribe(()=>changes.push(store.list()));
 metadata['b.md'].favourite=true;store.refresh();expect(changes).toEqual([['b.md']]);
 await Promise.all([store.toggle('a.md'),store.toggle('a.md')]);expect(store.list()).toEqual(['b.md']);
 off();store.refresh();expect(changes).toHaveLength(3);
});
test('failed writes leave metadata intact and allow retries',async()=>{
 const f=fixture();f.fail();await expect(f.store.toggle('a.md')).rejects.toThrow('Write failed');expect(f.store.has('a.md')).toBe(false);
 f.recover();await f.store.toggle('a.md');expect(f.store.has('a.md')).toBe(true);
});
