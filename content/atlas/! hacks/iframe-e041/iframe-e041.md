---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Оформление родителя через :has
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e041
```

```hacksidian-details
> Зачем
Менять существующую HTML-обёртку без нового класса в разметке.

> Как работает
Родитель проверяет наличие непосредственного ребёнка iframe.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Minimal использует эту идею для ширины контейнеров. :has не заглядывает внутрь документа iframe.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e041
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e041
```
