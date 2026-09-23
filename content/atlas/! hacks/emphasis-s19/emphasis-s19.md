---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: Неровный маркер
category: emphasis
sources: []
format: markdown
themes:
  - ultra-lobster
favourite: false
---

```hacksidian-id
emphasis-s19
```

```hacksidian-live
emphasis-s19
```

Параметр «Применить к…» выбирает `**…**`, `_…_` или `==…==`. Приём полностью задаёт оформление выбранной разметки в Preview mode. Другие параметры приёма настраиваются независимо.

```hacksidian-sources
emphasis-s19
```

Подсветка выделенного текста `==текст==` выглядит как слегка наклонный след маркера с неровными краями. Наклон создаёт фон `linear-gradient(176deg, …)`; сами буквы не поворачиваются. Цвет берётся из `--text-highlight-bg`. Приём работает с элементами `mark`; поддержка подсветки в Live Preview этим селектором не подтверждена. Настраиваемых полей нет — эффект уже задан рецептом.

Slanted, tilted marker highlight for highlighted text: a rough highlighter background at a slight angle, without rotating the letters. Fixed CSS recipe using a 176-degree gradient on mark elements.

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Rough Marker Highlight** (`ulu-rough-highlight`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L949), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L9430).
  Селектор: `body.ulu-rough-highlight mark, body.ulu-rough-highlight .markdown-source-view.mod-cm6 .cm-highlight:not(.cm-formatting-highlight)`.

```hacksidian-files
emphasis-s19
```
