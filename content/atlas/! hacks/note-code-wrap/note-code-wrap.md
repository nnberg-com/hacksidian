---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Длинные строки с переносом
category: note
sources:
  - https://spec.commonmark.org/0.31.2/#fenced-code-blocks
format: markdown
themes:
  - blue-topaz
  - baseline
  - lagom
---

```hacksidian-id
note-code-wrap
```

```hacksidian-live
note-code-wrap
```

```hacksidian-details
> Зачем
Логи и псевдокод, которые важнее прочитать целиком без горизонтальной прокрутки.

> Как работает
white-space:pre-wrap сохраняет пробелы и допускает перенос; overflow-wrap:anywhere страхует длинное слово.

> Ограничения
Выравнивание столбцов визуально теряется на перенесённых строках.
```

```hacksidian-sources
note-code-wrap
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Code wrap (Reading mode)** (`whole-code-wrap`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L5064), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L15017).
  Селектор: `body:not(.whole-code-wrap) code[class*='language-'], body:not(.whole-code-wrap) pre[class*='language-']`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/baseline|Baseline]]: **Disable line wrap** (`code-scroll`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2692), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.code-scroll`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/lagom|Lagom]]: **Wrap code (Read mode)** (`wrap-code-blocks`) — [описание настройки](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2713), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L660).
  Селектор: `.wrap-code-blocks .markdown-rendered pre, .wrap-code-blocks .markdown-rendered pre code[class*="language-"]`.

```hacksidian-files
note-code-wrap
```
