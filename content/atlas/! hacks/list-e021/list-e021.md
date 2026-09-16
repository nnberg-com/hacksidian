---
tags:
  - hacksidian_technique
  - hacksidian_list
title: Локальное SVG как маркер
category: list
sources:
  - https://www.w3.org/TR/css-lists-3/
format: markdown
themes: []
---

```hacksidian-id
list-e021
```

```hacksidian-live
list-e021
```

```hacksidian-details
> Зачем
Даёт одинаковый рисунок знака без зависимости от шрифта.

> Как работает
list-style-image использует SVG с собственными размерами 10 × 10.

> Ограничения
Размер встроенного изображения задан в SVG. При недоступности файла остаётся disc; тёмный режим не перекрашивает файл автоматически.
```

```hacksidian-sources
list-e021
```

###### Локальные зависимости

- [assets/bullet.svg](<./assets/bullet.svg>)

```hacksidian-files
list-e021
```
