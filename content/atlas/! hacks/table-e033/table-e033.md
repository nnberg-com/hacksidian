---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Вертикальные заголовки
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/writing-mode
format: markdown
themes:
  - pln
---

```hacksidian-id
table-e033
```

```hacksidian-live
table-e033
```

```hacksidian-details
> Зачем
Узкая матрица с большим числом коротких названий.

> Как работает
writing-mode на ячейках шапки меняет направление набора.

> Ограничения
CSS задаёт вертикальный набор без дополнительных обёрток. Длинные названия читать труднее.
```

```hacksidian-sources
table-e033
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/pln|PLN]]: описанный автором способ применения — [руководство](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/README.md#L96), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1834).
  Селектор: `:is(div[data-callout*="vertical_row"]) thead tr th:first-child`.
  Применение: Поместите Markdown-таблицу внутрь > [!table-vertical_row]. Первый столбец получает вертикальное письмо.

```hacksidian-files
table-e033
```
