---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Короткая шапка капителью
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric
format: markdown
themes:
  - ultra-lobster
  - underwater
---

```hacksidian-id
table-e022
```

```hacksidian-live
table-e022
```

```hacksidian-details
> Зачем
Служебные подписи отделены от основного текста без цветной плашки.

> Как работает
text-transform и умеренная разрядка на th.

> Ограничения
Для длинных названий такая шапка занимает больше места.
```

```hacksidian-sources
table-e022
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L16287), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L16287).
  Селектор: `.markdown-preview-view table th`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1641), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1641).
  Селектор: `body:not(.no-bases) .workspace-leaf-content[data-type="bases"] .bases-thead, .theme-dark:not(.no-bases) .bases-thead, .theme-light:not(.no-bases) .bases-thead`.

```hacksidian-files
table-e022
```
