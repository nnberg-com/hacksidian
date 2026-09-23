---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Срезанные углы
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e025
```

```hacksidian-details
> Зачем
Графическая рамка в редакционном дизайне.

> Как работает
Многоугольник задаёт два диагональных среза.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e025
```


```hacksidian-files
iframe-e025
```
