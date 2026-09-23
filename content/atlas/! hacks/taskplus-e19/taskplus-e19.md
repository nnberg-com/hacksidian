---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Цвет всей записи
category: taskplus
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
taskplus-e19
```

```hacksidian-live
taskplus-e19
```

```hacksidian-details
> Зачем
Семантические группы в конспекте.

> Как работает
Тот же --tone окрашивает текст li и его маркер.

> Ограничения
Ссылки с собственным цветом потребуют отдельного правила.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e19
```

```hacksidian-files
taskplus-e19
```
