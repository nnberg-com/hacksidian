import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { valueTable, writeCard, expanded } from '../parameterized-recipes.mjs';
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const systems = JSON.parse(fs.readFileSync(new URL('sources.json', import.meta.url), 'utf8'));
const directory = path.join(repo, 'content/atlas/! hacks/text-system');
fs.mkdirSync(directory, {recursive:true});
const variable = '--hacksidian-text-system-choice';
const number = n => String(Number(n.toFixed(8)));
const length = n => `calc(var(--font-text-size) * ${number(n)})`;
const options = systems.map(s => {
  if (s.headings.length !== 6) throw Error(`${s.id}: all H1–H6 required`);
  const values = {'--hacksidian-text-system-leading': number(s.leading)};
  s.headings.forEach((h,i) => {
    for (const key of ['size','leading','weight','style','before','after','tracking','transform']) {
      if (h[key] === undefined) throw Error(`${s.id} H${i+1}: ${key}`);
      values[`--hacksidian-text-system-h${i+1}-${key}`] = ['size','before','after'].includes(key) ? length(h[key]) : typeof h[key] === 'number' ? number(h[key]) : h[key];
    }
  });
  return {id:s.id,title:s.title,values,note:`${s.evidence}\n\n[Источник](${s.source})`};
});
const recipe = path.join(directory,'recipe.css');
let css = '/* H1–H6. Source facts and explicit adaptations: sources.md. */\n.markdown-preview-view, .markdown-source-view {\n';
css += valueTable(variable, 'Текстовая система', options, 'uswds', fs.existsSync(recipe) ? fs.readFileSync(recipe,'utf8') : '');
css += '  --line-height-normal: var(--hacksidian-text-system-leading);\n';
for (let n=1;n<=6;n++) for (const [target,source] of [['size','size'],['line-height','leading'],['weight','weight'],['style','style']]) css += `  --h${n}-${target}: var(--hacksidian-text-system-h${n}-${source});\n`;
css += '}\n.markdown-preview-view, .markdown-source-view .cm-scroller { line-height: var(--line-height-normal); }\n';
for (let n=1;n<=6;n++) css += `
.markdown-preview-view h${n}, .markdown-source-view .cm-line.HyperMD-header-${n} {
  --heading-spacing: var(--hacksidian-text-system-h${n}-before);
  --p-spacing: var(--hacksidian-text-system-h${n}-after);
  font-size: var(--h${n}-size);
  line-height: var(--h${n}-line-height);
  font-weight: var(--h${n}-weight);
  font-style: var(--h${n}-style);
  letter-spacing: var(--hacksidian-text-system-h${n}-tracking);
  text-transform: var(--hacksidian-text-system-h${n}-transform);
}
.markdown-preview-view h${n} { margin-block-start: var(--heading-spacing); margin-block-end: var(--p-spacing); }
.markdown-source-view .cm-line.HyperMD-header-${n} { padding-block-start: var(--heading-spacing); padding-block-end: var(--p-spacing); }
.markdown-source-view .cm-line.HyperMD-header-${n} + .cm-line:not(.HyperMD-header) { padding-top: 0; }
.markdown-preview-view h${n} + p, .markdown-preview-view .el-h${n} + .el-p > p { margin-block-start: 0; }
.markdown-preview-view p:has(+ h${n}), .markdown-preview-view .el-p:has(+ .el-h${n}) > p { margin-block-end: 0; }
`;
fs.writeFileSync(recipe,css);
fs.writeFileSync(path.join(directory,'hack.json'),JSON.stringify({format:2,target:'g-text',hasCss:true,group:'text',replaces:systems.map(s=>'text-system-'+s.id)},null,2)+'\n');
writeCard(directory,'text-system','Текстовая система','text',[...systems.map(s=>s.source),'sources.md'],'Выбрать целостное оформление текста и всех шести уровней заголовков. Десять вариантов; дополнения исходных систем явно отмечены.');
const prose=['Как устроена хорошая заметка','От наблюдения к вопросу','Оставить место для следующего шага','Небольшое уточнение','Проверить подробности','Вернуться к исходному наблюдению'];
fs.writeFileSync(path.join(directory,'markdown.md'),prose.map((title,i)=>`${'#'.repeat(i+1)} ${title}\n\nЗапись начинается с наблюдения. Несколько строк помогают сохранить контекст и вернуться к мысли через неделю, месяц или год. Важно сохранить не только вывод, но и ход рассуждения: почему одна деталь оказалась существенной.\n`).join('\n'));
fs.writeFileSync(path.join(directory,'expanded.md'),expanded('text-system','Текстовая система',variable,options));
fs.writeFileSync(path.join(directory,'sources.md'),'# Источники и адаптации\n\nПроверено 2026-09-23. Числа в таблицах нормированы к пользовательскому размеру текста; гарнитуры не назначаются. Размер, отбивки — множители базового размера; интерлиньяж — множитель размера самого заголовка. Сопоставление книжных/дизайн-токенов уровням Markdown является адаптацией.\n\n'+systems.map(s=>`## ${s.title}\n\n${s.evidence}\n\n[Первоисточник](${s.source})\n\nИнтерлиньяж текста: ${s.leading}.\n\n| Уровень | Размер | Интерлиньяж | Насыщенность | Стиль | До | После | Трекинг | Регистр |\n|---|---:|---:|---:|---|---:|---:|---|---|\n`+s.headings.map((h,i)=>`| H${i+1} | ${number(h.size)} | ${number(h.leading)} | ${h.weight} | ${h.style} | ${number(h.before)} | ${number(h.after)} | ${h.tracking} | ${h.transform} |`).join('\n')).join('\n\n')+'\n');
console.log('Generated one text-system technique, 10 variants, 60 headings');
