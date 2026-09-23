---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Родитель приглушён, дети читаемы
category: taskplus
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
taskplus-e37
```

```hacksidian-live
taskplus-e37
```

```hacksidian-details
> Зачем
Отменённая ветвь с полезными оставшимися записями.

> Как работает
Цвет назначается родителю; дочернему списку возвращается обычный цвет. opacity на родителе не используется.

> Ограничения
Цвет можно переопределить у потомка; прозрачность всей группы так отменить нельзя.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e37
```

```hacksidian-files
taskplus-e37
```
