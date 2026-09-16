---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Маркер за важным текстом
category: note
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::before
format: markdown
themes:
  - blue-topaz
  - prism
  - pln
  - vicious
---

```hacksidian-id
note-highlight
```

```hacksidian-live
note-highlight
```

```hacksidian-details
> Зачем
Главные мысли в конспекте.

> Как работает
strong получает мягкий фон; box-decoration-break: clone повторяет поля на каждой строке.
```

```hacksidian-sources
note-highlight
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Deactivate colorful-highlight** (`remove-colorful-highlight-bg`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4219), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10580).
  Селектор: `body:not(.remove-colorful-highlight-bg) .markdown-source-view.is-live-preview *:not([class*="cm-formatting-highlight"])~*:not([class*="cm-em"])~.cm-em.cm-highlight.cm-strong, .markdown-source-view.is-live-preview.colorful-highlight .cm-em.cm-highlight.cm-strong`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/prism|Prism]]: **Mark Highlight Style** (`light-mark-highlight-style`) — [описание настройки](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11155), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L5540).
  Селектор: `:is(body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-default-dt mark[class], body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-default-lt mark[class]), :is(body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-default-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-default-lt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-border-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-border-lt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-filled-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-filled-lt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-borderandfilled-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-borderandfilled-lt mark[class].mark-default)`.
  Варианты: Default (pt-highlight-style-default-lt); Border (pt-highlight-style-border-lt); Filled (pt-highlight-style-filled-lt); Border & Filled (pt-highlight-style-borderandfilled-lt)
- [[atlas/! themes/prism|Prism]]: **Mark Highlight Style** (`dark-mark-highlight-style`) — [описание настройки](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11193), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L5540).
  Селектор: `:is(body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-default-dt mark[class], body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-default-lt mark[class]), :is(body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-default-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-default-lt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-border-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-border-lt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-filled-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-filled-lt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-dark.pt-highlight-style-borderandfilled-dt mark[class].mark-default, body:not(.pt-disable-mark-highlight-styling).theme-light.pt-highlight-style-borderandfilled-lt mark[class].mark-default)`.
  Варианты: Default (pt-highlight-style-default-dt); Border (pt-highlight-style-border-dt); Filled (pt-highlight-style-filled-dt); Border & Filled (pt-highlight-style-borderandfilled-dt)
- [[atlas/! themes/prism|Prism]]: **Disable Prism Mark Highlight Styling** (`pt-disable-mark-highlight-styling`) — [описание настройки](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11737), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L5476).
  Селектор: `body:not(.pt-disable-mark-highlight-styling) mark[class]`.
- [[atlas/! themes/pln|PLN]]: **Highlight (mark) modifications** (`pln-hilite-mods`) — [описание настройки](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L319), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1948).
  Селектор: `.pln-hilite-mods`.
- [[atlas/! themes/vicious|Vicious]]: **Highlight Color** (`highlightcolors`) — [описание настройки](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L199), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L784).
  Селектор: `.highlight-C001 .cm-s-obsidian span.cm-formatting-highlight, .highlight-C001 .cm-s-obsidian span.cm-highlight, .highlight-C001 .markdown-preview-view mark`.
  Варианты: Red (highlight-C001); Beach (highlight-C002); Gold (highlight-C003); Yellow (highlight-C004); Lime (highlight-C005); Green (highlight-C006); Turquoise (highlight-C007); Cyan (highlight-C008); Purple (highlight-C009); Violet (highlight-C010); Pink (highlight-C011)

```hacksidian-files
note-highlight
```
