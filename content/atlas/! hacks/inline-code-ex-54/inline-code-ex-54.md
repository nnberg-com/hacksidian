---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Свой цвет выделения
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::selection
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-54
```

```hacksidian-live
inline-code-ex-54
```

```hacksidian-details
> Зачем
Чтобы выделенный код ясно читался поверх своей подложки.

> Как работает
Фон выделения и текст настраиваются отдельно: свой цвет, цвета темы, восемь семантических цветов, «Контраст» или «Как есть». По умолчанию фон #176e60, текст контрастный. Приём действует только при выделении, не меняя обычный фон, форму или отступы inline code. Контраст вычисляется стандартным CSS contrast-color(), с приближением OKLCH для старых движков.
```

```hacksidian-sources
inline-code-ex-54
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-54
```
