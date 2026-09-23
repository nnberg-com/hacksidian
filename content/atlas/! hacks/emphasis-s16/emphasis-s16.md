---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: Рамка
category: emphasis
sources: []
format: markdown
themes:
  - encore
  - dune
---

```hacksidian-id
emphasis-s16
```

```hacksidian-live
emphasis-s16
```

Параметр «Применить к…» выбирает `**…**`, `_…_` или `==…==`. Приём полностью задаёт оформление выбранной разметки в Preview mode. Другие параметры приёма настраиваются независимо.

```hacksidian-sources
emphasis-s16
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/encore|Encore]]: **Highlighted Text Border** (`encore-highlight-border`) — [описание настройки](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L269), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L2221).
  Селектор: `body.encore-highlight-border .markdown-rendered mark, body.encore-highlight-border .cm-s-obsidian span.cm-formatting-highlight, body.encore-highlight-border .cm-s-obsidian span.cm-highlight, body.encore-highlight-border .search-result-file-matched-text`.
- [[atlas/! themes/dune|Dune]]: **Simple highlights** (`simple-border`) — [описание настройки](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L827), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L3622).
  Селектор: `.simple-border .markdown-rendered mark`.

```hacksidian-files
emphasis-s16
```
