---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Разворачивание через checkbox
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e035
```

```hacksidian-details
> Зачем
Увеличение без изменения URL и истории якорей.

> Как работает
Состояние хранится в нативном checkbox. Две label переключают один input.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Те же ограничения доступности, что у :target. Это демонстрация CSS-паттерна, не готовая модальная система.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e035
```


```hacksidian-files
iframe-e035
```
