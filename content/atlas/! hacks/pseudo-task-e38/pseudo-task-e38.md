---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Нумеруются только вопросы
category: pseudo-task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e38
```

```hacksidian-live
pseudo-task-e38
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
pseudo-task-e38
```

```hacksidian-files
pseudo-task-e38
```
