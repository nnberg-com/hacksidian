---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Подсказка об отсутствующем поле
category: metadata
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: properties
themes: []
---

```hacksidian-id
metadata-missing
```

```hacksidian-live
metadata-missing
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Напомнить о поле, которое забыли добавить в карточку.

> Как работает
not(:has(...)) обнаруживает отсутствие строки author. ::after добавляет статическую подсказку.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-missing
```

```hacksidian-files
metadata-missing
```
