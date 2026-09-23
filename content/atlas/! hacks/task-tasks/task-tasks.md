---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Оформленные задачи
category: task
sources:
  - https://github.github.com/gfm/
format: markdown
themes: []
---

```hacksidian-id
task-tasks
```

```hacksidian-live
task-tasks
```

```hacksidian-details
> Зачем
Статический список выполненного и оставшегося.

> Как работает
GFM создаёт input[type=checkbox]; accent-color окрашивает флажок, :has(input:checked) находит завершённый пункт.

> Ограничения
Флажки намеренно disabled: это результат рендеринга, а не редактор задач. Цвет отключённого флажка зависит от браузера. CSS не сохраняет изменения в Markdown.
```

```hacksidian-sources
task-tasks
```

```hacksidian-files
task-tasks
```
