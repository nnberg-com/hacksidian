---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Прописные с разрядкой
category: heading
sources: []
format: markdown
themes:
  - lyt-mode
  - nier
  - dracula-lyt
  - fancy-a-story
  - dawn
  - lagom
---

```hacksidian-id
heading-e005
```

```hacksidian-live
heading-e005
```

```hacksidian-details
> Зачем
Короткая рубрика перед большим материалом.

> Как работает
text-transform меняет регистр отображения; letter-spacing раздвигает буквы.

> Ограничения
На длинных строках разрядка заметно увеличивает ширину.
```

Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e005
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L3757), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L3757).
  Селектор: `body .excalidraw .Island h3, body .excalidraw .Island legend, body .excalidraw .Island label.control-label`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/nier|Nier]]: правило CSS без отдельного переключателя — [исходник](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L464), [реализация](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L464).
  Селектор: `.HyperMD-header-1, h1, h1, .markdown-rendered h1`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L5280), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L5280).
  Селектор: `body .excalidraw .Island h3, body .excalidraw .Island legend, body .excalidraw .Island label.control-label`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L222), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L222).
  Селектор: `.markdown-preview-view.movie-script .HyperMD-header-1, .markdown-preview-view.movie-script h1, .markdown-source-view.movie-script .HyperMD-header-1, .markdown-source-view.movie-script h1`.
- [[atlas/! themes/dawn|Dawn]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1688), [реализация](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1688).
  Селектор: `.markdown-rendered h6, .HyperMD-header-6 .cm-header-6`.
- [[atlas/! themes/lagom|Lagom]]: **Uppercase lock** (`inline-title-always-uppercase`) — [описание настройки](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2701), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L431).
  Селектор: `.inline-title-always-uppercase .inline-title`.

```hacksidian-files
heading-e005
```
