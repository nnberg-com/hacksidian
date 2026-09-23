---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Мягкие цветные подложки
category: taskplus
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
taskplus-e21
```

```hacksidian-live
taskplus-e21
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
taskplus-e21
```

```hacksidian-files
taskplus-e21
```
