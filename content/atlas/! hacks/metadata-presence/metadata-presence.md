---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Вид блока по наличию свойства
category: metadata
sources:
  - https://obsidian.md/help/properties
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: properties
themes: []
---

```hacksidian-id
metadata-presence
```

```hacksidian-live
metadata-presence
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Отличать карточки источников от обычных заметок.

> Как работает
Контейнер с полем source получает акцентный верхний край через :has([data-property-key=source]).

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-presence
```

```hacksidian-files
metadata-presence
```
