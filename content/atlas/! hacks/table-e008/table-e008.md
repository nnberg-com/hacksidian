---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Полосы по столбцам
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables
format: markdown
themes:
  - minimal
  - sanctum
  - baseline
  - dune
---

```hacksidian-id
table-e008
```

```hacksidian-live
table-e008
```

```hacksidian-details
> Зачем
Сравнение вертикальных серий и повторяющихся показателей.

> Как работает
Фон выбирается по позиции ячейки в каждой строке.
```

```hacksidian-sources
table-e008
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Striped columns** (`col-alt`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8111), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3320).
  Селектор: `.col-alt .markdown-rendered:not(.cards)`.
- [[atlas/! themes/sanctum|Sanctum]]: **Striped columns** (`table-alternate-column`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8332), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1881).
  Селектор: `.table-alternate-column .cm-embed-block.markdown-rendered .block-language-dataview tbody tr td:nth-child(odd), .table-alternate-column .markdown-rendered table tbody tr td:nth-child(odd), .table-alternate-column .markdown-rendered .table-view-table tbody tr td:nth-child(odd)`.
- [[atlas/! themes/baseline|Baseline]]: **Alternating columns background** (`col-alt`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3091), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.col-alt .markdown-rendered:not(.cards)`.
- [[atlas/! themes/dune|Dune]]: описанный автором способ применения — [руководство](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/Wiki/cheatsheet%20cssclasses%20Dune.md#L98), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6051).
  Селектор: `.tabelle-alt table tr td:nth-child(even), .table-alt table tr td:nth-child(even)`.
  Применение: Класс `table-alt` выделяет чередующиеся колонки таблицы.

```hacksidian-files
table-e008
```
