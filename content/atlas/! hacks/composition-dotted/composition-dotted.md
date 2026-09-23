---
tags:
  - hacksidian_technique
  - hacksidian_composition
title: Заметка на точечной сетке
category: composition
sources:
  - https://github.com/oxalorg/sakura
format: markdown
themes:
  - border
  - maple
---

```hacksidian-id
composition-dotted
```

```hacksidian-live
composition-dotted
```

```hacksidian-details
> Зачем
Небольшие рабочие наброски и планы.

> Как работает
radial-gradient повторяется на фоне корня; тексту оставлены спокойные поля.
```

```hacksidian-sources
composition-dotted
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/border|Border]]: **Enable grid background pattern** (`editor-grid-background-pattren`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2316), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L6889).
  Селектор: `.editor-grid-background-pattren .workspace-leaf-content[data-type="markdown"], .editor-grid-background-pattren .export-image-preview-container.markdown-rendered`.
- [[atlas/! themes/maple|Maple]]: **Pattern Style** (`editor-bg-pattern`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L687), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3562).
  Селектор: `.editor-bg-grid-dots :is(.markdown-reading-view .markdown-rendered, .markdown-source-view.mod-cm6 .cm-scroller)`.
  Проверяемое свойство: `background-image`.
  Варианты: Plain (editor-bg-plain); Dots (editor-bg-grid-dots); Grid (editor-bg-grid-line)

```hacksidian-files
composition-dotted
```
