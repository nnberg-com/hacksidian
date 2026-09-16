---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Inline отдельно от блока кода
category: inline-code
sources: []
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-50
```

```hacksidian-live
inline-code-ex-50
```

```hacksidian-details
> Зачем
Чтобы плашки и псевдокавычки не попадали в fenced code.

> Как работает
code:not(pre code) исключает всех code внутри pre.

> Ограничения
Это контроль границы селектора. Блок не является ещё одним вариантом inline code.
```

```hacksidian-sources
inline-code-ex-50
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-50
```
