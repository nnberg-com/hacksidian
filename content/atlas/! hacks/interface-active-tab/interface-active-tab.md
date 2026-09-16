---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Выразительная активная вкладка
category: interface
sources:
  - https://docs.obsidian.md/Reference/CSS%20variables/Components/Tabs
format: html
themes:
  - prism
  - minimal
  - anuppuccin
  - blue-topaz
  - obsidianite
  - primary
  - catppuccin
  - willemstad
  - border
  - sanctum
  - cupertino
  - ono-sendai
  - shiba-inu
  - encore
  - cyber-glow
  - baseline
  - yin-and-yang
  - lyt-mode
  - retroma
  - maple
  - sodalite
  - ultra-lobster
  - dune
  - notation-2
  - kakano
  - sandstorm
  - underwater
  - velocity
  - aura
  - fancy-a-story
  - origami
  - nebula
  - ebullientworks
  - faded
  - simple
  - soft-paper
  - bolt
  - pine-forest-berry
  - zen
  - composer
  - its-theme
---

```hacksidian-id
interface-active-tab
```

```hacksidian-details
> Зачем
Быстро отличать текущую вкладку от соседних без смены всей темы.

> Как работает
Документированные переменные вкладок задаются на группе, содержащей оформленную заметку.

> Ограничения
Настройка касается всей группы вкладок, пока в ней присутствует оформленная заметка. Тема может переопределить переменные.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-active-tab
```

###### CSS для Obsidian

```css
.workspace-tabs:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) {--tab-background-active:var(--background-primary);--tab-text-color-focused-active:var(--text-accent);--tab-text-color-focused-active-current:var(--text-accent);--tab-font-weight:600}
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Sidebar tab style** (`sidebar-tabs-style`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7942), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3802).
  Селектор: `body:not(.sidebar-tabs-underline):not(.sidebar-tabs-index):not(.sidebar-tabs-square) .workspace > .workspace-split:not(.mod-root) .workspace-tabs:not(.mod-top) .workspace-tab-header-container`.
  Варианты: Index round (sidebar-tabs-index); Index square (sidebar-tabs-square); Modern compact (sidebar-tabs-default); Modern wide (sidebar-tabs-wide); Square (sidebar-tabs-plain-square); Underline (sidebar-tabs-underline)
- [[atlas/! themes/minimal|Minimal]]: **Tab style** (`tabs-style`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8167), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3749).
  Селектор: `.tabs-plain-square .mod-root`.
  Варианты: Index round (tabs-default); Index square (tabs-square); Modern (tabs-modern); Square (tabs-plain-square); Underline (tabs-underline)
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Tab style** (`anp-alt-tab-style`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L2462), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L4021).
  Селектор: `.anp-safari-tab-toggle .workspace-split.mod-vertical.mod-root`.
  Проверяемое свойство: `--tab-background-active`.
  Варианты: Default (anp-default-tab); Depth (anp-depth-tab-toggle); Minimalistic (anp-mini-tab-toggle); Safari-style (Animated) (anp-alternate-tab-toggle); Safari-style (Vanilla) (anp-safari-tab-toggle)
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Tab style** (`tab-head-style`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3968), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10218).
  Селектор: `body.default-tab.color-scheme-options-simplicity-topaz:not(.background-settings-workplace-background-image,.background-image-settings-switch.background-image-settings-markdown-page-transparent) .workspace-split.mod-root .workspace-tab-header.is-active`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `--tab-background-active`.
  Варианты: Default (default-tab); Underline (underline-tab-style); Safari-style (safari-tab-style); Transparent-style (transparent-tab-style)
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L293), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L293).
  Селектор: `.is-focused .mod-active .workspace-tab-header.is-active .workspace-tab-header-inner-icon, .is-focused .mod-active .workspace-tab-header.is-active .workspace-tab-header-inner-title`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Titlebar Bubbles** (`titlebar-bubbles`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L260), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11896).
  Селектор: `.titlebar-bubbles.titlebar-bubbles.titlebar-bubbles`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Sidebar Tabs Styling** (`ITS-Sidebar-Styling`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L289), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12250).
  Селектор: `.sidebar-tabs-wide :is(.mod-left-split, .mod-right-split) .workspace-tab-header-container`.
  Варианты: Wide (sidebar-tabs-wide); Underline (sidebar-tabs-underline); Overline (sidebar-tabs-overline); Tabular (sidebar-tabs-tabular)
- [[atlas/! themes/primary|Primary]]: правило CSS без отдельного переключателя — [исходник](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `.mod-left-split .workspace-tab-header.is-active, .mod-right-split .workspace-tab-header.is-active`.
- [[atlas/! themes/catppuccin|Catppuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L2109), [реализация](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L2109).
  Селектор: `.clickable-icon.is-active, .mod-left-split .workspace-tab-header.has-active-menu, .mod-right-split .workspace-tab-header.has-active-menu, .mod-left-split .workspace-tab-header.is-active, .mod-right-split .workspace-tab-header.is-active`.
- [[atlas/! themes/willemstad|Willemstad]]: **Tab Style** (`workspace-tabs-style-select`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L47144), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L22751).
  Селектор: `body:not(.ssopt-tabs-index-old) .workspace-fake-target-overlay:not(.is-in-sidebar) .workspace-tab-header.is-active::before, body:not(.ssopt-tabs-index-old) .workspace-fake-target-overlay:not(.is-in-sidebar) .workspace-tab-header.is-active::after, body:not(.ssopt-tabs-index-old) .workspace-split.mod-root .workspace-tab-header.is-active::before, body:not(.ssopt-tabs-index-old) .workspace-split.mod-root .workspace-tab-header.is-active::after`.
  Проверяемое свойство: `box-shadow`.
  Варианты: Modern (Default) (default); Square (ssopt-tabs-square); Underline (ssopt-tabs-underline); Box Index (ssopt-tabs-index-box); Classic Index (ssopt-tabs-index-old)
- [[atlas/! themes/prism|Prism]]: **Fade Inactive Tabs** (`pt-fade-inactive-tabs`) — [описание настройки](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11707), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L1227).
  Селектор: `.pt-fade-inactive-tabs :not(.mod-active) .workspace-tab-header.is-active:not(.mod-active)`.
- [[atlas/! themes/border|Border]]: правило CSS без отдельного переключателя — [исходник](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L5162), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L5162).
  Селектор: `body:not(.is-mobile) .workspace-tabs:not(.mod-stacked) .workspace-tab-header.is-active .workspace-tab-header-inner`.
- [[atlas/! themes/sanctum|Sanctum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1698), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1698).
  Селектор: `.mod-left-split .workspace-tab-header-container-inner .workspace-tab-header.is-active:hover, .mod-right-split .workspace-tab-header-container-inner .workspace-tab-header.is-active:hover`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L1), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L1).
  Селектор: `.workspace .mod-sidedock .workspace-tab-header.is-active`.
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L517), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L517).
  Селектор: `.workspace-tab-header.is-active`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Tab style** (`shiba-alt-tab-style`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7617), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L2587).
  Селектор: `.shib-solid-tab-toggle .workspace-split:not(.mod-left-split):not(.mod-right-split) .workspace-tab-header-container-inner .workspace-tab-header, button:not(.clickable-icon)`.
  Варианты: Default (shib-default-tab); Solid (shib-solid-tab-toggle); Floating 1 (shib-floating-tab-toggle); Floating 2 (shib-floating-animated-tab-toggle)
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L589), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L589).
  Селектор: `.mod-root .workspace-tab-header.is-active .workspace-tab-header-inner`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: **Enable Active Header Styling** (`CG-active-header`) — [описание настройки](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L147), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L1967).
  Селектор: `.workspace-tab-header.is-active.mod-active, .workspace-tab-header.tappable.is-active.mod-active, body:not(.CG-active-header) .workspace-tabs:not(.mod-stacked) .workspace-tab-header.is-active.mod-active`.
  Проверяемое свойство: `background`.
- [[atlas/! themes/baseline|Baseline]]: **Editor tab style** (`tab-style`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L881), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1).
  Селектор: `body.tab-default:is(.layout-cupertino,.layout-macos,.layout-classic,.layout-minimal,.layout-frame,.layout-viewfinder) .mod-root .workspace-tab-header, body.tab-default.layout-fusion .workspace:not(.is-left-sidedock-open):not(.is-right-sidedock-open) .mod-root .workspace-tab-header`.
  Варианты: Obsidian (tab-default); Floating (tab-floating); Floating (Center) (tab-floating-center); Underline (tab-underline); Underline (Accented) (tab-underline-accented)
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4818), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4818).
  Селектор: `.workspace-tab-header.is-active`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L885), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L885).
  Селектор: `.theme-dark .mod-left-split .workspace-tab-header.is-active, .theme-dark .mod-right-split .workspace-tab-header.is-active, .theme-dark .mod-left-split .workspace-tab-header.is-active:hover, .theme-dark .mod-right-split .workspace-tab-header.is-active:hover`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L1664), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L1664).
  Селектор: `:is(button:not(.excalidraw button, .mod-warning, .mod-cta, .pcr-app button, .cm-panel button, button.cp_format, .draw-in-canvas-color-palette button), .mobile-toolbar-option, .tappable:not(.mod-root .workspace-tab-header, .tree-item-self, .search-result-file-match, .empty-state-action, .mod-navigable, hr, .mobile-navbar-action.has-longpress-menu, .setting-item), .clickable-icon, .text-icon-button, .is-mobile .workspace-drawer-tab-select .workspace-tab-header-inner, .mobile-tab .mobile-tab-pin, .mobile-tab .close-button, .metadata-add-button, .canvas-control-item, .mod-root .workspace-tab-header-inner:not(.mod-root .workspace-tab-header.is-active .workspace-tab-header-inner)), .setting-group-filter, ::-webkit-scrollbar-thumb, .style-manager-tab-actions .style-manager-icon-button, .style-manager-theme-trigger, .style-manager-isolate-badge`.
- [[atlas/! themes/maple|Maple]]: **Enable Floating Style Tab Bar** (`tab-float`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L526), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L7699).
  Селектор: `body:is(:not(.css-settings-manager), .tab-float).theme-light`.
  Проверяемое свойство: `--tab-active-shadow`.
- [[atlas/! themes/sodalite|Sodalite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tomzorz/Sodalite/blob/a995d82ca00ac9c63f5be00a2fc05ebbd238bff0/theme.css#L299), [реализация](https://github.com/tomzorz/Sodalite/blob/a995d82ca00ac9c63f5be00a2fc05ebbd238bff0/theme.css#L299).
  Селектор: `.workspace-tab-header.is-active`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Flat Active Tab Style** (`ulu-tab-flat`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L387), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7590).
  Селектор: `body.theme-dark.ulu-tab-flat .workspace-split.mod-root .workspace-tab-header.is-active`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L2269), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L2269).
  Селектор: `.theme-dark .mod-left-split :is(.workspace-tab-header.has-active-menu:hover, .workspace-tab-header.is-active:hover), .theme-dark .mod-right-split :is(.workspace-tab-header.has-active-menu:hover, .workspace-tab-header.is-active:hover), .theme-dark .mod-left-split :is(.workspace-tab-header.has-active-menu, .workspace-tab-header.is-active), .theme-dark .mod-right-split :is(.workspace-tab-header.has-active-menu, .workspace-tab-header.is-active)`.
- [[atlas/! themes/notation-2|Notation 2]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L239), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L239).
  Селектор: `.workspace-tab-header.is-active.mod-active`.
- [[atlas/! themes/kakano|Kakano]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L3651), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L3651).
  Селектор: `.workspace-split.mod-root .workspace-tab-header-container .workspace-tab-header.is-active::before, .workspace-split.mod-root .workspace-tab-header-container .workspace-tab-header.is-active::after`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L7470), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L7470).
  Селектор: `.workspace-tab-header-container .workspace-tab-header.is-active`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L925), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L925).
  Селектор: `.mod-left-split .workspace-tab-header-container .workspace-tab-header.is-active, .mod-right-split .workspace-tab-header-container .workspace-tab-header.is-active`.
- [[atlas/! themes/velocity|Velocity]]: правило CSS без отдельного переключателя — [исходник](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `body:not(.is-phone) .mod-root .workspace-tabs:not(.mod-stacked) .workspace-tab-header.is-active`.
- [[atlas/! themes/aura|Aura]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L2187), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L2187).
  Селектор: `.aura-origin-layout:not(.aura-colorful-frame) .mod-left-split .workspace-tab-header.is-active`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L202), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L202).
  Селектор: `.workspace-tab-header+.workspace-tab-header.is-active:before`.
  Условия CSS: `@scope (.mod-root .workspace-tabs:not(.mod-stacked))`
- [[atlas/! themes/origami|Origami]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L3114), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L3114).
  Селектор: `.workspace .mod-root .workspace-tab-header:hover, .mod-left-split .workspace-tab-header.is-active:hover, .mod-right-split .workspace-tab-header.is-active:hover`.
- [[atlas/! themes/nebula|Nebula]]: правило CSS без отдельного переключателя — [исходник](https://github.com/devmandalia/Nebula/blob/8f28486f4b1bd60cdd7e5b82002df8cc2c0b5480/theme.css#L217), [реализация](https://github.com/devmandalia/Nebula/blob/8f28486f4b1bd60cdd7e5b82002df8cc2c0b5480/theme.css#L217).
  Селектор: `.nav-file-title.is-active, .workspace-tab-header.is-active`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L819), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L819).
  Селектор: `:not(.is-focused) .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header.is-active`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L4184), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L4184).
  Селектор: `.mod-active .workspace-tab-header.is-active`.
- [[atlas/! themes/simple|Simple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L405), [реализация](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L405).
  Селектор: `body.eis-sidebar-dark:not(body.theme-dark) .nav-file-title.is-active, body.eis-sidebar-dark:not(body.theme-dark) .mod-left-split .workspace-tab-header.is-active, body.eis-sidebar-dark:not(body.theme-dark) .is-active .workspace-tab-header-inner-icon svg, body.eis-sidebar-dark:not(body.theme-dark):not(.is-grabbing) .tree-item-self.is-clickable:hover`.
- [[atlas/! themes/soft-paper|Soft Paper]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L844), [реализация](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L844).
  Селектор: `.workspace-split.mod-vertical.mod-root .workspace-tabs .workspace-tab-header-container .workspace-tab-header-container-inner .workspace-tab-header.is-active`.
- [[atlas/! themes/bolt|Bolt]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/Obsidian-Bolt/blob/b6aab9a2d2eaf3f2f0213e0708aaa577e6bc2073/theme.css#L612), [реализация](https://github.com/bluemoondragon07/Obsidian-Bolt/blob/b6aab9a2d2eaf3f2f0213e0708aaa577e6bc2073/theme.css#L612).
  Селектор: `.workspace-tab-header.is-active`.
- [[atlas/! themes/pine-forest-berry|Pine Forest Berry]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L437), [реализация](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L437).
  Селектор: `.workspace-tab-header.is-active`.
- [[atlas/! themes/zen|Zen]]: правило CSS без отдельного переключателя — [исходник](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L3295), [реализация](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L3295).
  Селектор: `:not(.is-mobile) .workspace-tab-header-container .workspace-tab-header.is-active:hover`.
- [[atlas/! themes/composer|Composer]]: правило CSS без отдельного переключателя — [исходник](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L2258), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L2258).
  Селектор: `.workspace-tab-header.is-active:hover`.

```hacksidian-files
interface-active-tab
```
