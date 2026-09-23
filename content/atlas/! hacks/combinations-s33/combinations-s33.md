---
tags:
  - hacksidian_technique
  - hacksidian_combinations
title: Курсив с маркером
category: combinations
sources: []
format: markdown
themes:
  - sanctum
  - wyrd
  - vicious
---

```hacksidian-id
combinations-s33
```

```hacksidian-live
combinations-s33
```

```hacksidian-sources
combinations-s33
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/sanctum|Sanctum]]: описанный автором способ применения — [руководство](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/documentation/Theme_Guide.md#L15), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L818).
  Селектор: `.theme-light .markdown-rendered pre code`.
  Применение: Комбинации `==текст==`, `*==текст==*`, `**==текст==**` задают разные цвета выделения.
- [[atlas/! themes/wyrd|Wyrd]]: правило CSS без отдельного переключателя — [исходник](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L1075), [реализация](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L1075).
  Селектор: `em > em`.
- [[atlas/! themes/vicious|Vicious]]: **Bold + Italics Color** (`bold-italicscolors`) — [описание настройки](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L158), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L727).
  Селектор: `.bld-itl-C001 .cm-strong.cm-em, .bld-itl-C001 strong > em`.
  Варианты: Red (bld-itl-C001); Beach (bld-itl-C002); Gold (bld-itl-C003); Yellow (bld-itl-C004); Lime (bld-itl-C005); Green (bld-itl-C006); Turquoise (bld-itl-C007); Cyan (bld-itl-C008); Purple (bld-itl-C009); Violet (bld-itl-C010); Pink (bld-itl-C011)

```hacksidian-files
combinations-s33
```
