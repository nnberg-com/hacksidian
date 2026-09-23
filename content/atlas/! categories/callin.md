---
snippet: hacksidian-26-callin.css
title: Markdown внутри выносок
---

# Markdown внутри выносок → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

Оформление обычного Markdown внутри стандартного callout: абзацев, ссылок, изображений, списков, подзаголовков, блоков кода и строчного кода в заголовке. Сюда же относятся вложенные выноски, колонки содержимого и оформление выноски по наличию блока кода.

Оформление самой выноски — [[callout|Выноски]]. Составные блоки со специальными типами и структурой — [[composition|Композиции]].

```hacksidian-category
callin
```
