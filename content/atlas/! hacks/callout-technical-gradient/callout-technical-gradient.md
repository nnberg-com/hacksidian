---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Градиентная рамка
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - typomagical
---

```hacksidian-id
callout-technical-gradient
```

```hacksidian-live
callout-technical-gradient
```

```hacksidian-details
> Зачем
Акцентное примечание в визуально насыщенной теме.

> Как работает
Два слоя background заполняют padding-box и border-box; сама граница прозрачная.
```

```hacksidian-sources
callout-technical-gradient
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

- [[atlas/! themes/typomagical|Typomagical]]: **Callout style** (`callout-style`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1962), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1069).
  Селектор: `.callout-border-gradient .callout`.
  Проверяемое свойство: `border-image`.
  Варианты: Obsidian default (callout-default); Icon only (callout-icon-only); Icon and gradient border (callout-border-gradient)

```hacksidian-files
callout-technical-gradient
```
