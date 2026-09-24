---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Читаемая метка языка
category: code
sources: []
format: markdown
themes:
  - blue-topaz
  - willemstad
  - sanctum
  - maple
  - yin-and-yang
favourite: true
---

```hacksidian-id
code-e052
```

```hacksidian-live
code-e052
```

```hacksidian-details
> Зачем
Показать язык над листингом.

> Как работает
Цвета настраиваются парами полей: «источник» выбирает семантическую палитру, цвет темы или «свой цвет»; соседнее цветовое поле действует при выборе «свой цвет». Прозрачность декоративных слоёв сохраняется.
Название задаётся через content в явном CSS-соответствии.

> Ограничения
attr(class) не умеет удалить префикс language-. Для красивых имён нужен перечень правил.
```

```hacksidian-sources
code-e052
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle showing types of code languages** (`remove-language-type`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L5071), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L15060).
  Селектор: `body:not(.remove-language-type) pre::before`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/willemstad|Willemstad]]: **Codeblock Language Display** (`ssopt-codeblock-language`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L47602), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L24537).
  Селектор: `body:where(.ssopt-codeblock-lang-old) .markdown-rendered pre[class*="language-"]::before`.
  Варианты: Default (UI font, flushed at bottom-right of codeblock) (default); Old-Style Willemstad & Shimmering Focus (Monospaced font, top-right of codeblock) (ssopt-codeblock-lang-old); None (ssopt-codeblock-lang-none)
- [[atlas/! themes/sanctum|Sanctum]]: **Toggle code block labels** (`code-label`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7339), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2772).
  Селектор: `.code-label .markdown-rendered pre[class*=language-]:not(pre.frontmatter) button.copy-code-button`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: **Remove Languages** (`no-show-lang`) — [описание настройки](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L507), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2691).
  Селектор: `body:not(.no-show-lang) pre[class*="language-"]::after`.
- [[atlas/! themes/maple|Maple]]: **Enable Code Block Language Indicator in Reading View** (`code-language`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1922), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3745).
  Селектор: `body:is(:not(.css-settings-manager), .code-language) pre.language-markup`.

```hacksidian-files
code-e052
```
