import {expect,test} from 'vitest';
import {activatePreviewTarget} from '../src/live-example-target';
function fixture(){
 const node=(id:string)=>({id,selected:false,setAttribute(){this.selected=true;},removeAttribute(){this.selected=false;}});
 const first=node('fn 1'),second=node('fn-2');
 const root={querySelectorAll:(selector:string)=>selector==='[id]'?[first,second]:[first,second].filter(n=>n.selected)} as unknown as ParentNode;
 return {root,first,second};
}
test('fragment navigation selects only a local target and clears its predecessor',()=>{
 const {root,first,second}=fixture();expect(activatePreviewTarget(root,'#fn%201')).toBe(first);expect(first.selected).toBe(true);
 expect(activatePreviewTarget(root,'#fn-2')).toBe(second);expect(second.selected).toBe(true);expect(first.selected).toBe(false);
});
test('missing, external and malformed links do not change local state',()=>{
 const {root,first}=fixture();first.selected=true;
 for(const href of ['#outside','https://example.org/#fn%201','Other.md#fn%201','#%ZZ'])expect(activatePreviewTarget(root,href)).toBeNull();
 expect(first.selected).toBe(true);
});
