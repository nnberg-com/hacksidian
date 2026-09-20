---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Заголовок без значка
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - wikipedia
---

```hacksidian-id
callout-technical-no-icon
```

```hacksidian-live
callout-technical-no-icon
```

```hacksidian-details
> Зачем
Спокойное примечание в текстовом документе.

> Как работает
display:none скрывает только декоративный значок; текст названия сохранён. Отключение имеет приоритет над приёмами размещения иконки, в том числе callout-technical-icon-margin.
```

```hacksidian-sources
callout-technical-no-icon
```

###### Локальные зависимости

- [assets/abstract.svg](<./assets/abstract.svg>)
- [assets/bug.svg](<./assets/bug.svg>)
- [assets/danger.svg](<./assets/danger.svg>)
- [assets/example.svg](<./assets/example.svg>)
- [assets/failure.svg](<./assets/failure.svg>)
- [assets/info.svg](<./assets/info.svg>)
- [assets/note.svg](<./assets/note.svg>)
- [assets/question.svg](<./assets/question.svg>)
- [assets/quote.svg](<./assets/quote.svg>)
- [assets/success.svg](<./assets/success.svg>)
- [assets/tip.svg](<./assets/tip.svg>)
- [assets/todo.svg](<./assets/todo.svg>)
- [assets/warning.svg](<./assets/warning.svg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/wikipedia|Wikipedia]]: **Hide Callout Icons** (`hide-callout-icons`) — [описание настройки](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L1053), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L425).
  Селектор: `.hide-callout-icons .callout-icon .svg-icon`.

```hacksidian-files
callout-technical-no-icon
```
