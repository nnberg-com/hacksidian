---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Капитель
category: heading
sources: []
format: markdown
themes:
  - things
  - maple
---

```hacksidian-id
heading-e006
```

```hacksidian-live
heading-e006
```

```hacksidian-details
> Зачем
Книжные рубрики и спокойные названия частей.

> Как работает
font-variant-caps: small-caps оставляет прописные крупными, а строчные показывает малыми прописными.

> Ограничения
Если в шрифте нет настоящей капители, браузер может синтезировать её. Здесь результат зависит от системного serif.
```

```hacksidian-sources
heading-e006
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/things|Things]]: **H1 small caps** (`h1-small-caps`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1701), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L360).
  Селектор: `body.h1-small-caps h1, body.h1-small-caps .HyperMD-header.HyperMD-header-1.cm-line`.
- [[atlas/! themes/things|Things]]: **H2 small caps** (`h2-small-caps`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1743), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L364).
  Селектор: `body.h2-small-caps h2, body.h2-small-caps .HyperMD-header.HyperMD-header-2.cm-line`.
- [[atlas/! themes/things|Things]]: **H3 small caps** (`h3-small-caps`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1773), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L368).
  Селектор: `body.h3-small-caps h3, body.h3-small-caps .HyperMD-header.HyperMD-header-3.cm-line`.
- [[atlas/! themes/things|Things]]: **H4 small caps** (`h4-small-caps`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1822), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L372).
  Селектор: `body.h4-small-caps h4, body.h4-small-caps .HyperMD-header.HyperMD-header-4.cm-line`.
- [[atlas/! themes/things|Things]]: **H5 small caps** (`h5-small-caps`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1858), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L376).
  Селектор: `body.h5-small-caps h5, body.h5-small-caps .HyperMD-header.HyperMD-header-5.cm-line`.
- [[atlas/! themes/things|Things]]: **H6 small caps** (`h6-small-caps`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1894), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L380).
  Селектор: `body.h6-small-caps h6, body.h6-small-caps .HyperMD-header.HyperMD-header-6.cm-line`.
- [[atlas/! themes/maple|Maple]]: **H1 Small Caps Text Variant** (`heading-h1-caps`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1187), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5737).
  Селектор: `body.heading-h1-caps`.
- [[atlas/! themes/maple|Maple]]: **H2 Small Caps Text Variant** (`heading-h2-caps`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1274), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5746).
  Селектор: `body.heading-h2-caps`.
- [[atlas/! themes/maple|Maple]]: **H3 Small Caps Text Variant** (`heading-h3-caps`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1361), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5755).
  Селектор: `body.heading-h3-caps`.
- [[atlas/! themes/maple|Maple]]: **H4 Small Caps Text Variant** (`heading-h4-caps`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1448), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5764).
  Селектор: `body.heading-h4-caps`.
- [[atlas/! themes/maple|Maple]]: **H5 Small Caps Text Variant** (`heading-h5-caps`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1535), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5773).
  Селектор: `body.heading-h5-caps`.
- [[atlas/! themes/maple|Maple]]: **H6 Small Caps Text Variant** (`heading-h6-caps`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1622), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5782).
  Селектор: `body.heading-h6-caps`.

```hacksidian-files
heading-e006
```
