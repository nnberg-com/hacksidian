---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Разрешение взаимодействия с картой
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e036
```

```hacksidian-details
> Зачем
Не давать встроенной карте случайно захватывать указатель при чтении.

> Как работает
Checkbox меняет pointer-events, внешняя подпись показывает состояние.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
pointer-events управляет указателем, а не безопасностью. tabindex=-1 убирает окно из последовательного Tab; CSS не может вернуть этот атрибут при включении.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e036
```

###### Локальные зависимости

- [assets/documents/map.html](<./assets/documents/map.html>)

```hacksidian-files
iframe-e036
```
