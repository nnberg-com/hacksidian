---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Неоновая вывеска
category: heading
sources: []
format: markdown
themes:
  - cyber-glow
  - wyrd
  - aura
---

```hacksidian-id
heading-e051
```

```hacksidian-live
heading-e051
```

```hacksidian-details
> Зачем
Атмосферный заголовок на тёмной сцене.

> Как работает
Набор text-shadow с разным радиусом размытия.
```

Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e051
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3348), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3348).
  Селектор: `.markdown-preview-section h1, .cm-header-1, .markdown-rendered h1, .HyperMD-header.HyperMD-header-1.cm-line, .markdown-preview-section h1 strong, .cm-header-1 .cm-strong, .strong .markdown-rendered h1, .HyperMD-header.HyperMD-header-1.cm-line .cm-strong`.
- [[atlas/! themes/wyrd|Wyrd]]: правило CSS без отдельного переключателя — [исходник](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L356), [реализация](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L356).
  Селектор: `.HyperMD-header, .HyperMD-list-line .cm-header, h1, h2, h3, h4, h5, h6`.
- [[atlas/! themes/aura|Aura]]: **Neon Heading** (`aura-neon-headings`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3400), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L981).
  Селектор: `.aura-neon-headings.aura-heading-color .cm-header-1:not(.cm-formatting), .aura-neon-headings.aura-heading-color .HyperMD-header-1, .aura-neon-headings.aura-heading-color .inline-title, .aura-neon-headings.aura-heading-color h1`.

```hacksidian-files
heading-e051
```
