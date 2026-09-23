---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: Полоса под нижней частью букв
category: emphasis
sources: []
format: markdown
themes:
  - things
---

```hacksidian-id
emphasis-s13
```

```hacksidian-live
emphasis-s13
```

Параметр «Применить к…» выбирает `**…**`, `_…_` или `==…==`. Приём полностью задаёт оформление выбранной разметки в Preview mode. Другие параметры приёма настраиваются независимо.

```hacksidian-sources
emphasis-s13
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/things|Things]]: **Fancy highlighting** (`fancy-highlight`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1499), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L508).
  Селектор: `body.fancy-highlight span.cm-highlight, body.fancy-highlight .markdown-preview-view mark, body.fancy-highlight .markdown-rendered mark, body.fancy-highlight span.search-result-file-matched-text`.

```hacksidian-files
emphasis-s13
```
