---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Печать без разрыва коротких строк
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-inside
format: markdown
themes: []
---

```hacksidian-id
table-e076
```

```hacksidian-details
> Зачем
Строка старается целиком остаться на одной странице.

> Как работает
break-inside: avoid на tr, шапка остаётся table-header-group; отменены ограничения прокрутки.

> Ограничения
Повторение шапки зависит от движка печати. Строка выше страницы всё равно может быть разбита. Фактическая пагинация здесь не проверена.

Встроенного экранного примера нет: эффект проявляется при печати или экспорте в PDF. Проверять его нужно на отдельной заметке в этом режиме.
```
```hacksidian-sources
table-e076
```

```hacksidian-files
table-e076
```
