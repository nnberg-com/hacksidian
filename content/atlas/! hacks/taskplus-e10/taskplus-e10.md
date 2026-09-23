---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Геометрия одним CSS
category: taskplus
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
taskplus-e10
```

```hacksidian-live
taskplus-e10
```

```hacksidian-details
> Зачем
Простые стрелки, пауза и отмена без ресурсов.

> Как работает
Границы, поворот и градиент рисуют маркер на li::before.

> Ограничения
Здесь p означает паузу; в Minimal это «за». Словарь определяется рецептом.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e10
```

```hacksidian-files
taskplus-e10
```
