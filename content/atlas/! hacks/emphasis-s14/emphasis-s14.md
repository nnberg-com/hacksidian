---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: Мягкая плашка с переносами
category: emphasis
sources: []
format: markdown
themes:
  - maple
  - blue-topaz
---

```hacksidian-id
emphasis-s14
```

```hacksidian-live
emphasis-s14
```

Параметр «Применить к…» выбирает `**…**`, `_…_` или `==…==`. Приём полностью задаёт оформление выбранной разметки в Preview mode. Другие параметры приёма настраиваются независимо.

```hacksidian-sources
emphasis-s14
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Highlight styles** (`highlight-style`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4104), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14511).
  Селектор: `body.all-rounded-corners-highlight .cm-s-obsidian span.cm-highlight, body.all-rounded-corners-highlight :is(.markdown-preview-view,.markdown-rendered) mark`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `-webkit-box-decoration-break`.
  Варианты: Default (bt-default-highlight); All rounded corners (@Mon & @TheGodOfKing) (all-rounded-corners-highlight); No rounded corners (no-rounded-corners-highlight)
- [[atlas/! themes/maple|Maple]]: **Maintain Radius When Wrapping** (`text-highlight-all-round`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L880), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3447).
  Селектор: `.text-highlight-all-round :is(.markdown-source-view .cm-highlight, .markdown-rendered mark)`.

```hacksidian-files
emphasis-s14
```
