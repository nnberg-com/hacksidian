---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Полоска под записью
category: pseudo-task
sources:
  - https://forum.obsidian.md/t/tweaking-the-checkboxes-in-lyt-mode-theme/57059
format: markdown
themes:
  - lyt-mode
---

```hacksidian-id
pseudo-task-e17
```

```hacksidian-live
pseudo-task-e17
```

```hacksidian-details
> Зачем
Более заметный прогресс длинных записей.

> Как работает
Фоновый linear-gradient получает ширину --p и высоту 3px.

> Ограничения
Показатель статический и меняется при изменении Markdown.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e17
```

```hacksidian-files
pseudo-task-e17
```
