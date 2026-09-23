---
snippet: hacksidian-15-callout.css
title: Выноски
---

# Выноски → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Оформление самой выноски: фон, рамка, заголовок, значок, сворачивание.
Оформление Markdown и вложенных выносок — в категории [[callin|Markdown внутри выносок]].
Приёмы со специальными типами и структурой — в отдельной категории [[composition|Композиции]].

```hacksidian-category
callout
```
