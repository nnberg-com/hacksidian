---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Обрезка по скруглённой обёртке
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e021
```

```hacksidian-details
> Зачем
Единый контур для iframe и нескольких внешних слоёв.

> Как работает
overflow: hidden обрезает вложенное окно по границе обёртки.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e021
```

###### Локальные зависимости

- [assets/documents/map.html](<./assets/documents/map.html>)

```hacksidian-files
iframe-e021
```
