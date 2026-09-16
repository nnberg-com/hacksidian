---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Подсказка для вопроса без ссылки
category: pseudo-task
sources:
  - https://minimal.guide/checklists
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes:
  - minimal
---

```hacksidian-id
pseudo-task-e46
```

```hacksidian-live
pseudo-task-e46
```

```hacksidian-details
> Зачем
Проверка полноты исследовательской записи.

> Как работает
li[data-task="?"]:not(:has(a)) добавляет подсказку к вопросу, у которого нет ссылки.

> Ограничения
Проверяется наличие элемента a, а не смысл или достоверность ссылки.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e46
```

```hacksidian-files
pseudo-task-e46
```
