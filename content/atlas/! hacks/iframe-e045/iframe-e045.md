---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Подложка вместо белой вспышки
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e045
```

```hacksidian-details
> Зачем
Заранее зарезервировать место и цвет под вставку.

> Как работает
Размер и фон обёртки существуют независимо от iframe. Checkbox только демонстрирует вид подложки.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS не определяет момент загрузки. Это ручной показ двух состояний, не работающий индикатор загрузки.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e045
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e045
```
