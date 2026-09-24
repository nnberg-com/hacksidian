---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Пробелы в конце строки
category: code
sources: []
format: markdown
themes:
  - shimmering-focus
---

```hacksidian-id
code-e020
```

```hacksidian-live
code-e020
```

```hacksidian-details
> Зачем
Показать влияние сохранённых пробелов на перенос.

> Как работает
Цвета настраиваются парами полей: «источник» выбирает семантическую палитру, цвет темы или «свой цвет»; соседнее цветовое поле действует при выборе «свой цвет». Прозрачность декоративных слоёв сохраняется.
break-spaces сохраняет пробелы и даёт возможность разрыва после каждого.

> Ограничения
Свойство не рисует точки вместо пробелов; они остаются невидимыми.
```

```hacksidian-sources
code-e020
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **Hide trailing spaces** (`hide-trailing-whitespace`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L363), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `body:not(.hide-trailing-whitespace) .view-content>.cm-s-obsidian>div>.cm-scroller>.cm-sizer>.cm-contentContainer>.cm-content>.cm-line>:is(.cm-trailing-space-a,.cm-trailing-space-b,.cm-trailing-space-new-line):after`.
  Проверяемое свойство: `content`.

```hacksidian-files
code-e020
```
