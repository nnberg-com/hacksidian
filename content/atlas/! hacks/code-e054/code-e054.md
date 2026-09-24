---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Shell без знака в исходнике
category: code
sources: []
format: markdown
themes: []
favourite: true
---

```hacksidian-id
code-e054
```

```hacksidian-live
code-e054
```

```hacksidian-details
> Зачем
Декоративный prompt для единственной команды.

> Как работает
Цвета настраиваются парами полей: «источник» выбирает семантическую палитру, цвет темы или «свой цвет»; соседнее цветовое поле действует при выборе «свой цвет». Прозрачность декоративных слоёв сохраняется.
code::before добавляет $; user-select: none исключает его из обычного выделения.

> Ограничения
Prompt появляется только один раз в начале блока. Это не префикс каждой строки; поведение копирования псевдотекста зависит от браузера.
```

```hacksidian-sources
code-e054
```

```hacksidian-files
code-e054
```
