---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Длинная команда с локальной прокруткой
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-39
```

```hacksidian-live
inline-code-ex-39
```

```hacksidian-details
> Зачем
Чтобы сохранить команду одной строкой, ограничив ширину.

> Как работает
inline-block, max-inline-size и overflow-x:auto создают локальную область прокрутки.

> Ограничения
Прокрутите горизонтально трекпадом. Доступность прокрутки с клавиатуры зависит от браузера; code не получает tabindex из Markdown.
```

```hacksidian-sources
inline-code-ex-39
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-39
```
