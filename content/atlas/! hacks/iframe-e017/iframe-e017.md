---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Окно браузера
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e017
```

```hacksidian-details
> Зачем
Портфолио, обзор сайта и объяснение веб-интерфейса.

> Как работает
Адресная полоса — внешний HTML; цветные точки нарисованы фоновыми градиентами.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Это декоративная рамка, её точки не являются кнопками.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e017
```

###### Локальные зависимости

- [assets/documents/article.html](<./assets/documents/article.html>)

```hacksidian-files
iframe-e017
```
