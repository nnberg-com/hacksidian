---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Пропорции от ширины контейнера
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e008
```

```hacksidian-details
> Зачем
Один компонент в узкой боковой панели и в широком документе.

> Как работает
Container query смотрит на обёртку, а не на всё окно браузера.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Сужайте окно: на узкой карточке постер становится квадратным.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e008
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e008
```
