// Offline generation from verified official metadata. No source text or CSS is rewritten.
import fs from 'node:fs';
import path from 'node:path';
import {parse, stringify} from '../../plugin/node_modules/yaml/dist/index.js';
const atlas=process.argv[2] || '/Users/op/vaults/op/! P R O/hacksidian/atlas';
const data=JSON.parse(fs.readFileSync(new URL('./themes.json',import.meta.url),'utf8'));
const themes=data.themes, byRepo=new Map(themes.map(t=>[t.repo.toLowerCase(),t]));
const aliases=[['minimal.guide/','kepano/obsidian-minimal'],['elsatam.github.io/obsidian-fancy-a-story/','elsatam/obsidian-fancy-a-story'],['forum.obsidian.md/t/tweaking-the-checkboxes-in-lyt-mode-theme/57059','nickmilo/lyt-mode']];
const cards=[];
for(const id of fs.readdirSync(path.join(atlas,'! hacks'))) {
 const file=path.join(atlas,'! hacks',id,id+'.md');if(!fs.existsSync(file))continue;
 const text=fs.readFileSync(file,'utf8'),match=text.match(/^---\r?\n([\s\S]*?)\r?\n---/);if(!match)continue;
 const meta=parse(match[1]);if(!meta.tags?.includes('hacksidian_technique'))continue;
 const found=new Set();
 for(const source of meta.sources ?? []) {
  const url=new URL(source),segments=url.pathname.split('/').filter(Boolean);
  if(['github.com','raw.githubusercontent.com'].includes(url.hostname)) {
   const repo=segments.slice(0,2).join('/').toLowerCase();if(byRepo.has(repo))found.add(repo);
  }
  for(const [prefix,repo] of aliases)if((url.hostname+url.pathname).toLowerCase().startsWith(prefix))found.add(repo);
 }
 const linked=[...found].map(repo=>byRepo.get(repo)).sort((a,b)=>a.slug.localeCompare(b.slug));
 // Keep authored links as well as mechanically established source relationships.
 const links=[...new Set([...(meta.themes??[]),...linked.map(t=>t.slug)])];
 const previous=match[1].replace(/^themes:.*(?:\r?\n(?:[ \t]+.*|- .*))*\r?\n?/m,'').replace(/\s+$/,'');
 const after='---\n'+previous+'\n'+stringify({themes:links}).trimEnd()+'\n---'+text.slice(match[0].length);
 const reparsed=parse(after.match(/^---\n([\s\S]*?)\n---/)[1]);
 const withoutThemes=m=>Object.fromEntries(Object.entries(m).filter(([key])=>key!=='themes'));
 if(JSON.stringify(withoutThemes(reparsed))!==JSON.stringify(withoutThemes(meta)))throw Error('Metadata changed: '+id);
 if(after.slice(after.indexOf('\n---',4)+4)!==text.slice(match[0].length))throw Error('Body changed: '+id);
 if(after!==text)fs.writeFileSync(file,after);
 cards.push({id,title:meta.title,links});
}
const target=path.join(atlas,'! themes');fs.mkdirSync(target,{recursive:true});
for(const t of themes) {
 const linked=cards.filter(c=>c.links.includes(t.slug));
 const meta={id:'theme-'+t.slug,tags:['hacksidian_theme'],title:t.name,author:t.author,repo:t.repo,community_url:t.community_url,downloads:t.downloads,download_rank:t.rank,checked:data.checked,modes:t.modes,description:t.description};
 const body=`# ${t.name}\n\n[Obsidian Community](${t.community_url}) · [Репозиторий автора](https://github.com/${t.repo})\n\nАвтор: **${t.author}**. Режимы: ${t.modes.map(m=>m==='dark'?'тёмный':'светлый').join(', ')}.\n\n## О теме\n\n${t.description || 'Краткое описание в Obsidian Community отсутствует; посмотрите страницу темы и примеры автора.'}\n\nОписание приведено из Obsidian Community на языке источника. Скриншоты, установка и актуальное описание — на странице темы.\n\n## Почему посмотреть\n\n${linked.length?'В атласе есть приёмы, связанные с этой темой через указанные в них источники. Посмотрите тему целиком: авторское оформление и возможности шире отдельных адаптаций.':'Тема входит в 100 самых скачиваемых в официальном каталоге. Посмотрите скриншоты и описание автора, чтобы оценить её для своих заметок.'}\n\n## Связанные приёмы\n\n${linked.length?'![[atlas/! themes/themes.base#Приёмы темы]]':'Связи с приёмами пока не установлены. Это не означает, что тема не содержит похожих возможностей.'}\n\nСвязи указывают на происхождение адаптации или на механизм, подтверждённый при исследовании исходников. Конкретные доказательства находятся в карточках приёмов. Это не обещание идентичного CSS или совместимости с установленной версией темы. Исходные ссылки сохранены в карточках приёмов.\n\n## Учёт\n\nСкачиваний: **${t.downloads.toLocaleString('ru-RU')}**. Место по скачиваниям: **${t.rank}**. Дата проверки: ${data.checked}. Это накопленные скачивания, не число активных пользователей и не оценка качества.\n\n[Официальный реестр](${data.registry}) · [Статистика Obsidian](${data.statistics})\n\n[[atlas/! themes/! themes|Все темы]] · [[atlas/atlas|Атлас приёмов]]\n`;
 const cardPath=path.join(target,t.slug+'.md');
 const existingCard=fs.existsSync(cardPath)?fs.readFileSync(cardPath,'utf8'):'';
 const researchMarker='\n## Исследование приёмов\n';
 const research=existingCard.includes(researchMarker)?existingCard.slice(existingCard.indexOf(researchMarker)):'';
 fs.writeFileSync(cardPath,'---\n'+stringify(meta)+'---\n\n'+body+research);
}
fs.writeFileSync(path.join(target,'themes.base'),`views:
  - type: table
    name: Темы
    filters:
      and:
        - file.hasTag("hacksidian_theme")
    order: [file.name, title, author, downloads, download_rank, community_url]
    sort:
      - property: downloads
        direction: DESC
  - type: table
    name: Приёмы темы
    filters:
      and:
        - file.hasTag("hacksidian_technique")
        - 'list(themes).contains(this.file.name)'
    order: [file.name, title, category]
`);
fs.writeFileSync(path.join(target,'! themes.md'),`# Темы Obsidian\n\n100 самых скачиваемых тем плюс темы из источников приёмов. Срез скачиваний: ${data.checked}; всего ${themes.length} карточек. Связи с приёмами расширяются по результатам исследования исходников.\n\nОткройте карточку темы: в ней есть автор, ссылка на Obsidian Community, репозиторий и связанные приёмы. Рейтинг отражает накопленные скачивания, а не качество или число пользователей.\n\n## Картотека\n\n![[atlas/! themes/themes.base#Темы]]\n\n[[atlas/! themes/_research/! обзор|Исследование исходников 100 тем: находки и покрытие]]\n\n## Как устроены связи\n\nПоле \`themes\` в карточках приёмов содержит коды тем — названия страниц в \`! themes\`. Начальные связи установлены по репозиториям и документации в существующем поле sources; для LYT Mode — по обсуждению на форуме, указанному в источниках. Это контекст происхождения и адаптации, не обещание идентичного поведения в актуальной теме. Пустой список означает отсутствие установленной связи, а не отсутствие приёма в темах. Исходные ссылки sources и разделы «Источники» сохранены.\n\nДля LLM доступны описания тем и связанные приёмы. Тема может быть самостоятельной рекомендацией или дополнительным контекстом к приёму.\n\n[Реестр](${data.registry}) · [Скачивания](${data.statistics}) · [[atlas/atlas|Атлас]]\n`);
console.log(JSON.stringify({themes:themes.length,cards:cards.length,linkedCards:cards.filter(c=>c.links.length).length,links:cards.reduce((n,c)=>n+c.links.length,0)}));
