---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Зебра по строкам
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables
format: markdown
themes:
  - minimal
  - anuppuccin
  - blue-topaz
  - obsidian-nord
  - its-theme
  - obsidian-gruvbox
  - shimmering-focus
  - willemstad
  - sanctum
  - github-theme
  - cupertino
  - shiba-inu
  - encore
  - pink-topaz
  - obuntu
  - baseline
  - material-gruvbox
  - yin-and-yang
  - royal-velvet
  - golden-topaz
  - lyt-mode
  - ultra-lobster
  - dune
  - kakano
  - sandstorm
  - obsidiania
  - underwater
  - typora-vue
  - gitsidian
  - dracula-lyt
  - fancy-a-story
  - material-flat
  - dawn
  - faded
  - kanagawa
  - lagom
  - composer
---

```hacksidian-id
table-e007
```

```hacksidian-live
table-e007
```

```hacksidian-details
> Зачем
Помогает следить за строкой через несколько колонок.

> Как работает
Чётные строки tbody получают фон.
```

```hacksidian-sources
table-e007
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Striped rows** (`row-alt`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8105), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3313).
  Селектор: `.row-alt`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5849), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5849).
  Селектор: `.anp-table-toggle.anp-table-row-alt .markdown-preview-view:not(.cards):not(.table-disable) tr:nth-child(2n) td, .anp-table-toggle.anp-table-row-alt .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) tr:nth-child(2n) td, .anp-table-toggle.anp-table-row-alt .is-live-preview:not(.cards):not(.table-disable) tr:nth-child(2n) td, .anp-table-toggle.anp-table-row-alt .is-live-preview.cards:not(.table-disable) table:not(.dataview) tr:nth-child(2n) td`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Table Style** (`table-style-options`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3180), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14253).
  Селектор: `body.table-style-one.theme-light`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `--table-background-color-odd`.
  Варианты: Default (table-style-default); Style I (table-style-one); Style II (table-style-two); Style III (table-style-three)
- [[atlas/! themes/obsidian-nord|Obsidian Nord]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L304), [реализация](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L304).
  Селектор: `.markdown-rendered tbody tr:nth-child(even)`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L5804), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L5804).
  Селектор: `.bases-view.bases-view .bases-tr:nth-child(odd)`.
- [[atlas/! themes/obsidian-gruvbox|Obsidian gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L347), [реализация](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L347).
  Селектор: `.markdown-rendered tbody tr:nth-child(even)`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `body .markdown-rendered tbody tr:nth-child(odd):hover`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L32925), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L32925).
  Селектор: `body:not(.ssopt-no-table-colours) :where(.cm-html-embed, .markdown-rendered) tbody tr:nth-child(odd)`.
- [[atlas/! themes/sanctum|Sanctum]]: **Striped rows** (`table-alternate-row`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8328), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1863).
  Селектор: `.table-alternate-row .cm-embed-block.markdown-rendered .block-language-dataview tbody tr:nth-child(odd), .table-alternate-row .markdown-rendered table tbody tr:nth-child(odd), .table-alternate-row .markdown-rendered .table-view-table tbody tr:nth-child(odd)`.
- [[atlas/! themes/github-theme|GitHub Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L914), [реализация](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L914).
  Селектор: `.markdown-rendered tbody tr:nth-child(2n)`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.bases-row-alt .bases-tbody .bases-tr:nth-child(odd)`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L5352), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L5352).
  Селектор: `.shib-table-toggle.shib-td-alt-cols .is-live-preview.cards:not(.table-disable) table:not(.dataview) tr td:nth-child(2n), .shib-table-toggle.shib-td-alt-cols .is-live-preview:not(.cards):not(.table-disable) table tr td:nth-child(2n), .shib-table-toggle.shib-td-alt-cols .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) tr td:nth-child(2n), .shib-table-toggle.shib-td-alt-cols .markdown-preview-view:not(.cards):not(.table-disable) table tr td:nth-child(2n), .shib-table-toggle.shib-td-alt-rows .is-live-preview.cards:not(.table-disable) table:not(.dataview) tr:nth-child(2n) td, .shib-table-toggle.shib-td-alt-rows .is-live-preview:not(.cards):not(.table-disable) table tr:nth-child(2n) td, .shib-table-toggle.shib-td-alt-rows .markdown-preview-view.cards:not(.table-disable) table:not(.dataview) tr:nth-child(2n) td, .shib-table-toggle.shib-td-alt-rows .markdown-preview-view:not(.cards):not(.table-disable) table tr:nth-child(2n) td, .shib-table-toggle.shib-td-checkered .is-live-preview.cards:not(.table-disable) table:not(.dataview) tr td:nth-child(2n), .shib-table-toggle.shib-td-checkered .is-live-preview.cards:not(.table-disable) table:not(.dataview) tr:nth-child(2n) td, .shib-table-toggle.shib-td-checkered .is-live-preview:not(.cards):not(.table-disable) table tr td:nth-child(2n), .shib-table-toggle.shib-td-checkered .is-live-preview:not(.cards):not(.table-disable) table tr:nth-child(2n) td, .shib-table-toggle.shib-td-checkered .markdown-preview-view.cards:not(.tab`.
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1282), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1282).
  Селектор: `.dataview.table-view-table > tbody > tr:hover:nth-child(2n), .dataview.table-view-table > tbody > tr:nth-child(2n)`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1836), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1836).
  Селектор: `tbody>tr:nth-child(odd)`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L1195), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L1195).
  Селектор: `.theme-dark .markdown-preview-view tr:nth-child(even)`.
- [[atlas/! themes/baseline|Baseline]]: **Alternating row background** (`row-alt`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3087), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.row-alt`.
- [[atlas/! themes/material-gruvbox|Material Gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L657), [реализация](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L657).
  Селектор: `.markdown-rendered tbody tr:nth-child(even)`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L3069), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L3069).
  Селектор: `.color-rows tr:nth-child(even)`.
- [[atlas/! themes/royal-velvet|Royal Velvet]]: правило CSS без отдельного переключателя — [исходник](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L786), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L786).
  Селектор: `.markdown-rendered tbody tr:nth-child(odd), .markdown-rendered tbody tr:nth-child(odd):hover`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1836), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1836).
  Селектор: `tbody>tr:nth-child(odd)`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L3504), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L3504).
  Селектор: `table.calendar tr:nth-child(even)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21799), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21799).
  Селектор: `.markdown-preview-view table tr:nth-child(even) td, .markdown-source-view.mod-cm6 table tr:nth-child(even) td`.
  Условия CSS: `@media print`
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4674), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4674).
  Селектор: `.bases-table-container:not(.mod-multiline) .bases-tr:nth-child(even)`.
- [[atlas/! themes/kakano|Kakano]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L6886), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L6886).
  Селектор: `.bases-tbody :is(.bases-tr):nth-child(odd) .bases-table-cell`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L15835), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L15835).
  Селектор: `.cm-html-embed tbody tr:nth-child(odd), .markdown-rendered tbody tr:nth-child(odd)`.
- [[atlas/! themes/obsidiania|obsidian_ia]]: правило CSS без отдельного переключателя — [исходник](https://github.com/rcvd/obsidian_ia/blob/37b78a79e78a2300a8bbc190e942f4aa2612587f/obsidian.css#L359), [реализация](https://github.com/rcvd/obsidian_ia/blob/37b78a79e78a2300a8bbc190e942f4aa2612587f/obsidian.css#L359).
  Селектор: `.markdown-preview-view tr:nth-child(odd)`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1650), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1650).
  Селектор: `body:not(.no-bases) .workspace-leaf-content[data-type="bases"] .bases-tr:nth-child(even), .theme-dark:not(.no-bases) .bases-tr:nth-child(even), .theme-light:not(.no-bases) .bases-tr:nth-child(even)`.
- [[atlas/! themes/typora-vue|Typora-Vue]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L107), [реализация](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L107).
  Селектор: `table tr:nth-child(2n), thead`.
- [[atlas/! themes/gitsidian|Gitsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L468), [реализация](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L468).
  Селектор: `.markdown-preview-view table tr:nth-child(2n)`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L2661), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L2661).
  Селектор: `.markdown-preview-view table tr:nth-child(even)`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L200), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L200).
  Селектор: `.bases-tbody .bases-tr:nth-child(odd)`.
- [[atlas/! themes/material-flat|Material Flat]]: правило CSS без отдельного переключателя — [исходник](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L799), [реализация](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L799).
  Селектор: `.markdown-preview-view table thead tr td, .markdown-preview-view table thead tr td:nth-of-type(even), .markdown-preview-view table thead tr td:nth-of-type(odd), .markdown-preview-view table tbody tr td, .markdown-preview-view table tbody tr td:nth-of-type(even), .markdown-preview-view table tbody tr td:nth-of-type(odd), .markdown-source-view.mod-cm6.is-live-preview table thead tr td, .markdown-source-view.mod-cm6.is-live-preview table thead tr td:nth-of-type(even), .markdown-source-view.mod-cm6.is-live-preview table thead tr td:nth-of-type(odd), .markdown-source-view.mod-cm6.is-live-preview table tbody tr td, .markdown-source-view.mod-cm6.is-live-preview table tbody tr td:nth-of-type(even), .markdown-source-view.mod-cm6.is-live-preview table tbody tr td:nth-of-type(odd)`.
- [[atlas/! themes/dawn|Dawn]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1407), [реализация](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1407).
  Селектор: `.markdown-rendered tbody tr:nth-child(2n)`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1976), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1976).
  Селектор: `tbody tr td:nth-child(even), .markdown-rendered tbody tr td:nth-child(even)`.
- [[atlas/! themes/kanagawa|Kanagawa]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L401), [реализация](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L401).
  Селектор: `tr:nth-child(even)`.
- [[atlas/! themes/composer|Composer]]: **Hide Striped Background** (`composer--HideStripedTableBackground`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L110), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L2010).
  Селектор: `body:not(.composer--HideStripedTableBackground) .el-table table, body:not(.composer--HideStripedTableBackground) .table-wrapper table`.
  Проверяемое свойство: `background-color`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L837), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L837).
  Селектор: `.markdown-preview-view tr:nth-child(odd)`.

```hacksidian-files
table-e007
```
