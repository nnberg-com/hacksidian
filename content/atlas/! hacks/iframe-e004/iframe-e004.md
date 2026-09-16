---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: "Вертикальная вставка: 9 : 16"
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e004
```

```hacksidian-details
> Зачем
Вертикальные ролики и мобильные композиции.

> Как работает
Меняем только aspect-ratio и ограничиваем ширину.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e004
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e004
```
