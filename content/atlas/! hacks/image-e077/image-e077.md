---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Подпись появляется
category: image
sources: []
format: markdown
themes:
  - fancy-a-story
---

```hacksidian-id
image-e077
```

```hacksidian-live
image-e077
```

```hacksidian-details
> Зачем
Дополнительный комментарий раскрывается поверх кадра.

> Как работает
Соседний абзац лежит в той же Grid-ячейке; hover и focus-within проявляют его.
```

```hacksidian-sources
image-e077
```

###### Локальные зависимости

- [assets/lake.jpg](<./assets/lake.jpg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: описанный автором способ применения — [руководство](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/docs/docs/callouts/tooltip.md#L6), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129).
  Селектор: `.callout[data-callout=tooltip]`.
  Применение: Callout `tooltip`: его заголовок становится подписью, появляющейся при наведении на картинку.

```hacksidian-files
image-e077
```
