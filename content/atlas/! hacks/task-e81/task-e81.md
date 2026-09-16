---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Фильтр сохраняет счётчик завершённых
category: task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
format: markdown
themes: []
---

```hacksidian-id
task-e81
```

```hacksidian-live
task-e81
```

```hacksidian-details
> Зачем
Скрыть готовые строки и всё же показать их количество.

> Как работает
Для отмеченного li используется visibility:hidden с нулевой высотой, а не display:none: его CSS-счётчик продолжает участвовать.

> Ограничения
Только плоские строки. В отличие от display:none, скрытые боксы сохраняют счётчики. Скрытые элементы нельзя переключить клавиатурой.
```

```hacksidian-sources
task-e81
```

```hacksidian-files
task-e81
```
