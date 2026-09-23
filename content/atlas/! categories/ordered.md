---
snippet: hacksidian-25-ordered.css
title: Нумерованные списки
---

# Нумерованные списки → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Последовательности с номерами, буквами и римскими цифрами: Markdown `1.`, HTML `ol`.

Приёмы распределены по типу списка в примере. Общие правила для `li` могут также действовать на другой тип списка.

[[atlas/! categories/unordered|Маркированные списки]]

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
ordered
```
