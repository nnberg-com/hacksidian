/** Local content integration check. No files are modified. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = process.argv[2] || '/Users/op/vaults/op/! P R O/hacksidian/playground';
let samples = 0, links = 0;
for (const lang of ['ru','en']) {
  const dir = path.join(root,lang);
  for(const filename of fs.readdirSync(dir).filter(f=>f.endsWith('.md'))) {
    const source=fs.readFileSync(path.join(dir,filename),'utf8');
    if(source.includes('callmered-coloring')) {
      samples++;
    }
    const prose=source.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');
    for(const match of prose.matchAll(/\[\[([^\]|]+?)(?:\\?\|[^\]]*)?\]\]/g)) {
      let target=match[1].replace(/\\$/,'');
      if(target.startsWith('#')||['Missing note','Несуществующая заметка'].includes(target))continue;
      assert.ok(target.startsWith(lang+'/'),`${filename}: cross-language link ${target}`);
      const file=path.join(root,target);
      assert.ok(fs.existsSync(file)||fs.existsSync(file+'.md'),`${filename}: missing ${target}`);links++;
    }
    for(const match of prose.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const target=match[1];if(/^(https?:|#)/.test(target))continue;
      assert.ok(fs.existsSync(path.resolve(dir,decodeURI(target))),`${filename}: missing ${target}`);links++;
    }
  }
}
assert.equal(samples,20);
console.log(JSON.stringify({samples,links,languageIsolation:'passed'}));
