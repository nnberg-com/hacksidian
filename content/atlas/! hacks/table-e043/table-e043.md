---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Закреплённая шапка
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position
format: markdown
themes:
  - sanctum
  - sandstorm
---

```hacksidian-id
table-e043
```

```hacksidian-live
table-e043
```

```hacksidian-details
> Зачем
Названия колонок видны при прокрутке длинного реестра.

> Как работает
th получает sticky и top: 0; непрозрачный фон закрывает данные под шапкой.
```

```hacksidian-sources
table-e043
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/sanctum|Sanctum]]: **Sticky headers** (`table-sticky-headers`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8352), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1824).
  Селектор: `.table-sticky-headers .cm-embed-block.markdown-rendered .block-language-dataview thead, .table-sticky-headers .cm-embed-block.markdown-rendered .block-language-dataview tbody tr, .table-sticky-headers .markdown-rendered table thead, .table-sticky-headers .markdown-rendered table tbody tr, .table-sticky-headers .markdown-rendered .table-view-table thead, .table-sticky-headers .markdown-rendered .table-view-table tbody tr`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L17804), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L17804).
  Селектор: `.bases-thead`.

```hacksidian-files
table-e043
```
