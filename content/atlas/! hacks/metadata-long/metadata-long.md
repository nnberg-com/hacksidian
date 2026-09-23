---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Длинное значение без обрезки
category: metadata
sources:
  - https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Editor/Properties.md
format: properties
themes:
  - baseline
---

```hacksidian-id
metadata-long
```

```hacksidian-live
metadata-long
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Читать описание целиком и не растягивать панель длинной строкой.

> Как работает
min-width: 0 разрешает flex-элементу сжиматься, overflow-wrap переносит текст, название выровнено сверху.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-long
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/baseline|Baseline]]: **Show longer text** (`metadata-longtext`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1662), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.metadata-longtext`.
  Условия CSS: `@media screen,print`

```hacksidian-files
metadata-long
```
