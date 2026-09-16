---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Карточки с фиксированными подписями
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display
format: markdown
themes:
  - cupertino
  - pln
  - baseline
---

```hacksidian-id
table-e072
```

```hacksidian-live
table-e072
```

```hacksidian-details
> Зачем
Известная неизменная схема из трёх полей.

> Как работает
Названия полей повторены в CSS через before и nth-child.

> Ограничения
Подписи жёстко заданы в CSS и дублируют Markdown. Перестановка или переименование полей требует правки CSS; это не универсальная адаптация.
```

```hacksidian-sources
table-e072
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/cupertino|Cupertino]]: описанный автором способ применения — [руководство](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/README.md#L89), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.cards.table-100 table.dataview tbody, .table-100 .cards table.dataview tbody`.
  Применение: cssclasses: [cards] превращает таблицы Dataview в карточки; плагин Dataview нужен для запроса.
- [[atlas/! themes/pln|PLN]]: **Add cards class to all files, and allow export.** (`cards`) — [описание настройки](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L760), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L978).
  Селектор: `.cards.pln-cards-borders.theme-dark, .pln-cards-borders.theme-dark`.
  Условия CSS: `@media print`
- [[atlas/! themes/baseline|Baseline]]: описанный автором способ применения — [руководство](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/README.md#L91), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.cards.table-100 table.dataview tbody, .table-100 .cards table.dataview tbody`.
  Применение: cssclasses: [cards] превращает таблицы Dataview в карточки; плагин Dataview нужен для запроса.

```hacksidian-files
table-e072
```
