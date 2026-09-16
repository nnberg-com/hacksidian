---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Фокус на записи со ссылкой
category: pseudo-task
sources:
  - https://minimal.guide/checklists
  - https://github.com/SlRvb/Obsidian--ITS-Theme
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes:
  - its-theme
  - minimal
---

```hacksidian-id
pseudo-task-e48
```

```hacksidian-live
pseudo-task-e48
```

```hacksidian-details
> Зачем
Навигация клавиатурой в гипертексте.

> Как работает
Ссылка получает настоящий фокус, :focus-within оформляет родительский пункт.

> Ограничения
Нажмите Tab. CSS не добавляет tabindex на неинтерактивный li.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e48
```

```hacksidian-files
pseudo-task-e48
```
