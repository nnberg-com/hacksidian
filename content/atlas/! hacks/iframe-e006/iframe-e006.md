---
tags:
  - hacksidian_technique
  - hacksidian_iframe
title: Старый трюк с процентным padding
category: iframe
sources: []
format: html
themes: []
---

```hacksidian-id
iframe-e006
```

```hacksidian-details
> Зачем
Старые сниппеты и совместимость с прежними браузерами.

> Как работает
Вертикальный padding рассчитывается от ширины родителя: 9 / 16 = 56,25%.

CSS заметки оформляет внешний элемент iframe; содержимое встроенного документа имеет собственные стили.

> Ограничения
Такой подход встречается в ITS Theme. В новом CSS обычно достаточно aspect-ratio.

CSS снаружи iframe не меняет фон, прокрутку и содержимое вложенной страницы. `height: auto` не подгоняет рамку под её содержимое; `object-fit` не кадрирует iframe как картинку.

Живой пример пока не готов: образец содержит iframe или интерактивный HTML, для которого ещё не реализован отдельный просмотрщик.
```
```hacksidian-sources
iframe-e006
```

###### Локальные зависимости

- [assets/documents/poster.html](<./assets/documents/poster.html>)

```hacksidian-files
iframe-e006
```
