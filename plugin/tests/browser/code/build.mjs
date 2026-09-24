import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
const [output, stock] = process.argv.slice(2);
if (!output || !stock) throw Error('Pass output directory and extracted Obsidian app.css');
const repo = path.resolve(import.meta.dirname, '../../../..');
fs.mkdirSync(output, { recursive: true });
buildSync({ entryPoints: [path.join(repo, 'plugin/src/live-example-css.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: path.join(output, 'scope.cjs') });
buildSync({ entryPoints: [path.join(repo, 'plugin/src/code-line-ranges.ts')], bundle: true, platform: 'browser', format: 'esm', outfile: path.join(output, 'ranges.js') });
buildSync({ entryPoints: [path.join(repo, 'plugin/src/code-wrap-markers.ts')], bundle: true, platform: 'browser', format: 'esm', outfile: path.join(output, 'wrap.js') });
const { scopeLiveExample } = createRequire(import.meta.url)(path.resolve(output, 'scope.cjs'));
const rows = {};
for (const id of ['code-e033', 'code-e039', 'code-panel', 'code-e048', 'code-e051', 'code-e005', 'code-e044', 'code-e059', 'code-e030', 'code-e035', 'code-e036', 'code-e041', 'code-wrap-backslash', 'code-language', 'code-colors', 'code-e037']) {
  rows[id] = scopeLiveExample(fs.readFileSync(path.join(repo, 'content/atlas/! hacks', id, 'recipe.css'), 'utf8'), 'hacksidian-live-' + id);
}
fs.writeFileSync(path.join(output, 'data.json'), JSON.stringify(rows));
fs.copyFileSync(stock, path.join(output, 'stock.css'));
fs.copyFileSync(path.join(import.meta.dirname, 'index.html'), path.join(output, 'index.html'));
