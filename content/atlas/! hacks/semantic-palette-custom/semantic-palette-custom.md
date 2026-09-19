---
tags:
  - hacksidian_technique
  - hacksidian_palette
  - hacksidian_parameter_experiment
title: Индивидуальная семантическая палитра
category: palette
format: markdown
sources:
  - https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors
---

```hacksidian-id
semantic-palette-custom
```

```hacksidian-live
semantic-palette-custom
```

```hacksidian-details
> Зачем
Самостоятельно определить, какой оттенок считать красным, зелёным и каждым из остальных именованных цветов Obsidian.

> Как работает
Восемь полей выбора цвета задают --color-red, --color-orange, --color-yellow, --color-green, --color-cyan, --color-blue, --color-purple и --color-pink. В документации Obsidian эта группа называется Extended colors. Значения сохраняются в CSS приёма и действуют одинаково в светлом и тёмном режиме. Начальные значения взяты из документированной светлой палитры Obsidian. Пример показывает выбранные цвета, не меняя оформление хранилища; включение применяет их глобально через сниппет «Палитры».

> Ограничения
Меняются только восемь именованных цветов, а не фон, основной текст или акцент интерфейса. Элементы, темы и плагины с собственными фиксированными цветами могут не реагировать. Устаревшие переменные --color-*-rgb не меняются: в Obsidian 1.13 они оставлены для совместимости, поэтому старые темы могут показывать прежние оттенки. Приём не выключает полную палитру; если она переопределила цвета, выключите и снова включите этот приём после неё. При выборе цвета учитывайте читаемость в обеих темах. Поля принимают непрозрачные цвета #RRGGBB.
```

```hacksidian-sources
semantic-palette-custom
```

```hacksidian-files
semantic-palette-custom
```
