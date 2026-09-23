// Checked-in source snapshot from the accepted chat example. No network at build/runtime.
import fs from 'node:fs';
import path from 'node:path';
import {valueTable, writeCard, expanded} from '../parameterized-recipes.mjs';
import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const families=JSON.parse(fs.readFileSync(new URL('sources.json',import.meta.url),'utf8'));
const root=path.join(repo,'content/atlas/! hacks');
const mix=(a,b,n)=>`color-mix(in oklch, ${a} ${n}%, ${b})`;
const ref=n=>`var(--${n})`;
const markdown=`# Цвет и внимание

Хорошая палитра держит страницу целиком: основной текст, тихие подписи, [ссылки](https://obsidian.md) и состояния интерфейса. ==Важное можно подсветить==.

> [!note] Заметка
> Идея, к которой хочется вернуться.

> [!success] Готово
> Наблюдение сохранено в дневнике.

> [!warning] Внимание
> У приглушённого текста свой контраст.

> [!error] Ошибка
> Не удалось найти связанную заметку.

- [x] Проверить заметку в режиме чтения
- [ ] Проверить Live Preview

\`\`\`js
const palette = "согласованный набор";
apply(palette);
\`\`\`

#наблюдения #цветовая-палитра
`;
const options=[]; const previews={};
const directory=path.join(root,'palette');fs.mkdirSync(directory,{recursive:true});
for(const f of families)for(const v of f.variants){
 const id=v.id,mode='light';
 const vars={...v.values};const accent=vars['color-accent'];delete vars['color-accent'];
 const base={'00':ref('background-primary'),'05':mix(ref('background-primary'),ref('background-secondary'),50),'10':ref('background-secondary'),'20':ref('background-secondary'),'25':ref('background-modifier-hover'),'30':ref('background-modifier-border'),'35':mix(ref('background-modifier-border'),ref('text-faint'),60),'40':mix(ref('background-modifier-border'),ref('text-faint'),30),'50':ref('text-faint'),'60':mix(ref('text-faint'),ref('text-muted'),50),'70':ref('text-muted'),'100':ref('text-normal')};
 for(const [k,val] of Object.entries(base))vars['color-base-'+k]=val;
 Object.assign(vars,{'background-primary-alt':ref('background-secondary'),'background-secondary-alt':ref('background-secondary'),'background-modifier-border-hover':ref('color-base-35'),'background-modifier-border-focus':ref('color-base-40'),'background-modifier-form-field':ref('background-primary'),'interactive-normal':ref('background-secondary'),'interactive-hover':ref('background-modifier-hover'),'text-highlight-bg':mix(ref('color-yellow'),'transparent',28),'text-error':ref('color-red'),'text-warning':ref('color-orange'),'text-success':ref('color-green'),'background-modifier-error':ref('color-red'),'background-modifier-warning':ref('color-orange'),'background-modifier-success':ref('color-green'),'code-background':ref('background-secondary'),'code-normal':ref('text-normal'),'code-comment':ref('text-faint'),'code-keyword':ref('color-purple'),'code-string':ref('color-green'),'code-function':ref('color-blue'),'code-operator':ref('text-muted'),'code-property':ref('color-cyan'),'code-tag':ref('color-red'),'code-value':ref('color-orange')});
 const preview={format:1,family:f.name,familyId:f.id,variant:v.name,mode,source:f.url,note:f.note.replace('orange взят из syntax constant','orange назначен из цвета строк (наша адаптация)'),accent,refs:v.refs};
 const title=f.name+' — '+v.name;
 options.push({id,title,values:Object.fromEntries(Object.entries(vars).map(([k,v])=>['--hacksidian-palette-'+k,v])),note:preview.note+'\n\n[Источник]('+f.url+')'});
 previews[id]=preview;
}
const variable='--hacksidian-palette-choice';
const recipe=path.join(directory,'recipe.css');
let css='/* Light palette. Source values are mapped through one shared role schema. */\nbody.theme-light {\n';
css+=valueTable(variable,'Палитра',options,'flexoki-1',fs.existsSync(recipe)?fs.readFileSync(recipe,'utf8'):'');
for(const key of Object.keys(options[0].values)) {
 const native=key.replace('--hacksidian-palette-','');
 const color=native.match(/^color-(red|orange|yellow|green|cyan|blue|purple|pink)$/)?.[1];
 // Manual semantic colors take precedence even when this palette is applied later.
 const value=color ? `var(--hacksidian-semantic-${color}, var(${key}))` : `var(${key})`;
 css+=`  --${native}: ${value};\n`;
}
css+='}\n';
fs.writeFileSync(recipe,css);
const replaces=JSON.parse(fs.readFileSync(new URL('legacy-ids.json',import.meta.url),'utf8'));
fs.writeFileSync(path.join(directory,'hack.json'),JSON.stringify({format:2,target:'g-palette',hasCss:true,group:'palette',replaces},null,2)+'\n');
fs.writeFileSync(path.join(directory,'palette.json'),JSON.stringify({parameter:variable,variants:previews},null,2)+'\n');
fs.writeFileSync(path.join(directory,'markdown.md'),markdown);
writeCard(directory,'palette','Палитра','palette',families.map(f=>f.url),'Выбрать согласованный набор цветов заметок и интерфейса. Пользовательский акцент сохраняется.');
fs.writeFileSync(path.join(directory,'expanded.md'),expanded('palette','Палитра',variable,options));
fs.writeFileSync(path.join(repo,'content/atlas/! categories/palette.md'),"---\nsnippet: hacksidian-00-palette.css\ntitle: Палитра\n---\n\n# Палитра → `$=dv.el(\"code\", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, \"! hacks\"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + \"-\"))).length`\n\n[[atlas/! hacks/palette/expanded|Сравнить варианты палитры]] · [[playground/palette|Палитра на настоящем Markdown]]\n\n```hacksidian-category\npalette\n```\n");
fs.writeFileSync(path.join(repo,'content/playground/palette.md'),'# Проверка палитры\n\n[[atlas/! hacks/palette/expanded|Выбрать палитру]]\n\n'+markdown);
console.log('Generated one palette technique, '+options.length+' light variants');
