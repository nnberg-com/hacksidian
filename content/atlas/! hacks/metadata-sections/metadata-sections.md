---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Секции внутри формы
category: metadata
sources:
  - https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Editor/Properties.md
format: properties
themes: []
---

```hacksidian-id
metadata-sections
```

```hacksidian-live
metadata-sections
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Разделить источник и рабочее состояние, когда набор полей известен.

> Как работает
Grid на строке даёт псевдозаголовку полную ширину; ::before создаёт подпись у начальных полей групп.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-sections
```

```hacksidian-files
metadata-sections
```
