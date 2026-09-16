---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Полная сетка
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables
format: markdown
themes:
  - minimal
  - sanctum
  - anuppuccin
  - blue-topaz
  - obsidian-nord
  - obsidian-gruvbox
  - shimmering-focus
  - ono-sendai
  - shiba-inu
  - pink-topaz
  - dracula-official
  - cyber-glow
  - obuntu
  - material-gruvbox
  - royal-velvet
  - golden-topaz
  - ultra-lobster
  - kakano
  - sandstorm
  - wikipedia
  - underwater
  - gitsidian
  - fancy-a-story
  - vicious
  - transparent
  - material-flat
  - ebullientworks
  - lagom
---

```hacksidian-id
table-e002
```

```hacksidian-live
table-e002
```

```hacksidian-details
> Зачем
Плотные матрицы, расписания и таблицы для ручной сверки.

> Как работает
border на каждой ячейке; collapse объединяет соседние линии.
```

```hacksidian-sources
table-e002
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Cell lines** (`table-lines`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8099), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3333).
  Селектор: `.table-lines`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Enable Table Styling** (`anp-table-toggle`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L848), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5783).
  Селектор: `.anp-table-toggle .markdown-preview-view:not(.cards):not(.table-disable) table, .anp-table-toggle .markdown-preview-view:not(.cards):not(.table-disable) table td, .anp-table-toggle .markdown-preview-view:not(.cards):not(.table-disable) table th, .anp-table-toggle .markdown-preview-view:not(.cards):not(.table-disable) table thead tr > th:first-child, .anp-table-toggle .markdown-preview-view:not(.cards):not(.table-disable) table thead tr > th, .anp-table-toggle .markdown-preview-view:not(.cards):not(.table-disable) table thead tr > th:last-child, .anp-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview), .anp-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) td, .anp-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) th, .anp-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) thead tr > th:first-child, .anp-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) thead tr > th, .anp-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) thead tr > th:last-child, .anp-table-toggle .is-live-preview:not(.cards):not(.table-disable) table, .anp-table-toggle .is-live-preview:not(.cards):not(.table-disable) table td, .anp-table-toggle .is-live-preview:not(.cards):not(.table-disable) table th, .anp-table-toggle .is-live-preview:not(.cards):not(.table-disable) table thead tr > th:first-child, .anp-table-toggl`.
  Проверяемое свойство: `border`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Show borders** (`show-border-table`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3153), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14245).
  Селектор: `body.show-border-table :is(.markdown-preview-view,.markdown-rendered) :is(th,td)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `border`.
- [[atlas/! themes/obsidian-nord|Obsidian Nord]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L291), [реализация](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L291).
  Селектор: `th`.
- [[atlas/! themes/obsidian-gruvbox|Obsidian gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L334), [реализация](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L334).
  Селектор: `th`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `.dataview.table-view-table :is(td,th)`.
- [[atlas/! themes/sanctum|Sanctum]]: **Cell borders** (`table-cell-border`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8316), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1818).
  Селектор: `.table-cell-border .cm-embed-block.markdown-rendered .block-language-dataview th, .table-cell-border .markdown-rendered table th, .table-cell-border .markdown-rendered .table-view-table th`.
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L1256), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L1256).
  Селектор: `.markdown-preview-view th, .markdown-preview-view td`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Toggle table with line border** (`shib-table-toggle`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7654), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L5147).
  Селектор: `.shib-table-toggle .is-live-preview.cards:not(.table-disable) table:not(.dataview), .shib-table-toggle .is-live-preview.cards:not(.table-disable) table:not(.dataview) td, .shib-table-toggle .is-live-preview.cards:not(.table-disable) table:not(.dataview) th, .shib-table-toggle .is-live-preview.cards:not(.table-disable) table:not(.dataview) thead tr > th, .shib-table-toggle .is-live-preview.cards:not(.table-disable) table:not(.dataview) thead tr > th:first-child, .shib-table-toggle .is-live-preview.cards:not(.table-disable) table:not(.dataview) thead tr > th:last-child, .shib-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) .shib-table-toggle .is-live-preview:not(.cards):not(.table-disable) table, .shib-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) .shib-table-toggle .is-live-preview:not(.cards):not(.table-disable) table td, .shib-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) .shib-table-toggle .is-live-preview:not(.cards):not(.table-disable) table th, .shib-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) .shib-table-toggle .is-live-preview:not(.cards):not(.table-disable) table thead tr > th, .shib-table-toggle .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) .shib-table-toggle .is-live-preview:not(.cards):not(.table-disable) table thead tr > th:first-child, .shib-table-toggle .markdown-preview-view.cards:not(.table-`.
  Проверяемое свойство: `border`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1844), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1844).
  Селектор: `.markdown-preview-view th, .markdown-preview-view td`.
- [[atlas/! themes/dracula-official|Dracula Official]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L368), [реализация](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L368).
  Селектор: `th`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L1696), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L1696).
  Селектор: `.markdown-rendered td, .markdown-rendered th, .markdown-rendered thead tr>*, .bases-td`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L1186), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L1186).
  Селектор: `.markdown-preview-view table, .markdown-preview-view th, .markdown-preview-view td`.
- [[atlas/! themes/material-gruvbox|Material Gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L646), [реализация](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L646).
  Селектор: `th`.
- [[atlas/! themes/royal-velvet|Royal Velvet]]: правило CSS без отдельного переключателя — [исходник](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L796), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L796).
  Селектор: `.markdown-preview-view th, .markdown-preview-view td`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1844), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1844).
  Селектор: `.markdown-preview-view th, .markdown-preview-view td`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21791), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21791).
  Селектор: `.markdown-preview-view table th, .markdown-preview-view table td, .markdown-source-view.mod-cm6 table th, .markdown-source-view.mod-cm6 table td`.
  Условия CSS: `@media print`
- [[atlas/! themes/kakano|Kakano]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L8230), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L8230).
  Селектор: `body.theme-setting-overrideDataview .dataview.table-view-table > thead > tr > th, body.theme-setting-overrideDataview .dataview.table-view-table > tbody > tr > td`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L15752), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L15752).
  Селектор: `.cm-html-embed td, .markdown-rendered td, .cm-html-embed th, .markdown-rendered th`.
- [[atlas/! themes/wikipedia|Wikipedia]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L304), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L304).
  Селектор: `.table-view-table > thead > tr > th`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1956), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1956).
  Селектор: `.seamless-dataview .dataview.table-view-table th, .seamless-dataview .dataview.table-view-table :is(td, th)`.
- [[atlas/! themes/gitsidian|Gitsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L457), [реализация](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L457).
  Селектор: `.markdown-preview-view table td, .markdown-preview-view table th`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Table style** (`table-style`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L2096), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L158).
  Селектор: `.fas-plain-tables`.
  Проверяемое свойство: `--fas-table-style`.
  Варианты: With borders (fas-border-tables); Plain (fas-plain-tables)
- [[atlas/! themes/vicious|Vicious]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1354), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1354).
  Селектор: `table.table-view-table, .table-view-table > tbody > tr > td`.
- [[atlas/! themes/transparent|Transparent]]: правило CSS без отдельного переключателя — [исходник](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L1238), [реализация](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L1238).
  Селектор: `body .markdown-rendered th, body .markdown-rendered td, body .cm-html-embed th, body .cm-html-embed td, body .markdown-rendered thead tr>th, body .cm-html-embed thead tr>th`.
- [[atlas/! themes/material-flat|Material Flat]]: правило CSS без отдельного переключателя — [исходник](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L811), [реализация](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L811).
  Селектор: `.markdown-preview-view table thead tr th, .markdown-preview-view table thead tr td, .markdown-preview-view table tbody tr th, .markdown-preview-view table tbody tr td, .markdown-source-view.mod-cm6.is-live-preview table thead tr th, .markdown-source-view.mod-cm6.is-live-preview table thead tr td, .markdown-source-view.mod-cm6.is-live-preview table tbody tr th, .markdown-source-view.mod-cm6.is-live-preview table tbody tr td`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2736), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2736).
  Селектор: `.markdown-rendered table.table-view-table.dataview > thead > tr > th, .markdown-rendered table.table-view-table.dataview > thead > tr > th.table-view-th`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L876), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L876).
  Селектор: `th`.

```hacksidian-files
table-e002
```
