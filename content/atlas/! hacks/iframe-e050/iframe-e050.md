---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Внешний overflow не убирает внутренний скролл
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e050
```

```hacksidian-details
> Зачем
Понять границу внешнего и внутреннего CSS.

> Как работает
Прокрутите статью внутри окна: внешние overflow и scrollbar-width не управляют скроллером вложенного документа.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
При overlay-scrollbars полоса может быть невидима до прокрутки. Внутренний overflow нужно задавать в самом документе.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e050
```

###### Локальные зависимости

- [assets/documents/article.html](<./assets/documents/article.html>)

```hacksidian-files
iframe-e050
```
