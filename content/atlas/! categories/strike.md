---
snippet: hacksidian-23-strike.css
title: Зачёркивание
---

# Зачёркивание → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Оформление фрагментов `~~…~~`: зачёркивание, приглушение и скрытие текста.

[[atlas/! categories/emphasis|Выделения текста]] · [[atlas/! categories/! categories|Все категории]]

```hacksidian-category
strike
```
