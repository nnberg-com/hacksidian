---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Длинные строки с прокруткой
category: code
sources:
  - https://spec.commonmark.org/0.31.2/#fenced-code-blocks
format: markdown
themes:
  - minimal
  - things
  - blue-topaz
  - maple
  - sandstorm
  - material-ocean
  - lagom
---

```hacksidian-id
code-scroll
```

```hacksidian-live
code-scroll
```

```hacksidian-details
> Зачем
Команды и табличные логи, где нужно сохранить расположение символов.

> Как работает
white-space:pre сохраняет пробелы, overflow-x:auto ограничивает прокрутку блоком.
```

```hacksidian-sources
code-scroll
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Scroll long lines** (`minimal-code-scroll`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L6882), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L1399).
  Селектор: `.minimal-code-scroll`.
- [[atlas/! themes/things|Things]]: правило CSS без отдельного переключателя — [исходник](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L584), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L584).
  Селектор: `.markdown-reading-view .el-pre pre`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Non-wrap Codebox (Live preview)** (`nowrap-edit-codebox`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L5077), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L29478).
  Селектор: `body.nowrap-edit-codebox .HyperMD-codeblock`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/maple|Maple]]: **Prevent Code Wrapping in Reading View** (`code-nowrap`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1927), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3726).
  Селектор: `.code-nowrap.scrollbar-gutter-overlay:not(.code-mac-style-header) .app-container div pre`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L13055), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L13055).
  Селектор: `.markdown-rendered pre`.
- [[atlas/! themes/material-ocean|Material Ocean]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dragonwocky/obsidian-material-ocean/blob/517c6bf371f066cda66324475fa2aff01c69e68e/theme.css#L434), [реализация](https://github.com/dragonwocky/obsidian-material-ocean/blob/517c6bf371f066cda66324475fa2aff01c69e68e/theme.css#L434).
  Селектор: `body.theme-dark .markdown-rendered pre[class*="language-"], body.is-mobile.theme-dark .markdown-rendered pre[class*="language-"]`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L664), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L664).
  Селектор: `body:not(.wrap-code-blocks) .markdown-rendered pre, body:not(.wrap-code-blocks) .markdown-rendered pre code[class*="language-"]`.

```hacksidian-files
code-scroll
```
