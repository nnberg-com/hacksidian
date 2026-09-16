---
tags:
  - hacksidian_technique
  - hacksidian_list
title: Тире
category: list
sources:
  - https://www.w3.org/TR/css-lists-3/
format: markdown
themes: []
favourite: false
---

```hacksidian-id
list-e004
```

```hacksidian-live
list-e004
```

```hacksidian-details
> Зачем
Привычное литературное перечисление.

> Как работает
В Obsidian точка списка нарисована элементом `.list-bullet::after`. Приём заменяет её содержимое на тире и убирает круглую подложку. Для простого HTML-списка без этого элемента остаётся правило `list-style-type`.

> Ограничения
Работает с маркированными списками в режиме чтения и Live Preview. На редактируемой строке Obsidian может показывать исходный Markdown-маркер. Нумерация и флажки задач не заменяются. Рисунок тире зависит от шрифта; тема с собственными маркерами может потребовать отдельной адаптации.
```

```hacksidian-sources
list-e004
```

```hacksidian-files
list-e004
```
