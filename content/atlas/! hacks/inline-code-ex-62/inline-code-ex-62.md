---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Подпись из title Markdown-ссылки
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/attr
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
inline-code-ex-62
```

```hacksidian-live
inline-code-ex-62
```

```hacksidian-details
> Зачем
Когда подпись ссылки нужно показать прямо рядом с кодом.

> Как работает
attr(title) читает обычный title, который можно задать синтаксисом Markdown. Дополнительного data-атрибута нет.

> Ограничения
Подпись — CSS content. Не храните в ней единственную важную инструкцию: доступность и копирование generated content ограничены. Название шрифта можно заменить на свой.
```

```hacksidian-sources
inline-code-ex-62
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


###### Локальные зависимости

- [assets/Onest.ttf](<./assets/Onest.ttf>)

```hacksidian-files
inline-code-ex-62
```
