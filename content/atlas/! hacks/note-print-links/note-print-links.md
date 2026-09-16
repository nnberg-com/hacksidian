---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Адреса ссылок на бумаге
category: note
sources:
  - https://spec.commonmark.org/0.31.2/
  - https://developer.mozilla.org/en-US/docs/Web/CSS
  - https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing
format: markdown
themes:
  - blue-topaz
  - ultra-lobster
---

```hacksidian-id
note-print-links
```

```hacksidian-details
> Зачем
Распечатка, где кликабельность больше не помогает.

> Как работает
@media print выводит attr(href) после HTTPS-ссылок.

> Ограничения
На экране URL намеренно не дублируются. Раскрытые исходники и панели стенда при печати скрываются.

Встроенного экранного примера нет: эффект проявляется при печати или экспорте в PDF. Проверять его нужно на отдельной заметке в этом режиме.
```
```hacksidian-sources
note-print-links
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Print URL after links** (`show-url-after-link`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2983), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L25996).
  Селектор: `body.show-url-after-link a.external-link::after`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Print / PDF — Show Link URLs** (`ulu-print-link-urls`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L713), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21807).
  Селектор: `body.ulu-print-link-urls a[href^="http"]::after, body.ulu-print-link-urls a[href^="https"]::after`.
  Условия CSS: `@media print`

```hacksidian-files
note-print-links
```
