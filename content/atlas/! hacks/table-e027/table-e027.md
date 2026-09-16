---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Компактная таблица по центру
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/table-layout
format: markdown
themes:
  - minimal
  - anuppuccin
  - shiba-inu
  - everforest-enchanted
  - blue-topaz
  - its-theme
  - willemstad
  - cupertino
  - pln
  - pink-topaz
  - cyber-glow
  - ukiyo
  - baseline
  - golden-topaz
  - light-bright
  - underwater
  - wyrd
  - vicious
---

```hacksidian-id
table-e027
```

```hacksidian-live
table-e027
```

```hacksidian-details
> Зачем
Небольшая сводка в середине документа.

> Как работает
Автоматическая ширина и логические внешние отступы.
```

```hacksidian-sources
table-e027
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Center small tables** (`table-center`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8129), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3328).
  Селектор: `.table-center .markdown-preview-view .markdown-preview-sizer table, .table-center.markdown-preview-view .markdown-preview-sizer table, .table-center .markdown-source-view.mod-cm6 .table-wrapper, .table-center.markdown-source-view.mod-cm6 .table-wrapper`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Center Tables** (`anp-table-auto`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L857), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5910).
  Селектор: `.anp-table-auto.markdown-rendered:not(.cards):not(.table-disable) table, .anp-table-auto.markdown-rendered.cards:not(.table-disable) table:not(.dataview)`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14082), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14082).
  Селектор: `:is(.markdown-preview-section,.markdown-rendered) table:not(:is(.dataview.table-view-table,.table-editor))`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: **Center Tables** (`tables-center`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1808), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11584).
  Селектор: `.tables-center .cm-table-widget.cm-table-widget .table-wrapper, .tables-center table, .t-c .cm-table-widget.cm-table-widget .table-wrapper, .t-c table`.
  Проверяемое свойство: `margin-left`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28204), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28204).
  Селектор: `.markdown-source-view.mod-cm6 .cm-table-widget > .table-wrapper`.
  Условия CSS: `@container app-container (style(--enable-bw-table: 1))`; `@container live-preview (min-width: 0)`
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.cards table.dataview.table-view-table tbody>tr>td>ul`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Center tables margin** (`shib-table-auto`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7660), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L3366).
  Селектор: `.shib-callout-toggle .callout[data-callout="quote"] .callout-title .callout-icon, .shib-table-auto.markdown-rendered.cards:not(.table-disable) table:not(.dataview), .shib-table-auto.markdown-rendered:not(.cards):not(.table-disable) table, .shib-table-auto.shib-table-toggle .markdown-rendered.cards:not(.table-disable) table:not(.dataview), .shib-table-auto.shib-table-toggle .markdown-rendered:not(.cards):not(.table-disable) table`.
- [[atlas/! themes/pln|PLN]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L2360), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L2360).
  Селектор: `.cards table.dataview tbody > tr > td > ul`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L5346), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L5346).
  Селектор: `.markdown-preview-view table`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L1691), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L1691).
  Селектор: `.markdown-rendered table, .markdown-source-view.mod-cm6 .cm-table-widget table`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `img, table`.
- [[atlas/! themes/baseline|Baseline]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.cards table.dataview.table-view-table tbody>tr>td>ul`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L5347), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L5347).
  Селектор: `.markdown-preview-view table`.
- [[atlas/! themes/light-bright|Light & Bright]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L88), [реализация](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L88).
  Селектор: `.markdown-source-view.mod-cm6.cards .dataview.table-view-table > tbody > tr > td, .cards table.dataview tbody > tr > td`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1258), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1258).
  Селектор: `body:not(.no-center) table, body:not(.no-center) .table-wrapper`.
- [[atlas/! themes/wyrd|Wyrd]]: правило CSS без отдельного переключателя — [исходник](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L793), [реализация](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L793).
  Селектор: `table`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Tables - Center alignment** (`centered-tables`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1724), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2144).
  Селектор: `body.centered-tables table`.
- [[atlas/! themes/vicious|Vicious]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1323), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1323).
  Селектор: `.markdown-rendered table`.

```hacksidian-files
table-e027
```
