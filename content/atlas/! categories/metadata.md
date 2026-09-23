---
snippet: hacksidian-21-metadata.css
title: Свойства заметки
---

# Свойства заметки → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Примеры ниже — интерактивные HTML-модели панели свойств и YAML-редактора. Изменяйте поля, флажки и фокус; переключатель приёма включает и выключает его CSS. Эти действия не меняют заметку.

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
metadata
```
