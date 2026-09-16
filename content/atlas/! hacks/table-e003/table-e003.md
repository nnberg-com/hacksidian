---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Только горизонтали
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables
format: markdown
themes:
  - minimal
  - sanctum
  - baseline
  - anuppuccin
  - blue-topaz
  - obsidian-nord
  - its-theme
  - obsidian-gruvbox
  - cupertino
  - shiba-inu
  - encore
  - pln
  - ukiyo
  - material-gruvbox
  - lyt-mode
  - maple
  - ultra-lobster
  - dune
  - light-bright
  - notation-2
  - obsidiania
  - velocity
  - everforest-enchanted
  - dracula-lyt
  - fancy-a-story
  - dawn
  - kanagawa
  - lagom
---

```hacksidian-id
table-e003
```

```hacksidian-live
table-e003
```

```hacksidian-details
> Зачем
Длинные текстовые строки: линия помогает перейти к следующей записи.

> Как работает
У ячеек остаётся только нижняя граница.
```

```hacksidian-sources
table-e003
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Row lines** (`row-lines`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8087), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3410).
  Селектор: `.row-lines:not(.table-lines) .markdown-source-view:not(.cards), .row-lines:not(.table-lines) .markdown-preview-view:not(.cards)`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L6201), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L6201).
  Селектор: `.cards .table-view-table > tbody > tr > td:first-child`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14287), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14287).
  Селектор: `body.table-style-two :is(.markdown-preview-view,.markdown-rendered) th`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/obsidian-nord|Obsidian Nord]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L297), [реализация](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L297).
  Селектор: `td`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L6100), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L6100).
  Селектор: `.table-view-table > thead > tr > th`.
- [[atlas/! themes/obsidian-gruvbox|Obsidian gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L340), [реализация](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L340).
  Селектор: `td`.
- [[atlas/! themes/sanctum|Sanctum]]: **Row lines** (`table-row-border`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8320), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1888).
  Селектор: `.table-row-border:not(.table-sticky-headers) .cm-embed-block.markdown-rendered .block-language-dataview tbody tr td, .table-row-border:not(.table-sticky-headers) .markdown-rendered table tbody tr td, .table-row-border:not(.table-sticky-headers) .markdown-rendered .table-view-table tbody tr td`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.row-lines div:not(.el-table):not(.table-wrapper)>table>tbody>tr>td`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L2896), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L2896).
  Селектор: `.minimal-cards-style .cards .table-view-table > tbody > tr > td`.
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1251), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1251).
  Селектор: `.dataview.table-view-table > thead > tr > th`.
- [[atlas/! themes/pln|PLN]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L2348), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L2348).
  Селектор: `.cards table.dataview tbody > tr > td:not(:last-child):not(:first-child)`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `.callout[data-callout-metadata*=table-index] table thead th:not(:first-of-type)`.
- [[atlas/! themes/baseline|Baseline]]: **Always show row border** (`row-lines`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3095), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.row-lines div:not(.el-table):not(.table-wrapper)>table>tbody>tr>td`.
- [[atlas/! themes/material-gruvbox|Material Gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L651), [реализация](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L651).
  Селектор: `td`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L3887), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L3887).
  Селектор: `.markdown-source-view.mod-cm6 .dataview.table-view-table > thead > tr > th`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5522), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5522).
  Селектор: `.table-style-minimal table th`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L19988), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L19988).
  Селектор: `.block-language-dataview .table-view-table > thead > tr > th, .markdown-preview-view .block-language-dataview table > thead > tr > th`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6379), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6379).
  Селектор: `.rezepte:is(.markdown-source-view, .markdown-preview-view) th, .recipes:is(.markdown-source-view, .markdown-preview-view) th`.
- [[atlas/! themes/light-bright|Light & Bright]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L169), [реализация](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L169).
  Селектор: `.cards table.dataview tbody > tr > td:not(:last-child):not(:first-child) > .el-p:not(.el-embed-image)`.
- [[atlas/! themes/notation-2|Notation 2]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1089), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1089).
  Селектор: `.table-view-table > thead > tr > th`.
- [[atlas/! themes/obsidiania|obsidian_ia]]: правило CSS без отдельного переключателя — [исходник](https://github.com/rcvd/obsidian_ia/blob/37b78a79e78a2300a8bbc190e942f4aa2612587f/obsidian.css#L352), [реализация](https://github.com/rcvd/obsidian_ia/blob/37b78a79e78a2300a8bbc190e942f4aa2612587f/obsidian.css#L352).
  Селектор: `.markdown-preview-view th`.
- [[atlas/! themes/velocity|Velocity]]: правило CSS без отдельного переключателя — [исходник](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `body .markdown-rendered table thead tr>th`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L866), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L866).
  Селектор: `:root .table-view-table tbody > tr:last-child > td`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L5459), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L5459).
  Селектор: `.markdown-preview-view .dataview.table-view-table > thead > tr > th`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129).
  Селектор: `.callout[data-callout=table-cards] td:first-child`.
- [[atlas/! themes/dawn|Dawn]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1412), [реализация](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1412).
  Селектор: `.table-view-table > thead > tr > th`.
- [[atlas/! themes/kanagawa|Kanagawa]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L395), [реализация](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L395).
  Селектор: `td`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L854), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L854).
  Селектор: `.markdown-rendered thead tr th`.

```hacksidian-files
table-e003
```
