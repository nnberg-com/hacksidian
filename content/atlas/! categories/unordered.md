---
snippet: hacksidian-11-unordered.css
title: Маркированные списки
---

# Маркированные списки → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Перечисления с точками, значками и другими маркерами: Markdown `-`, HTML `ul`.

Приёмы распределены по типу списка в примере. Общие правила для `li` могут также действовать на другой тип списка.

[[atlas/! categories/ordered|Нумерованные списки]]

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
unordered
```
