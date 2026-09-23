---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Приподнятая карточка
category: image
sources: []
format: markdown
themes:
  - minimal
  - things
  - its-theme
  - cupertino
  - ukiyo
  - baseline
  - lyt-mode
  - retroma
  - light-bright
  - everforest-enchanted
  - dracula-lyt
  - fancy-a-story
  - lagom
---

```hacksidian-id
image-e019
```

```hacksidian-live
image-e019
```

```hacksidian-details
> Зачем
Отделяет иллюстрацию от поверхности страницы.

> Как работает
Мягкая тень вокруг прямоугольника.
```

```hacksidian-sources
image-e019
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: правило CSS без отдельного переключателя — [исходник](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3513), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3513).
  Селектор: `img[src$="#interface"], span[src$="#interface"] img`.
- [[atlas/! themes/things|Things]]: правило CSS без отдельного переключателя — [исходник](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L541), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L541).
  Селектор: `img`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L9878), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L9878).
  Селектор: `.callout.callout[data-callout=statblocks] img:not([class], [width])`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `img[src$="#interface"], div[src$="#interface"], span[src$="#interface"] img`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `.theme-dark img, .theme-light img`.
  Условия CSS: `@media print`
- [[atlas/! themes/baseline|Baseline]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `img[src$="#interface"], div[src$="#interface"], span[src$="#interface"] img`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L1769), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L1769).
  Селектор: `.markdown-source-view.is-live-preview img[src], .markdown-preview-view img[src]`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L6330), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L6330).
  Селектор: `body.rtm-ss-retro-callout .callout[data-callout="photoalbum"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="photoalbum-s"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="photoalbum-m"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="photoalbum-l"] .callout-content img`.
- [[atlas/! themes/light-bright|Light & Bright]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L539), [реализация](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L539).
  Селектор: `.markdown-preview-view img:hover`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2623), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2623).
  Селектор: `.image-embed[src~="shadow"] > img, img[src^="http"][alt~="shadow"]`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L2519), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L2519).
  Селектор: `.markdown-source-view.is-live-preview img, .markdown-preview-view img`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L57), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L57).
  Селектор: `.callout[data-callout=cards-deck] .callout-content>p img`.
- [[atlas/! themes/lagom|Lagom]]: **Enable shadows and borders** (`enable-shadows-borders-img`) — [описание настройки](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2957), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2053).
  Селектор: `.enable-shadows-borders-img .view-content img`.

```hacksidian-files
image-e019
```
