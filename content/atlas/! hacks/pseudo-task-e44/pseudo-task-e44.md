---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Цепочка переноса и ожидания
category: pseudo-task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e44
```

```hacksidian-live
pseudo-task-e44
```

```hacksidian-details
> Зачем
Визуальная последовательность без отдельной диаграммы.

> Как работает
border-inline-start соединяет пункты; круглый маркер перекрывает линию.

> Ограничения
Порядок задаёт Markdown; временные интервалы не вычисляются.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e44
```

```hacksidian-files
pseudo-task-e44
```
