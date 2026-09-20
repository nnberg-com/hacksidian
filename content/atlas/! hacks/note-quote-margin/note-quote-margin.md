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
favourite: false
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
В режиме чтения при ширине области текста от 430px обычная цитата занимает 42% ширины справа, а следующие абзацы обтекают её слева. Приём сам задаёт контейнер для проверки ширины и учитывает обёртку .el-blockquote в Obsidian. Уровень предшествующего заголовка не имеет значения.

> Ограничения
При ширине области текста меньше 430px цитата остаётся в обычном потоке. Приём предназначен для обычных Markdown-цитат, а не callout’ов, и не меняет Live Preview. Текст обтекает цитату после неё, не до неё. Это не автоматически рассчитанная система полевых сносок.
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
