---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Цвет всего заголовка
category: heading
sources: []
format: markdown
themes:
  - minimal
  - things
  - anuppuccin
  - blue-topaz
  - obsidian-nord
  - wasp
  - its-theme
  - obsidian-gruvbox
  - primary
  - shimmering-focus
  - catppuccin
  - willemstad
  - prism
  - border
  - tokyo-night
  - everforest
  - github-theme
  - cybertron
  - solarized
  - shiba-inu
  - encore
  - pln
  - pink-topaz
  - baseline
  - material-gruvbox
  - yin-and-yang
  - golden-topaz
  - lyt-mode
  - retroma
  - maple
  - ultra-lobster
  - reverie
  - dune
  - light-bright
  - notation-2
  - underwater
  - velocity
  - wyrd
  - everforest-enchanted
  - aura
  - vauxhall
  - fancy-a-story
  - origami
  - transparent
  - nebula
  - ebullientworks
  - soft-paper
  - sparkling-night
  - material-ocean
  - zen
  - retronotes
  - autotape
  - composer
  - atom
  - obsidianite
  - dracula-for-obsidian
  - notation
  - typomagical
  - ono-sendai
  - dracula-official
  - cyber-glow
  - obuntu
  - ukiyo
  - dark-moss
  - discordian
  - sandstorm
  - wy-console
  - blackbird
  - nier
  - gitsidian
  - dracula-lyt
  - moonlight
  - vicious
  - comfort-color-dark
  - material-flat
  - dawn
  - pisum
  - faded
  - simple
  - kanagawa
  - pine-forest-berry
---

```hacksidian-id
heading-e007
```

```hacksidian-live
heading-e007
```

```hacksidian-details
> Зачем
Отмечает раздел или поддерживает акцентный цвет страницы.

> Как работает
Меняется только color.
```

Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e007
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: правило CSS без отдельного переключателя — [исходник](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3085), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3085).
  Селектор: `body.colorful-headings`.
- [[atlas/! themes/things|Things]]: правило CSS без отдельного переключателя — [исходник](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L18), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L18).
  Селектор: `body`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Enable Custom Heading Colors** (`anp-header-color-toggle`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1478), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5003).
  Селектор: `.anp-header-color-toggle.anp-h1-rosewater .app-container, .anp-header-color-toggle.anp-h1-rosewater .print`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H1 Color** (`anp-h1-color-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1531), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5003).
  Селектор: `.anp-header-color-toggle.anp-h1-rosewater .app-container, .anp-header-color-toggle.anp-h1-rosewater .print`.
  Варианты: Rosewater (anp-h1-rosewater); Flamingo (anp-h1-flamingo); Pink (anp-h1-pink); Mauve (anp-h1-mauve); Red (anp-h1-red); Maroon (anp-h1-maroon); Peach (anp-h1-peach); Yellow (anp-h1-yellow); Green (anp-h1-green); Teal (anp-h1-teal); Sky (anp-h1-sky); Sapphire (anp-h1-sapphire); Blue (anp-h1-blue); Lavender (anp-h1-lavender)
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H2 Color** (`anp-h2-color-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1615), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5087).
  Селектор: `.anp-header-color-toggle.anp-h2-rosewater .app-container, .anp-header-color-toggle.anp-h2-rosewater .print`.
  Варианты: Rosewater (anp-h2-rosewater); Flamingo (anp-h2-flamingo); Pink (anp-h2-pink); Mauve (anp-h2-mauve); Red (anp-h2-red); Maroon (anp-h2-maroon); Peach (anp-h2-peach); Yellow (anp-h2-yellow); Green (anp-h2-green); Teal (anp-h2-teal); Sky (anp-h2-sky); Sapphire (anp-h2-sapphire); Blue (anp-h2-blue); Lavender (anp-h2-lavender)
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H3 Color** (`anp-h3-color-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1699), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5171).
  Селектор: `.anp-header-color-toggle.anp-h3-rosewater .app-container, .anp-header-color-toggle.anp-h3-rosewater .print`.
  Варианты: Rosewater (anp-h3-rosewater); Flamingo (anp-h3-flamingo); Pink (anp-h3-pink); Mauve (anp-h3-mauve); Red (anp-h3-red); Maroon (anp-h3-maroon); Peach (anp-h3-peach); Yellow (anp-h3-yellow); Green (anp-h3-green); Teal (anp-h3-teal); Sky (anp-h3-sky); Sapphire (anp-h3-sapphire); Blue (anp-h3-blue); Lavender (anp-h3-lavender)
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H4 Color** (`anp-h4-color-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1783), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5255).
  Селектор: `.anp-header-color-toggle.anp-h4-rosewater .app-container, .anp-header-color-toggle.anp-h4-rosewater .print`.
  Варианты: Rosewater (anp-h4-rosewater); Flamingo (anp-h4-flamingo); Pink (anp-h4-pink); Mauve (anp-h4-mauve); Red (anp-h4-red); Maroon (anp-h4-maroon); Peach (anp-h4-peach); Yellow (anp-h4-yellow); Green (anp-h4-green); Teal (anp-h4-teal); Sky (anp-h4-sky); Sapphire (anp-h4-sapphire); Blue (anp-h4-blue); Lavender (anp-h4-lavender)
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H5 Color** (`anp-h5-color-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1867), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5339).
  Селектор: `.anp-header-color-toggle.anp-h5-rosewater .app-container, .anp-header-color-toggle.anp-h5-rosewater .print`.
  Варианты: Rosewater (anp-h5-rosewater); Flamingo (anp-h5-flamingo); Pink (anp-h5-pink); Mauve (anp-h5-mauve); Red (anp-h5-red); Maroon (anp-h5-maroon); Peach (anp-h5-peach); Yellow (anp-h5-yellow); Green (anp-h5-green); Teal (anp-h5-teal); Sky (anp-h5-sky); Sapphire (anp-h5-sapphire); Blue (anp-h5-blue); Lavender (anp-h5-lavender)
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H6 Color** (`anp-h6-color-custom`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1951), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5423).
  Селектор: `.anp-header-color-toggle.anp-h6-rosewater .app-container, .anp-header-color-toggle.anp-h6-rosewater .print`.
  Варианты: Rosewater (anp-h6-rosewater); Flamingo (anp-h6-flamingo); Pink (anp-h6-pink); Mauve (anp-h6-mauve); Red (anp-h6-red); Maroon (anp-h6-maroon); Peach (anp-h6-peach); Yellow (anp-h6-yellow); Green (anp-h6-green); Teal (anp-h6-teal); Sky (anp-h6-sky); Sapphire (anp-h6-sapphire); Blue (anp-h6-blue); Lavender (anp-h6-lavender)
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Retain header color** (`retain-header-color`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1279), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12364).
  Селектор: `body.retain-header-color :is(.markdown-preview-view,.markdown-rendered) h1 em, body.retain-header-color :is(.markdown-preview-view,.markdown-rendered) h1 strong, body.retain-header-color :is(.markdown-preview-view,.markdown-rendered) h1 strong em, body.retain-header-color .cm-s-obsidian .cm-header.cm-header-1[class*="cm-em"], body.retain-header-color .cm-s-obsidian .cm-header.cm-header-1[class*="cm-strong"]`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `color`.
- [[atlas/! themes/obsidian-nord|Obsidian Nord]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L70), [реализация](https://github.com/insanum/obsidian_nord/blob/f40209f976fab19ae7590018591fd5311e6af7f4/theme.css#L70).
  Селектор: `.theme-dark`.
- [[atlas/! themes/atom|Atom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/kognise/obsidian-atom/blob/650d6463d377a096520373c4752fef66f3f18f46/obsidian.css#L300), [реализация](https://github.com/kognise/obsidian-atom/blob/650d6463d377a096520373c4752fef66f3f18f46/obsidian.css#L300).
  Селектор: `.token.selector, .token.tag, .HyperMD-codeblock .cm-tag, .HyperMD-codeblock .cm-property, .HyperMD-codeblock .cm-meta, .HyperMD-codeblock .cm-qualifier, .HyperMD-codeblock .cm-header, .HyperMD-codeblock .cm-quote, .HyperMD-codeblock .cm-hr, .HyperMD-codeblock .cm-link`.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L519), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L519).
  Селектор: `.markdown-preview-section h1, .cm-header-1`.
- [[atlas/! themes/wasp|Wasp]]: правило CSS без отдельного переключателя — [исходник](https://github.com/santiyounger/Wasp-Obsidian-Theme/blob/6c3bf9b9def7bac55d87c6b966f203077bed1b12/theme.css#L22), [реализация](https://github.com/santiyounger/Wasp-Obsidian-Theme/blob/6c3bf9b9def7bac55d87c6b966f203077bed1b12/theme.css#L22).
  Селектор: `.theme-dark`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Header Color Override** (`heading-color-override`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L960), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12721).
  Селектор: `.heading-color-override h1 > *, .heading-color-override h2 > *, .heading-color-override h3 > *, .heading-color-override h4 > *, .heading-color-override h5 > *, .heading-color-override h6 > *, .heading-color-override .cm-s-obsidian .cm-header > *`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/obsidian-gruvbox|Obsidian gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L109), [реализация](https://github.com/insanum/obsidian_gruvbox/blob/bec6c083415980155aefc1a0d26c7cfe68fd85eb/theme.css#L109).
  Селектор: `.theme-dark`.
- [[atlas/! themes/primary|Primary]]: правило CSS без отдельного переключателя — [исходник](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `.theme-light`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **Headings: No alternating colors** (`no-alternating-header-colors`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L217), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `body:not(.no-alternating-header-colors) :is(.cm-header-1,.cm-header-3,.cm-header-5):not(.cm-formatting-header), body:not(.no-alternating-header-colors) .view-content :is(h1,h3,h5)`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/catppuccin|Catppuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1799), [реализация](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1799).
  Селектор: `h1, .markdown-rendered h1, .HyperMD-header-1, .HyperMD-list-line .cm-header-1`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28570), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28570).
  Селектор: `body:not(.ssopt-no-coloured-headers) .workspace-leaf-content[data-type="markdown"] h1, body:not(.ssopt-no-coloured-headers) .workspace-leaf-content[data-type="markdown"] .markdown-rendered h1, body:not(.ssopt-no-coloured-headers) .workspace-leaf-content[data-type="markdown"] .HyperMD-header-1`.
- [[atlas/! themes/prism|Prism]]: правило CSS без отдельного переключателя — [исходник](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L696), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L696).
  Селектор: `body.theme-light`.
- [[atlas/! themes/border|Border]]: **H1 text color** (`h1-color-select`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2469), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7054).
  Селектор: `.h1-color-designated`.
  Варианты: Default (h1-color-default); Accent color (h1-color-designated)
- [[atlas/! themes/border|Border]]: **H2 text color** (`h2-color-select`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2532), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7142).
  Селектор: `.h2-color-designated`.
  Варианты: Default (h2-color-default); Accent color (h2-color-designated)
- [[atlas/! themes/border|Border]]: **H3 text color** (`h3-color-select`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2595), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7230).
  Селектор: `.h3-color-designated`.
  Варианты: Default (h3-color-default); Accent color (h3-color-designated)
- [[atlas/! themes/border|Border]]: **H4 text color** (`h4-color-select`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2658), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7317).
  Селектор: `.h4-color-designated`.
  Варианты: Default (h4-color-default); Accent color (h4-color-designated)
- [[atlas/! themes/border|Border]]: **H5 text color** (`h5-color-select`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2721), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7405).
  Селектор: `.h5-color-designated`.
  Варианты: Default (h5-color-default); Accent color (h5-color-designated)
- [[atlas/! themes/border|Border]]: **H6 text color** (`h6-color-select`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2784), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7493).
  Селектор: `.h6-color-designated`.
  Варианты: Default (h6-color-default); Accent color (h6-color-designated)
- [[atlas/! themes/tokyo-night|Tokyo Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L121), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L121).
  Селектор: `.theme-dark, .theme-light`.
- [[atlas/! themes/dracula-for-obsidian|Dracula for Obsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L284), [реализация](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L284).
  Селектор: `.cm-header-1, .markdown-preview-view h1`.
- [[atlas/! themes/everforest|Everforest]]: правило CSS без отдельного переключателя — [исходник](https://github.com/0xglitchbyte/obsidian_everforest/blob/0b125d77156e1965e0b9489caccece65034582fb/obsidian.css#L111), [реализация](https://github.com/0xglitchbyte/obsidian_everforest/blob/0b125d77156e1965e0b9489caccece65034582fb/obsidian.css#L111).
  Селектор: `.theme-dark`.
- [[atlas/! themes/github-theme|GitHub Theme]]: **All headers are the same color** (`headers-one-color`) — [описание настройки](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L71), [реализация](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L949).
  Селектор: `body.headers-one-color`.
- [[atlas/! themes/cybertron|Cybertron]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L3), [реализация](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L3).
  Селектор: `.theme-dark`.
- [[atlas/! themes/solarized|Solarized]]: правило CSS без отдельного переключателя — [исходник](https://github.com/harmtemolder/obsidian-solarized/blob/11cc702755b912abcedbebb6328a32ffddc03eff/theme.css#L214), [реализация](https://github.com/harmtemolder/obsidian-solarized/blob/11cc702755b912abcedbebb6328a32ffddc03eff/theme.css#L214).
  Селектор: `.theme-dark, .theme-light`.
- [[atlas/! themes/notation|Notation]]: правило CSS без отдельного переключателя — [исходник](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L199), [реализация](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L199).
  Селектор: `.cm-s-obsidian .cm-header-6`.
- [[atlas/! themes/typomagical|Typomagical]]: правило CSS без отдельного переключателя — [исходник](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L534), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L534).
  Селектор: `h1, h1.embedded-note-title, .cm-header.cm-header-1, .inline-title, .cm-s-obsidian .cm-header.cm-header-1, .HyperMD-header-1.HyperMD-header .cm-header-1, .markdown-preview-view h1`.
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L338), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L338).
  Селектор: `h2`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Enable Custom Heading Colors** (`shib-header-color-toggle`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L6798), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1373).
  Селектор: `.shib-header-color-toggle.shib-h1-lily`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H1 color** (`shib-h1-color-custom`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L6857), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1373).
  Селектор: `.shib-header-color-toggle.shib-h1-lily`.
  Варианты: Lily (shib-h1-lily); Red (shib-h1-red); Rose (shib-h1-rose); Violet (shib-h1-violet); Blue (shib-h1-blue); Sea (shib-h1-sea); Cyan (shib-h1-cyan); Turquoise (shib-h1-turquoise); Green (shib-h1-green); Yellow (shib-h1-yellow); Lemon (shib-h1-lemon); Orange (shib-h1-orange)
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H2 color** (`shib-h2-color-custom`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L6955), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1409).
  Селектор: `.shib-header-color-toggle.shib-h2-lily`.
  Варианты: Lily (shib-h2-lily); Red (shib-h2-red); Rose (shib-h2-rose); Violet (shib-h2-violet); Blue (shib-h2-blue); Sea (shib-h2-sea); Cyan (shib-h2-cyan); Turquoise (shib-h2-turquoise); Green (shib-h2-green); Yellow (shib-h2-yellow); Lemon (shib-h2-lemon); Orange (shib-h2-orange)
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H3 color** (`shib-h3-color-custom`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7053), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1445).
  Селектор: `.shib-header-color-toggle.shib-h3-lily`.
  Варианты: Lily (shib-h3-lily); Red (shib-h3-red); Rose (shib-h3-rose); Violet (shib-h3-violet); Blue (shib-h3-blue); Sea (shib-h3-sea); Cyan (shib-h3-cyan); Turquoise (shib-h3-turquoise); Green (shib-h3-green); Yellow (shib-h3-yellow); Lemon (shib-h3-lemon); Orange (shib-h3-orange)
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H4 color** (`shib-h4-color-custom`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7151), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1481).
  Селектор: `.shib-header-color-toggle.shib-h4-lily`.
  Варианты: Lily (shib-h4-lily); Red (shib-h4-red); Rose (shib-h4-rose); Violet (shib-h4-violet); Blue (shib-h4-blue); Sea (shib-h4-sea); Cyan (shib-h4-cyan); Turquoise (shib-h4-turquoise); Green (shib-h4-green); Yellow (shib-h4-yellow); Lemon (shib-h4-lemon); Orange (shib-h4-orange)
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H5 color** (`shib-h5-color-custom`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7249), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1517).
  Селектор: `.shib-header-color-toggle.shib-h5-lily`.
  Варианты: Lily (shib-h5-lily); Red (shib-h5-red); Rose (shib-h5-rose); Violet (shib-h5-violet); Blue (shib-h5-blue); Sea (shib-h5-sea); Cyan (shib-h5-cyan); Turquoise (shib-h5-turquoise); Green (shib-h5-green); Yellow (shib-h5-yellow); Lemon (shib-h5-lemon); Orange (shib-h5-orange)
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H6 color** (`shib-h6-color-custom`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7347), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1553).
  Селектор: `.shib-header-color-toggle.shib-h6-lily`.
  Варианты: Lily (shib-h6-lily); Red (shib-h6-red); Rose (shib-h6-rose); Violet (shib-h6-violet); Blue (shib-h6-blue); Sea (shib-h6-sea); Cyan (shib-h6-cyan); Turquoise (shib-h6-turquoise); Green (shib-h6-green); Yellow (shib-h6-yellow); Lemon (shib-h6-lemon); Orange (shib-h6-orange)
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1436), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1436).
  Селектор: `body.theme-dark.encore-colors-colorful`.
- [[atlas/! themes/pln|PLN]]: **Header color toggle** (`pln-hdcl`) — [описание настройки](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L452), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1036).
  Селектор: `.pln-hdcl`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L342), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L342).
  Селектор: `.theme-dark`.
- [[atlas/! themes/dracula-official|Dracula Official]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L583), [реализация](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L583).
  Селектор: `.markdown-preview-view h1`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3348), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3348).
  Селектор: `.markdown-preview-section h1, .cm-header-1, .markdown-rendered h1, .HyperMD-header.HyperMD-header-1.cm-line, .markdown-preview-section h1 strong, .cm-header-1 .cm-strong, .strong .markdown-rendered h1, .HyperMD-header.HyperMD-header-1.cm-line .cm-strong`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L107), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L107).
  Селектор: `.cm-header-1`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `.theme-dark .markdonw-rendered h1, .theme-dark .markdonw-rendered h2, .theme-dark .markdonw-rendered h3, .theme-dark .markdonw-rendered h4, .theme-dark .markdonw-rendered h5, .theme-dark .markdonw-rendered h6, .theme-dark h1, .theme-dark h2, .theme-dark h3, .theme-dark h4, .theme-dark h5, .theme-dark h6, .theme-light .markdonw-rendered h1, .theme-light .markdonw-rendered h2, .theme-light .markdonw-rendered h3, .theme-light .markdonw-rendered h4, .theme-light .markdonw-rendered h5, .theme-light .markdonw-rendered h6, .theme-light h1, .theme-light h2, .theme-light h3, .theme-light h4, .theme-light h5, .theme-light h6`.
  Условия CSS: `@media print`
- [[atlas/! themes/baseline|Baseline]]: **Heading indicator** (`colorful-headings`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1700), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.colorful-headings-dot .markdown-rendered :is(h1,h2,h3,h4,h5,h6):not(:hover) .heading-collapse-indicator, body.colorful-headings-dot .cm-line.HyperMD-header:not(:hover) .heading-collapse-indicator`.
  Условия CSS: `@media screen,print`
  Варианты: None (colorful-headings-off); Dot (colorful-headings-dot); Indicator (colorful-headings-side)
- [[atlas/! themes/baseline|Baseline]]: **Colored heading text** (`colorful-headings-text`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1706), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.colorful-headings-text .markdown-rendered h1, body.colorful-headings-text .HyperMD-header-1`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/material-gruvbox|Material Gruvbox]]: правило CSS без отдельного переключателя — [исходник](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L431), [реализация](https://github.com/alljavi/material_gruvbox_obsidian/blob/35b5bc1d7f857cecfc87bab4bfe74e3de11f4d11/theme.css#L431).
  Селектор: `.theme-dark`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: **Rainbow Headers** (`rainbow-headers`) — [описание настройки](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L119), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2411).
  Селектор: `em, .cm-s-obsidian .cm-em.cm-header, .cm-s-obsidian .cm-em.cm-header.cm-header-1, .cm-s-obsidian .cm-em.cm-header.cm-header-2, .cm-s-obsidian .cm-em.cm-header.cm-header-3, .cm-s-obsidian .cm-em.cm-header.cm-header-4, .cm-s-obsidian .cm-em.cm-header.cm-header-5, .cm-s-obsidian .cm-em.cm-header.cm-header-6, .rainbow-headers .cm-s-obsidian .cm-em.cm-header.cm-header-1, .rainbow-headers .cm-s-obsidian .cm-em.cm-header.cm-header-2, .rainbow-headers .cm-s-obsidian .cm-em.cm-header.cm-header-3, .rainbow-headers .cm-s-obsidian .cm-em.cm-header.cm-header-4, .rainbow-headers .cm-s-obsidian .cm-em.cm-header.cm-header-5, .rainbow-headers .cm-s-obsidian .cm-em.cm-header.cm-header-6, .markdown-preview-section em, .cm-s-obsidian .cm-em`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: **Change Heading Colors** (`spec-color-head`) — [описание настройки](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L376), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2144).
  Селектор: `.spec-color-head .markdown-preview-section h1`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L342), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L342).
  Селектор: `.theme-dark`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L271), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L271).
  Селектор: `body.theme-dark`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L45), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L45).
  Селектор: `.is-tablet, .is-mobile, body`.
- [[atlas/! themes/maple|Maple]]: **Heading Color Style** (`heading-color-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1082), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5721).
  Селектор: `body.heading-color-base`.
  Проверяемое свойство: `--h1-color`.
  Варианты: Text Color (heading-color-base); Accent Color (heading-color-accent); Colorful (heading-color-colorful)
- [[atlas/! themes/maple|Maple]]: **H1 Block Decoration Use Higher Contrast Color** (`heading-h1-block-contrast`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1142), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6132).
  Селектор: `.heading-h1-block.heading-h1-block-contrast :is(.HyperMD-header-1 .cm-header:not(.cm-formatting-header), .markdown-rendered h1)`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/maple|Maple]]: **H2 Block Decoration Use Higher Contrast Color** (`heading-h2-block-contrast`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1229), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6173).
  Селектор: `.heading-h2-block.heading-h2-block-contrast :is(.HyperMD-header-2 .cm-header:not(.cm-formatting-header), .markdown-rendered h2)`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/maple|Maple]]: **H3 Block Decoration Use Higher Contrast Color** (`heading-h3-block-contrast`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1316), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6214).
  Селектор: `.heading-h3-block.heading-h3-block-contrast :is(.HyperMD-header-3 .cm-header:not(.cm-formatting-header), .markdown-rendered h3)`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/maple|Maple]]: **H4 Block Decoration Use Higher Contrast Color** (`heading-h4-block-contrast`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1403), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6255).
  Селектор: `.heading-h4-block.heading-h4-block-contrast :is(.HyperMD-header-4 .cm-header:not(.cm-formatting-header), .markdown-rendered h4)`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/maple|Maple]]: **H5 Block Decoration Use Higher Contrast Color** (`heading-h5-block-contrast`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1490), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6296).
  Селектор: `.heading-h5-block.heading-h5-block-contrast :is(.HyperMD-header-5 .cm-header:not(.cm-formatting-header), .markdown-rendered h5)`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/maple|Maple]]: **H6 Block Decoration Use Higher Contrast Color** (`heading-h6-block-contrast`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1577), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6337).
  Селектор: `.heading-h6-block.heading-h6-block-contrast :is(.HyperMD-header-6 .cm-header:not(.cm-formatting-header), .markdown-rendered h6)`.
  Проверяемое свойство: `color`.
- [[atlas/! themes/dark-moss|Dark Moss]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sergey900553/obsidian_githublike_theme/blob/70695e748d0da568874be8e922b86aa46ade6e4b/theme.css#L130), [реализация](https://github.com/sergey900553/obsidian_githublike_theme/blob/70695e748d0da568874be8e922b86aa46ade6e4b/theme.css#L130).
  Селектор: `.markdown-preview-view h1`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17292), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17292).
  Селектор: `.ulu-colorfo-headings`.
- [[atlas/! themes/reverie|Reverie]]: правило CSS без отдельного переключателя — [исходник](https://github.com/santiyounger/Reverie-Obsidian-Theme/blob/10104b479d9b81805bff532bc8e668a115fecc94/theme.css#L21), [реализация](https://github.com/santiyounger/Reverie-Obsidian-Theme/blob/10104b479d9b81805bff532bc8e668a115fecc94/theme.css#L21).
  Селектор: `.theme-dark`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L1016), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L1016).
  Селектор: `:root, body`.
- [[atlas/! themes/light-bright|Light & Bright]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L701), [реализация](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L701).
  Селектор: `.theme-default.theme-light, .theme-light`.
- [[atlas/! themes/discordian|Discordian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L768), [реализация](https://github.com/radekkozak/discordian/blob/bcb8cf40681f7a7e14728c4dc472a6edc7431f3b/obsidian.css#L768).
  Селектор: `.markdown-preview-view h1`.
- [[atlas/! themes/notation-2|Notation 2]]: **Text Colors** (`heading-colors`) — [описание настройки](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1776), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L750).
  Селектор: `body:not(.headings-rainbow-text)`.
  Варианты: Default (headings-default-text); Red (headings-red-text); Orange (headings-orange-text); Yellow (headings-yellow-text); Green (headings-green-text); Blue (headings-blue-text); Purple (headings-purple-text); Pink (headings-pink-text); Brown (headings-brown-text); Grey (headings-gray-text); Rainbow (headings-rainbow-text)
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L5555), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L5555).
  Селектор: `.vertical-tab-content h1, .vertical-tab-content h2, .vertical-tab-content h3, .vertical-tab-content h4`.
- [[atlas/! themes/wy-console|WY Console]]: правило CSS без отдельного переключателя — [исходник](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L774), [реализация](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L774).
  Селектор: `.markdown-preview-view h1`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1).
  Селектор: `.theme-light, .theme-dark`.
- [[atlas/! themes/velocity|Velocity]]: правило CSS без отдельного переключателя — [исходник](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `body`.
- [[atlas/! themes/blackbird|Blackbird]]: правило CSS без отдельного переключателя — [исходник](https://github.com/vanadium23/obsidian-blackbird-theme/blob/7619ca5265323b85773be85ceef0601318bb5a2c/obsidian.css#L65), [реализация](https://github.com/vanadium23/obsidian-blackbird-theme/blob/7619ca5265323b85773be85ceef0601318bb5a2c/obsidian.css#L65).
  Селектор: `.cm-s-obsidian .cm-header, h1, h2, h3, h4, h5, h6`.
- [[atlas/! themes/wyrd|Wyrd]]: правило CSS без отдельного переключателя — [исходник](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L339), [реализация](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L339).
  Селектор: `body`.
- [[atlas/! themes/nier|Nier]]: правило CSS без отдельного переключателя — [исходник](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L384), [реализация](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L384).
  Селектор: `.token.selector, .token.tag, .HyperMD-codeblock .cm-tag, .HyperMD-codeblock .cm-property, .HyperMD-codeblock .cm-meta, .HyperMD-codeblock .cm-qualifier, .HyperMD-codeblock .cm-header, .HyperMD-codeblock .cm-quote, .HyperMD-codeblock .cm-hr, .HyperMD-codeblock .cm-link`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L42), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L42).
  Селектор: `:root body:where(.theme-dark, .theme-light)`.
- [[atlas/! themes/aura|Aura]]: **Colored Heading** (`aura-heading-color`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3395), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L771).
  Селектор: `.aura-heading-color`.
- [[atlas/! themes/aura|Aura]]: **H1 color** (`aura-h1-color`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3432), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L789).
  Селектор: `.aura-h1-red`.
  Варианты: Red (aura-h1-red); Orange (aura-h1-orange); Yellow (aura-h1-yellow); Green (aura-h1-green); Cyan (aura-h1-cyan); Blue (aura-h1-blue); Pink (aura-h1-pink); Purple (aura-h1-purple)
- [[atlas/! themes/aura|Aura]]: **H2 color** (`aura-h2-color`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3498), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L821).
  Селектор: `.aura-h2-red`.
  Варианты: Red (aura-h2-red); Orange (aura-h2-orange); Yellow (aura-h2-yellow); Green (aura-h2-green); Cyan (aura-h2-cyan); Blue (aura-h2-blue); Pink (aura-h2-pink); Purple (aura-h2-purple)
- [[atlas/! themes/aura|Aura]]: **H3 color** (`aura-h3-color`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3564), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L853).
  Селектор: `.aura-h3-red`.
  Варианты: Red (aura-h3-red); Orange (aura-h3-orange); Yellow (aura-h3-yellow); Green (aura-h3-green); Cyan (aura-h3-cyan); Blue (aura-h3-blue); Pink (aura-h3-pink); Purple (aura-h3-purple)
- [[atlas/! themes/aura|Aura]]: **H4 color** (`aura-h4-color`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3630), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L885).
  Селектор: `.aura-h4-red`.
  Варианты: Red (aura-h4-red); Orange (aura-h4-orange); Yellow (aura-h4-yellow); Green (aura-h4-green); Cyan (aura-h4-cyan); Blue (aura-h4-blue); Pink (aura-h4-pink); Purple (aura-h4-purple)
- [[atlas/! themes/aura|Aura]]: **H5 color** (`aura-h5-color`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3696), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L917).
  Селектор: `.aura-h5-red`.
  Варианты: Red (aura-h5-red); Orange (aura-h5-orange); Yellow (aura-h5-yellow); Green (aura-h5-green); Cyan (aura-h5-cyan); Blue (aura-h5-blue); Pink (aura-h5-pink); Purple (aura-h5-purple)
- [[atlas/! themes/aura|Aura]]: **H6 color** (`aura-h6-color`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3762), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L949).
  Селектор: `.aura-h6-red`.
  Варианты: Red (aura-h6-red); Orange (aura-h6-orange); Yellow (aura-h6-yellow); Green (aura-h6-green); Cyan (aura-h6-cyan); Blue (aura-h6-blue); Pink (aura-h6-pink); Purple (aura-h6-purple)
- [[atlas/! themes/gitsidian|Gitsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L147), [реализация](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L147).
  Селектор: `.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3, .markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L98), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L98).
  Селектор: `.cm-header.cm-header-4cm-hmd-internal-link`.
- [[atlas/! themes/vauxhall|Vauxhall]]: **Header Color Style** (`header-color-type`) — [описание настройки](https://github.com/cyanvoxel/vauxhall-obsidian/blob/55de6c8b3d1dccda92196522ba7e446ffd5c02d7/theme.css#L51), [реализация](https://github.com/cyanvoxel/vauxhall-obsidian/blob/55de6c8b3d1dccda92196522ba7e446ffd5c02d7/theme.css#L193).
  Селектор: `.theme-dark, .theme-light, .headers-gradient-cyan-to-purple`.
  Варианты: Mono (headers-mono); Mono Gradient (headers-mono-gradient); Rainbow (headers-colorful); Gradient (Mint/Blue) (headers-gradient-mint-to-blue); Gradient (Cyan/Purple) (headers-gradient-cyan-to-purple); Gradient (Blue/Red) (headers-gradient-blue-to-red)
- [[atlas/! themes/vauxhall|Vauxhall]]: **Accent Color Main Header** (`h1-accent`) — [описание настройки](https://github.com/cyanvoxel/vauxhall-obsidian/blob/55de6c8b3d1dccda92196522ba7e446ffd5c02d7/theme.css#L76), [реализация](https://github.com/cyanvoxel/vauxhall-obsidian/blob/55de6c8b3d1dccda92196522ba7e446ffd5c02d7/theme.css#L249).
  Селектор: `.h1-accent`.
- [[atlas/! themes/moonlight|Moonlight]]: правило CSS без отдельного переключателя — [исходник](https://github.com/kartik-karz/moonlight-obsidian/blob/2476123611b1197c8a81149f80d63115f61a22b7/obsidian.css#L92), [реализация](https://github.com/kartik-karz/moonlight-obsidian/blob/2476123611b1197c8a81149f80d63115f61a22b7/obsidian.css#L92).
  Селектор: `span.cm-formatting.cm-formatting-header.cm-formatting-header-1.cm-header.cm-header-1`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L129).
  Селектор: `:is(.markdown-preview-view,.is-live-preview):not(.newspaper,.movie-script,.minimalist,.h1-stroke,.h1-stroke-left-aligned,.h1-normal,.sci-fi) :is(.el-h1>h1,.markdown-preview-view>*>h1,.HyperMD-header-1):not(.callout *,ul *,ol *)`.
  Условия CSS: `@container style(--fas-h1-display: enable) or style(--fas-h1-display-left-aligned: enable)`
- [[atlas/! themes/origami|Origami]]: **rainbow headers** (`o-colorful-headings`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L233), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4917).
  Селектор: `.o-colorful-headings`.
- [[atlas/! themes/vicious|Vicious]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1288), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1288).
  Селектор: `h1, .markdown-rendered h1, .cm-header-1`.
- [[atlas/! themes/transparent|Transparent]]: **Accent Color Everywhere** (`accent-everywhere`) — [описание настройки](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L357), [реализация](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L1732).
  Селектор: `body.accent-everywhere.theme-dark, body.accent-everywhere.theme-light`.
  Проверяемое свойство: `--h1-color`.
- [[atlas/! themes/comfort-color-dark|Comfort color dark]]: правило CSS без отдельного переключателя — [исходник](https://github.com/obsidian-ezs/obsidian-comfort-color-dark/blob/e92afeabb6c5844c0ad772cbba9cb1772f295486/obsidian.css#L269), [реализация](https://github.com/obsidian-ezs/obsidian-comfort-color-dark/blob/e92afeabb6c5844c0ad772cbba9cb1772f295486/obsidian.css#L269).
  Селектор: `.cm-header-1`.
- [[atlas/! themes/material-flat|Material Flat]]: правило CSS без отдельного переключателя — [исходник](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2151), [реализация](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2151).
  Селектор: `.view-content .cm-header-5, .view-content h5`.
- [[atlas/! themes/dawn|Dawn]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1688), [реализация](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1688).
  Селектор: `.markdown-rendered h6, .HyperMD-header-6 .cm-header-6`.
- [[atlas/! themes/nebula|Nebula]]: правило CSS без отдельного переключателя — [исходник](https://github.com/devmandalia/Nebula/blob/8f28486f4b1bd60cdd7e5b82002df8cc2c0b5480/theme.css#L34), [реализация](https://github.com/devmandalia/Nebula/blob/8f28486f4b1bd60cdd7e5b82002df8cc2c0b5480/theme.css#L34).
  Селектор: `.theme-dark`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L1220), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L1220).
  Селектор: `.theme-dark`.
- [[atlas/! themes/pisum|Pisum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L330), [реализация](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L330).
  Селектор: `.cm-header-1, .markdown-preview-view h1`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L3046), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L3046).
  Селектор: `.markdown-preview-view h1 code, .markdown-preview-view h2 code, .markdown-preview-view h3 code, .markdown-preview-view h4 code, .markdown-preview-view h5 code, .markdown-preview-view h6 code`.
- [[atlas/! themes/simple|Simple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L690), [реализация](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L690).
  Селектор: `.cm-contentContainer .cm-content .HyperMD-header.HyperMD-header-1.cm-line, .cm-contentContainer .cm-content .HyperMD-header.HyperMD-header-2.cm-line, .cm-contentContainer .cm-content .HyperMD-header.HyperMD-header-3.cm-line, .cm-contentContainer .cm-content .HyperMD-header.HyperMD-header-4.cm-line, .cm-contentContainer .cm-content .HyperMD-header.HyperMD-header-5.cm-line, .cm-contentContainer .cm-content .HyperMD-header.HyperMD-header-6.cm-line, .markdown-rendered h1, .markdown-rendered h2, .markdown-rendered h3, .markdown-rendered h4, .markdown-rendered h5, .markdown-rendered h6`.
- [[atlas/! themes/soft-paper|Soft Paper]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L329), [реализация](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L329).
  Селектор: `.theme-dark`.
- [[atlas/! themes/kanagawa|Kanagawa]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L584), [реализация](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L584).
  Селектор: `.cm-header-1.cm-link, h1 a`.
- [[atlas/! themes/pine-forest-berry|Pine Forest Berry]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L294), [реализация](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L294).
  Селектор: `.cm-header-1, .markdown-preview-view h1`.
- [[atlas/! themes/sparkling-night|Sparkling Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L47), [реализация](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L47).
  Селектор: `.theme-dark, .theme-light`.
- [[atlas/! themes/material-ocean|Material Ocean]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dragonwocky/obsidian-material-ocean/blob/517c6bf371f066cda66324475fa2aff01c69e68e/theme.css#L36), [реализация](https://github.com/dragonwocky/obsidian-material-ocean/blob/517c6bf371f066cda66324475fa2aff01c69e68e/theme.css#L36).
  Селектор: `body.theme-dark, body.is-mobile.theme-dark`.
- [[atlas/! themes/zen|Zen]]: правило CSS без отдельного переключателя — [исходник](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L251), [реализация](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L251).
  Селектор: `body`.
- [[atlas/! themes/retronotes|RetroNotes]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sr-campelo/retronotes/blob/94c9562fcb93cd34c5ebb0973bdf88cfd48d0732/theme.css#L39), [реализация](https://github.com/sr-campelo/retronotes/blob/94c9562fcb93cd34c5ebb0973bdf88cfd48d0732/theme.css#L39).
  Селектор: `body`.
- [[atlas/! themes/autotape|Autotape]]: правило CSS без отдельного переключателя — [исходник](https://github.com/1612elphi/autotape-theme/blob/d06d439a5df1d665497ddec5eadd61d08fe1f5e7/theme.css#L1), [реализация](https://github.com/1612elphi/autotape-theme/blob/d06d439a5df1d665497ddec5eadd61d08fe1f5e7/theme.css#L1).
  Селектор: `body`.
- [[atlas/! themes/composer|Composer]]: правило CSS без отдельного переключателя — [исходник](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L825), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L825).
  Селектор: `.theme-light`.

```hacksidian-files
heading-e007
```
