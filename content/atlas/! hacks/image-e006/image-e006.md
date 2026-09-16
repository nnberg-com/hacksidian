---
tags:
  - hacksidian_technique
  - hacksidian_image
title: По центру
category: image
sources: []
format: markdown
themes:
  - border
  - kakano
  - blue-topaz
  - its-theme
  - typomagical
  - shiba-inu
  - cyber-glow
  - ukiyo
  - yin-and-yang
  - retroma
  - dune
  - discordian
  - notation-2
  - wikipedia
  - underwater
  - everforest-enchanted
  - fancy-a-story
---

```hacksidian-id
image-e006
```

```hacksidian-live
image-e006
```

```hacksidian-details
> Зачем
Самостоятельная иллюстрация с равными боковыми полями.

> Как работает
Автоматические горизонтальные отступы.
```

```hacksidian-sources
image-e006
```

###### Локальные зависимости

- [assets/lake.jpg](<./assets/lake.jpg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Obsidian default image position** (`obsidian-default-image`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3459), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L15169).
  Селектор: `body:not(.obsidian-default-image) :is(.markdown-preview-view, .markdown-rendered) .workspace-leaf-content[data-type="markdown"] img:not([class*="emoji"])`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `margin-left`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7473), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7473).
  Селектор: `.image-embed[alt][alt*=relative], div:not(.image-embed) > img[alt][alt*=relative]`.
- [[atlas/! themes/border|Border]]: **center-align the image** (`img-center-align`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3185), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8649).
  Селектор: `.img-center-align .print :is(.markdown-preview-view, .markdown-rendered) img:not([class]), .img-center-align .markdown-preview-view img:not([class]), .img-center-align .markdown-source-view img:not([class])`.
- [[atlas/! themes/typomagical|Typomagical]]: правило CSS без отдельного переключателя — [исходник](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L825), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L825).
  Селектор: `body:not(.ss-zoom-off) .view-content .image-embed:not(.canvas-node-content):active, body:not(.ss-zoom-off) .view-content .markdown-preview-view img[referrerpolicy=no-referrer]:active`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1164), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1164).
  Селектор: `.image-zoom :is(.HyperMD-list-line, ul) .image-embed.image-embed img:active, body.image-zoom:not(.is-mobile) .view-content .image-embed:active, body.image-zoom:not(.is-mobile) .view-content :is(.cm-editor, .markdown-preview-view) img:active`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2260), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2260).
  Селектор: `.callout.callout[data-callout~=infobox] .internal-embed, .callout.callout[data-callout~=infobox] img`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `img, table`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4242), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4242).
  Селектор: `.markdown-preview-view img:not(img.emoji):not([width])`.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L6330), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L6330).
  Селектор: `body.rtm-ss-retro-callout .callout[data-callout="photoalbum"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="photoalbum-s"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="photoalbum-m"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="photoalbum-l"] .callout-content img`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L5145), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L5145).
  Селектор: `.callout[data-callout=infobox] :is(.internal-embed, img)`.
- [[atlas/! themes/discordian|Discordian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L530), [реализация](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L530).
  Селектор: `img`.
- [[atlas/! themes/notation-2|Notation 2]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L847), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L847).
  Селектор: `img`.
- [[atlas/! themes/kakano|Kakano]]: **Center images** (`theme-setting-centerImages`) — [описание настройки](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L380), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L2624).
  Селектор: `body.theme-setting-centerImages`.
- [[atlas/! themes/wikipedia|Wikipedia]]: **Image Placement** (`image-placement`) — [описание настройки](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L1081), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L503).
  Селектор: `.float-center .markdown-rendered img, .float-center .markdown-rendered img ~ img`.
  Варианты: Don't Float (no-float); Float Right (default) (float-right); Float Left (float-left); Center (float-center)
- [[atlas/! themes/underwater|Underwater]]: **Disable image/videos/embeds/etc. + Tables centering** (`no-center`) — [описание настройки](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2724), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1247).
  Селектор: `body:not(.no-center) :is(:is(.markdown-source-view.mod-cm6) :is(.cm-content, .cm-line), .markdown-rendered) :is(img, .external-embed, .internal-embed audio, .internal-embed video, .iframe-external-embed)`.
  Проверяемое свойство: `margin-inline`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2473), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2473).
  Селектор: `img`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129).
  Селектор: `.markdown-preview-view.markdown-preview-view .image-embed[alt~=background], .markdown-preview-view.markdown-preview-view img[alt~=background]:not(.image-embed *)`.

```hacksidian-files
image-e006
```
