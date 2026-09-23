---
snippet: hacksidian-07-link.css
title: Ссылки
sources:
- https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
- https://github.com/google/fonts/tree/main/ofl/onest
- https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_%3Avisited_selector
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-decoration-break
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target
- https://raw.githubusercontent.com/obsidianmd/obsidian-developer-docs/main/en/Reference/CSS%20variables/Editor/Link.md
---

# Ссылки → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
link
```

## Источники категории

- [W3C: локальная копия тестового PDF для рабочего перехода](https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf)
- [Onest: локальный вариативный шрифт, лицензия OFL](https://github.com/google/fonts/tree/main/ofl/onest)
- [MDN: ограничения :visited](https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_%3Avisited_selector)
- [MDN: box-decoration-break](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-decoration-break)
- [MDN: селекторы атрибутов](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors)
- [MDN: :target](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target)
- [Obsidian: официальный список переменных ссылок](https://raw.githubusercontent.com/obsidianmd/obsidian-developer-docs/main/en/Reference/CSS%20variables/Editor/Link.md)
