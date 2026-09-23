---
tags:
  - hacksidian_technique
  - hacksidian_quote
title: Крупная цитата-врезка
category: quote
sources:
  - https://spec.commonmark.org/0.31.2/#block-quotes
format: markdown
themes:
  - typomagical
---

```hacksidian-id
quote-pull-accent
```

```hacksidian-live
quote-pull-accent
```

```hacksidian-details
> Зачем
Выделение короткой выразительной мысли.

> Как работает
Центрирование, serif и увеличенный размер применяются к цитате; последний em-абзац оформляется как подпись.

> Ограничения
Подпись — обычный абзац с курсивом по договорённости. CSS не определяет автора цитаты.
```

```hacksidian-sources
quote-pull-accent
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/typomagical|Typomagical]]: **Blockquotes** (`blockquote`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1946), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1015).
  Селектор: `.blockquote-bustle .is-live-preview .HyperMD-quote, .blockquote-bustle blockquote`.
  Проверяемое свойство: `font-size`.
  Варианты: Obsidian default (blockquote-plain); Big with top border (blockquote-bustle); Neuomorphic soft shadows (blockquote-neuomorphic)

```hacksidian-files
quote-pull-accent
```
