---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Диалог по двум сторонам
category: pseudo-task
sources:
  - https://github.com/AnubisNekhet/AnuPpuccin/blob/main/theme.css
format: markdown
themes:
  - anuppuccin
---

```hacksidian-id
pseudo-task-e29
```

```hacksidian-live
pseudo-task-e29
```

```hacksidian-details
> Зачем
Переписка двух участников.

> Как работает
margin-inline-start:auto переносит реплики второго типа вправо; DOM-порядок сохраняется.

> Ограничения
Выравнивание — дополнительный CSS-вариант, а не функция Markdown.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e29
```

```hacksidian-files
pseudo-task-e29
```
