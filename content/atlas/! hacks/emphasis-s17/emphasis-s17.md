---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: Градиентная подложка
category: emphasis
sources: []
format: markdown
themes:
  - typomagical
---

```hacksidian-id
emphasis-s17
```

```hacksidian-live
emphasis-s17
```

Параметр «Применить к…» выбирает `**…**`, `_…_` или `==…==`. Приём полностью задаёт оформление выбранной разметки в Preview mode. Другие параметры приёма настраиваются независимо.

```hacksidian-sources
emphasis-s17
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/typomagical|Typomagical]]: **Solid background for highlights** (`ss-revert-highlight`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L2000), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L2195).
  Селектор: `body:not(.ss-revert-highlight) .cm-s-obsidian span.cm-highlight, body:not(.ss-revert-highlight) .markdown-rendered mark, body:not(.ss-revert-highlight) .search-result-file-matched-text`.
  Проверяемое свойство: `background`.

```hacksidian-files
emphasis-s17
```
