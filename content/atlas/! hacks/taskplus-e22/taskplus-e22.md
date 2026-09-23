---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Полоса на полях
category: taskplus
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
taskplus-e22
```

```hacksidian-live
taskplus-e22
```

```hacksidian-details
> Зачем
Предупреждения и редакторские вопросы рядом с прозой.

> Как работает
border-inline-start задаёт цвет категории без окраски всего текста.

> Ограничения
Подходит и для нескольких абзацев внутри пункта.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e22
```

```hacksidian-files
taskplus-e22
```
