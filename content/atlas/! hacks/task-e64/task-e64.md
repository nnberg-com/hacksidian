---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Дата как календарная метка
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
task-e64
```

```hacksidian-live
task-e64
```

```hacksidian-details
> Зачем
Визуально вынести срок из формулировки задачи.

> Как работает
Ссылка с title="Срок" получает границу и верхнюю полосу.

> Ограничения
CSS не сравнивает дату с сегодняшним днём. Метка показывает срок, написанный автором.
```

```hacksidian-sources
task-e64
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e64
```
