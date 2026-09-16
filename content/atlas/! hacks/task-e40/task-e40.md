---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Подпись из title
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
task-e40
```

```hacksidian-live
task-e40
```

```hacksidian-details
> Зачем
Дополнительное краткое пояснение к ресурсу.

> Как работает
attr(title) выводит Markdown-заголовок ссылки через ::after.

> Ограничения
Основные условия задачи лучше хранить обычным текстом, а не только в CSS-generated content.
```

```hacksidian-sources
task-e40
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e40
```
