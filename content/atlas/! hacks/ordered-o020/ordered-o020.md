---
tags:
  - hacksidian_technique
  - hacksidian_ordered
title: Контурная цифра
category: ordered
sources: []
format: markdown
themes:
  - blue-topaz
---

```hacksidian-id
ordered-o020
```

```hacksidian-live
ordered-o020
```

```hacksidian-details
> Как работает
Контур рисует text-stroke. Проверяйте режим повышенной контрастности.
```

```hacksidian-sources
ordered-o020
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle hollow numbers** (`hollow-number`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2335), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12636).
  Селектор: `body.fancy-hr-number.hollow-number .markdown-rendered hr::after, body.fancy-hr-number.hollow-number .markdown-source-view.mod-cm6 hr::after, body.fancy-hr-number.hollow-number .markdown-source-view div:not(.CodeMirror-activeline) > .HyperMD-hr.CodeMirror-line::after`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `-webkit-text-stroke`.

```hacksidian-files
ordered-o020
```
