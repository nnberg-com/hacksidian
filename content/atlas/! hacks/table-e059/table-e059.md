---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Строка с отсутствующими данными
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
table-e059
```

```hacksidian-live
table-e059
```

```hacksidian-details
> Зачем
Помогает заметить незаполненные поля.

> Как работает
tr:has(>td:empty) находит строку с действительно пустой ячейкой.

> Ограничения
Пустота определяется по DOM; пробельный узел или добавленная рендерером обёртка могут помешать :empty.
```

```hacksidian-sources
table-e059
```

```hacksidian-files
table-e059
```
