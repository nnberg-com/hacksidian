---
tags:
  - hacksidian_technique
  - hacksidian_link
title: Отдельная ссылка как кнопка перехода
category: link
sources:
  - https://spec.commonmark.org/0.31.2/
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
format: markdown
themes: []
---

```hacksidian-id
link-button
```

```hacksidian-live
link-button
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
link-button
```

```hacksidian-files
link-button
```
