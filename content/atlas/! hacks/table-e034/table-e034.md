---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Подсветка строки
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes:
  - minimal
  - anuppuccin
  - blue-topaz
  - its-theme
  - sanctum
  - cupertino
  - encore
  - pln
  - pink-topaz
  - baseline
  - golden-topaz
  - ultra-lobster
  - dune
  - sandstorm
  - everforest-enchanted
  - ebullientworks
  - kanagawa
---

```hacksidian-id
table-e034
```

```hacksidian-live
table-e034
```

```hacksidian-details
> Зачем
Взгляд не теряется при движении вдоль строки.

> Как работает
hover у tr меняет фон всех его ячеек.
```

```hacksidian-sources
table-e034
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Highlight active row** (`row-hover`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8141), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3306).
  Селектор: `.row-hover`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5834), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5834).
  Селектор: `table.dataview.table-view-table > tbody > tr:hover`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14221), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14221).
  Селектор: `:is(.markdown-preview-view,.markdown-rendered) table tbody>tr:hover, .markdown-rendered tbody tr:nth-child(odd):hover`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: **Disable Row Hover Highlight** (`tables-no-hover`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1822), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11642).
  Селектор: `.tables-no-hover tbody tr:nth-child(even):hover`.
  Проверяемое свойство: `--table-row-background-hover`.
- [[atlas/! themes/sanctum|Sanctum]]: **Disable active row highlighting** (`table-hover-row`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8336), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1876).
  Селектор: `.table-hover-row .cm-embed-block.markdown-rendered .block-language-dataview tbody tr:hover, .table-hover-row .markdown-rendered table tbody tr:hover, .table-hover-row .markdown-rendered .table-view-table tbody tr:hover`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.cards table.dataview.table-view-table>tbody>tr:hover`.
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1279), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1279).
  Селектор: `.dataview.table-view-table > tbody > tr:hover`.
- [[atlas/! themes/pln|PLN]]: **Highlight table rows when hovering** (`pln-hi-tr`) — [описание настройки](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L337), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1205).
  Селектор: `.pln-hi-tr .mod-root tr:hover`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1860), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1860).
  Селектор: `.markdown-preview-view tr:hover`.
- [[atlas/! themes/baseline|Baseline]]: **Highlight hovered row** (`row-hover`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3083), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.row-hover`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1860), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1860).
  Селектор: `.markdown-preview-view tr:hover`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L20020), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L20020).
  Селектор: `.block-language-dataview .table-view-table > tbody > tr:hover > td, .markdown-preview-view .block-language-dataview table > tbody > tr:hover > td`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L5996), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L5996).
  Селектор: `.theme-light .markdown-rendered tbody tr:hover`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L15829), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L15829).
  Селектор: `.cm-html-embed tbody tr:hover, .markdown-rendered tbody tr:hover`.
  Условия CSS: `@media (hover: hover)`
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2774), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2774).
  Селектор: `.table-view-table > tbody > tr:hover`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2756), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2756).
  Селектор: `.markdown-rendered table.table-view-table.dataview > tbody > tr:hover`.
- [[atlas/! themes/kanagawa|Kanagawa]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L403), [реализация](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L403).
  Селектор: `tr:hover`.

```hacksidian-files
table-e034
```
