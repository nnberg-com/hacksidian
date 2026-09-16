---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Только боковая линия
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - anuppuccin
  - its-theme
  - github-theme
  - shiba-inu
---

```hacksidian-id
callout-technical-line
```

```hacksidian-live
callout-technical-line
```

```hacksidian-details
> Зачем
Неброское примечание внутри плотного текста.

> Как работает
У блока убран фон; цвет остался в заголовке и левой границе.
```

```hacksidian-sources
callout-technical-line
```

###### Локальные зависимости

- [assets/abstract.svg](<./assets/abstract.svg>)
- [assets/bug.svg](<./assets/bug.svg>)
- [assets/danger.svg](<./assets/danger.svg>)
- [assets/example.svg](<./assets/example.svg>)
- [assets/failure.svg](<./assets/failure.svg>)
- [assets/info.svg](<./assets/info.svg>)
- [assets/note.svg](<./assets/note.svg>)
- [assets/question.svg](<./assets/question.svg>)
- [assets/quote.svg](<./assets/quote.svg>)
- [assets/success.svg](<./assets/success.svg>)
- [assets/tip.svg](<./assets/tip.svg>)
- [assets/todo.svg](<./assets/todo.svg>)
- [assets/warning.svg](<./assets/warning.svg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Callout Style** (`anp-callout-select`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L406), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L4728).
  Селектор: `.anp-callout-block .callout:not([data-callout-metadata*=anp-sleek], [data-callout-metadata*=anp-vanilla-normal], [data-callout-metadata*=anp-vanilla-plus]):not([data-callout-metadata*=revert], [data-callout=blank-container], [data-callout=multi-column]), .callout[data-callout-metadata*=anp-block]:not([data-callout-metadata*=revert], [data-callout=blank-container], [data-callout=multi-column])`.
  Проверяемое свойство: `border-left`.
  Варианты: Default (none); Sleek (anp-callout-sleek); Block (anp-callout-block); Vanilla Normal (anp-callout-vanilla-normal); Vanilla Plus (anp-callout-vanilla-plus)
- [[atlas/! themes/its-theme|ITS Theme]]: **Callout Styling** (`callout-style`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1698), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11048).
  Селектор: `.callout-original .callout, .callout:is([data-callout-metadata~=callout-original], [data-callout-metadata~=co-o])`.
  Варианты: Original Callout Styling (callout-original); Callout Block Styling (callout-block); Callout Alternate Line Styling (callout-alternate-line); Callout Bordered Styling (callout-bordered)
- [[atlas/! themes/its-theme|ITS Theme]]: **Disable ITS Quote Callout Styling** (`default-callout-quote`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1720), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L10961).
  Селектор: `body:not(.default-callout-quote, .callout-no-quote) .callout.callout[data-callout=quote]`.
- [[atlas/! themes/github-theme|GitHub Theme]]: **GitHub callout style** (`callout-on`) — [описание настройки](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L32), [реализация](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L934).
  Селектор: `body.callout-on`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Toggle callout styling** (`shib-callout-toggle`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7753), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L2951).
  Селектор: `.shib-callout-toggle:not(:checked) + body:not( .shib-callout-style-1, .shib-callout-style-2, .shib-callout-style-3, .shib-callout-style-4, .shib-callout-block )`.
  Проверяемое свойство: `--callout-border-width`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Select callout style** (`shib-callout-select`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7757), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L2951).
  Селектор: `.shib-callout-toggle:not(:checked) + body:not( .shib-callout-style-1, .shib-callout-style-2, .shib-callout-style-3, .shib-callout-style-4, .shib-callout-block )`.
  Проверяемое свойство: `--callout-border-width`.
  Варианты: Default (shib-callout-default); Style 1 (Rounded) (shib-callout-style-1); Style 2 (Dashed) (shib-callout-style-2); Style 3 (Solid) (shib-callout-style-3); Style 4 (Minimalistic) (shib-callout-style-4); Block (shib-callout-block)

```hacksidian-files
callout-technical-line
```
