---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Размытый ответ
category: pseudo-task
sources:
  - https://forum.obsidian.md/t/spoiler-css-snippet/80140
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e33
```

```hacksidian-live
pseudo-task-e33
```

```hacksidian-details
> Зачем
Мягкое визуальное сокрытие подсказки.

> Как работает
filter:blur применяется только к blockquote, а при наведении снимается.

> Ограничения
Размытые слова могут угадываться. Это декоративный спойлер.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e33
```

```hacksidian-files
pseudo-task-e33
```
