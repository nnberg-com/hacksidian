---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Исполнитель на отдельной строке
category: task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
  - https://github.github.com/gfm/#task-list-items-extension-
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
task-e63
```

```hacksidian-live
task-e63
```

```hacksidian-details
> Зачем
Быстро находить ответственного в совместном плане.

> Как работает
Ссылка с title="Исполнитель" становится блочной подписью.

> Ограничения
Ссылка остаётся доступной. Атрибут title задаётся стандартным Markdown, без классов.
```

```hacksidian-sources
task-e63
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e63
```
