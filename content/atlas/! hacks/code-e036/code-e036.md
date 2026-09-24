---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Окно с тремя кружками
category: code
sources: []
format: markdown
themes:
  - maple
---

```hacksidian-id
code-e036
```

```hacksidian-live
code-e036
```

```hacksidian-details
> Зачем
Декоративная имитация окна терминала в статье.

> Как работает
Фиксированные красный, жёлтый и зелёный кружки имитируют окно macOS. Цветовые параметры не нужны. Шапка расположена внутри блока без отрицательных отступов; светлый текст задан вложенному code. Длинные строки переносятся.
pre::before создаёт шапку; три radial-gradient рисуют кружки.

> Ограничения
Кружки — рисунок. Они не являются кнопками.
```

```hacksidian-sources
code-e036
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/maple|Maple]]: **Add macOS Style Code Block Header in Reading View** (`code-mac-style-header`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1945), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3726).
  Селектор: `.code-nowrap.scrollbar-gutter-overlay:not(.code-mac-style-header) .app-container div pre`.

```hacksidian-files
code-e036
```
