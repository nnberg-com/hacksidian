---
snippet: hacksidian-24-combinations.css
title: Сочетания выделений
---

# Сочетания выделений → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Оформление сочетаний двух или трёх способов разметки одного фрагмента. Эти приёмы рассматриваются отдельно от оформления одиночного выделения.

[[atlas/! categories/emphasis|Выделения текста]] · [[atlas/! categories/! categories|Все категории]]

```hacksidian-category
combinations
```
