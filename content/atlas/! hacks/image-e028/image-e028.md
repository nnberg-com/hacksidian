---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Чёрно-белая
category: image
sources: []
format: markdown
themes:
  - yin-and-yang
  - retroma
  - fancy-a-story
  - lagom
---

```hacksidian-id
image-e028
```

```hacksidian-live
image-e028
```

```hacksidian-details
> Зачем
Объединяет пёстрые исходники в спокойную серию.

> Как работает
Фильтр изменяет только отображение исходного файла.
```

```hacksidian-sources
image-e028
```

###### Локальные зависимости

- [assets/lake.jpg](<./assets/lake.jpg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4494), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4494).
  Селектор: `span[src$="#grayscale"] img`.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L4678), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L4678).
  Селектор: `body.rtm-ss-grayscale-fg :is(.mermaid, .callout), .rtm-ss-grayscale-img img, .rtm-ss-grayscale-vid video, .rtm-ss-grayscale-force`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L103), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L103).
  Селектор: `.callout:is([data-callout=full-width-image],[data-callout=full-w-img],[data-callout=fwi],[data-callout="full-width-panoramic-image-:jack_o_lantern:"],[data-callout=fwpi-jol])[data-callout-metadata~=grayscale] img`.
- [[atlas/! themes/lagom|Lagom]]: **Grayscale images** (`grayscale-dark-mode`) — [описание настройки](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2963), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2073).
  Селектор: `.grayscale-dark-mode.theme-dark img, .theme-dark .page-gallery__image`.

```hacksidian-files
image-e028
```
