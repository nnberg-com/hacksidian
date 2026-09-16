---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Градиент внутри букв
category: heading
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
format: markdown
themes:
  - typomagical
  - royal-velvet
  - ultra-lobster
  - dracula-lyt
  - faded
---

```hacksidian-id
heading-e046
```

```hacksidian-live
heading-e046
```

```hacksidian-details
> Зачем
Выразительный титульный заголовок или название проекта.

> Как работает
Градиент фона обрезан по контурам текста; прозрачная заливка включается только при поддержке.
```

```hacksidian-sources
heading-e046
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/typomagical|Typomagical]]: **Title gradient** (`title-gradient`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L631), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L707).
  Селектор: `.ss-title-gradient h1, .ss-title-gradient .inline-title, .ss-title-gradient h1.embedded-note-title.embedded-note-title.embedded-note-title, .ss-title-gradient .cm-header-1`.
  Варианты: No gradient (ss-title-solid); Vertical gradient (ss-title-gradient)
- [[atlas/! themes/royal-velvet|Royal Velvet]]: **Inline Document Title Color** (`inline-document-title-color`) — [описание настройки](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L33), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L462).
  Селектор: `body:not(.doc-title-disable) .inline-title`.
  Варианты: Disabled (doc-title-disable); Accent Color (hue) (doc-title-accent); Rainbow (doc-title-rainbow); Heading 1 (doc-title-h1); Heading 2 (doc-title-h2); Heading 3 (doc-title-h3); Heading 4 (doc-title-h4); Heading 5 (doc-title-h5); Heading 6 (doc-title-h6)
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Shimmer** (`ulu-shimmer-title`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L833), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7841).
  Селектор: `body.ulu-shimmer-title .inline-title`.
  Проверяемое свойство: `background-clip`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L145), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L145).
  Селектор: `.HyperMD-header.HyperMD-header-3.cm-line .cm-header.cm-header-3.cm-string.cm-url`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L2993), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L2993).
  Селектор: `.markdown-preview-view h1, .cm-header-1, .markdown-source-view.is-live-preview .cm-header.cm-header-1.cm-hmd-internal-link, .markdown-preview-view h2, .cm-header-2, .markdown-source-view.is-live-preview .cm-header.cm-header-2.cm-hmd-internal-link, .markdown-preview-view h3, .cm-header-3, .markdown-source-view.is-live-preview .cm-header.cm-header-3.cm-hmd-internal-link, .markdown-preview-view h4, .cm-header-4, .markdown-source-view.is-live-preview .cm-header.cm-header-4.cm-hmd-internal-link, .markdown-preview-view h5, .cm-header-5, .markdown-source-view.is-live-preview .cm-header.cm-header-5.cm-hmd-internal-link, .markdown-preview-view h6, .cm-header-6, .markdown-source-view.is-live-preview .cm-header.cm-header-6.cm-hmd-internal-link, .markdown-preview-view h1 > a.internal-link, .markdown-preview-view h2 > a.internal-link, .markdown-preview-view h3 > a.internal-link, .markdown-preview-view h4 > a.internal-link, .markdown-preview-view h5 > a.internal-link, .markdown-preview-view h6 > a.internal-link`.

```hacksidian-files
heading-e046
```
