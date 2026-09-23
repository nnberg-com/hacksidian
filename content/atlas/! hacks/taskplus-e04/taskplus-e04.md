---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Иконки без квадрата
category: taskplus
sources:
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
taskplus-e04
```

```hacksidian-live
taskplus-e04
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
taskplus-e04
```

```hacksidian-files
taskplus-e04
```
