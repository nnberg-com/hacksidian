---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Сворачиваемая вставка
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e033
```

```hacksidian-details
> Зачем
Дополнительный материал, который не нужен каждому читателю.

> Как работает
Открытие обеспечивает HTML details, CSS оформляет состояния.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Сворачивание не гарантирует остановку медиа или отмену загрузки.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e033
```

###### Локальные зависимости

- [assets/documents/map.html](<./assets/documents/map.html>)

```hacksidian-files
iframe-e033
```
