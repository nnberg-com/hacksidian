---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: "Печать: различия сохраняются без цвета"
category: pseudo-task
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
pseudo-task-e50
```

```hacksidian-live
pseudo-task-e50
```

```hacksidian-details
> Зачем
Распечатка конспекта с категориями.

> Как работает
В @media print сохраняются знаки и добавляются текстовые категории, убираются цветные фоны.

> Ограничения
Эффект виден в предпросмотре печати. Все примеры включены в печатную версию страницы.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e50
```

```hacksidian-files
pseudo-task-e50
```
