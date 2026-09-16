---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Переносы длинных слов
category: note
sources:
  - https://raw.githubusercontent.com/oxalorg/sakura/master/css/sakura.css
format: markdown
themes:
  - ultra-lobster
---

```hacksidian-id
note-hyphens
```

```hacksidian-live
note-hyphens
```

```hacksidian-details
> Зачем
Узкие колонки, где длинные русские слова создают неровный край.

> Как работает
hyphens: auto использует язык документа; overflow-wrap страхует от переполнения.

> Ограничения
Словарь переносов зависит от браузера и ОС. Здесь lang="ru" задан всему документу, не вручную отдельной заметке.
```

```hacksidian-sources
note-hyphens
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Disable Auto-Hyphenation** (`ulu-no-hyphenate`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L708), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7906).
  Селектор: `body:not(.ulu-no-hyphenate) .markdown-preview-view p`.

```hacksidian-files
note-hyphens
```
