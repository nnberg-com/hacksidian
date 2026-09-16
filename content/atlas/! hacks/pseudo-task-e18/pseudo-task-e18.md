---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Цвет только у значка
category: pseudo-task
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
pseudo-task-e18
```

```hacksidian-live
pseudo-task-e18
```

```hacksidian-details
> Зачем
Быстро различать категории в длинном тексте.

> Как работает
CSS-переменная тона задаётся на li, но используется только маркером.

> Ограничения
Текст сохраняет один цвет.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e18
```

```hacksidian-files
pseudo-task-e18
```
