---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Заголовки ссылок с адресами при печати
category: table
sources:
  - https://example.org/spec.pdf
  - https://example.org/design
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display
format: markdown
themes: []
---

```hacksidian-id
table-e075
```

```hacksidian-details
> Зачем
Распечатка сохраняет адрес источника.

> Как работает
В print CSS after выводит href уже существующей Markdown-ссылки.

> Ограничения
На экране ссылки обычные. Длинные адреса увеличивают строки; почтовый адрес сохраняет префикс mailto:.

Встроенного экранного примера нет: эффект проявляется при печати или экспорте в PDF. Проверять его нужно на отдельной заметке в этом режиме.
```
```hacksidian-sources
table-e075
```

```hacksidian-files
table-e075
```
