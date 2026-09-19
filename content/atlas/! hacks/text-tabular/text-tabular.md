---
tags:
  - hacksidian_technique
  - hacksidian_text
title: Цифры одинаковой ширины
category: text
sources: []
format: markdown
themes:
  - ultra-lobster
favourite: true
---

```hacksidian-id
text-tabular
```

```hacksidian-live
text-tabular
```

```hacksidian-details
> Зачем
Для числовых реестров, счётчиков и сравнения значений.

> Как работает
Табличные цифры текущего шрифта; без увеличения текста.

> Ограничения
Свойство не выравнивает произвольные столбцы текста и не выбирает числа селектором.
```

```hacksidian-sources
text-tabular
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Tabular Numbers** (`ulu-tabular-nums`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L846), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7865).
  Селектор: `body.ulu-tabular-nums .cm-content, body.ulu-tabular-nums .markdown-preview-view`.

```hacksidian-files
text-tabular
```
