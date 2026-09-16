---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Скруглённая общая рамка
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables
format: markdown
themes:
  - everforest-enchanted
  - maple
  - dune
---

```hacksidian-id
table-e012
```

```hacksidian-live
table-e012
```

```hacksidian-details
> Зачем
Компактный справочный блок с мягким внешним контуром.

> Как работает
В separate-модели наружные границы и радиусы распределены по крайним ячейкам.
```

```hacksidian-sources
table-e012
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/maple|Maple]]: **Add Round Corner For Table** (`table-round`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1682), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5565).
  Селектор: `body:is(:not(.css-settings-manager), .table-round:not(.table-style-minimal)) :is(th:first-child:not(:has(:is(.table-col-drag-handle, .table-row-drag-handle):hover)), th:first-child:not(:has(:is(.table-col-drag-handle, .table-row-drag-handle):hover)) .table-cell-wrapper)`.
  Проверяемое свойство: `border-start-start-radius`.
- [[atlas/! themes/dune|Dune]]: **Tables, edgy** (`edgy-tables`) — [описание настройки](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L796), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6542).
  Селектор: `body:not(.edgy-tables) :is(.table-r, .table-g, .table-b, .table-m, .table-xyr, .table-xyg, .table-xyb, .table-xym, .tabelle-r, .tabelle-g, .tabelle-b, .tabelle-m, .tabelle-xyr, .tabelle-xyg, .tabelle-xyb, .tabelle-xym) table th:first-of-type`.
  Проверяемое свойство: `border-top-left-radius`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Tables - Rounded corners** (`rounded-tables`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1734), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2154).
  Селектор: `body.rounded-tables :where(table:not(:has([rowspan])))`.

```hacksidian-files
table-e012
```
