---
tags:
  - hacksidian_technique
  - hacksidian_parameter_experiment
  - hacksidian_callout
title: Боковая линия справа
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes: []
favourite: false
---

```hacksidian-id
callout-technical-right
```

```hacksidian-live
callout-technical-right
```

```hacksidian-details
> Зачем
Вариант для текста с активным левым краем.

> Как работает
Галка «Есть/нет фон» включает цветную подложку типа выноски или делает фон прозрачным. По умолчанию фон включён.

Линия на логическом правом краю выноски рисуется отдельным псевдоэлементом `::after`. CSS-параметры задают толщину линии (по умолчанию 4px) и радиус её скругления (по умолчанию 0px). Скругляется сама линия, а не весь Callout.

Для полностью круглых концов задайте радиус, равный половине толщины линии: например, 2px при толщине 4px. Толщина 0px скрывает линию. Для включённого оформления используйте кнопку «Обновить уже существующий стиль».
```

```hacksidian-sources
callout-technical-right
```


```hacksidian-files
callout-technical-right
```
