---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Плашка на каждой строке
category: heading
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
format: markdown
themes: []
favourite: true
---

```hacksidian-id
heading-e029
```

```hacksidian-live
heading-e029
```

```hacksidian-details
> Зачем
Фон следует за многострочным названием отдельными полосами.

> Как работает
Приём применяется к заголовкам третьего уровня (`###`, H3). Markdown *…* создаёт строчный em. На нём CSS рисует подложку; box-decoration-break: clone повторяет оформление на каждой строке.

> Ограничения
Здесь выделен весь текст заголовка средствами Markdown. Специальный span не нужен.
```

```hacksidian-sources
heading-e029
```

```hacksidian-files
heading-e029
```
