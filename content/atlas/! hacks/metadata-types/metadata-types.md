---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Оформление по типам ввода
category: metadata
sources:
  - https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Editor/Properties.md
format: properties
themes: []
---

```hacksidian-id
metadata-types
```

```hacksidian-live
metadata-types
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Одинаково показывать даты и числа во всех заметках независимо от названий.

> Как работает
Селекторы input[type=date], input[type=number] и checkbox. Собственные data-property-type для этого не нужны.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-types
```

```hacksidian-files
metadata-types
```
