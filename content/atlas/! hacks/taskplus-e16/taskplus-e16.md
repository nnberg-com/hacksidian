---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Кольцо прогресса
category: taskplus
sources:
  - https://forum.obsidian.md/t/tweaking-the-checkboxes-in-lyt-mode-theme/57059
format: markdown
themes:
  - lyt-mode
favourite: false
---

```hacksidian-id
taskplus-e16
```

```hacksidian-live
taskplus-e16
```

```hacksidian-details
> Зачем
Та же шкала с более лёгким центром.

> Как работает
Конический фон обрезан радиальной маской, которая вырезает отверстие.

> Ограничения
Сектора и кольца — CSS-развитие приёма частичной заливки.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e16
```

```hacksidian-files
taskplus-e16
```
