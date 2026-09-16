---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Первое упоминание в каждом абзаце
category: inline-code
sources: []
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-59
```

```hacksidian-live
inline-code-ex-59
```

```hacksidian-details
> Зачем
Для декоративного акцента на первом code среди соседей.

> Как работает
code:first-of-type выбирает первый code у данного родителя, а не первое текстовое упоминание во всём документе.

> Ограничения
Вложенный в strong или ссылку code имеет другого родителя. По текстовому содержимому повторы CSS не определяет.
```

```hacksidian-sources
inline-code-ex-59
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-59
```
