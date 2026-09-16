---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Материалы компактной строкой
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
task-e76
```

```hacksidian-live
task-e76
```

```hacksidian-details
> Зачем
Несколько ссылок под одной задачей.

> Как работает
Ссылки во втором абзаце получают inline-block и небольшие отступы, сохраняя обычный текстовый поток.

> Ограничения
Ссылки имеют вид компактных действий, но сохраняют семантику ссылок.
```

```hacksidian-sources
task-e76
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


###### Локальные зависимости

- [assets/cover.svg](<./assets/cover.svg>)

```hacksidian-files
task-e76
```
