---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Мягкий перенос
category: code
sources: []
format: markdown
themes:
  - blue-topaz
  - willemstad
  - notation
  - ono-sendai
  - pink-topaz
  - yin-and-yang
  - golden-topaz
  - maple
  - ultra-lobster
  - discordian
  - lagom
favourite: false
---

```hacksidian-id
code-e018
```

```hacksidian-live
code-e018
```

```hacksidian-details
> Зачем
Читать длинный текстовый вывод без горизонтального перемещения.

> Как работает
pre-wrap сохраняет пробелы и разрешает перенос по возможным границам.
```

```hacksidian-sources
code-e018
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10316), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10316).
  Селектор: `.code-wrap pre>code>span`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L280), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L280).
  Селектор: `pre`.
  Условия CSS: `@media print`
- [[atlas/! themes/notation|Notation]]: правило CSS без отдельного переключателя — [исходник](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L506), [реализация](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L506).
  Селектор: `.app-container .markdown-preview-view pre[class*="language-note-"] code[class*="language-note-"]`.
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L158), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L158).
  Селектор: `.markdown-preview-view pre`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L2238), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L2238).
  Селектор: `pre> code>span`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2679), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2679).
  Селектор: `.theme-dark code[class*="language-"], .theme-dark pre[class*="language-"], .theme-light code[class*="language-"], .theme-light pre[class*="language-"]`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L2238), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L2238).
  Селектор: `pre> code>span`.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6548), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6548).
  Селектор: `pre code`.
  Условия CSS: `@media print`
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21767), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21767).
  Селектор: `pre, .markdown-preview-view pre`.
  Условия CSS: `@media print`
- [[atlas/! themes/discordian|Discordian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L189), [реализация](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L189).
  Селектор: `.cm-s-obsidian pre.HyperMD-codeblock`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L660), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L660).
  Селектор: `.wrap-code-blocks .markdown-rendered pre, .wrap-code-blocks .markdown-rendered pre code[class*="language-"]`.

```hacksidian-files
code-e018
```
