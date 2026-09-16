---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Миниатюра большого viewport
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e023
```

```hacksidian-details
> Зачем
Показать широкий интерфейс в небольшой карточке.

> Как работает
Размеры удваиваются, затем изображение уменьшается вдвое. Ширина внутри iframe в два раза больше видимой.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Мелкий текст и элементы управления тоже уменьшаются. transform не меняет поток.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e023
```

###### Локальные зависимости

- [assets/documents/dashboard.html](<./assets/documents/dashboard.html>)

```hacksidian-files
iframe-e023
```
