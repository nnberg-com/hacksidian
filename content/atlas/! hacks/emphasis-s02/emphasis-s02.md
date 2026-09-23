---
tags:
  - hacksidian_technique
  - hacksidian_emphasis
title: Цветной bold
category: emphasis
sources: []
format: markdown
themes:
  - things
  - anuppuccin
  - blue-topaz
  - obsidian-nord
  - obsidianite
  - its-theme
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
  - cyber-glow
  - ukiyo
  - material-gruvbox
  - yin-and-yang
  - royal-velvet
  - golden-topaz
  - lyt-mode
  - retroma
  - maple
  - dark-moss
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
  - fancy-a-story
  - origami
  - vicious
  - comfort-color-dark
  - ebullientworks
  - simple
  - soft-paper
  - kanagawa
  - pine-forest-berry
  - sparkling-night
  - zen
  - retronotes
  - autotape
  - composer
---

```hacksidian-id
emphasis-s02
```

```hacksidian-live
emphasis-s02
```

```hacksidian-sources
emphasis-s02
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/things|Things]]: **Default font colors** (`default-font-color`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1533), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L490).
  Селектор: `body:not(.default-font-color) strong, body:not(.default-font-color) span:not(.cm-highlight).cm-strong`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Bold Color** (`anp-bold-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L2038), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L2945).
  Селектор: `.anp-bold-rosewater`.
  Варианты: None (none); Rosewater (anp-bold-rosewater); Flamingo (anp-bold-flamingo); Pink (anp-bold-pink); Mauve (anp-bold-mauve); Red (anp-bold-red); Maroon (anp-bold-maroon); Peach (anp-bold-peach); Yellow (anp-bold-yellow); Green (anp-bold-green); Teal (anp-bold-teal); Sky (anp-bold-sky); Sapphire (anp-bold-sapphire); Blue (anp-bold-blue); Lavender (anp-bold-lavender)
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10580), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10580).
  Селектор: `body:not(.remove-colorful-highlight-bg) .markdown-source-view.is-live-preview *:not([class*="cm-formatting-highlight"])~*:not([class*="cm-em"])~.cm-em.cm-highlight.cm-strong, .markdown-source-view.is-live-preview.colorful-highlight .cm-em.cm-highlight.cm-strong`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/obsidian-nord|Obsidian Nord]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L70), [реализация](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L70).
  Селектор: `.theme-dark`.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L616), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L616).
  Селектор: `.cm-strong, strong`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L9868), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L9868).
  Селектор: `.callout.callout[data-callout=statblocks] > .callout-content`.
- [[atlas/! themes/obsidian-gruvbox|Obsidian gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L109), [реализация](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L109).
  Селектор: `.theme-dark`.
- [[atlas/! themes/primary|Primary]]: правило CSS без отдельного переключателя — [исходник](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `.theme-light`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **Uncolored bold** (`uncolored-bold`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L299), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `.uncolored-bold :is(strong,.cm-strong)`.
- [[atlas/! themes/catppuccin|Catppuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1751), [реализация](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1751).
  Селектор: `strong, .cm-strong, .cm-s-obsidian span.cm-formatting-strong, .cm-s-obsidian span.cm-strong`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L29823), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L29823).
  Селектор: `:is(.markdown-preview-view, .markdown-rendered) strong > mark, span.cm-strong.cm-highlight`.
- [[atlas/! themes/prism|Prism]]: правило CSS без отдельного переключателя — [исходник](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L696), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L696).
  Селектор: `body.theme-light`.
- [[atlas/! themes/border|Border]]: правило CSS без отдельного переключателя — [исходник](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7808), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7808).
  Селектор: `body`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L121), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L121).
  Селектор: `.theme-dark, .theme-light`.
- [[atlas/! themes/dracula-for-obsidian|Dracula for Obsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L236), [реализация](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L236).
  Селектор: `strong, .cm-strong`.
- [[atlas/! themes/cybertron|Cybertron]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L3), [реализация](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L3).
  Селектор: `.theme-dark`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Enable Italic and Bold Colors** (`shiba-italic-bold-style`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7418), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L646).
  Селектор: `.shiba-italic-bold-style`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Color of **Bold**** (`shiba-bold-colors`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7474), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L390).
  Селектор: `.shib-bold-orange`.
  Варианты: Lily (shib-bold-lily); Red (shib-bold-red); Rose (shib-bold-rose); Violet (shib-bold-violet); Blue (shib-bold-blue); Sea (shib-bold-sea); Cyan (shib-bold-cyan); Turquoise (shib-bold-turquoise); Green (shib-bold-green); Yellow (shib-bold-yellow); Lemon (shib-bold-lemon); Orange (shib-bold-orange)
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1488), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1488).
  Селектор: `body`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1733), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1733).
  Селектор: `span.cm-strong, strong`.
- [[atlas/! themes/dracula-official|Dracula Official]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L651), [реализация](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L651).
  Селектор: `strong`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3127), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3127).
  Селектор: `.cm-strong, strong`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `.theme-dark a, .theme-dark em, .theme-dark i, .theme-dark strong, .theme-light a, .theme-light em, .theme-light i, .theme-light strong`.
  Условия CSS: `@media print`
- [[atlas/! themes/material-gruvbox|Material Gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L431), [реализация](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L431).
  Селектор: `.theme-dark`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2433), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2433).
  Селектор: `strong, .cm-s-obsidian .cm-strong.cm-header, .cm-s-obsidian .cm-strong.cm-header.cm-header-1, .cm-s-obsidian .cm-strong.cm-header.cm-header-2, .cm-s-obsidian .cm-strong.cm-header.cm-header-3, .cm-s-obsidian .cm-strong.cm-header.cm-header-4, .cm-s-obsidian .cm-strong.cm-header.cm-header-5, .cm-s-obsidian .cm-strong.cm-header.cm-header-6, .rainbow-headers .cm-s-obsidian .cm-strong.cm-header.cm-header-1, .rainbow-headers .cm-s-obsidian .cm-strong.cm-header.cm-header-2, .rainbow-headers .cm-s-obsidian .cm-strong.cm-header.cm-header-3, .rainbow-headers .cm-s-obsidian .cm-strong.cm-header.cm-header-4, .rainbow-headers .cm-s-obsidian .cm-strong.cm-header.cm-header-5, .rainbow-headers .cm-s-obsidian .cm-strong.cm-header.cm-header-6, .cm-header.cm-header-3.cm-hmd-internal-link, .markdown-preview-section strong, .cm-s-obsidian .cm-strong`.
- [[atlas/! themes/royal-velvet|Royal Velvet]]: правило CSS без отдельного переключателя — [исходник](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L430), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L430).
  Селектор: `strong, .cm-s-obsidian .cm-strong, .cm-s-obsidian .cm-quote.cm-strong`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1733), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1733).
  Селектор: `span.cm-strong, strong`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L271), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L271).
  Селектор: `body.theme-dark`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L45), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L45).
  Селектор: `.is-tablet, .is-mobile, body`.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3483), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L3483).
  Селектор: `body :is(.cm-highlight.cm-strong, mark > strong)`.
- [[atlas/! themes/dark-moss|Dark Moss]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sergey900553/obsidian_githublike_theme/blob/70695e748d0da568874be8e922b86aa46ade6e4b/theme.css#L397), [реализация](https://github.com/sergey900553/obsidian_githublike_theme/blob/70695e748d0da568874be8e922b86aa46ade6e4b/theme.css#L397).
  Селектор: `span.cm-strong`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Accent Bold & Italic** (`ulu-accent-bold-italic`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L678), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7211).
  Селектор: `.ulu-accent-bold-italic .cm-strong, .ulu-accent-bold-italic strong`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L1282), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L1282).
  Селектор: `.theme-light.col-mod-0, .theme-dark.col-mod-1`.
- [[atlas/! themes/discordian|Discordian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L565), [реализация](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L565).
  Селектор: `strong`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L2044), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L2044).
  Селектор: `body`.
- [[atlas/! themes/wy-console|WY Console]]: правило CSS без отдельного переключателя — [исходник](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L521), [реализация](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L521).
  Селектор: `.mod-cm6 .cm-editor .cm-strong`.
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
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L35), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L35).
  Селектор: `.cm-strong, strong`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L59), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L59).
  Селектор: `.callout[data-callout=conversation-minimalist]>.callout-content>:not(hr), .callout[data-callout=conversation-outline]>.callout-content>:not(hr), .callout[data-callout=conversation]>.callout-content>:not(hr)`.
- [[atlas/! themes/origami|Origami]]: **change bold-italic to accent color** (`o-bold-italic`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L215), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4168).
  Селектор: `.o-bold-italic em, .o-bold-italic .cm-em`.
- [[atlas/! themes/vicious|Vicious]]: **Bold Color** (`boldcolors`) — [описание настройки](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L76), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L629).
  Селектор: `.bold-C001 .cm-strong, .bold-C001 strong`.
  Варианты: Red (bold-C001); Beach (bold-C002); Gold (bold-C003); Yellow (bold-C004); Lime (bold-C005); Green (bold-C006); Turquoise (bold-C007); Cyan (bold-C008); Purple (bold-C009); Violet (bold-C010); Pink (bold-C011)
- [[atlas/! themes/comfort-color-dark|Comfort color dark]]: правило CSS без отдельного переключателя — [исходник](https://github.com/obsidian-ezs/obsidian-comfort-color-dark/blob/e92afeabb6c5844c0ad772cbba9cb1772f295486/obsidian.css#L36), [реализация](https://github.com/obsidian-ezs/obsidian-comfort-color-dark/blob/e92afeabb6c5844c0ad772cbba9cb1772f295486/obsidian.css#L36).
  Селектор: `strong`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L1487), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L1487).
  Селектор: `body`.
- [[atlas/! themes/simple|Simple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L789), [реализация](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L789).
  Селектор: `body.theme-dark .cm-strong`.
- [[atlas/! themes/soft-paper|Soft Paper]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L990), [реализация](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L990).
  Селектор: `body`.
- [[atlas/! themes/kanagawa|Kanagawa]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L150), [реализация](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L150).
  Селектор: `.theme-dark`.
- [[atlas/! themes/pine-forest-berry|Pine Forest Berry]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L219), [реализация](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L219).
  Селектор: `strong, .cm-strong`.
- [[atlas/! themes/sparkling-night|Sparkling Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L293), [реализация](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L293).
  Селектор: `.cm-strong, strong`.
- [[atlas/! themes/zen|Zen]]: правило CSS без отдельного переключателя — [исходник](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L1106), [реализация](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L1106).
  Селектор: `strong, .cm-strong`.
- [[atlas/! themes/retronotes|RetroNotes]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sr-campelo/retronotes/blob/94c9562fcb93cd34c5ebb0973bdf88cfd48d0732/theme.css#L39), [реализация](https://github.com/sr-campelo/retronotes/blob/94c9562fcb93cd34c5ebb0973bdf88cfd48d0732/theme.css#L39).
  Селектор: `body`.
- [[atlas/! themes/autotape|Autotape]]: правило CSS без отдельного переключателя — [исходник](https://github.com/1612elphi/autotape-theme/blob/d06d439a5df1d665497ddec5eadd61d08fe1f5e7/theme.css#L47), [реализация](https://github.com/1612elphi/autotape-theme/blob/d06d439a5df1d665497ddec5eadd61d08fe1f5e7/theme.css#L47).
  Селектор: `.theme-dark`.
- [[atlas/! themes/composer|Composer]]: правило CSS без отдельного переключателя — [исходник](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L825), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L825).
  Селектор: `.theme-light`.

```hacksidian-files
emphasis-s02
```
