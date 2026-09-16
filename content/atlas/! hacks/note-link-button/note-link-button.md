---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Отдельная ссылка как кнопка перехода
category: note
sources:
  - https://spec.commonmark.org/0.31.2/
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
format: markdown
themes: []
---

```hacksidian-id
note-link-button
```

```hacksidian-live
note-link-button
```

```hacksidian-details
> Зачем
Один заметный переход после пояснения.

> Как работает
p > a:only-child получает inline-block, фон и поля. Это по-прежнему ссылка, а не команда.

> Ограничения
:only-child не учитывает соседние текстовые узлы. Договорённость: абзац действительно содержит только ссылку.
```

```hacksidian-sources
note-link-button
```

```hacksidian-files
note-link-button
```
