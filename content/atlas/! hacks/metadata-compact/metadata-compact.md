---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Компактные строки
category: metadata
sources:
  - https://github.com/kepano/obsidian-minimal/blob/master/theme.css
format: properties
themes:
  - minimal
  - baseline
  - soft-paper
---

```hacksidian-id
metadata-compact
```

```hacksidian-live
metadata-compact
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Уместить служебные поля над текстом без большой анкеты.

> Как работает
Уменьшены gap, вертикальный padding и высота полей. Ширина названий задана в em.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-compact
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/baseline|Baseline]]: **Compact properties** (`metadata-compact`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1654), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.metadata-compact`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/soft-paper|Soft Paper]]: **Make in-note properties condensed** (`sp-compact-properties`) — [описание настройки](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L59), [реализация](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L2257).
  Селектор: `body:is(.sp-compact-properties, .sp-compact-all) .metadata-container .metadata-property`.

```hacksidian-files
metadata-compact
```
