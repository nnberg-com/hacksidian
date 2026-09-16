---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Цвет и форма маркеров
category: note
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::marker
format: markdown
themes:
  - blue-topaz
  - its-theme
  - anuppuccin
  - border
  - sanctum
  - cyber-glow
  - maple
  - dune
  - velocity
---

```hacksidian-id
note-list-markers
```

```hacksidian-live
note-list-markers
```

```hacksidian-details
> Зачем
Спокойное перечисление с собственным характером.

> Как работает
list-style-type выбирает квадрат; ::marker меняет только цвет маркера.
```

```hacksidian-sources
note-list-markers
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Enable List Styling** (`anp-list-toggle`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L758), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5571).
  Селектор: `.anp-list-toggle div.el-ul > ul.has-list-bullet > li > ul.has-list-bullet > li > .list-bullet::after`.
  Проверяемое свойство: `--list-bullet-border`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle colorful unordered list marker** (`colorful-unordered-list`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2403), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L27864).
  Селектор: `body.colorful-unordered-list ul > li::marker`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Unordered list marker style** (`unordered-list-style-options`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2409), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L27756).
  Селектор: `body:not(.default-list-marker) .markdown-rendered .list-bullet::after`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Варианты: Blue Topaz Default (bt-default-unordered-list); Custom (custom-unordered-list); Obsidian default (default-list-marker)
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle colorful ordered list marker** (`colorful-ordered-list`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2544), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L27870).
  Селектор: `body.colorful-ordered-list :is(ul, ol) :is(ul, ol) ul li::marker`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Style** (`folder-dataview-list-style`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4524), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L18842).
  Селектор: `body.dataview-list-style-pacman ul.dataview.list-view-ul>li:not(.task-list-item):first-of-type::before`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `content`.
  Варианты: Pac-man (dataview-list-style-pacman); Normal (dataview-list-style-normal)
- [[atlas/! themes/its-theme|ITS Theme]]: **Colorful Bullet Color** (`list-bullet-color`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1500), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12072).
  Селектор: `.list-bullet-color.list-bullet-color`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Default Bullet Disc Shape** (`list-default-bullet`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1495), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L4733).
  Селектор: `body:not(.list-default-bullet) .bases-list-container .list-bullet:after, body:not(.list-default-bullet) .is-live-preview .cm-formatting-list-ul::before, body:not(.list-default-bullet) ul > li:not(.task-list-item)::before`.
  Проверяемое свойство: `content`.
- [[atlas/! themes/border|Border]]: **Restore default style of unordered list** (`ul-marker-restore`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3080), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7846).
  Селектор: `body:not(.ul-marker-restore) .markdown-rendered .has-list-bullet .has-list-bullet .has-list-bullet .has-list-bullet .list-bullet::after, body:not(.ul-marker-restore) .markdown-rendered .list-bullet::after, body:not(.ul-marker-restore) .markdown-source-view.mod-cm6 .list-bullet::after`.
  Проверяемое свойство: `--list-bullet-radius`.
- [[atlas/! themes/sanctum|Sanctum]]: **Odd numbered list marker style** (`odd-marker`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8237), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1276).
  Селектор: `:is(body, .default-marker-odd) ul > li .list-bullet:after, :is(body, .default-marker-odd) ol > li > ul > li .list-bullet:after, :is(body, .default-marker-odd) ul > li > ul > li > ul > li .list-bullet:after, :is(body, .default-marker-odd) ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet:after, :is(body, .default-marker-odd) ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet:after, :is(body, .default-marker-odd) ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet:after`.
  Варианты: em-dash (default-marker-odd); hyphen (alternate-marker-odd-1); bullet operator (alternate-marker-odd-2); square bullet (alternate-marker-odd-3); bullet (alternate-marker-odd-4); ring (alternate-marker-odd-5); triangule (alternate-marker-odd-6)
- [[atlas/! themes/sanctum|Sanctum]]: **Odd numbered list marker style** (`even-marker`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8265), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1289).
  Селектор: `:is(body, .default-marker-even) ul > li > ul > li .list-bullet::after, :is(body, .default-marker-even) ol > li > ul > li > ul > li .list-bullet::after, :is(body, .default-marker-even) ul > li > ul > li > ul > li > ul > li .list-bullet::after, :is(body, .default-marker-even) ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet::after, :is(body, .default-marker-even) ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet::after, :is(body, .default-marker-even) ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet::after`.
  Варианты: em-dash (alternate-marker-even-1); hyphen (alternate-marker-even-2); bullet operator (alternate-marker-even-3); square bullet (default-marker-even); bullet (alternate-marker-even-4); ring (alternate-marker-even-5); triangule (alternate-marker-even-6)
- [[atlas/! themes/sanctum|Sanctum]]: **Ordered list marker style** (`step-list`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8293), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1323).
  Селектор: `.step-list-0 ol`.
  Варианты: Default (#); Step list (step-list-0); Outlined List (step-list-1)
- [[atlas/! themes/cyber-glow|Cyber Glow]]: **Bullet Style** (`CG-bullet-style`) — [описание настройки](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L270), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2807).
  Селектор: `:not(.CG-Square, .CG-round, .CG-Triwing, .CG-EyeofHorus) li:not(.is-collapsed) .list-bullet:after, :not(.CG-Square, .CG-round, .CG-Triwing, .CG-EyeofHorus) .cm-formatting-list .list-bullet:after, :not(.CG-Square, .CG-round, .CG-Triwing, .CG-EyeofHorus) .markdown-source-view.mod-cm6 .cm-formatting-list-ul, :not(.CG-Square, .CG-round, .CG-Triwing, .CG-EyeofHorus) .markdown-source-view.mod-cm6 .cm-formatting-list-ol`.
  Проверяемое свойство: `content`.
  Варианты: ▻ Triangle Bullet (CG-triangle); 𓂀 Eye of Horus Bullet (CG-EyeofHorus); 𖤍 Phase-D Bullet (CG-Triwing); ○ Circle Bullet (CG-round); □ Square Bullet (CG-Square)
- [[atlas/! themes/maple|Maple]]: **Optimize List Style** (`list-enable`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1790), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L4684).
  Селектор: `body:is(:not(.css-settings-manager), .list-enable)`.
  Проверяемое свойство: `--list-marker-color`.
- [[atlas/! themes/dune|Dune]]: **List marker** (`show-ls-marker`) — [описание настройки](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L789), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L5933).
  Селектор: `body:not(.show-ls-marker) ol li::marker, body:not(.show-ls-marker) :is(.is-phone) ol li::marker`.
  Проверяемое свойство: `content`.
- [[atlas/! themes/velocity|Velocity]]: **Restore bullet-style list markers** (`disable-list-styling`) — [описание настройки](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L216), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `body:not(.disable-list-styling) .list-bullet::after, body:not(.disable-list-styling) .modal-content li::marker`.
  Проверяемое свойство: `width`.

```hacksidian-files
note-list-markers
```
