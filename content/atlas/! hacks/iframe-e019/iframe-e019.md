---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Бумажная карточка
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e019
```

```hacksidian-details
> Зачем
Коллажи и визуальные дневники.

> Как работает
Поля, наклон и тень принадлежат обёртке; iframe поворачивается вместе с ней.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e019
```


```hacksidian-files
iframe-e019
```
