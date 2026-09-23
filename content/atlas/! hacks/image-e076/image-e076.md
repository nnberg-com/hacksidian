---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Размытие снимается
category: image
sources: []
format: markdown
themes:
  - everforest-enchanted
---

```hacksidian-id
image-e076
```

```hacksidian-live
image-e076
```

```hacksidian-details
> Зачем
Декоративное проявление изображения.

> Как работает
При наведении убирается blur.

> Ограничения
Не используйте для обязательной информации: исходное состояние намеренно менее читаемо.
```

```hacksidian-sources
image-e076
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: описанный автором способ применения — [руководство](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/image_styling.md#L81), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2631).
  Селектор: `.image-embed[src~="blur"] > img, img[src^="http"][alt~="blur"]`.
  Применение: Локальное изображение: `![[image.png# blur]]`; размытое изображение раскрывается при наведении.

```hacksidian-files
image-e076
```
