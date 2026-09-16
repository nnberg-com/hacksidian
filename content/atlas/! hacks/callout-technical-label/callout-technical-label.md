---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Заголовок-ярлычок
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - minimal
---

```hacksidian-id
callout-technical-label
```

```hacksidian-details
> Зачем
Небольшая пометка на рамке примечания.

> Как работает
Заголовок шириной по содержимому смещён вверх отрицательным margin, под ним непрозрачный фон. Сверху оставлен запас места.

> Ограничения
Живой пример пока не готов: CSS зависит от контейнера `.explanation`, оставшегося от HTML-атласа. Селектор нужно адаптировать к Obsidian.
```
```hacksidian-sources
callout-technical-label
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

- [[atlas/! themes/minimal|Minimal]]: **Callout style** (`callouts-style`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L6829), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L1331).
  Селектор: `.callouts-outlined .callout .callout-title`.
  Проверяемое свойство: `margin-top`.
  Варианты: Filled (callouts-default); Outlined (callouts-outlined)

```hacksidian-files
callout-technical-label
```
