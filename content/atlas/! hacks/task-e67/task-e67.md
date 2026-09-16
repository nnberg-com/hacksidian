---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Скрывать только завершённые листья
category: task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
task-e67
```

```hacksidian-live
task-e67
```

```hacksidian-details
> Зачем
Убрать выполненные пункты, сохранив незавершённые подзадачи у отмеченного родителя.

> Как работает
display:none применяется к отмеченным li без дочернего ul/ol.

> Ограничения
Родитель остаётся видимым, даже если он отмечен. Это устраняет риск скрыть открытую ветвь вместе с ним.
```

```hacksidian-sources
task-e67
```

```hacksidian-files
task-e67
```
