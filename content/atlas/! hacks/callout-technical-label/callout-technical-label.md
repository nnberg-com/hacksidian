---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Заголовок-ярлычок
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes: []
---

```hacksidian-id
callout-technical-label
```

```hacksidian-live
callout-technical-label
```

```hacksidian-details
> Зачем
Небольшая пометка на рамке примечания.

> Как работает
Заголовок шириной по содержимому смещён вверх отрицательным margin, под ним непрозрачный фон. Сверху оставлен запас места.

> Ограничения
Ярлычок использует фон заметки, чтобы перекрыть верхнюю линию рамки. При очень длинном названии он может занять несколько строк.
```
```hacksidian-sources
callout-technical-label
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Callout style** (`callouts-style`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L6829), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L1331).
  Селектор: `.callouts-outlined .callout .callout-title`.
  Проверяемое свойство: `margin-top`.
  Варианты: Filled (callouts-default); Outlined (callouts-outlined)

```hacksidian-files
callout-technical-label
```
