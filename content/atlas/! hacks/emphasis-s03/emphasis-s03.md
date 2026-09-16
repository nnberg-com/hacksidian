---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: 03 · Цвет вместо курсива
category: emphasis
sources: []
format: markdown
themes:
  - things
  - anuppuccin
  - blue-topaz
  - obsidian-nord
  - obsidianite
  - obsidian-gruvbox
  - primary
  - shimmering-focus
  - catppuccin
  - willemstad
  - prism
  - border
  - tokyo-night
  - dracula-for-obsidian
  - cybertron
  - shiba-inu
  - encore
  - pink-topaz
  - dracula-official
  - ukiyo
  - material-gruvbox
  - yin-and-yang
  - royal-velvet
  - golden-topaz
  - lyt-mode
  - retroma
  - maple
  - ultra-lobster
  - dune
  - discordian
  - sandstorm
  - wy-console
  - underwater
  - velocity
  - wyrd
  - everforest-enchanted
  - aura
  - dracula-lyt
  - origami
  - vicious
  - comfort-color-dark
  - ebullientworks
  - pisum
  - soft-paper
  - pine-forest-berry
  - sparkling-night
  - zen
  - retronotes
  - autotape
---

```hacksidian-id
emphasis-s03
```

```hacksidian-live
emphasis-s03
```

```hacksidian-sources
emphasis-s03
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/things|Things]]: **Default font colors** (`default-font-color`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1533), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L496).
  Селектор: `body:not(.default-font-color) em, body:not(.default-font-color) span:not(.cm-highlight).cm-em`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Italic Color** (`anp-italic-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L2090), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L2949).
  Селектор: `.anp-italic-rosewater`.
  Варианты: None (none); Rosewater (anp-italic-rosewater); Flamingo (anp-italic-flamingo); Pink (anp-italic-pink); Mauve (anp-italic-mauve); Red (anp-italic-red); Maroon (anp-italic-maroon); Peach (anp-italic-peach); Yellow (anp-italic-yellow); Green (anp-italic-green); Teal (anp-italic-teal); Sky (anp-italic-sky); Sapphire (anp-italic-sapphire); Blue (anp-italic-blue); Lavender (anp-italic-lavender)
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10580), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10580).
  Селектор: `body:not(.remove-colorful-highlight-bg) .markdown-source-view.is-live-preview *:not([class*="cm-formatting-highlight"])~*:not([class*="cm-em"])~.cm-em.cm-highlight.cm-strong, .markdown-source-view.is-live-preview.colorful-highlight .cm-em.cm-highlight.cm-strong`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/obsidian-nord|Obsidian Nord]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L70), [реализация](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L70).
  Селектор: `.theme-dark`.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L648), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L648).
  Селектор: `.cm-em, em`.
- [[atlas/! themes/obsidian-gruvbox|Obsidian gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L109), [реализация](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L109).
  Селектор: `.theme-dark`.
- [[atlas/! themes/primary|Primary]]: правило CSS без отдельного переключателя — [исходник](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `.theme-light`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **Uncolored italic** (`uncolored-italic`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L305), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `.uncolored-italic :is(em,.cm-em)`.
- [[atlas/! themes/catppuccin|Catppuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1759), [реализация](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1759).
  Селектор: `em, .cm-em`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L29810), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L29810).
  Селектор: `:is(.markdown-preview-view, .markdown-rendered) em > mark, span.cm-em.cm-highlight`.
- [[atlas/! themes/prism|Prism]]: правило CSS без отдельного переключателя — [исходник](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L696), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L696).
  Селектор: `body.theme-light`.
- [[atlas/! themes/border|Border]]: правило CSS без отдельного переключателя — [исходник](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7818), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7818).
  Селектор: `body`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L121), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L121).
  Селектор: `.theme-dark, .theme-light`.
- [[atlas/! themes/dracula-for-obsidian|Dracula for Obsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L242), [реализация](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L242).
  Селектор: `em, .cm-em`.
- [[atlas/! themes/cybertron|Cybertron]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L3), [реализация](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L3).
  Селектор: `.theme-dark`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Enable Italic and Bold Colors** (`shiba-italic-bold-style`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7418), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L646).
  Селектор: `.shiba-italic-bold-style`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Color of *Italic*** (`shiba-italic-colors`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7423), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L424).
  Селектор: `.shib-italic-orange`.
  Варианты: Lily (shib-italic-lily); Red (shib-italic-red); Rose (shib-italic-rose); Violet (shib-italic-violet); Blue (shib-italic-blue); Sea (shib-italic-sea); Cyan (shib-italic-cyan); Turquoise (shib-italic--turquoise); Green (shib-italic-green); Yellow (shib-italic-yellow); Lemon (shib-italic-lemon); Orange (shib-italic-orange)
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1488), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1488).
  Селектор: `body`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1775), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1775).
  Селектор: `.theme-dark div.CodeMirror-activeline .CodeMirror-line span.cm-formatting.cm-formatting-em.cm-em`.
- [[atlas/! themes/dracula-official|Dracula Official]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L665), [реализация](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L665).
  Селектор: `em`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `.theme-dark a, .theme-dark em, .theme-dark i, .theme-dark strong, .theme-light a, .theme-light em, .theme-light i, .theme-light strong`.
  Условия CSS: `@media print`
- [[atlas/! themes/material-gruvbox|Material Gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L431), [реализация](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L431).
  Селектор: `.theme-dark`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2168), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2168).
  Селектор: `.spec-color-head .cm-s-obsidian .cm-header:not(.cm-hastag):not(.cm-em).cm-header-1:not(.cm-hmd-internal-link)`.
- [[atlas/! themes/royal-velvet|Royal Velvet]]: правило CSS без отдельного переключателя — [исходник](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L436), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L436).
  Селектор: `em, .cm-s-obsidian .cm-em, .cm-s-obsidian .cm-quote.cm-em`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1775), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1775).
  Селектор: `.theme-dark div.CodeMirror-activeline .CodeMirror-line span.cm-formatting.cm-formatting-em.cm-em`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L271), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L271).
  Селектор: `body.theme-dark`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L45), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L45).
  Селектор: `.is-tablet, .is-mobile, body`.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3486), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3486).
  Селектор: `body :is(.cm-highlight.cm-em, mark > em)`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Accent Bold & Italic** (`ulu-accent-bold-italic`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L678), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7211).
  Селектор: `.ulu-accent-bold-italic .cm-strong, .ulu-accent-bold-italic strong`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L1282), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L1282).
  Селектор: `.theme-light.col-mod-0, .theme-dark.col-mod-1`.
- [[atlas/! themes/discordian|Discordian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L578), [реализация](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L578).
  Селектор: `em`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L2044), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L2044).
  Селектор: `body`.
- [[atlas/! themes/wy-console|WY Console]]: правило CSS без отдельного переключателя — [исходник](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L527), [реализация](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L527).
  Селектор: `.mod-cm6 .cm-editor .cm-em`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1).
  Селектор: `.theme-light, .theme-dark`.
- [[atlas/! themes/velocity|Velocity]]: **Colored bold and italics** (`enable-special-text`) — [описание настройки](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L105), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `.theme-dark.gray.enable-special-text`.
- [[atlas/! themes/wyrd|Wyrd]]: правило CSS без отдельного переключателя — [исходник](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L797), [реализация](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L797).
  Селектор: `body`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L464), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L464).
  Селектор: `.cm-s-obsidian span.cm-strong, strong, .cm-s-obsidian span.cm-em, em, .language-markdown :is(.bold, .italic) > *, span:is(.cm-em, .cm-strong) + .cm-widgetBuffer + span.math, span.math:has(+ .cm-widgetBuffer + span:is(.cm-em, .cm-strong))`.
- [[atlas/! themes/aura|Aura]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L113), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L113).
  Селектор: `.theme-light`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L40), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L40).
  Селектор: `.cm-em, em`.
- [[atlas/! themes/origami|Origami]]: **change bold-italic to accent color** (`o-bold-italic`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L215), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4168).
  Селектор: `.o-bold-italic em, .o-bold-italic .cm-em`.
- [[atlas/! themes/vicious|Vicious]]: **Italics Color** (`italicscolors`) — [описание настройки](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L117), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L678).
  Селектор: `.itl-C001 .cm-em, .itl-C001 em`.
  Варианты: Red (itl-C001); Beach (itl-C002); Gold (itl-C003); Yellow (itl-C004); Lime (itl-C005); Green (itl-C006); Turquoise (itl-C007); Cyan (itl-C008); Purple (itl-C009); Violet (itl-C010); Pink (itl-C011)
- [[atlas/! themes/comfort-color-dark|Comfort color dark]]: правило CSS без отдельного переключателя — [исходник](https://github.com/obsidian-ezs/obsidian-comfort-color-dark/blob/e92afeabb6c5844c0ad772cbba9cb1772f295486/obsidian.css#L41), [реализация](https://github.com/obsidian-ezs/obsidian-comfort-color-dark/blob/e92afeabb6c5844c0ad772cbba9cb1772f295486/obsidian.css#L41).
  Селектор: `em`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L1487), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L1487).
  Селектор: `body`.
- [[atlas/! themes/pisum|Pisum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L265), [реализация](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L265).
  Селектор: `em, .cm-em`.
- [[atlas/! themes/soft-paper|Soft Paper]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L990), [реализация](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L990).
  Селектор: `body`.
- [[atlas/! themes/pine-forest-berry|Pine Forest Berry]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L225), [реализация](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L225).
  Селектор: `em, .cm-em`.
- [[atlas/! themes/sparkling-night|Sparkling Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L297), [реализация](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L297).
  Селектор: `.cm-em, em, .cm-em cm-quote cm-quote-1`.
- [[atlas/! themes/zen|Zen]]: правило CSS без отдельного переключателя — [исходник](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L251), [реализация](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L251).
  Селектор: `body`.
- [[atlas/! themes/retronotes|RetroNotes]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sr-campelo/retronotes/blob/94c9562fcb93cd34c5ebb0973bdf88cfd48d0732/theme.css#L39), [реализация](https://github.com/sr-campelo/retronotes/blob/94c9562fcb93cd34c5ebb0973bdf88cfd48d0732/theme.css#L39).
  Селектор: `body`.
- [[atlas/! themes/autotape|Autotape]]: правило CSS без отдельного переключателя — [исходник](https://github.com/1612elphi/autotape-theme/blob/d06d439a5df1d665497ddec5eadd61d08fe1f5e7/theme.css#L47), [реализация](https://github.com/1612elphi/autotape-theme/blob/d06d439a5df1d665497ddec5eadd61d08fe1f5e7/theme.css#L47).
  Селектор: `.theme-dark`.

```hacksidian-files
emphasis-s03
```
