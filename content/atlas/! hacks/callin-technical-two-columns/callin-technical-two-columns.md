---
tags:
  - hacksidian_technique
  - hacksidian_callin
title: Две колонки внутри note
category: callin
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - ukiyo
  - dune
  - ultra-lobster
---

```hacksidian-id
callin-technical-two-columns
```

```hacksidian-live
callin-technical-two-columns
```

```hacksidian-details
> Зачем
Длинное справочное пояснение на широком экране.

> Как работает
columns применяется только к callout-content; заголовок остаётся над колонками.
```

```hacksidian-sources
callin-technical-two-columns
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/ukiyo|Ukiyo]]: описанный автором способ применения — [руководство](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/docs/custom-callouts.md#L36), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `.callout[data-callout-metadata*="!bg"]>.callout-content, .callout[data-callout-metadata*="!bg"]>.callout-title`.
  Применение: Создайте внешний callout `cont` и вложенные `col` по образцу автора; документация использует необычную запись, сверяйте с реальным синтаксисом callout Obsidian.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Max columns per row** (`ulu-col-count`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1792), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L14086).
  Селектор: `body.ulu-col-3 .callout[data-callout="col"] > .callout-content > blockquote, body.ulu-col-3 .callout[data-callout="col"] > .callout-content > .callout`.
  Проверяемое свойство: `flex-basis`.
  Применение: Вложенные блоки внутри [!col] размещаются колонками; ulu-col-3 задаёт три колонки вместо двух.
  Варианты: 2 columns (ulu-col-2); 3 columns (ulu-col-3)
- [[atlas/! themes/dune|Dune]]: описанный автором способ применения — [руководство](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/Wiki/cheatsheet-Callouts%2C%20Fences%2C%20Tags.md#L48), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4796).
  Селектор: `div[data-callout="mehrspaltig"].callout>.callout-title, div[data-callout="multi-column"].callout>.callout-title`.
  Применение: Вложите несколько callout `blank-container` в `multi-column`.

```hacksidian-files
callin-technical-two-columns
```
