---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Свернуть описание выполненного
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
task-e43
```

```hacksidian-live
task-e43
```

```hacksidian-details
> Зачем
Название остаётся в истории, подробности уходят.

> Как работает
У отмеченной задачи скрываются p, кроме первого.

> Ограничения
Снимите отметку у второй задачи: её описание вернётся. Вложенные списки это правило не скрывает.
```

```hacksidian-sources
task-e43
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e43
```
