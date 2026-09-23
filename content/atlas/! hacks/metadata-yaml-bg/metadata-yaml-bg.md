---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Полосы на ширину строки
category: metadata
sources:
  - https://forum.obsidian.md/t/modifying-the-style-of-frontmatter-in-source-mode/66574
format: properties
themes: []
---

```hacksidian-id
metadata-yaml-bg
```

```hacksidian-live
metadata-yaml-bg
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Отделить YAML от обычного текста спокойной подложкой.

> Как работает
Фон применяется к .cm-line:has(.cm-hmd-frontmatter), а не к отдельным фрагментам текста.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-yaml-bg
```

```hacksidian-files
metadata-yaml-bg
```
