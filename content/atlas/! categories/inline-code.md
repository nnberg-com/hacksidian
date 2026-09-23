---
snippet: hacksidian-09-inline-code.css
title: Инлайн-код
sources:
- https://spec.commonmark.org/spec#code-spans
- https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css
- https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js
- https://getbootstrap.com/docs/5.3/content/reboot/#inline-code
- https://github.github.com/gfm/
- https://developer.mozilla.org/en-US/docs/Web/CSS
---

# Инлайн-код → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
inline-code
```

## Источники категории

- [CommonMark: code spans](https://spec.commonmark.org/spec#code-spans)
- [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css)
- [Tailwind Typography: исходные стили](https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js)
- [Bootstrap: inline code](https://getbootstrap.com/docs/5.3/content/reboot/#inline-code)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [MDN: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
