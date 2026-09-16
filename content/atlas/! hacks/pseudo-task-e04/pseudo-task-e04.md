---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Иконки без квадрата
category: pseudo-task
sources:
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
pseudo-task-e04
```

```hacksidian-live
pseudo-task-e04
```

```hacksidian-details
> Зачем
Типизированные пункты: идея, ключ, цитата, закладка.

> Как работает
Рамки нет; content сопоставляет букву и видимый Unicode-знак.

> Ограничения
Рисунок Unicode-глифов зависит от шрифта.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e04
```

```hacksidian-files
pseudo-task-e04
```
