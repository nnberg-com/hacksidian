---
tags:
  - hacksidian_technique
  - hacksidian_text-systems
title: USWDS — стандартная сборка
category: text-systems
sources:
  - "https://cdn.jsdelivr.net/npm/@uswds/uswds@3.14.0/dist/css/uswds.css"
format: markdown
themes: []
---

```hacksidian-id
text-system-uswds
```

```hacksidian-live
text-system-uswds
```

```hacksidian-details
> Зачем
Согласовать масштаб заголовков, насыщенность, межстрочные интервалы и расстояние до текста в одной принятой композиции.

> Как работает
Принято · стандартный CSS. Все размеры пропорциональны пользовательскому `--font-text-size`. Интерлиньяж текста — 1.5. Используются штатные `--line-height-normal`, `--hN-size`, `--hN-line-height`, `--hN-weight`, `--hN-style`, `--heading-spacing` и `--p-spacing`. Последние две переменные задаются локально на заголовках. Собственных CSS Variables и назначений гарнитур нет. Приём записывается в существующий текстовый сниппет `g-text`.

> Ограничения
Уровни H1, H2, H3, H4; остальные заголовки сохраняют оформление темы. Применяйте одну текстовую систему за раз и отключайте предыдущую: иначе CSS разных систем смешивается. Гарнитуры, базовый размер текста, ширина строки, списки и оформление абзацев не назначаются. Отбивки соседних с заголовками абзацев обнуляются для точного короткого зазора. В Live Preview пустые строки Markdown сохраняются, поэтому интервалы могут отличаться от режима чтения. Тема и другие приёмы могут переопределять правила.
```

```hacksidian-sources
text-system-uswds
```

```hacksidian-files
text-system-uswds
```
