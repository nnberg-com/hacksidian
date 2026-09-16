---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Компактный список с длинными переносами
category: pseudo-task
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
pseudo-task-e47
```

```hacksidian-live
pseudo-task-e47
```

```hacksidian-details
> Зачем
Плотное чтение без наложения значка на текст.

> Как работает
li резервирует место для маркера, line-height и интервалы задают ритм.

> Ограничения
Проверка реальной длинной строки, а не только однострочных названий.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e47
```

```hacksidian-files
pseudo-task-e47
```
