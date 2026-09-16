/** Embed live widgets only where the same runtime capability check accepts the source. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import esbuild from '../plugin/node_modules/esbuild/lib/main.js';
const atlas=process.argv[2];if(!atlas)throw Error('Pass the atlas source directory');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'hacksidian-live-'));
let api;try {
 await esbuild.build({entryPoints:[new URL('../plugin/src/live-example-css.ts',import.meta.url).pathname],bundle:true,platform:'node',format:'cjs',outfile:path.join(temp,'compiler.cjs')});
 api=createRequire(import.meta.url)(path.join(temp,'compiler.cjs'));
}finally{fs.rmSync(temp,{recursive:true,force:true});}
const report=[];
for(const id of fs.readdirSync(path.join(atlas,'! hacks')).sort()){
 const dir=path.join(atlas,'! hacks',id);if(!fs.existsSync(path.join(dir,'hack.json')))continue;
 const group=JSON.parse(fs.readFileSync(path.join(dir,'hack.json'),'utf8')).group;
 const css=fs.readFileSync(path.join(dir,'recipe.css'),'utf8');const languages={},reasons=[];
 let title=id;
 for(const lang of ['ru']){
  const desc=path.join(dir,`${id}.md`),sample=path.join(dir,`Markdown.${lang}.md`);
  if(!fs.existsSync(desc))continue;
  let text=fs.readFileSync(desc,'utf8');if(lang==='ru')title=text.match(/^title:\s*(.+)$/m)?.[1]?.replace(/^['"]|['"]$/g,'')||id;
  const issue=fs.existsSync(sample)?api.liveExampleIssue(group,fs.readFileSync(sample,'utf8'),css):'Нет Markdown-примера на этом языке.';
  languages[lang]=!issue;if(issue)reasons.push(`${lang}: ${issue}`);
  const heading=lang==='ru'?'Живой пример в Obsidian':'Live example in Obsidian';
  text=text.replace(new RegExp('\\n## '+heading+'\\n[\\s\\S]*?(?=\\n## |$)'),'');
  if(!issue){let index=text.indexOf('\n## ');if(index<0)index=text.length;
   text=text.slice(0,index)+`\n## ${heading}\n\n\`\`\`hacksidian-live\n${id}\n\`\`\`\n`+text.slice(index);
  }
  fs.writeFileSync(desc,text);
 }
 report.push({id,title,group,languages,reasons});
}
const names={text:'Текст',heading:'Заголовки',link:'Ссылки',image:'Изображения',code:'Блоки кода','inline-code':'Строчный код',quote:'Цитаты',callout:'Callout',list:'Списки',task:'Задачи','pseudo-task':'Псевдозадачи',table:'Таблицы',tag:'Теги',footnote:'Сноски',hr:'Разделители',note:'Содержимое заметки',emphasis:'Выделение',iframe:'Встраивания',interface:'Интерфейс',meta:'Настройки заметки',metadata:'Свойства'};
const groups={};for(const item of report)(groups[item.group]??=[]).push(item);
const enabled=report.filter(x=>x.languages.ru),deferred=report.filter(x=>!x.languages.ru);
const notes=path.join(atlas,'! defaults');fs.mkdirSync(notes,{recursive:true});
fs.writeFileSync(path.join(notes,'live-examples-coverage.json'),JSON.stringify({total:report.length,enabled:enabled.length,deferred:deferred.length,recipes:report},null,2)+'\n');
let summary=`# Живые примеры — покрытие\n\nВсего: ${report.length}. Встроены в русские карточки: ${enabled.length}. Отложены: ${deferred.length}.\n\nПокрытие проверено по исходникам и правилам изоляции. Все примеры используют штатный MarkdownRenderer; визуальная и поведенческая приёмка каждого примера ещё не проведена. Возможные отличия HTML-структуры Obsidian и приоритеты текущей темы требуют проверки при просмотре.\n\n| Категория | Встроены | Отложены |\n|---|---:|---:|\n`;
let index='# Живые примеры\n\nОткройте карточку в режиме чтения: живой пример находится в начале. «С приёмом» включает и выключает CSS; ширину области можно менять, длинные примеры прокручиваются. Чекбоксы меняют только состояние примера.\n\n[Покрытие и отложенные приёмы](./!%20defaults/Живые%20примеры%20—%20покрытие.md)\n\n';
for(const [group,items] of Object.entries(groups)){
 const yes=items.filter(x=>x.languages.ru);summary+=`| ${names[group]||group} | ${yes.length} | ${items.length-yes.length} |\n`;
 if(yes.length){index+=`## ${names[group]||group}\n\n`;for(const r of yes)index+=`- [${r.title.replaceAll('[','').replaceAll(']','')}](./!%20hacks/${r.id}/${r.id}.md)\n`;index+='\n';}
}
summary+='\n## Отложенные приёмы\n\n';for(const r of deferred)summary+=`- [${r.title.replaceAll('[','').replaceAll(']','')}](../!%20hacks/${r.id}/${r.id}.md) (${r.id}): ${r.reasons.filter(s=>s.startsWith('ru:')).map(s=>s.slice(4)).join('; ')}\n`;
fs.writeFileSync(path.join(notes,'Живые примеры — покрытие.md'),summary);
fs.writeFileSync(path.join(atlas,'Живые примеры.md'),index);
console.log(JSON.stringify({total:report.length,enabled:enabled.length,deferred:deferred.length}));
