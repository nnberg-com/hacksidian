---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: "SVG-маска: единый контур"
category: taskplus
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
taskplus-e06
```

```hacksidian-live
taskplus-e06
```

```hacksidian-details
> Зачем
Согласованный набор иконок, который легко перекрашивать.

> Как работает
mask рисует силуэт, background задаёт цвет. SVG встроен в CSS как data URL и работает даже при открытии файла.

> Ограничения
В Markdown не добавляется ни img, ни svg.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e06
```

```hacksidian-files
taskplus-e06
```
