---
tags:
  - hacksidian_technique
  - hacksidian_composition
title: Фотокарточка
category: composition
sources:
  - https://elsatam.github.io/obsidian-fancy-a-story/docs/callouts/polaroid.html
format: markdown
themes:
  - fancy-a-story
  - retroma
---

```hacksidian-id
callout-photo
```

```hacksidian-live
callout-photo
```

```hacksidian-details
> Зачем
Связать изображение с короткой подписью в дневнике наблюдений.

> Как работает
CSS меняет порядок заголовка и содержимого через Flexbox. Заголовок callout становится нижней подписью; дополнительный HTML для неё не нужен.

> Ограничения
В демо авторская SVG-иллюстрация. В том же Markdown можно указать обычную фотографию.
```

```hacksidian-sources
callout-photo
```

###### Локальные зависимости

- [assets/bay-scene.svg](<./assets/bay-scene.svg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/retroma|Retroma]]: описанный автором способ применения — [руководство](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/assets/examples/retroma-retro-callouts.md#L6), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L5852).
  Селектор: `body.rtm-ss-retro-callout .callout[data-callout="polaroid-1"], body.rtm-ss-retro-callout .callout[data-callout="polaroid-1-s"], body.rtm-ss-retro-callout .callout[data-callout="polaroid-1-m"], body.rtm-ss-retro-callout .callout[data-callout="polaroid-1-l"]`.
  Применение: Типы `polaroid-1` и `polaroid-2` оформляют изображение фотокарточкой.

```hacksidian-files
callout-photo
```
