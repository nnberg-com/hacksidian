---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Линии по сторонам
category: heading
sources: []
format: markdown
themes:
  - its-theme
  - fancy-a-story
---

```hacksidian-id
heading-e022
```

```hacksidian-live
heading-e022
```

```hacksidian-details
> Зачем
Обозначает переход или центральную рубрику.

> Как работает
Flex распределяет оставшееся место между двумя псевдоэлементами.
```

Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e022
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/its-theme|ITS Theme]]: **Center Header With Lines** (`hcl`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L955), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11763).
  Селектор: `.writing.writing, .writing.writing.hcl, .writing.writing .hcl`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance** (`header-style-h-inline`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1246), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L153).
  Селектор: `.fas-h-inline-display, .h-inline-display`.
  Варианты: Display (fas-h-inline-display); Display - left aligned (fas-h-inline-display-left-aligned); Stroke (fas-h-inline-stroke); Stroke - left aligned (fas-h-inline-stroke-left-aligned)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance (embedded headings)** (`header-style-h-embed`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1265), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L153).
  Селектор: `.fas-h-embed-display, .h-embed-display`.
  Варианты: Display (fas-h-embed-display); Display - left aligned (fas-h-embed-display-left-aligned); Stroke (fas-h-embed-stroke); Stroke - left aligned (fas-h-embed-stroke-left-aligned)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance** (`header-style-h1`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1290), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L81).
  Селектор: `:is(.fas-h1-stroke,.h1-stroke) .callout[data-callout=fas-infobox] h1`.
  Варианты: Display (fas-h1-display); Display - left aligned (fas-h1-display-left-aligned); Stroke (fas-h1-stroke); Stroke - left aligned (fas-h1-stroke-left-aligned)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance** (`header-style-h2`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1365), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L133).
  Селектор: `.fas-h2-display, .h2-display`.
  Варианты: Display (fas-h2-display); Display - left aligned (fas-h2-display-left-aligned); Stroke (fas-h2-stroke); Stroke - left aligned (fas-h2-stroke-left-aligned)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance** (`header-style-h3`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1439), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L137).
  Селектор: `.fas-h3-display, .h3-display`.
  Варианты: Display (fas-h3-display); Display - left aligned (fas-h3-display-left-aligned); Stroke (fas-h3-stroke); Stroke - left aligned (fas-h3-stroke-left-aligned)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance** (`header-style-h4`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1513), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L141).
  Селектор: `.fas-h4-display, .h4-display`.
  Варианты: Display (fas-h4-display); Display - left aligned (fas-h4-display-left-aligned); Stroke (fas-h4-stroke); Stroke - left aligned (fas-h4-stroke-left-aligned)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance** (`header-style-h5`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1587), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L145).
  Селектор: `.fas-h5-display, .h5-display`.
  Варианты: Display (fas-h5-display); Display - left aligned (fas-h5-display-left-aligned); Stroke (fas-h5-stroke); Stroke - left aligned (fas-h5-stroke-left-aligned)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Appearance** (`header-style-h6`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1661), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L149).
  Селектор: `.fas-h6-display, .h6-display`.
  Варианты: Display (fas-h6-display); Display - left aligned (fas-h6-display-left-aligned); Stroke (fas-h6-stroke); Stroke - left aligned (fas-h6-stroke-left-aligned)

```hacksidian-files
heading-e022
```
