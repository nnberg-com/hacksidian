---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Приглушение без зачёркивания
category: task
sources: []
format: markdown
themes:
  - maple
  - transparent
---

```hacksidian-id
task-e14
```

```hacksidian-live
task-e14
```

```hacksidian-details
> Зачем
Когда выполненное нужно продолжать читать.

> Как работает
Меняется цвет, без opacity на всей ветви.
```

```hacksidian-sources
task-e14
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/maple|Maple]]: **Gray Out Completed Items** (`list-checkbox-gray`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1849), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L4803).
  Селектор: `.list-checkbox-gray`.
- [[atlas/! themes/transparent|Transparent]]: правило CSS без отдельного переключателя — [исходник](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L2029), [реализация](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L2029).
  Селектор: `body:not(.ea-checkbox-animations):not(.disable-checkbox-animations) .task-list-item.is-checked`.

```hacksidian-files
task-e14
```
