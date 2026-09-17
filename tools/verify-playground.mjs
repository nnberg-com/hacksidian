/** Local content integration check. No files are modified. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = process.argv[2] || fileURLToPath(new URL('../content/playground/', import.meta.url));
let samples = 0, links = 0;
{
  const dir = root;
  assert.deepEqual(fs.readdirSync(root).sort(), ['assets', ...Array.from({length:10}, (_, i) => `p${String(i+1).padStart(3,'0')}.md`)].sort());
  assert.deepEqual(fs.readdirSync(path.join(root, 'assets')), ['pole-chteniya.svg']);
  for(const filename of fs.readdirSync(dir).filter(f=>f.endsWith('.md'))) {
    const source=fs.readFileSync(path.join(dir,filename),'utf8');
    if(source.includes('hacksidian-coloring')) {
      samples++;
    }
    const prose=source.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');
    for(const match of prose.matchAll(/\[\[([^\]|]+?)(?:\\?\|[^\]]*)?\]\]/g)) {
      let target=match[1].replace(/\\$/,'');
      if(target.startsWith('#')||['Missing note','Несуществующая заметка'].includes(target))continue;
      const file=path.join(root,target);
      assert.ok(fs.existsSync(file)||fs.existsSync(file+'.md'),`${filename}: missing ${target}`);links++;
    }
    for(const match of prose.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const target=match[1];if(/^(https?:|#)/.test(target))continue;
      assert.ok(fs.existsSync(path.resolve(dir,decodeURI(target))),`${filename}: missing ${target}`);links++;
    }
  }
}
assert.equal(samples,10);
console.log(JSON.stringify({samples,links,articleOnlyStructure:'passed'}));
