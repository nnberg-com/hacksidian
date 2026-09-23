---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: Маркер через внутреннюю тень
category: emphasis
sources: []
format: markdown
themes:
  - willemstad
---

```hacksidian-id
emphasis-s20
```

```hacksidian-live
emphasis-s20
```

```hacksidian-sources
emphasis-s20
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/willemstad|Willemstad]]: **Remove Highlight Box Shadow** (`ssopt-highlight-no-box-shadow`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L49164), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L29852).
  Селектор: `body:not(.ssopt-highlight-no-box-shadow) mark, body:not(.ssopt-highlight-no-box-shadow) mark .internal-link`.
  Проверяемое свойство: `box-shadow`.

```hacksidian-files
emphasis-s20
```
