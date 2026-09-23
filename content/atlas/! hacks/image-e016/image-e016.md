---
tags:
  - hacksidian_technique
  - hacksidian_parameter_experiment
  - hacksidian_image
title: Мягкое скругление
category: image
sources: []
format: markdown
themes:
  - minimal
  - things
  - blue-topaz
  - obsidianite
  - its-theme
  - shimmering-focus
  - willemstad
  - cupertino
  - shiba-inu
  - encore
  - baseline
  - royal-velvet
  - retroma
  - maple
  - dune
  - light-bright
  - notation-2
  - sandstorm
  - underwater
  - velocity
  - vauxhall
  - fancy-a-story
  - origami
  - material-flat
  - dawn
  - bolt
  - lagom
favourite: false
---

```hacksidian-id
image-e016
```

```hacksidian-live
image-e016
```

```hacksidian-details
> Зачем
Смягчает прямоугольник в карточном интерфейсе.

> Как работает
Параметры на карточке: скругление относительно радиуса темы. Значения сохраняются в CSS приёма; для включённого оформления используется кнопка «Обновить уже существующий стиль».

border-radius скругляет саму картинку.
```

```hacksidian-sources
image-e016
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: правило CSS без отдельного переключателя — [исходник](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3275), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3275).
  Селектор: `.markdown-source-view video, .markdown-source-view img:not(.emoji), .markdown-rendered video, .markdown-rendered img:not(.emoji)`.
- [[atlas/! themes/things|Things]]: правило CSS без отдельного переключателя — [исходник](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L541), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L541).
  Селектор: `img`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L26140), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L26140).
  Селектор: `.callout .callout-title-inner>img:not([class*="emoji"])`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L1106), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L1106).
  Селектор: `.markdown-preview-view img`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7760), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7760).
  Селектор: `img[alt][alt][alt*=profile]:not([alt~="profile+square"]), .image-embed[alt][alt][alt*=profile] img:not([alt~="profile+square"])`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `.view-content img[src]:not(.emoji,.link-favicon)`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L31082), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L31082).
  Селектор: `.callout[data-callout="images"]:where([data-callout-metadata*="grid"]) > .callout-content img`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `img[src$="#interface"], div[src$="#interface"], span[src$="#interface"] img`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1208), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1208).
  Селектор: `img`.
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L809), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L809).
  Селектор: `.internal-embed.image-embed img`.
- [[atlas/! themes/baseline|Baseline]]: **Disable rounded media** (`img-radius-off`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2981), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.img-radius-off`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/royal-velvet|Royal Velvet]]: правило CSS без отдельного переключателя — [исходник](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L917), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L917).
  Селектор: `img, .markdown-source-view.mod-cm6 .cm-content > img`.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L8246), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L8246).
  Селектор: `body.rtm-ss-retro-callout .callout[data-callout="notepad"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="notepad-s"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="notepad-m"] .callout-content img, body.rtm-ss-retro-callout .callout[data-callout="notepad-l"] .callout-content img`.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3366), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3366).
  Селектор: `body.line-indicator-enable :is(.markdown-reading-view .markdown-preview-sizer > div:not(:has(:is(.collapse-indicator, hr, pre, blockquote, table, p img, audio, video))), .markdown-source-view .cm-line:not(.HyperMD-header, .HyperMD-quote, .HyperMD-list-line-1:has(.collapse-indicator)))::after`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6191), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L6191).
  Селектор: `.filme table tr :is(.internal-embed, img), .movies table tr :is(.internal-embed, img)`.
- [[atlas/! themes/light-bright|Light & Bright]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L205), [реализация](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L205).
  Селектор: `.cards table.dataview tbody > tr > td img`.
- [[atlas/! themes/notation-2|Notation 2]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1485), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1485).
  Селектор: `.banner-glow .cover-img .inline-title`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L13634), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L13634).
  Селектор: `.internal-embed img`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1247), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1247).
  Селектор: `body:not(.no-center) :is(:is(.markdown-source-view.mod-cm6) :is(.cm-content, .cm-line), .markdown-rendered) :is(img, .external-embed, .internal-embed audio, .internal-embed video, .iframe-external-embed)`.
- [[atlas/! themes/velocity|Velocity]]: правило CSS без отдельного переключателя — [исходник](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `audio, img, video`.
- [[atlas/! themes/vauxhall|Vauxhall]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cyanvoxel/vauxhall-obsidian/blob/55de6c8b3d1dccda92196522ba7e446ffd5c02d7/theme.css#L454), [реализация](https://github.com/cyanvoxel/vauxhall-obsidian/blob/55de6c8b3d1dccda92196522ba7e446ffd5c02d7/theme.css#L454).
  Селектор: `img`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L103), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L103).
  Селектор: `.callout[data-callout=masonry] img`.
- [[atlas/! themes/origami|Origami]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4835), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4835).
  Селектор: `img`.
- [[atlas/! themes/material-flat|Material Flat]]: правило CSS без отдельного переключателя — [исходник](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L512), [реализация](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L512).
  Селектор: `span.cm-highlight + img + span.math`.
- [[atlas/! themes/dawn|Dawn]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1522), [реализация](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1522).
  Селектор: `iframe, .workspace-leaf-content img:not([width]), .workspace-leaf-content audio, .workspace-leaf-content video`.
- [[atlas/! themes/bolt|Bolt]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/Obsidian-Bolt/blob/b6aab9a2d2eaf3f2f0213e0708aaa577e6bc2073/theme.css#L399), [реализация](https://github.com/bluemoondragon07/Obsidian-Bolt/blob/b6aab9a2d2eaf3f2f0213e0708aaa577e6bc2073/theme.css#L399).
  Селектор: `img`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L1071), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L1071).
  Селектор: `.callout img`.

```hacksidian-files
image-e016
```
