---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Почему object-fit не кадрирует iframe
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e048
```

```hacksidian-details
> Зачем
Не переносить поведение img на встроенную страницу.

> Как работает
Одинаковый документ, одинаковый размер, разные object-fit: результат остаётся одинаковым.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Для iframe object-fit не действует. Для кадрирования нужны обёртка, сдвиг или масштаб.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e048
```

###### Локальные зависимости

- [assets/documents/article.html](<./assets/documents/article.html>)

```hacksidian-files
iframe-e048
```
