---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Соседние реплики одного автора
category: taskplus
sources:
  - https://github.com/AnubisNekhet/AnuPpuccin/blob/main/theme.css
format: markdown
themes:
  - anuppuccin
---

```hacksidian-id
taskplus-e30
```

```hacksidian-live
taskplus-e30
```

```hacksidian-details
> Зачем
Диалоги с несколькими сообщениями подряд.

> Как работает
Соседний селектор + сокращает промежуток между одинаковыми типами.

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e30
```

```hacksidian-files
taskplus-e30
```
