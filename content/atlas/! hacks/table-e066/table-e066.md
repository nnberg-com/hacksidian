---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Нумерация строк
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
format: markdown
themes:
  - minimal
  - sanctum
  - baseline
  - blue-topaz
---

```hacksidian-id
table-e066
```

```hacksidian-live
table-e066
```

```hacksidian-details
> Зачем
Быстрые ссылки на положение записи в текущем представлении.

> Как работает
Счётчик сбрасывается на tbody и увеличивается на каждой строке.

> Ограничения
Номер не записан в Markdown. Не используйте его как постоянный идентификатор.
```

```hacksidian-sources
table-e066
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: описанный автором способ применения — [руководство](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/docs/Features/Helper%20classes.md#L65), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3359).
  Селектор: `.table-numbers`.
  Применение: Добавьте класс `table-numbers` к заметке.
- [[atlas/! themes/minimal|Minimal]]: **Row numbers** (`table-numbers`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8123), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3359).
  Селектор: `.table-numbers`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Automatically add serial numbers to tables** (`auto-serial-number-dvtable`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4564), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14174).
  Селектор: `body.auto-serial-number-dvtable .markdown-source-view:not(.cards) .dataview.table-view-table> tbody > tr> td:first-child::before`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `counter-increment`.
- [[atlas/! themes/sanctum|Sanctum]]: **Row numbers** (`table-nums`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8366), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1899).
  Селектор: `.table-nums table`.
- [[atlas/! themes/baseline|Baseline]]: **Row line numbers** (`table-numbers`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3103), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.table-numbers table`.

```hacksidian-files
table-e066
```
