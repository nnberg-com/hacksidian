---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Сводка в конце списка
category: pseudo-task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e40
```

```hacksidian-live
pseudo-task-e40
```

```hacksidian-details
> Зачем
Посчитать вопросы и важные пункты без плагина.

> Как работает
Счётчики сбрасываются на ul и читаются в ul::after после обхода дочерних li.

> Ограничения
Сводка — generated content; это не запрос по всему хранилищу.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e40
```

```hacksidian-files
pseudo-task-e40
```
