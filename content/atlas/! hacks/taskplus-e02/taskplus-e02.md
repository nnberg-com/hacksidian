---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Залитая кнопка-маркер
category: taskplus
sources:
  - https://github.com/deathau/obsidian-snippets/blob/main/checkbox.css
format: markdown
themes: []
---

```hacksidian-id
taskplus-e02
```

```hacksidian-live
taskplus-e02
```

```hacksidian-details
> Зачем
Когда статус должен считываться в плотном списке.

> Как работает
Цветной фон и светлый знак; это декоративный маркер, а не кнопка.

> Ограничения
CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e02
```

```hacksidian-files
taskplus-e02
```
