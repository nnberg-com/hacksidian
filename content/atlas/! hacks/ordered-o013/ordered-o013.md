---
tags:
  - hacksidian_technique
  - hacksidian_ordered
title: Составные номера
category: ordered
sources: []
format: markdown
themes:
  - blue-topaz
  - sanctum
---

```hacksidian-id
ordered-o013
```

```hacksidian-live
ordered-o013
```

```hacksidian-details
> Как работает
Каждый вложенный список создаёт уровень счётчика; counters() собирает цепочку.

> Ограничения
Собственный счётчик не учитывает Markdown-начало списка автоматически. Для глубокой вложенности требуется больше ширины.
```

```hacksidian-sources
ordered-o013
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Ordered List marker style** (`ordered-list-style-options`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2550), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L13460).
  Селектор: `:not(.default-ol-list-marker) .cm-formatting.cm-formatting-list.cm-formatting-list-ol`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Варианты: Custom (custom-ordered-list); 1.1.1 (ordered-list-style-1); Obsidian default (default-ol-list-marker)
- [[atlas/! themes/sanctum|Sanctum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1329), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1329).
  Селектор: `.step-list-0 ol > li::before`.

```hacksidian-files
ordered-o013
```
