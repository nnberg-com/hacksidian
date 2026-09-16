---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Подложка ссылки плавно заполняется
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
  - https://spec.commonmark.org/spec#code-spans
  - https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css
  - https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js
  - https://getbootstrap.com/docs/5.3/content/reboot/#inline-code
  - https://github.github.com/gfm/
  - https://developer.mozilla.org/en-US/docs/Web/CSS
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-55
```

```hacksidian-live
inline-code-ex-55
```

```hacksidian-details
> Зачем
Для мягкого отклика без движения самого текста.

> Как работает
background-size анимируется при hover/focus-visible; reduced-motion отключает переход.
```

```hacksidian-sources
inline-code-ex-55
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-55
```
