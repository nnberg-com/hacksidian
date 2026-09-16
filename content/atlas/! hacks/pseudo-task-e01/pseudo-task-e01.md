---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Знак в квадрате
category: pseudo-task
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e01
```

```hacksidian-live
pseudo-task-e01
```

```hacksidian-details
> Зачем
Вопросы и предупреждения среди обычных задач.

> Как работает
Псевдоэлемент li получает символ через attr(data-task), рамку и размеры.

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e01
```

```hacksidian-files
pseudo-task-e01
```
