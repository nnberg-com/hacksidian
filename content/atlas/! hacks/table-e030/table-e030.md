---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Многоточие
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/table-layout
format: markdown
themes:
  - blue-topaz
---

```hacksidian-id
table-e030
```

```hacksidian-live
table-e030
```

```hacksidian-details
> Зачем
Короткое превью длинных описаний.

> Как работает
При fixed и известной ширине overflow и text-overflow обрезают текст.

> Ограничения
Полный текст остаётся в документе, но интерфейса его раскрытия здесь нет. Для важных данных лучше перенос или прокрутка.
```

```hacksidian-sources
table-e030
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Table format** (`table-format-options`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3133), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14119).
  Селектор: `body.no-wrapped-table-cell table:not([class*="table-view-table"]) :is(th,td), body.no-wrapped-dvtable-cell .dataview.table-view-table :is(th,td)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-overflow`.
  Варианты: Defaut table (default-table); Wrapped table (break all) (wrapped-table); Non-wrapped table (limited cell width) (no-wrapped-table-cell); Non-wrapped table (no-wrapped-table)
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Dataview table format** (`dvtable-style-options`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4544), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14119).
  Селектор: `body.no-wrapped-table-cell table:not([class*="table-view-table"]) :is(th,td), body.no-wrapped-dvtable-cell .dataview.table-view-table :is(th,td)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-overflow`.
  Варианты: Defaut table (default-dvtable); Wrapped table (break all) (wrapped-dvtable); Non-wrapped table (limited cell width) (no-wrapped-dvtable-cell); Non-wrapped table (no-wrapped-dvtable)

```hacksidian-files
table-e030
```
