---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Мягкие цветные подложки
category: pseudo-task
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
pseudo-task-e21
```

```hacksidian-live
pseudo-task-e21
```

```hacksidian-details
> Зачем
Выделенные фрагменты в заметке.

> Как работает
color-mix создаёт лёгкий фон от цвета категории.

> Ограничения
Приём подложек есть в ITS; геометрия карточки адаптирована.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e21
```

```hacksidian-files
pseudo-task-e21
```
