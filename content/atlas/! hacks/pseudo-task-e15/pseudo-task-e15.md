---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Круговые сектора
category: pseudo-task
sources:
  - https://forum.obsidian.md/t/tweaking-the-checkboxes-in-lyt-mode-theme/57059
format: markdown
themes:
  - lyt-mode
---

```hacksidian-id
pseudo-task-e15
```

```hacksidian-live
pseudo-task-e15
```

```hacksidian-details
> Зачем
Компактная шкала рядом с текстом.

> Как работает
conic-gradient рисует сектор; border-radius превращает квадрат в круг.

> Ограничения
Процент задан таблицей состояний.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e15
```

```hacksidian-files
pseudo-task-e15
```
