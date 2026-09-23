---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Приоритет начертанием
category: taskplus
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
taskplus-e20
```

```hacksidian-live
taskplus-e20
```

```hacksidian-details
> Зачем
Важное, спорное и отменённое видны без цвета.

> Как работает
font-weight, font-style и text-decoration выбираются по символу.

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e20
```

```hacksidian-files
taskplus-e20
```
