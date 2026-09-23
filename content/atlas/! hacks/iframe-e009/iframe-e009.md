---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Шире текстовой колонки
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e009
```

```hacksidian-details
> Зачем
Карты, таблицы и схемы между абзацами.

> Как работает
CSS Grid выделяет колонку для текста, а iframe занимает все колонки.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Аналог идеи iframe-wide / iframe-max / iframe-100 в Minimal, без привязки к DOM Obsidian.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e009
```


```hacksidian-files
iframe-e009
```
