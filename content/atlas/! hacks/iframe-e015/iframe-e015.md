---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Приподнятая карточка
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e015
```

```hacksidian-details
> Зачем
Рабочий виджет или самостоятельный инструмент.

> Как работает
Две тени создают близкий и рассеянный слой глубины.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e015
```

###### Локальные зависимости

- [assets/documents/dashboard.html](<./assets/documents/dashboard.html>)

```hacksidian-files
iframe-e015
```
