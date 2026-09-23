---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: SVG как фоновая картинка
category: taskplus
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
taskplus-e08
```

```hacksidian-live
taskplus-e08
```

```hacksidian-details
> Зачем
Когда требуется оригинальный цвет рисунка.

> Как работает
background-image сохраняет цвет SVG; в отличие от маски он не берётся из currentColor.

> Ограничения
Для многоцветного SVG можно сохранить несколько собственных заливок.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e08
```

```hacksidian-files
taskplus-e08
```
