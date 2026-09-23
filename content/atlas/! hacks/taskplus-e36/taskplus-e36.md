---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Важное выделяет весь список
category: taskplus
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
taskplus-e36
```

```hacksidian-live
taskplus-e36
```

```hacksidian-details
> Зачем
Найти проблемную группу среди разделов.

> Как работает
ul:has(> li[data-task="!"]) добавляет рамку всему списку.

> Ограничения
Правило не требует отдельной обёртки группы в Markdown.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e36
```

```hacksidian-files
taskplus-e36
```
