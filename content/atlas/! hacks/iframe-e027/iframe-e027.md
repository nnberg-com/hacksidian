---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Светлая и тёмная схема
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e027
```

```hacksidian-details
> Зачем
Согласование виджета с темой приложения.

> Как работает
Оба окна показывают один документ. Его собственный CSS реагирует на prefers-color-scheme.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Нужна поддержка тёмной схемы внутри документа; чужой светлый сайт не перекрасится сам.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e027
```

###### Локальные зависимости

- [assets/documents/dashboard.html](<./assets/documents/dashboard.html>)

```hacksidian-files
iframe-e027
```
