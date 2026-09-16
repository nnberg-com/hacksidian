---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Цитата на боковом поле
category: note
sources:
  - https://spec.commonmark.org/0.31.2/#block-quotes
format: markdown
themes:
  - sanctum
---

```hacksidian-id
note-quote-margin
```

```hacksidian-live
note-quote-margin
```

```hacksidian-details
> Зачем
Короткая сопроводительная выдержка в достаточно широкой заметке.

> Как работает
При ширине контейнера от 430px blockquote плавает справа; flow-root удерживает float внутри заметки.

> Ограничения
На узком экране цитата возвращается в обычный поток. Это не автоматически рассчитанная система полевых сносок.
```

```hacksidian-sources
note-quote-margin
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/sanctum|Sanctum]]: **Toggle aside borders** (`aside-border`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7223), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2717).
  Селектор: `.aside-border .callout[data-callout-metadata~=right]`.
  Проверяемое свойство: `border-left`.

```hacksidian-files
note-quote-margin
```
