---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Обтекание слева
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
image-e062
```

```hacksidian-live
image-e062
```

```hacksidian-details
> Зачем
Журнальная вёрстка с небольшой фотографией.

> Как работает
Плавает весь отдельный абзац с картинкой; следующий текст его обтекает.
```

```hacksidian-sources
image-e062
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L20863), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L20863).
  Селектор: `img[alt$="inlineL"]:not([class*="emoji"]), img[alt$="InlineL"]:not([class*="emoji"]), img[alt$="INLINEL"]:not([class*="emoji"]), img[alt$="inlL"]:not([class*="emoji"]), img[alt$="INLL"]:not([class*="emoji"]), img[alt$="InlL"]:not([class*="emoji"])`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7669), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7669).
  Селектор: `img:is([alt~=lp], [alt~=live-preview]):is([alt*=left], [alt*=locl]), .image-embed:is([alt~=lp], [alt~=live-preview]):is([alt*=left], [alt*=locl])`.
- [[atlas/! themes/sanctum|Sanctum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1168), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1168).
  Селектор: `.markdown-rendered img[alt*=left], .workspace-leaf-content img[alt*=left]`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L4971), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L4971).
  Селектор: `img[alt$="inlineL"], img[alt$="InlineL"], img[alt$="INLINEL"], img[alt$="inlL"]`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4401), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4401).
  Селектор: `img[alt*="left"]`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L4971), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L4971).
  Селектор: `img[alt$="inlineL"], img[alt$="InlineL"], img[alt$="INLINEL"], img[alt$="inlL"]`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6793), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6793).
  Селектор: `img[alt~='l']`.
- [[atlas/! themes/kakano|Kakano]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L2603), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L2603).
  Селектор: `body.theme-setting-enableImageAdjustmentWithAltText .markdown-preview-view img[alt~=left]`.
- [[atlas/! themes/wikipedia|Wikipedia]]: **Image Placement** (`image-placement`) — [описание настройки](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L1081), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L492).
  Селектор: `.float-left .markdown-rendered img`.
  Проверяемое свойство: `float`.
  Варианты: Don't Float (no-float); Float Right (default) (float-right); Float Left (float-left); Center (float-center)
- [[atlas/! themes/nier|Nier]]: правило CSS без отдельного переключателя — [исходник](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L829), [реализация](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L829).
  Селектор: `img[alt*="left"]`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2601), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2601).
  Селектор: `.markdown-reading-view .image-embed[src~="float"][src~="left"]`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129).
  Селектор: `.markdown-rendered .image-embed:is([alt~=left],[alt~=float-left])`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2462), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2462).
  Селектор: `img[alt~=float-left], div[alt~=float-left]`.

```hacksidian-files
image-e062
```
