---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Напоминание о недостающей ссылке
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
task-e61
```

```hacksidian-live
task-e61
```

```hacksidian-details
> Зачем
В списке проверок каждый результат должен иметь источник.

> Как работает
Открытый task li без ссылки получает пунктирную границу и подпись.

> Ограничения
Проверяется наличие элемента a, а не качество ссылки. Это договорённость для такого списка, не универсальная ошибка.
```

```hacksidian-sources
task-e61
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e61
```
