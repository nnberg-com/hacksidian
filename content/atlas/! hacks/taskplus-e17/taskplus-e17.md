---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Полоска под записью
category: taskplus
sources:
  - https://forum.obsidian.md/t/tweaking-the-checkboxes-in-lyt-mode-theme/57059
format: markdown
themes:
  - lyt-mode
---

```hacksidian-id
taskplus-e17
```

```hacksidian-live
taskplus-e17
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
taskplus-e17
```

```hacksidian-files
taskplus-e17
```
