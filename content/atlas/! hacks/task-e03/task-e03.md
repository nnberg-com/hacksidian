---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Собственный квадрат
category: task
sources: []
format: markdown
themes:
  - minimal
---

```hacksidian-id
task-e03
```

```hacksidian-live
task-e03
```

```hacksidian-details
> Зачем
Когда чекбокс должен совпасть с геометрией оформления.

> Как работает
appearance снимает нативный рисунок. Галочка — фон CSS, не дополнительный тег.
```

```hacksidian-sources
task-e03
```

###### Локальные зависимости

- [assets/check.svg](<./assets/check.svg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Checkbox shape** (`checkbox-shape`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7803), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L1364).
  Селектор: `.checkbox-square`.
  Варианты: Circle (checkbox-circle); Square (checkbox-square)

```hacksidian-files
task-e03
```
