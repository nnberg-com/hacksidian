---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: "Видео: 16 : 9"
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e003
```

```hacksidian-details
> Зачем
Видео и широкие презентации.

> Как работает
Высота вычисляется из ширины. Постер здесь заменяет плеер, чтобы не зависеть от сети.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Это пропорции окна; содержимое плеера может иметь собственные полосы.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e003
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e003
```
