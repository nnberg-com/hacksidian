---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Объединить соседние предупреждения
category: taskplus
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
taskplus-e45
```

```hacksidian-live
taskplus-e45
```

```hacksidian-details
> Зачем
Несколько связанных замечаний выглядят одним блоком.

> Как работает
Селектор + и :has(+ …) убирают промежутки и внутренние скругления.

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e45
```

```hacksidian-files
taskplus-e45
```
