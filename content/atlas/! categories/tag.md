---
snippet: hacksidian-10-tag.css
title: Теги
sources:
- https://github.com/kepano/obsidian-minimal/blob/master/Minimal.css
- https://github.com/PKM-er/Blue-Topaz_Obsidian-css/blob/master/theme.css
- https://github.com/colineckert/obsidian-things/blob/main/theme.css
- https://obsidian.md/help/tags
- https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Editor/Tag.md
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-decoration-break
---

# Теги → `$=dv.el("code", dv.app.vault.getAbstractFileByPath(dv.currentFilePath).basename)` • `$=const file = dv.app.vault.getAbstractFileByPath(dv.currentFilePath); (dv.app.vault.getAbstractFileByPath(file.parent.path.replace(/! categories$/, "! hacks"))?.children ?? []).filter(f => f.children && (f.name === file.basename || f.name.startsWith(file.basename + "-"))).length`

[[atlas/! categories/! categories|Все категории]] · [[atlas/atlas|Атлас приёмов]]

```hacksidian-category
tag
```

## Источники категории

- [Minimal](https://github.com/kepano/obsidian-minimal/blob/master/Minimal.css)
- [Blue Topaz](https://github.com/PKM-er/Blue-Topaz_Obsidian-css/blob/master/theme.css)
- [Things](https://github.com/colineckert/obsidian-things/blob/main/theme.css)
- [Синтаксис тегов OFM](https://obsidian.md/help/tags)
- [Переменные Obsidian](https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Editor/Tag.md)
- [:has()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has)
- [Переносы декора](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-decoration-break)
