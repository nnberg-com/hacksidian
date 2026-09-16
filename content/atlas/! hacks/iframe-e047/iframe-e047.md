---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: "Почему height: auto не раскрывает статью"
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e047
```

```hacksidian-details
> Зачем
Проверка распространённого неверного ожидания.

> Как работает
Несмотря на длинную статью внутри, окно сохраняет стандартную высоту около 150 px и внутреннюю прокрутку.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Родитель не получает высоту статьи через обычный height: auto.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e047
```

###### Локальные зависимости

- [assets/documents/article.html](<./assets/documents/article.html>)

```hacksidian-files
iframe-e047
```
