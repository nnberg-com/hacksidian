---
tags:
  - hacksidian_technique
  - hacksidian_table
title: По ширине содержимого
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/table-layout
format: markdown
themes:
  - its-theme
---

```hacksidian-id
table-e026
```

```hacksidian-live
table-e026
```

```hacksidian-details
> Зачем
Маленькая таблица не растягивается на весь текстовый блок.

> Как работает
width: auto оставляет естественную ширину.
```

```hacksidian-sources
table-e026
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/its-theme|ITS Theme]]: **Auto Sized Dataview Tables** (`dataview-table-auto`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L2843), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11374).
  Селектор: `.dataview-table-auto`.
  Проверяемое свойство: `--dataview-table-width`.

```hacksidian-files
table-e026
```
