---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Вкладки на radio
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e037
```

```hacksidian-details
> Зачем
Несколько представлений в одном месте.

> Как работает
Одна radio-группа хранит выбор; sibling-селекторы показывают нужную панель.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Это честные radio-переключатели, не ARIA tabs. Скрытие не выгружает документ и не останавливает медиа.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e037
```


```hacksidian-files
iframe-e037
```
