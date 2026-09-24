---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Абзац как подпись
category: code
sources: []
format: markdown
themes: []
---

```hacksidian-id
code-e049
```

```hacksidian-live
code-e049
```

```hacksidian-details
> Зачем
Добавить подпись без использования figure или figcaption.

> Как работает
Цвета настраиваются парами полей: «источник» выбирает семантическую палитру, цвет темы или «свой цвет»; соседнее цветовое поле действует при выборе «свой цвет». Прозрачность декоративных слоёв сохраняется.
p:has(+ pre) выбирает предыдущий абзац.

> Ограничения
CSS не знает, что абзац является подписью. Это авторская договорённость.
```

```hacksidian-sources
code-e049
```

```hacksidian-files
code-e049
```
