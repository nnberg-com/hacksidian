import {expect,test} from 'vitest';
import {previewState} from '../src/preview-state';
test('header and live example share state within one view and retain it on rerender',()=>{
 const view={} as Element;const element={closest:()=>view} as unknown as HTMLElement;
 const header=previewState(element,'atlas/a'),live=previewState(element,'atlas/a');
 let enabled=live.enabled;const unsubscribe=live.subscribe(()=>{enabled=live.enabled;});
 header.set(false);expect(enabled).toBe(false);expect(previewState(element,'atlas/a').enabled).toBe(false);
 header.set(true);expect(enabled).toBe(true);unsubscribe();header.set(false);expect(enabled).toBe(true);
});
test('separate cards and note panes have independent switches',()=>{
 const a={} as Element,b={} as Element;
 const first=previewState({closest:()=>a} as any,'same');first.set(false);
 expect(previewState({closest:()=>b} as any,'same').enabled).toBe(true);
 expect(previewState({closest:()=>a} as any,'other').enabled).toBe(true);
});
