---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Обтекание текстом
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e010
```

```hacksidian-details
> Зачем
Редакционная вёрстка и небольшие иллюстративные вставки.

> Как работает
float оставляет место для соседних строк, flow-root удерживает обтекание внутри образца.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e010
```


```hacksidian-files
iframe-e010
```
