---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Маркеры по глубине
category: note
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::marker
format: markdown
themes:
  - kakano
---

```hacksidian-id
note-list-levels
```

```hacksidian-live
note-list-levels
```

```hacksidian-details
> Зачем
Иерархические планы и вложенные конспекты.

> Как работает
ul, ul ul и ul ul ul получают disc, circle и square.
```

```hacksidian-sources
note-list-levels
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/kakano|Kakano]]: **Style nested bullet levels differently** (`theme-setting-differentiateBulletLevels`) — [описание настройки](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L238), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L2134).
  Селектор: `body.theme-setting-differentiateBulletLevels`.

```hacksidian-files
note-list-levels
```
