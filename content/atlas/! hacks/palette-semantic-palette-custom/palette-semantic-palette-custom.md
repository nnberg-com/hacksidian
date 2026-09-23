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
palette-semantic-palette-custom
```

```hacksidian-live
palette-semantic-palette-custom
```

```hacksidian-details
> Зачем
Самостоятельно определить, какой оттенок считать красным, зелёным и каждым из остальных именованных цветов Obsidian.

> Как работает
Восемь полей выбора цвета задают --color-red, --color-orange, --color-yellow, --color-green, --color-cyan, --color-blue, --color-purple и --color-pink. В документации Obsidian эта группа называется Extended colors. Значения сохраняются в CSS приёма и действуют одинаково в светлом и тёмном режиме. Начальные значения взяты из документированной светлой палитры Obsidian. Пример показывает выбранные цвета, не меняя оформление хранилища; включение применяет их глобально через сниппет «Палитры».

> Ограничения
Меняются только восемь именованных цветов, а не фон, основной текст или акцент интерфейса. Элементы, темы и плагины с собственными фиксированными цветами могут не реагировать. Приём работает в светлом режиме Obsidian 1.13 и новее: штатные роли используют полные цвета и смешение OKLCH. Устаревшие RGB/HSL-переменные не используются; совместимость со старыми темами, зависящими от них, не реализуется. Ручные цвета имеют приоритет над приёмом «Палитра» независимо от порядка включения. Выключение ручных цветов возвращает цвета выбранной палитры. При выборе цвета учитывайте читаемость в светлом режиме. Поля принимают непрозрачные цвета #RRGGBB.
```

```hacksidian-sources
palette-semantic-palette-custom
```

```hacksidian-files
palette-semantic-palette-custom
```
