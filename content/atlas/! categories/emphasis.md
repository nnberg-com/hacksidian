---
snippet: hacksidian-08-emphasis.css
title: Выделения текста (bold, italic, …)
---

# Выделения текста (bold, italic, …) → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

Оформление одиночного выделения. Отдельно: [[atlas/! categories/strike|Зачёркивание]] и [[atlas/! categories/combinations|Сочетания выделений]].

```hacksidian-category
emphasis
```
