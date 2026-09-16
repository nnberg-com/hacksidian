---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Оформление по src
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e040
```

```hacksidian-details
> Зачем
Когда нельзя добавить класс каждому iframe.

> Как работает
Селектор атрибута различает адреса. У видео-провайдера можно выбирать префикс embed-URL.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS видит строку src, но не фактический тип содержимого или переход внутри окна.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e040
```

###### Локальные зависимости

- [assets/documents/map.html](<./assets/documents/map.html>)
- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e040
```
