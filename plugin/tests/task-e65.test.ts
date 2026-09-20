import {readFileSync} from 'node:fs';
import {expect,test} from 'vitest';
import {readParameters,parameterInput,updateParameter} from '../src/parameters';
import {scopeLiveExample} from '../src/live-example-css';
import {addHack} from '../src/hacks';
const css=readFileSync(new URL('../../content/atlas/! hacks/task-e65/recipe.css',import.meta.url),'utf8');
test('completed and in-progress labels edit independently, including empty text',()=>{
 const [done,progress]=readParameters(css);
 expect(done.variable).toBe('--hacksidian-task-e65-done-label');
 expect(progress.variable).toBe('--hacksidian-task-e65-progress-label');
 expect(progress.label).toBe('Подпись раздела в работе');
 for(const input of ['in progress','', 'Осталось «чуть-чуть»']){
  const next=updateParameter(css,progress.variable,input);
  expect(parameterInput(readParameters(next)[1])).toBe(input);
  expect(readParameters(next)[0]).toEqual(done);
 }
 expect(()=>updateParameter(css,progress.variable,'a'.repeat(41))).toThrow();
});
test('updated recipe is independently scopeable and replaces only its installed block',()=>{
 expect(scopeLiveExample(css,'hacksidian-live-task-label-test')).toContain('.el-h2');
 const before={format:1 as const,modules:[{id:'g-task',component:'task',css:'/* before */\n/* hacksidian:hack:task-e65:start */\nh2::after { content: "old"; }\n/* hacksidian:hack:task-e65:end */\n/* after */'},{id:'g-link',component:'link',css:'/* unchanged */'}]};
 const hack={id:'task-e65',title:'Section status',path:'atlas/task-e65.md',css,spec:{format:2,target:'g-task',hasCss:true}};
 const updated=addHack(before,hack).style;
 expect(updated.modules[0].css).toContain(css);expect(updated.modules[0].css).toContain('/* before */');expect(updated.modules[0].css).toContain('/* after */');
 expect(updated.modules[1]).toEqual(before.modules[1]);expect(addHack(updated,hack).changed).toBe(false);
});
