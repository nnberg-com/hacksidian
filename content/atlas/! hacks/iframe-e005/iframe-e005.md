---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: "Квадрат: 1 : 1"
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e005
```

```hacksidian-details
> Зачем
Компактные карты, обложки и квадратные виджеты.

> Как работает
Квадрат сохраняется при изменении ширины.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e005
```

###### Локальные зависимости

- [assets/documents/map.html](<./assets/documents/map.html>)

```hacksidian-files
iframe-e005
```
