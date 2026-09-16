---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Оформление по адресу Markdown-ссылки
category: inline-code
sources:
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
inline-code-ex-61
```

```hacksidian-live
inline-code-ex-61
```

```hacksidian-details
> Зачем
Для ссылок на файлы определённого формата.

> Как работает
Селектор атрибута проверяет href у обычной ссылки, а не текст внутри code.

> Ограничения
Конечное .json распознаётся в href. Адрес с ?query или #fragment уже не совпадёт с этим простым селектором. Рядом сохранён пример JSON-файла.
```

```hacksidian-sources
inline-code-ex-61
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


###### Локальные зависимости

- [assets/example.json](<./assets/example.json>)

```hacksidian-files
inline-code-ex-61
```
