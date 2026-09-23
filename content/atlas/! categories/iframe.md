---
snippet: hacksidian-19-iframe.css
title: Iframe
---

# Iframe → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
iframe
```
