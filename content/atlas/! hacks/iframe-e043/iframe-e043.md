---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Печатная версия со ссылкой
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e043
```

```hacksidian-details
> Зачем
Печатная статья, где интерактивный виджет не имеет смысла.

> Как работает
@media print заменяет iframe заранее подготовленным текстом.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Адрес указан явно в HTML. Полноценную многостраничную распечатку чужого iframe внешний CSS не гарантирует.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e043
```

###### Локальные зависимости

- [assets/documents/map.html](<./assets/documents/map.html>)

```hacksidian-files
iframe-e043
```
