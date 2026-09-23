---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Мягкая цветная подложка
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - anuppuccin
  - blue-topaz
  - shiba-inu
---

```hacksidian-id
callout-technical-tint
```

```hacksidian-live
callout-technical-tint
```

```hacksidian-details
> Зачем
Примечание заметно без тяжёлой рамки.

> Как работает
Фон — небольшая примесь цвета типа к бумаге; границы нет.
```

```hacksidian-sources
callout-technical-tint
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Enable Custom Callout Colors** (`anp-callout-color-toggle`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L428), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L4867).
  Селектор: `.anp-callout-color-toggle .callout[data-callout=note]`.
  Проверяемое свойство: `--callout-color`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **The same as the title color** (`admonition-bg-color-same`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4362), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L26084).
  Селектор: `body.admonition-bg-color-same .callout`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `background-color`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **callout style settings** (`callout-style-settings`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4369), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L26084).
  Селектор: `body.admonition-bg-color-same .callout`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `background-color`.
  Варианты: Default (admonition-bg-color-same); Traditional (traditional-callout-style); Border (border-callout-style); Shade (shade-callout-style)
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Toggle custom callout colors** (`shib-callout-color-toggle`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7787), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L3324).
  Селектор: `.shib-callout-color-toggle .callout[data-callout="abstract"], .shib-callout-color-toggle .callout[data-callout="note"], .shib-callout-color-toggle .callout[data-callout="seealso"], .shib-callout-color-toggle .callout[data-callout="summary"], .shib-callout-color-toggle .callout[data-callout="tldr"]`.
  Проверяемое свойство: `--callout-color`.

```hacksidian-files
callout-technical-tint
```
