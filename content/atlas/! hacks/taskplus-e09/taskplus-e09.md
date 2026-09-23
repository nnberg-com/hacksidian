---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Настоящий иконочный шрифт ITS
category: taskplus
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
taskplus-e09
```

```hacksidian-details
> Зачем
Большой набор пиктограмм в одном ресурсе.

> Как работает
Локальный @font-face ITS Icons и коды глифов вместо отдельных SVG.

> Ограничения
Шрифт ITS приложен локально с исходной лицензией. Сопоставление букв здесь явно задано CSS.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.

Живой пример пока не готов: рецепт требует специального шрифта, который встроенный просмотрщик ещё не подключает. Без него показывать эффект как работающий было бы неверно.
```
```hacksidian-sources
taskplus-e09
```


```hacksidian-files
taskplus-e09
```
