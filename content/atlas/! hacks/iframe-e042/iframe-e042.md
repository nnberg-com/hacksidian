---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Пояснение сбоку, затем снизу
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e042
```

```hacksidian-details
> Зачем
Адаптивная фигура с содержательной боковой подписью.

> Как работает
Container query меняет компоновку внешних элементов, сохраняя iframe целиком.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e042
```

###### Локальные зависимости

- [assets/documents/map.html](<./assets/documents/map.html>)

```hacksidian-files
iframe-e042
```
