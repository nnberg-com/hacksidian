---
tags:
  - hacksidian_technique
  - hacksidian_quote
title: Цитата на подложке
category: quote
sources:
  - https://spec.commonmark.org/0.31.2/#block-quotes
format: markdown
themes:
  - baseline
---

```hacksidian-id
quote-panel
```

```hacksidian-live
quote-panel
```

```hacksidian-details
> Зачем
Визуально самостоятельный фрагмент внутри записи.

> Как работает
Фон, радиус и поля задаются blockquote.
```

```hacksidian-sources
quote-panel
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/baseline|Baseline]]: **Blockquote style** (`blockquote-style`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2494), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.blockquote-edge .markdown-rendered blockquote`.
  Условия CSS: `@media screen,print`
  Варианты: Baseline (blockquote-baseline); Edge (blockquote-edge)

```hacksidian-files
quote-panel
```
