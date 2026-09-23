---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Собственная подпись блока
category: metadata
sources:
  - https://forum.obsidian.md/t/minimal-properties/104415
format: properties
themes: []
---

```hacksidian-id
metadata-rename
```

```hacksidian-live
metadata-rename
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Назвать метаданные словами конкретного сценария: «Паспорт заметки».

> Как работает
Только текстовая часть заголовка получает font-size: 0; ::before рисует собственную подпись.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-rename
```

```hacksidian-files
metadata-rename
```
