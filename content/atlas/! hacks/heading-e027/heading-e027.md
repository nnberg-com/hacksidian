---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Прямоугольная плашка
category: heading
sources: []
format: markdown
themes:
  - blue-topaz
  - shimmering-focus
  - willemstad
  - baseline
  - notation-2
  - its-theme
  - wikipedia
---

```hacksidian-id
heading-e027
```

```hacksidian-live
heading-e027
```

```hacksidian-details
> Зачем
Короткий заголовок становится этикеткой.

> Как работает
Фон и padding у блока шириной по содержимому.
```

Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e027
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h1 Background** (`header-1-background`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1349), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12237).
  Селектор: `body.header-1-background .cm-header-1, body.header-1-background :is(.markdown-preview-view,.markdown-rendered) h1`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h2 background** (`header-2-background`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1453), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12241).
  Селектор: `body.header-2-background .cm-header-2, body.header-2-background :is(.markdown-preview-view,.markdown-rendered) h2`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h3 Background** (`header-3-background`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1558), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12245).
  Селектор: `body.header-3-background .cm-header-3, body.header-3-background :is(.markdown-preview-view,.markdown-rendered) h3`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h4 Background** (`header-4-background`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1663), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12249).
  Селектор: `body.header-4-background .cm-header-4, body.header-4-background :is(.markdown-preview-view,.markdown-rendered) h4`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h5 Background** (`header-5-background`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1767), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12253).
  Селектор: `body.header-5-background .cm-header-5, body.header-5-background :is(.markdown-preview-view,.markdown-rendered) h5`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h6 background** (`header-6-background`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1866), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12257).
  Селектор: `body.header-6-background .cm-header-6, body.header-6-background :is(.markdown-preview-view,.markdown-rendered) h6`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: **Illusion Theme Inspired Headings** (`illusion`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L964), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L9837).
  Селектор: `.illusion.illusion .callout[data-callout~=infobox].is-collapsed.is-collapsed[data-callout-metadata~=left]`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Illusion Heading 1** (`illusion-h1`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1210), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12615).
  Селектор: `.illusion-h1 :is(.markdown-preview-view, .is-live-preview) h1[data-heading], .illusion-h1 :is(.markdown-preview-view, .is-live-preview) .HyperMD-header-1, .illusion-h1:is(.markdown-preview-view, .is-live-preview) h1[data-heading], .illusion-h1:is(.markdown-preview-view, .is-live-preview) .HyperMD-header-1`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Illusion Heading 2** (`illusion-h2`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1214), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12626).
  Селектор: `.illusion-h2 :is(.markdown-preview-view, .is-live-preview) h2[data-heading], .illusion-h2 :is(.markdown-preview-view, .is-live-preview) .HyperMD-header-2, .illusion-h2:is(.markdown-preview-view, .is-live-preview) h2[data-heading], .illusion-h2:is(.markdown-preview-view, .is-live-preview) .HyperMD-header-2`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Illusion Heading 3** (`illusion-h3`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1218), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12637).
  Селектор: `.illusion-h3 :is(.markdown-preview-view, .is-live-preview) h3[data-heading], .illusion-h3 :is(.markdown-preview-view, .is-live-preview) .HyperMD-header-3, .illusion-h3:is(.markdown-preview-view, .is-live-preview) h3[data-heading], .illusion-h3:is(.markdown-preview-view, .is-live-preview) .HyperMD-header-3`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Illusion Heading 4** (`illusion-h4`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1222), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12648).
  Селектор: `.illusion-h4 :is(.markdown-preview-view, .is-live-preview) h4[data-heading], .illusion-h4 :is(.markdown-preview-view, .is-live-preview) .HyperMD-header-4, .illusion-h4:is(.markdown-preview-view, .is-live-preview) h4[data-heading], .illusion-h4:is(.markdown-preview-view, .is-live-preview) .HyperMD-header-4`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Illusion Heading 5** (`illusion-h5`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1226), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12659).
  Селектор: `.illusion-h5 :is(.markdown-preview-view, .is-live-preview) h5[data-heading], .illusion-h5 :is(.markdown-preview-view, .is-live-preview) .HyperMD-header-5, .illusion-h5:is(.markdown-preview-view, .is-live-preview) h5[data-heading], .illusion-h5:is(.markdown-preview-view, .is-live-preview) .HyperMD-header-5`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Illusion Heading 6** (`illusion-h6`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1230), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12670).
  Селектор: `.illusion-h6 :is(.markdown-preview-view, .is-live-preview) h6[data-heading], .illusion-h6 :is(.markdown-preview-view, .is-live-preview) .HyperMD-header-6, .illusion-h6:is(.markdown-preview-view, .is-live-preview) h6[data-heading], .illusion-h6:is(.markdown-preview-view, .is-live-preview) .HyperMD-header-6`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **Headings: Disable background** (`no-heading-background`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L222), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `body:not(.no-heading-background) .markdown-source-view .cm-line.HyperMD-header, body:not(.no-heading-background) .markdown-preview-view :is(h1,h2,h3,h4,h5,h6)`.
- [[atlas/! themes/willemstad|Willemstad]]: **No Background Coloured Headers** (`ssopt-no-coloured-headers`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L47760), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28570).
  Селектор: `body:not(.ssopt-no-coloured-headers) .workspace-leaf-content[data-type="markdown"] h1, body:not(.ssopt-no-coloured-headers) .workspace-leaf-content[data-type="markdown"] .markdown-rendered h1, body:not(.ssopt-no-coloured-headers) .workspace-leaf-content[data-type="markdown"] .HyperMD-header-1`.
- [[atlas/! themes/baseline|Baseline]]: **Heading background** (`colorful-headings-background`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1726), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.colorful-headings-side .heading-collapse-indicator, body.colorful-headings-background .heading-collapse-indicator`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/notation-2|Notation 2]]: **Background Colors** (`heading-colors-bg`) — [описание настройки](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1735), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L798).
  Селектор: `body:not(.headings-rainbow)`.
  Варианты: Default (headings-default); Red (headings-red); Orange (headings-orange); Yellow (headings-yellow); Green (headings-green); Blue (headings-blue); Purple (headings-purple); Pink (headings-pink); Brown (headings-brown); Grey (headings-gray); Rainbow (headings-rainbow)
- [[atlas/! themes/wikipedia|Wikipedia]]: **Infobox Header 6** (`special-h6`) — [описание настройки](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L1029), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L84).
  Селектор: `.special-h6 h6, .special-h6 .HyperMD-header-6`.

```hacksidian-files
heading-e027
```
