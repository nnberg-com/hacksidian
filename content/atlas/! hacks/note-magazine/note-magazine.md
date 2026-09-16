---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Текст в двух колонках
category: note
sources:
  - https://github.com/oxalorg/sakura
format: markdown
themes:
  - fancy-a-story
  - lagom
---

```hacksidian-id
note-magazine
```

```hacksidian-live
note-magazine
```

```hacksidian-details
> Зачем
Короткая обзорная заметка на широком экране.

> Как работает
columns применяется ко всей заметке, h1 и h2 получают column-span:all.

> Ограничения
Для длинной веб-страницы колонки могут заставить читателя возвращаться вверх. Здесь пример короткий; на узкой ширине колонка одна.
```

```hacksidian-sources
note-magazine
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: описанный автором способ применения — [руководство](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/docs/docs/cssclasses/columns.md#L6), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L211).
  Селектор: `.columns-2.markdown-preview-view .markdown-preview-section`.
  Применение: Класс `columns` включает колоночный набор; точные варианты смотрите в документации темы.
- [[atlas/! themes/lagom|Lagom]]: **Magazine style** (`magazine-style`) — [описание настройки](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2638), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L400).
  Селектор: `.magazine-style .inline-title`.

```hacksidian-files
note-magazine
```
