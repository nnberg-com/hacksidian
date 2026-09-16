---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Оформленные задачи
category: note
sources:
  - https://github.github.com/gfm/
format: markdown
themes: []
---

```hacksidian-id
note-tasks
```

```hacksidian-live
note-tasks
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
note-tasks
```

```hacksidian-files
note-tasks
```
