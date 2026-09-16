---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Соседний абзац как подпись
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
---

```hacksidian-id
table-e064
```

```hacksidian-live
table-e064
```

```hacksidian-details
> Зачем
Короткое пояснение над таблицей визуально связано с ней.

> Как работает
p:has(+ table) выбирает обычный Markdown-абзац непосредственно перед таблицей.

> Ограничения
Это визуальная подпись, а не HTML caption. Автоматические обёртки приложения могут нарушить соседство.
```

```hacksidian-sources
table-e064
```

```hacksidian-files
table-e064
```
