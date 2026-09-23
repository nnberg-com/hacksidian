---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Диалог по двум сторонам
category: taskplus
sources:
  - https://github.com/AnubisNekhet/AnuPpuccin/blob/main/theme.css
format: markdown
themes:
  - anuppuccin
---

```hacksidian-id
taskplus-e29
```

```hacksidian-live
taskplus-e29
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
taskplus-e29
```

```hacksidian-files
taskplus-e29
```
