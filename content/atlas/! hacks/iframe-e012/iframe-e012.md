---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Горизонтальная лента со snap
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e012
```

```hacksidian-details
> Зачем
Последовательность превью и галерея источников.

> Как работает
Scroll snap притягивает ближайшую вставку к началу ленты.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Прокручивайте по нижней полосе или с фокусом на самой ленте: вложенный документ может перехватывать жесты.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e012
```

###### Локальные зависимости

- [assets/documents/dashboard.html](<./assets/documents/dashboard.html>)
- [assets/documents/map.html](<./assets/documents/map.html>)
- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e012
```
