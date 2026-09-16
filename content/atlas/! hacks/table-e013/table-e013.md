---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Акцентная шапка
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables
format: markdown
themes:
  - anuppuccin
  - maple
---

```hacksidian-id
table-e013
```

```hacksidian-live
table-e013
```

```hacksidian-details
> Зачем
Сильное отделение названий от данных в большой подборке.

> Как работает
Контрастный фон и текст только у th.
```

```hacksidian-sources
table-e013
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **<th> Highlight** (`anp-table-th-highlight`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L862), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5838).
  Селектор: `.anp-table-toggle.anp-table-th-highlight .markdown-preview-view:not(.cards):not(.table-disable) th, .anp-table-toggle.anp-table-th-highlight .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) th, .anp-table-toggle.anp-table-th-highlight .is-live-preview:not(.cards):not(.table-disable) th, .anp-table-toggle.anp-table-th-highlight .is-live-preview.cards:not(.table-disable) table:not(.dataview) th`.
- [[atlas/! themes/maple|Maple]]: **Table Style** (`table-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1665), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5514).
  Селектор: `.table-style-minimal`.
  Проверяемое свойство: `--table-header-background`.
  Варианты: Default (table-style-default); Minimal (table-style-minimal); Colorful (table-style-colorful)

```hacksidian-files
table-e013
```
