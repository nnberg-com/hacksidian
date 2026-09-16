---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Градиентная рамка
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e020
```

```hacksidian-details
> Зачем
Акцентная вставка или обложка проекта.

> Как работает
Градиент обёртки виден только в области padding; внутренний радиус немного меньше внешнего.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e020
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e020
```
