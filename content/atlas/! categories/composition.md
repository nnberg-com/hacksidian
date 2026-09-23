---
snippet: hacksidian-22-composition.css
title: Композиции
---

# Композиции → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Целостное оформление заметки или составного блока: книжная полоса, бумага, карточка, колонки, редакционная компоновка, согласованные наборы выносок (например, GitHub Alerts).

Часть приёмов использует специальный синтаксис callout: собственные типы (`[!ticket]`, `[!qna]` и другие), роли вложенных блоков и заданная структура содержимого. Для применения воспроизведите разметку из примера приёма: одного включения CSS недостаточно.

Оформление стандартных callout без специального синтаксиса: [[atlas/! categories/callout|Выноски]].

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
composition
```
