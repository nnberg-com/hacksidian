---
tags:
  - hacksidian_technique
  - hacksidian_text-systems
title: Fluent 2 — насыщенность и шаг размера
category: text-systems
sources:
  - "https://fluent2.microsoft.design/typography"
format: markdown
themes: []
---

```hacksidian-id
text-system-fluentcompact
```

```hacksidian-live
text-system-fluentcompact
```

```hacksidian-details
> Зачем
Согласовать масштаб заголовков, насыщенность, межстрочные интервалы и расстояние до текста в одной принятой композиции.

> Как работает
Принято · Subtitle 2 Stronger / Subtitle 2 / Body 1 Strong; иерархия и отступы — наша сборка. Все размеры пропорциональны пользовательскому `--font-text-size`. Интерлиньяж текста — 1.4285714. Используются штатные `--line-height-normal`, `--hN-size`, `--hN-line-height`, `--hN-weight`, `--hN-style`, `--heading-spacing` и `--p-spacing`. Последние две переменные задаются локально на заголовках. Собственных CSS Variables и назначений гарнитур нет. Приём записывается в существующий текстовый сниппет `g-text`.

> Ограничения
Уровни H2, H3, H4; остальные заголовки сохраняют оформление темы. Применяйте одну текстовую систему за раз и отключайте предыдущую: иначе CSS разных систем смешивается. Гарнитуры, базовый размер текста, ширина строки, списки и оформление абзацев не назначаются. Отбивки соседних с заголовками абзацев обнуляются для точного короткого зазора. В Live Preview пустые строки Markdown сохраняются, поэтому интервалы могут отличаться от режима чтения. Тема и другие приёмы могут переопределять правила. Использованы компактные сочетания токенов системы, не вся её шкала; иерархия и отбивки выбраны в нашей сборке.
```

```hacksidian-sources
text-system-fluentcompact
```

```hacksidian-files
text-system-fluentcompact
```
