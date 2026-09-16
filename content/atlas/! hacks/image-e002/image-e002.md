---
tags:
  - hacksidian_technique
  - hacksidian_image
title: На всю колонку
category: image
sources: []
format: markdown
themes:
  - everforest-enchanted
---

```hacksidian-id
image-e002
```

```hacksidian-live
image-e002
```

```hacksidian-details
> Зачем
Главная иллюстрация занимает всю доступную ширину.

> Как работает
width растягивает изображение, max-width не позволяет выйти за край.
```

```hacksidian-sources
image-e002
```

###### Локальные зависимости

- [assets/lake.jpg](<./assets/lake.jpg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Image Embeds - Stretch all images to fit the full width** (`image-embed-stretch`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1678), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2525).
  Селектор: `.image-embed-stretch`.

```hacksidian-files
image-e002
```
