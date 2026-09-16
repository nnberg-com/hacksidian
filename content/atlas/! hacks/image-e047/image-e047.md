---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Растворение вниз
category: image
sources: []
format: markdown
themes:
  - blue-topaz
  - dune
  - notation-2
  - fancy-a-story
---

```hacksidian-id
image-e047
```

```hacksidian-live
image-e047
```

```hacksidian-details
> Зачем
Плавно соединяет фотографию с фоном страницы.

> Как работает
Линейная маска становится прозрачной к низу.
```

```hacksidian-sources
image-e047
```

###### Локальные зависимости

- [assets/lake.jpg](<./assets/lake.jpg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **moment banner gradient** (`memos-banner-gradient`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4641), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L20295).
  Селектор: `body.memos-banner-gradient div[data-type=thino_view] .moments-view .moments-view-background-wrapper .moments-view-background`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `mask-image`.
- [[atlas/! themes/dune|Dune]]: **Banners, edgy** (`edgy-banners`) — [описание настройки](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L803), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6579).
  Селектор: `.edgy-banners img[alt="banner-a"]`.
  Проверяемое свойство: `mask-image`.
- [[atlas/! themes/notation-2|Notation 2]]: **Banner Style** (`banner-type-select`) — [описание настройки](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1863), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1458).
  Селектор: `.cover-img .inline-title, .banner-gradient .cover-img .inline-title`.
  Варианты: Default (banner-default); Gradient (banner-gradient); Neon (banner-glow)
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L69), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L69).
  Селектор: `.callout[data-callout=film-strip] img`.

```hacksidian-files
image-e047
```
