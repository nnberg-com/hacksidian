---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Вопрос внутри ветви
category: pseudo-task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e34
```

```hacksidian-live
pseudo-task-e34
```

```hacksidian-details
> Зачем
Родитель сразу показывает, где осталось уточнение.

> Как работает
li:has(> ul > li[data-task="?"]) выбирает родителя по непосредственному ребёнку.

> Ограничения
Учитывается ближайший вложенный список, а не произвольный дальний потомок.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e34
```

```hacksidian-files
pseudo-task-e34
```
