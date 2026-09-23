---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Сетка независимых документов
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e011
```

```hacksidian-details
> Зачем
Дашборды и сравнение нескольких источников.

> Как работает
auto-fit распределяет колонки, minmax не даёт узкой панели переполниться.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
У каждого iframe своя прокрутка и фокус.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e011
```


```hacksidian-files
iframe-e011
```
