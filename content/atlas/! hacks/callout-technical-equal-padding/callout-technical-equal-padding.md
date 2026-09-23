---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Одинаковые поля сверху и снизу
category: callout
sources: []
format: markdown
themes: []
---

```hacksidian-id
callout-technical-equal-padding
```

```hacksidian-live
callout-technical-equal-padding
```

```hacksidian-details
> Зачем
Убирает лишний нижний отступ, из-за которого содержимое выноски кажется сдвинутым вверх.

> Как работает
Верхнее и нижнее внутренние поля равны 1em. Отступы заголовка и тела обнулены; внешние отступы первого и последнего элементов содержимого не добавляются к полям. Между заголовком и телом остаётся отдельный промежуток .75em.

> Ограничения
Равенство измеряется до границ текстовых строк, а не до контура букв. Цвет, рамка и боковые поля сохраняются.
```

```hacksidian-sources
callout-technical-equal-padding
```

```hacksidian-files
callout-technical-equal-padding
```
