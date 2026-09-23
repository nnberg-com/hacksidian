---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Тонкая рамка и скругление
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e014
```

```hacksidian-details
> Зачем
Спокойное отделение вставки от текста.

> Как работает
border обозначает границу; border-radius скругляет окно.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e014
```


```hacksidian-files
iframe-e014
```
