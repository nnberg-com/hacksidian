---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: "Атомарная плашка: inline-block"
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/display
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-38
```

```hacksidian-live
inline-code-ex-38
```

```hacksidian-details
> Зачем
Чтобы короткий фрагмент переносился целиком и участвовал в высоте строки.

> Как работает
display:inline-block делает code единой коробкой; её внутренний текст может переноситься.

> Ограничения
Вертикальные padding теперь влияют на строку. Это другой компромисс, чем обычный inline.
```

```hacksidian-sources
inline-code-ex-38
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-38
```
