---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Прозрачность требует участия документа
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e049
```

```hacksidian-details
> Зачем
Визуально бесшовная вставка собственного документа.

> Как работает
Слева html и body внутри iframe тоже прозрачны. Справа фон статьи остаётся непрозрачным.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
background: transparent на iframe не стирает background вложенной страницы.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e049
```

###### Локальные зависимости

- [assets/documents/article.html](<./assets/documents/article.html>)
- [assets/documents/transparent.html](<./assets/documents/transparent.html>)

```hacksidian-files
iframe-e049
```
