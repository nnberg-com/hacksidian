---
tags:
  - hacksidian_technique
  - hacksidian_list
title: Круглый номер
category: list
sources: []
format: markdown
themes:
  - typomagical
---

```hacksidian-id
list-ordered-o017
```

```hacksidian-live
list-ordered-o017
```

```hacksidian-details
> Как работает
Псевдоэлемент рисует круг без дополнительного тега. Диаметр рассчитан на короткие номера.
```

```hacksidian-sources
list-ordered-o017
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/typomagical|Typomagical]]: **List numbers** (`ordered-lists`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1877), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L964).
  Селектор: `.circled-ol ol > li::before`.
  Проверяемое свойство: `content`.
  Варианты: Circled (circled-ol); Ordinary (ordinary-ol)

```hacksidian-files
list-ordered-o017
```
