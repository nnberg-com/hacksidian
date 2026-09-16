import {expect,test,vi} from 'vitest';
vi.mock('obsidian',()=>({MarkdownRenderChild:class{},Component:class{}}));
import {belongsToCategory} from '../src/category-examples';
test('category gallery selects its canonical cards including nested folders',()=>{
 const meta={tags:['hacksidian_technique'],category:'table'};
 expect(belongsToCategory('atlas/! hacks/table-a/table-a.md','atlas','table',meta)).toBe(true);
 expect(belongsToCategory('atlas/! hacks/other/table-b/table-b.md','atlas','table',meta)).toBe(true);
 for(const path of ['atlas/! hacks/table-a/markdown.md','private/table-a/table-a.md','atlas/! categories/table.md'])expect(belongsToCategory(path,'atlas','table',meta)).toBe(false);
 expect(belongsToCategory('atlas/! hacks/table-a/table-a.md','atlas','list',meta)).toBe(false);
 expect(belongsToCategory('atlas/! hacks/table-a/table-a.md','atlas','table',{category:'table'})).toBe(false);
});
