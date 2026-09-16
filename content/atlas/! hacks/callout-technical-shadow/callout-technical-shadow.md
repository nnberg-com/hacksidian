---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Панель с тенью
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - baseline
---

```hacksidian-id
callout-technical-shadow
```

```hacksidian-live
callout-technical-shadow
```

```hacksidian-details
> Зачем
Примечание как отдельный слой над страницей.

> Как работает
Тень и лёгкая рамка принадлежат контейнеру.
```

```hacksidian-sources
callout-technical-shadow
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

- [[atlas/! themes/baseline|Baseline]]: **Callout style** (`callouts-style`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2608), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.callouts-tactile .callout:not([data-callout=note-toolbar])`.
  Условия CSS: `@media screen,print`
  Проверяемое свойство: `box-shadow`.
  Варианты: Filled (callouts-default); Tactile (callouts-tactile); Padded (callouts-padded); Outlined (callouts-outlined)

```hacksidian-files
callout-technical-shadow
```
