---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Только отменённое зачёркнуто
category: pseudo-task
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e23
```

```hacksidian-live
pseudo-task-e23
```

```hacksidian-details
> Зачем
Идеи и вопросы не выглядят выполненными.

> Как работает
Селекторы используют data-task, а не :checked: все непустые маркеры технически checked.

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e23
```

```hacksidian-files
pseudo-task-e23
```
