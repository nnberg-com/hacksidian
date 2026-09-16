---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Перечисление одной строкой
category: note
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::marker
format: markdown
themes:
  - minimal
---

```hacksidian-id
note-list-inline
```

```hacksidian-live
note-list-inline
```

```hacksidian-details
> Зачем
Короткие характеристики, материалы или ключевые темы.

> Как работает
ul и li становятся строчными; разделитель между пунктами создаёт ::before.
```

```hacksidian-sources
note-list-inline
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Force tables lists inline** (`dataview-inline-lists`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7002), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L4535).
  Селектор: `.dataview-inline-lists .markdown-source-view .dataview-ul, .dataview-inline-lists .markdown-preview-view .dataview-ul`.

```hacksidian-files
note-list-inline
```
