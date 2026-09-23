---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Пустой текст — приглашение заполнить
category: metadata
sources:
  - https://forum.obsidian.md/t/minimal-properties/104415
format: properties
themes: []
---

```hacksidian-id
metadata-empty-text
```

```hacksidian-live
metadata-empty-text
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Показать незаполненное описание, не пряча его от редактора.

> Как работает
У действительно пустого contenteditable :empty рисует подсказку. :has() добавляет строке пунктирную границу.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-empty-text
```

```hacksidian-files
metadata-empty-text
```
