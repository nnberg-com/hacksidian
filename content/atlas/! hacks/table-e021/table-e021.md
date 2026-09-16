---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Иерархия первой колонки
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric
format: markdown
themes:
  - its-theme
  - pln
---

```hacksidian-id
table-e021
```

```hacksidian-live
table-e021
```

```hacksidian-details
> Зачем
Названия служат точками входа в строку.

> Как работает
Первая ячейка выделена жирностью; остальные чуть приглушены.
```

```hacksidian-sources
table-e021
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/its-theme|ITS Theme]]: **Table Styling** (`ITS-Table-Styling`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1791), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11651).
  Селектор: `.table.table, .table .bases-table`.
  Проверяемое свойство: `--table-style-column-header-bold-weight`.
  Варианты: Add Table Borders (tables-borders); Dark and Bold First Column (table); Wikipedia (tables-style-wikipedia)
- [[atlas/! themes/pln|PLN]]: описанный автором способ применения — [руководство](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/README.md#L105), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1851).
  Селектор: `:is(div[data-callout*="bold_row"]) tbody tr td:first-child`.
  Применение: Поместите таблицу в > [!table-bold_row]; первая колонка выделяется жирностью.

```hacksidian-files
table-e021
```
