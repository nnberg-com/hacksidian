---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Табличные цифры
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric
format: markdown
themes:
  - minimal
  - sanctum
  - baseline
  - cupertino
---

```hacksidian-id
table-e019
```

```hacksidian-live
table-e019
```

```hacksidian-details
> Зачем
Числовые серии, в которых цифры должны стоять ровными рядами.

> Как работает
font-variant-numeric включает цифры одинаковой ширины.

> Ограничения
Нужна поддержка функции шрифтом. Десятичные разделители не выравниваются автоматически; здесь одинаковое число знаков после запятой.
```

```hacksidian-sources
table-e019
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Tabular figures** (`table-tabular`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8117), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3324).
  Селектор: `.table-tabular table:not(.calendar)`.
- [[atlas/! themes/sanctum|Sanctum]]: **Tabular figures** (`table-tabular-figures`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8362), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1919).
  Селектор: `.table-tabular-figures table`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.table-numbers table:not(.table-editor) tbody>tr>td:first-child::before, .table-numbers table.table-editor tbody>tr>td:first-child .table-cell-wrapper::before`.
- [[atlas/! themes/baseline|Baseline]]: **Fixed-width tabular figures** (`table-tabular`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3107), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.table-tabular table:not(.calendar)`.

```hacksidian-files
table-e019
```
