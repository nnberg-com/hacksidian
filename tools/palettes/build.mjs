// Checked-in source snapshot from the accepted chat example. No network at build/runtime.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const families=JSON.parse(fs.readFileSync(new URL('sources.json',import.meta.url),'utf8'));
const root=path.join(repo,'content/atlas/! hacks');
const mix=(a,b,n)=>`color-mix(in oklch, ${a} ${n}%, ${b})`;
const ref=n=>`var(--${n})`;
// sRGB compatibility values for legacy callouts; main colors retain source OKLCH.
function rgb(value){
 if(/^#[0-9a-f]{6}$/i.test(value))return [1,3,5].map(i=>parseInt(value.slice(i,i+2),16));
 value=value.replace(/([\d.]+)%/,(_,n)=>String(Number(n)/100));
 const m=value.match(/^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/);if(!m)throw Error(value);
 const [L,C,H]=m.slice(1).map(Number),a=C*Math.cos(H*Math.PI/180),b=C*Math.sin(H*Math.PI/180);
 const l=(L+.3963377774*a+.2158037573*b)**3,mm=(L-.1055613458*a-.0638541728*b)**3,s=(L-.0894841775*a-1.291485548*b)**3;
 return [4.0767416621*l-3.3077115913*mm+.2309699292*s,-1.2684380046*l+2.6097574011*mm-.3413193965*s,-.0041960863*l-.7034186147*mm+1.707614701*s].map(x=>Math.round(255*Math.max(0,Math.min(1,x<=.0031308?12.92*x:1.055*x**(1/2.4)-.055))));
}
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
const index=[];
for(const f of families)for(const v of f.variants){
 const id='palette-'+v.id,mode=v.dark?'dark':'light',d=path.join(root,id);fs.mkdirSync(d,{recursive:true});
 const vars={...v.values};const accent=vars['color-accent'];delete vars['color-accent'];
 const base={'00':ref('background-primary'),'05':mix(ref('background-primary'),ref('background-secondary'),50),'10':ref('background-secondary'),'20':ref('background-secondary'),'25':ref('background-modifier-hover'),'30':ref('background-modifier-border'),'35':mix(ref('background-modifier-border'),ref('text-faint'),60),'40':mix(ref('background-modifier-border'),ref('text-faint'),30),'50':ref('text-faint'),'60':mix(ref('text-faint'),ref('text-muted'),50),'70':ref('text-muted'),'100':ref('text-normal')};
 for(const [k,val] of Object.entries(base))vars['color-base-'+k]=val;
 Object.assign(vars,{'background-primary-alt':ref('background-secondary'),'background-secondary-alt':ref('background-secondary'),'background-modifier-border-hover':ref('color-base-35'),'background-modifier-border-focus':ref('color-base-40'),'background-modifier-form-field':ref('background-primary'),'interactive-normal':ref('background-secondary'),'interactive-hover':ref('background-modifier-hover'),'text-highlight-bg':mix(ref('color-yellow'),'transparent',28),'text-error':ref('color-red'),'text-warning':ref('color-orange'),'text-success':ref('color-green'),'background-modifier-error':ref('color-red'),'background-modifier-warning':ref('color-orange'),'background-modifier-success':ref('color-green'),'code-background':ref('background-secondary'),'code-normal':ref('text-normal'),'code-comment':ref('text-faint'),'code-keyword':ref('color-purple'),'code-string':ref('color-green'),'code-function':ref('color-blue'),'code-operator':ref('text-muted'),'code-property':ref('color-cyan'),'code-tag':ref('color-red'),'code-value':ref('color-orange')});
 for(const color of ['red','orange','yellow','green','cyan','blue','purple','pink'])vars['color-'+color+'-rgb']=rgb(vars['color-'+color]).join(', ');
 vars['text-highlight-bg-rgb']=vars['color-yellow-rgb'];
 const css=`/* ${f.name} — ${v.name}. Source: ${f.url}\n * Semantic/base mapping: Hacksidian adaptation. Accent remains an Obsidian setting. */\n/* hacksidian:exclusive:palette-${mode} */\nbody.theme-${mode} {\n${Object.entries(vars).map(([k,val])=>'  --'+k+': '+val+';').join('\n')}\n}\n`;
 const spec={format:2,target:'g-palette',hasCss:true,group:'palette',exclusiveGroup:'palette-'+mode};
 const preview={format:1,family:f.name,familyId:f.id,variant:v.name,mode,source:f.url,note:f.note.replace('orange взят из syntax constant','orange назначен из цвета строк (наша адаптация)'),accent,refs:v.refs};
 fs.writeFileSync(path.join(d,'recipe.css'),css);fs.writeFileSync(path.join(d,'hack.json'),JSON.stringify(spec,null,2)+'\n');fs.writeFileSync(path.join(d,'palette.json'),JSON.stringify(preview,null,2)+'\n');fs.writeFileSync(path.join(d,'markdown.md'),markdown);
 const title=f.name+' — '+v.name;
 fs.writeFileSync(path.join(d,id+'.md'),`---\ntags:\n  - hacksidian_technique\n  - hacksidian_palette\ntitle: ${JSON.stringify(title)}\ncategory: palette\nsources:\n  - ${JSON.stringify(f.url)}\n  - "https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors"\nformat: markdown\nthemes: []\n---\n\n\`\`\`hacksidian-id\n${id}\n\`\`\`\n\n\`\`\`hacksidian-live\n${id}\n\`\`\`\n\n\`\`\`hacksidian-details\n> Зачем\nСменить согласованный набор цветов заметок и интерфейса в ${v.dark?'тёмном':'светлом'} режиме Obsidian.\n\n> Как работает\n${preview.note}\nРецепт меняет только штатные цветовые переменные: базовую шкалу, семантические роли и восемь расширенных цветов. Недостающие ступени базовой шкалы получены смешением — это наша адаптация. Пользовательский акцент в настройках Obsidian сохраняется; авторский акцент можно посмотреть только в примере. Новый приём заменяет ранее включённую палитру того же режима. Палитра другого режима сохраняется.\n\n> Ограничения\nДействует только в ${v.dark?'тёмном':'светлом'} режиме; режим приложения не переключает. Пример — изолированная модель интерфейса, а не снимок Obsidian. Проверено по цветовым переменным Obsidian 1.13.7; сторонние темы и плагины могут переопределять цвета. Шрифты, размеры и геометрия не меняются. Повторяющиеся цвета и наша сборка отмечены в описании; контраст зависит от выбранной роли.\n\`\`\`\n\n\`\`\`hacksidian-sources\n${id}\n\`\`\`\n\n\`\`\`hacksidian-files\n${id}\n\`\`\`\n`);
 index.push({id,title});
}
fs.writeFileSync(path.join(repo,'content/atlas/! categories/palette.md'),`---\ngroup: palette\nsnippet: hacksidian-00-palette.css\ntitle: Палитры\n---\n\n# Палитры\n\n${families.length} источников · ${index.length} вариантов. Все светлые и тёмные варианты показаны ниже, по семействам. Каждый образец показывает фоны, текст, выделения, состояния и восемь цветов Obsidian.\n\nПросмотр локален. «Включить» применяет выбранный приём ко всему Obsidian и заменяет предыдущую палитру того же режима. Пользовательский акцент сохраняется; светлый и тёмный режимы настраиваются независимо.\n\n[[atlas/! categories/! categories|Все категории]] · [[playground/palette|Палитра на настоящем Markdown]]\n\n\`\`\`hacksidian-category\npalette\n\`\`\`\n\n## Все варианты\n\n${index.map(({id,title})=>`- [[atlas/! hacks/${id}/${id}|${title}]]`).join('\n')}\n`);
fs.writeFileSync(path.join(repo,'content/playground/palette.md'),'# Проверка палитры\n\n[[atlas/! categories/palette|Выбрать палитру]]\n\n'+markdown);
console.log('Generated '+index.length+' palette recipes.');
