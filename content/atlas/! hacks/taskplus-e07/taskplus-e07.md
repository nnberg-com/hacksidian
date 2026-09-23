---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Маска внутри цветного диска
category: taskplus
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
taskplus-e07
```

```hacksidian-live
taskplus-e07
```

```hacksidian-details
> Зачем
Выразительные категории в заметках.

> Как работает
radial-gradient на li создаёт подложку под маской; дополнительный span не нужен.

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e07
```

```hacksidian-files
taskplus-e07
```
