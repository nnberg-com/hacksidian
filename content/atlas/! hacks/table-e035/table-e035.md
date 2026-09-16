---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Подсветка отдельной ячейки
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes:
  - anuppuccin
  - blue-topaz
  - encore
  - pink-topaz
  - golden-topaz
  - kakano
  - sandstorm
  - zen
---

```hacksidian-id
table-e035
```

```hacksidian-live
table-e035
```

```hacksidian-details
> Зачем
Точная сверка одной величины в матрице.

> Как работает
hover и внутренний outline на td.
```

```hacksidian-sources
table-e035
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **<td> Highlight** (`anp-td-highlight`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L866), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5849).
  Селектор: `.anp-table-toggle.anp-table-row-alt .markdown-preview-view:not(.cards):not(.table-disable) tr:nth-child(2n) td, .anp-table-toggle.anp-table-row-alt .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) tr:nth-child(2n) td, .anp-table-toggle.anp-table-row-alt .is-live-preview:not(.cards):not(.table-disable) tr:nth-child(2n) td, .anp-table-toggle.anp-table-row-alt .is-live-preview.cards:not(.table-disable) table:not(.dataview) tr:nth-child(2n) td`.
  Варианты: None (none); Alternate Rows (anp-table-row-alt); Alternate Columns (anp-table-col-alt); Checkered (anp-table-checkered); Full (anp-table-full)
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14215), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14215).
  Селектор: `:is(.markdown-preview-view,.markdown-rendered) td:hover, .markdown-rendered tbody tr > td:nth-child(2n+2):hover`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1021), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1021).
  Селектор: `body:not(.encore-no-calendar) #calendar-container td:hover > .day`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1855), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1855).
  Селектор: `.markdown-preview-view td:hover`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1855), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1855).
  Селектор: `.markdown-preview-view td:hover`.
- [[atlas/! themes/kakano|Kakano]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L6904), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L6904).
  Селектор: `.bases-thead .bases-td:hover`.
  Условия CSS: `@media (hover: hover)`
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L17829), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L17829).
  Селектор: `.bases-thead .bases-td:hover`.
  Условия CSS: `@media (hover: hover)`
- [[atlas/! themes/zen|Zen]]: правило CSS без отдельного переключателя — [исходник](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L3357), [реализация](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L3357).
  Селектор: `.workspace-leaf-content[data-type="daily-note-calendar"] .dnc td:hover`.

```hacksidian-files
table-e035
```
