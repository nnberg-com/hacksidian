---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Фигура с подписью
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e016
```

```hacksidian-details
> Зачем
Статья с источниками и содержательными подписями.

> Как работает
figure объединяет окно и figcaption. Подпись и ссылка остаются снаружи документа.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e016
```


```hacksidian-files
iframe-e016
```
