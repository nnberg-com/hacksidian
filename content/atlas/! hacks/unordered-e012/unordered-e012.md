---
tags:
  - hacksidian_technique
  - hacksidian_unordered
title: Знак через ::marker
category: unordered
sources:
  - https://www.w3.org/TR/css-lists-3/
format: markdown
themes: []
---

```hacksidian-id
unordered-e012
```

```hacksidian-live
unordered-e012
```

```hacksidian-details
> Зачем
Даёт прямой контроль над содержимым маркера.

> Как работает
В режиме чтения content заменяет ::marker у пунктов маркированного списка на акцентное тире; font-weight усиливает его. Собственный видимый маркер Obsidian скрывается, его элемент для сворачивания остаётся. В Live Preview тире рисуется через .list-bullet::after, поскольку редактор не использует li::marker. Нумерованные списки и задачи не меняются.
```

```hacksidian-sources
unordered-e012
```

```hacksidian-files
unordered-e012
```
