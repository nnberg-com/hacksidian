---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: "Расширение ITS: исследование и истории"
category: pseudo-task
sources:
  - https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css
format: markdown
themes:
  - its-theme
---

```hacksidian-id
pseudo-task-e12
```

```hacksidian-details
> Зачем
Категории для конспекта, сюжетов и исследовательских заметок.

> Как работает
Локальный шрифт показывает расширенные глифы. Подписи поясняют принятый здесь словарь.

> Ограничения
В ITS i — идея, I — информация; в Minimal наоборот. Некоторые русские подписи здесь интерпретируют категории.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.

Живой пример пока не готов: рецепт требует специального шрифта, который встроенный просмотрщик ещё не подключает. Без него показывать эффект как работающий было бы неверно.
```
```hacksidian-sources
pseudo-task-e12
```

###### Локальные зависимости

- [assets/its-icons.woff](<./assets/its-icons.woff>)

```hacksidian-files
pseudo-task-e12
```
