---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Та же колонка с абзацами
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
task-e08
```

```hacksidian-live
task-e08
```

```hacksidian-details
> Зачем
Развёрнутая задача с описанием и ссылкой.

> Как работает
Селектор охватывает input непосредственно в li и input внутри первого p.

> Ограничения
Проверяет loose-list: Markdown создаёт p вокруг первой строки.
```

```hacksidian-sources
task-e08
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e08
```
