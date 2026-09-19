---
tags:
  - hacksidian_technique
  - hacksidian_parameter_experiment
  - hacksidian_callout
title: Большое скругление
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - prism
  - velocity
  - aura
favourite: true
---

```hacksidian-id
callout-technical-round
```

```hacksidian-live
callout-technical-round
```

```hacksidian-details
> Зачем
Дружелюбная подсказка в неформальном документе.

> Как работает
Параметры на карточке: скругление и внутренние поля выноски. Значения сохраняются в CSS приёма; для включённого оформления используется кнопка «Обновить уже существующий стиль».

Увеличены border-radius и поля; содержание не изменяется.
```

```hacksidian-sources
callout-technical-round
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

- [[atlas/! themes/prism|Prism]]: **Disable Prism Callout Styling** (`pt-disable-callout-styling`) — [описание настройки](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11731), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L3850).
  Селектор: `body:not(.pt-disable-callout-styling)`.
  Проверяемое свойство: `--callout-radius`.
- [[atlas/! themes/velocity|Velocity]]: **Restore default Callout styling** (`disable-callout-styling`) — [описание настройки](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L220), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `body:not(.disable-callout-styling)`.
  Проверяемое свойство: `--callout-radius`.
- [[atlas/! themes/aura|Aura]]: **Enable Callout Styling** (`aura-callouts`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3809), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L1102).
  Селектор: `.aura-callouts.aura-callouts-vanilla .callout`.
  Проверяемое свойство: `border-radius`.
- [[atlas/! themes/aura|Aura]]: **Callout Styling** (`aura-callouts-select`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3814), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L1102).
  Селектор: `.aura-callouts.aura-callouts-vanilla .callout`.
  Проверяемое свойство: `border-radius`.
  Варианты: Default (default); Sleek (aura-callouts-sleek); Vanilla (aura-callouts-vanilla); Block (aura-callouts-block)

```hacksidian-files
callout-technical-round
```
