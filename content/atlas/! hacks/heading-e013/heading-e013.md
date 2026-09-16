---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Баланс строк
category: heading
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
format: markdown
themes:
  - ultra-lobster
  - fancy-a-story
---

```hacksidian-id
heading-e013
```

```hacksidian-live
heading-e013
```

```hacksidian-details
> Зачем
Убирает неудачное соотношение длин строк в коротком названии.

> Как работает
Сравнение одинаковых блоков: обычные переносы и text-wrap: balance.
```

```hacksidian-sources
heading-e013
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Disable Balanced Heading Wrap** (`ulu-no-balance-headings`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L997), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7889).
  Селектор: `body.ulu-no-balance-headings .markdown-preview-view :is(h1, h2, h3, h4, h5, h6), body.ulu-no-balance-headings .markdown-source-view.mod-cm6 :is( .HyperMD-header-1, .HyperMD-header-2, .HyperMD-header-3, .HyperMD-header-4, .HyperMD-header-5, .HyperMD-header-6 )`.
  Проверяемое свойство: `text-wrap`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L18), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L18).
  Селектор: `h2, h3, h4, h5, h6`.

```hacksidian-files
heading-e013
```
