---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Движение с учётом reduced motion
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e044
```

```hacksidian-details
> Зачем
Небольшая обратная связь без постоянной анимации.

> Как работает
Пользовательская настройка уменьшения движения отключает перемещение.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Внешний CSS не отключит анимации, которые запускает вложенный сайт.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e044
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e044
```
