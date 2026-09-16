---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Горизонтальная прокрутка
category: code
sources: []
format: markdown
themes:
  - dune
---

```hacksidian-id
code-e017
```

```hacksidian-live
code-e017
```

```hacksidian-details
> Зачем
Сохранить длинные строки буквально.

> Как работает
white-space: pre плюс overflow: auto.

> Ограничения
Прокрутите вправо. Фокусируемость scroll-контейнера с клавиатуры зависит от браузера; CSS не добавляет tabindex.
```

```hacksidian-sources
code-e017
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/dune|Dune]]: **Codeblocks full length** (`codeblock-dev`) — [описание настройки](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L858), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4599).
  Селектор: `.codeblock-dev:not(.is-phone).HyperMD-codeblock`.
  Проверяемое свойство: `white-space`.

```hacksidian-files
code-e017
```
