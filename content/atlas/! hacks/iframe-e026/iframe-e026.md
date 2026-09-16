---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Растворение нижнего края
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e026
```

```hacksidian-details
> Зачем
Декоративный фрагмент длинного текста.

> Как работает
Альфа-маска постепенно делает нижнюю часть прозрачной.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Маска не отключает взаимодействие в прозрачной области. Для чтения лучше обычное окно.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e026
```

###### Локальные зависимости

- [assets/documents/article.html](<./assets/documents/article.html>)

```hacksidian-files
iframe-e026
```
