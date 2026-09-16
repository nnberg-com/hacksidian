---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Плашка после текста
category: pseudo-task
sources:
  - https://github.com/AnubisNekhet/AnuPpuccin/blob/main/theme.css
format: markdown
themes:
  - anuppuccin
---

```hacksidian-id
pseudo-task-e25
```

```hacksidian-live
pseudo-task-e25
```

```hacksidian-details
> Зачем
Статус читается после содержания.

> Как работает
::after добавляет метку; ::before продолжает показывать знак.

> Ограничения
У многоабзацного пункта ::after появится после всех его блоков.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e25
```

```hacksidian-files
pseudo-task-e25
```
