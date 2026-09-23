---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Большое окно через :target
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e034
```

```hacksidian-details
> Зачем
Быстро увеличить карту в пределах окна страницы.

> Как работает
Якорная ссылка включает :target. Ссылка закрытия возвращает к примеру.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Это не Fullscreen API и не модальный dialog: нет автоматического Escape, захвата фокуса и блокировки фоновой прокрутки.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e034
```


```hacksidian-files
iframe-e034
```
