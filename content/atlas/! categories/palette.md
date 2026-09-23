---
snippet: hacksidian-00-palette.css
title: Палитра
---

# Палитра → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

[[atlas/! hacks/palette/expanded|Сравнить варианты палитры]] · [[playground/palette|Палитра на настоящем Markdown]]

```hacksidian-category
palette
```
