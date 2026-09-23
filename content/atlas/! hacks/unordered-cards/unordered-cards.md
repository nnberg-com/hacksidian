---
tags:
  - hacksidian_technique
  - hacksidian_unordered
title: Список карточками
category: unordered
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::marker
format: markdown
themes:
  - minimal
---

```hacksidian-id
unordered-cards
```

```hacksidian-live
unordered-cards
```

```hacksidian-details
> Зачем
Несколько самостоятельных идей с кратким описанием.

> Как работает
ul становится grid; li получает фон и поля. strong внутри каждого пункта играет роль названия.
```

```hacksidian-sources
unordered-cards
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: описанный автором способ применения — [руководство](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/docs/Block%20types/Cards.md#L15), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L2495).
  Селектор: `.list-cards.markdown-preview-view .list-bullet, .list-cards.markdown-preview-view .list-collapse-indicator, .list-cards.markdown-preview-view.markdown-rendered.show-indentation-guide li > ul::before`.
  Применение: Добавьте `list-cards` в cssclasses: обычный маркированный список станет сеткой карточек.

```hacksidian-files
unordered-cards
```
