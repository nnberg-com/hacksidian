---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Обтекание справа
category: image
sources: []
format: markdown
themes:
  - blue-topaz
  - its-theme
  - sanctum
  - pink-topaz
  - yin-and-yang
  - golden-topaz
  - dune
  - kakano
  - wikipedia
  - nier
  - everforest-enchanted
  - fancy-a-story
  - ebullientworks
---

```hacksidian-id
image-e063
```

```hacksidian-live
image-e063
```

```hacksidian-details
> Зачем
Та же журнальная вёрстка с правой иллюстрацией.

> Как работает
float:right назначен абзацу изображения.
```

```hacksidian-sources
image-e063
```

###### Локальные зависимости

- [assets/lake.jpg](<./assets/lake.jpg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L20873), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L20873).
  Селектор: `img[alt$="inlineR"]:not([class*="emoji"]), img[alt$="InlineR"]:not([class*="emoji"]), img[alt$="INLINER"]:not([class*="emoji"]), img[alt$="inlR"]:not([class*="emoji"]), img[alt$="INLR"]:not([class*="emoji"]), img[alt$="InlR"]:not([class*="emoji"])`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7665), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7665).
  Селектор: `img:is([alt~=lp], [alt~=live-preview]):is([alt*=right], [alt*=locr]), .image-embed:is([alt~=lp], [alt~=live-preview]):is([alt*=right], [alt*=locr])`.
- [[atlas/! themes/sanctum|Sanctum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1177), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1177).
  Селектор: `.markdown-rendered img[alt*=right], .workspace-leaf-content img[alt*=right]`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L4979), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L4979).
  Селектор: `img[alt$="inlineR"], img[alt$="InlineR"], img[alt$="INLINER"], img[alt$="inlR"]`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4409), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4409).
  Селектор: `img[alt*="right"]`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L4979), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L4979).
  Селектор: `img[alt$="inlineR"], img[alt$="InlineR"], img[alt$="INLINER"], img[alt$="inlR"]`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6785), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6785).
  Селектор: `img[alt~='r']`.
- [[atlas/! themes/kakano|Kakano]]: **Enable image adjustment with alt text** (`theme-setting-enableImageAdjustmentWithAltText`) — [описание настройки](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L525), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L2599).
  Селектор: `body.theme-setting-enableImageAdjustmentWithAltText .markdown-preview-view img[alt~=right]`.
  Проверяемое свойство: `float`.
- [[atlas/! themes/wikipedia|Wikipedia]]: **Image Placement** (`image-placement`) — [описание настройки](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L1081), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L497).
  Селектор: `.float-left .markdown-rendered img ~ img`.
  Проверяемое свойство: `float`.
  Применение: В режиме float-left последующие изображения обтекаются справа: отдельное правило img ~ img.
  Варианты: Don't Float (no-float); Float Right (default) (float-right); Float Left (float-left); Center (float-center)
- [[atlas/! themes/nier|Nier]]: правило CSS без отдельного переключателя — [исходник](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L821), [реализация](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L821).
  Селектор: `img[alt*="right"]`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2605), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2605).
  Селектор: `.markdown-reading-view .image-embed[src~="float"][src~="right"]`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129).
  Селектор: `.callout[data-callout=profile] .callout-content>p:first-child .image-embed`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2456), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2456).
  Селектор: `img[alt~=float-right], div[alt~=float-right]`.

```hacksidian-files
image-e063
```
