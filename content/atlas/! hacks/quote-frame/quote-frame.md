---
tags:
  - hacksidian_technique
  - hacksidian_quote
title: Рамка вокруг цитаты
category: quote
sources:
  - https://spec.commonmark.org/0.31.2/#block-quotes
format: markdown
themes:
  - sanctum
  - shiba-inu
  - maple
---

```hacksidian-id
quote-frame
```

```hacksidian-live
quote-frame
```

```hacksidian-details
> Зачем
Выдержки, которые хочется отделить от комментария.

> Как работает
Двойная граница оформляет существующий blockquote.
```

```hacksidian-sources
quote-frame
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/sanctum|Sanctum]]: **Toggle blockquote short divider** (`blockquote-marker`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7278), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L526).
  Селектор: `.blockquote-marker .markdown-rendered blockquote`.
- [[atlas/! themes/sanctum|Sanctum]]: **Toggle blockquote horizontal dividers** (`blockquote-border`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7283), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L538).
  Селектор: `.blockquote-border .markdown-rendered blockquote`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Blockquote** (`blockquote-style`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7858), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1258).
  Селектор: `body.blockquote-style-outline :is(.markdown-preview-view, .markdown-rendered) blockquote`.
  Проверяемое свойство: `border`.
  Варианты: Default (blockquote-style-default); Outline (blockquote-style-outline); Border left (blockquote-style-border-left); Quotation mark (blockquote-style-quotation-mark)
- [[atlas/! themes/maple|Maple]]: **Blockquote Style in Reading View** (`quote-outline-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1771), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5450).
  Селектор: `.quote-border .markdown-rendered blockquote`.
  Проверяемое свойство: `border`.
  Варианты: Plain (quote-none); Border (quote-border); Shadow (quote-shadow)

```hacksidian-files
quote-frame
```
