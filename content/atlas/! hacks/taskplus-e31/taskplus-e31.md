---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: "Скрытая строка: наведение или фокус"
category: taskplus
sources:
  - https://forum.obsidian.md/t/spoiler-css-snippet/80140
format: markdown
themes: []
---

```hacksidian-id
taskplus-e31
```

```hacksidian-live
taskplus-e31
```

```hacksidian-details
> Зачем
Ответы для самопроверки.

> Как работает
Прозрачный текст и цветная подложка; :hover и :focus-within раскрывают строку.

> Ограничения
Наведите мышь или перейдите Tab на ссылку. Текст остаётся в DOM; это не защита информации.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e31
```

```hacksidian-files
taskplus-e31
```
