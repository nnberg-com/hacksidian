import {expect,test} from 'vitest';
import {enabledTechniquePaths} from '../src/enabled-techniques';
test('enabled list follows applied CSS blocks and excludes sample and unrelated notes',()=>{
 const files=['atlas/! hacks/a/a.md','atlas/! hacks/a/markdown.md','atlas/! hacks/b/b.md','atlas/! hacks/parent/c/c.md','other/a/a.md'].map(path=>({path}));
 const style:any={format:1,modules:[{id:'g-text',component:'text',css:'/* hacksidian:hack:a:start */\na{}\n/* hacksidian:hack:a:end */\n/* hacksidian:hack:c:start */\nc{}\n/* hacksidian:hack:c:end */'}]};
 expect(enabledTechniquePaths(files,'atlas/',style)).toEqual(['atlas/! hacks/a/a.md','atlas/! hacks/parent/c/c.md']);
 style.modules[0].css='';expect(enabledTechniquePaths(files,'atlas',style)).toEqual([]);
 expect(enabledTechniquePaths(files,'atlas',undefined)).toEqual([]);
});
