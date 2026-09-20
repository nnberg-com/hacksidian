---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: "Специальные маркеры Minimal"
category: pseudo-task
sources:
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
favourite: true
---

```hacksidian-id
pseudo-task-e11
```

```hacksidian-live
pseudo-task-e11
```

```hacksidian-details
> Зачем
Сравнить категории, не разыскивая их в разных заметках.

> Как работает
Непустые статусы задач получают Unicode-маркеры. Значения — из документации Minimal; рисунки — адаптация. Обычная незавершённая задача `[ ]` сохраняет свой чекбокс и оформление темы. Значок рисуется внутри штатного checkbox: его размеры, отступы и возможность переключения сохраняются. Приём не меняет отступы списка, колонки, цвет, жирность и зачёркивание текста задач. Неизвестные статусы сохраняют штатный вид.

> Ограничения
Это адаптация специальных маркеров Minimal, а не точная копия его иконок.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e11
```

```hacksidian-files
pseudo-task-e11
```
