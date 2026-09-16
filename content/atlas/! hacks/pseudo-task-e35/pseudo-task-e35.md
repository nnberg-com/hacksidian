---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Вся группа готова
category: pseudo-task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e35
```

```hacksidian-live
pseudo-task-e35
```

```hacksidian-details
> Зачем
Сводный визуальный статус ветви.

> Как работает
Группа должна содержать задачи и не иметь непосредственных детей с состоянием кроме x/X.

> Ограничения
CSS меняет оформление, но не символ родителя в исходнике.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e35
```

```hacksidian-files
pseudo-task-e35
```
