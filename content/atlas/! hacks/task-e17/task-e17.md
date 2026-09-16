---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Карточка задачи
category: task
sources:
  - https://github.github.com/gfm/#task-list-items-extension-
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
task-e17
```

```hacksidian-live
task-e17
```

```hacksidian-details
> Зачем
Несколько задач с описаниями и материалами.

> Как работает
Карточка — сам li; первый p отделяется от следующих абзацев.
```

```hacksidian-sources
task-e17
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e17
```
