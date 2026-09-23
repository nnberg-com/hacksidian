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
Внешние отступы оставляют место для размытия, чтобы тень не обрезалась границами примера.

Тень и лёгкая рамка принадлежат контейнеру.
```

```hacksidian-sources
callout-technical-shadow
```


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
