---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Длинный список со своим скроллом
category: metadata
sources:
  - https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Editor/Properties.md
format: properties
themes: []
---

```hacksidian-id
metadata-scroll-list
```

```hacksidian-live
metadata-scroll-list
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Не позволить десяткам значений вытеснить начало заметки.

> Как работает
У списка ограничена максимальная высота; overflow-y: auto и scrollbar-gutter сохраняют место полосы прокрутки.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-scroll-list
```

```hacksidian-files
metadata-scroll-list
```
