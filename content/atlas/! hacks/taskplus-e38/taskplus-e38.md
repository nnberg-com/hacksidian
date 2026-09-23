---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Нумеруются только вопросы
category: taskplus
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
format: markdown
themes: []
---

```hacksidian-id
taskplus-e38
```

```hacksidian-live
taskplus-e38
```

```hacksidian-details
> Зачем
Вопросы получают свои номера среди идей и ответов.

> Как работает
counter-increment стоит только на li[data-task="?"].

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e38
```

```hacksidian-files
taskplus-e38
```
