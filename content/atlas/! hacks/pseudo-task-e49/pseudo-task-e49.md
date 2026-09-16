---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Мягкий акцент при наведении
category: pseudo-task
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
pseudo-task-e49
```

```hacksidian-live
pseudo-task-e49
```

```hacksidian-details
> Зачем
Длинный конспект проще читать строка за строкой.

> Как работает
transition плавно меняет подложку; reduced-motion отключает переход.

> Ограничения
Нет бесконечной анимации или имитации загрузки.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e49
```

```hacksidian-files
pseudo-task-e49
```
