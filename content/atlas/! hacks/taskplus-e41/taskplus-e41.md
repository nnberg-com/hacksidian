---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Длинные записи и несколько абзацев
category: taskplus
sources:
  - https://minimal.guide/checklists
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
  - minimal
---

```hacksidian-id
taskplus-e41
```

```hacksidian-live
taskplus-e41
```

```hacksidian-details
> Зачем
Реальная заметка с пояснениями и ссылками.

> Как работает
Маркер расположен на li; правила скрывают input как в tight-, так и в loose-list.

> Ограничения
CSS не требует служебного span вокруг текста.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e41
```

```hacksidian-files
taskplus-e41
```
