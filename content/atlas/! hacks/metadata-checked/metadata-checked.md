---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Строка реагирует на checkbox
category: metadata
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: properties
themes: []
---

```hacksidian-id
metadata-checked
```

```hacksidian-live
metadata-checked
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Визуально отличать опубликованную заметку от черновика.

> Как работает
Родительская строка выбирается через :has(input:checked); изменяются фон и граница.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-checked
```

```hacksidian-files
metadata-checked
```
