---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Собственный цвет выделения мышью
category: note
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::before
format: markdown
themes:
  - anuppuccin
  - blue-topaz
  - obsidianite
  - wasp
  - its-theme
  - primary
  - shimmering-focus
  - willemstad
  - border
  - dracula-for-obsidian
  - ono-sendai
  - pink-topaz
  - obuntu
  - golden-topaz
  - maple
  - sodalite
  - ultra-lobster
  - sandstorm
  - dracula-lyt
  - moonlight
  - pisum
  - kanagawa
  - pine-forest-berry
---

```hacksidian-id
note-selection
```

```hacksidian-live
note-selection
```

```hacksidian-details
> Зачем
Поддерживает палитру заметки во время чтения и копирования.

> Как работает
::selection задаёт фон и цвет выделенного пользователем текста.

> Ограничения
Никакого изменения содержимого; эффект виден только при выделении.
```

```hacksidian-sources
note-selection
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/anuppuccin|AnuPpuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L3716), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L3716).
  Селектор: `.textLayer ::selection`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle selection background (Non-text part)** (`remove-selectionbackground`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L958), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L27689).
  Селектор: `body:not(.remove-selectionbackground) .markdown-source-view.mod-cm6 .cm-editor .cm-selectionBackground`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L1213), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L1213).
  Селектор: `pre[class*='language-']::selection, pre[class*='language-'] ::selection, code[class*='language-']::selection, code[class*='language-'] ::selection`.
- [[atlas/! themes/wasp|Wasp]]: правило CSS без отдельного переключателя — [исходник](https://github.com/santiyounger/Wasp-Obsidian-Theme/blob/6c3bf9b9def7bac55d87c6b966f203077bed1b12/theme.css#L218), [реализация](https://github.com/santiyounger/Wasp-Obsidian-Theme/blob/6c3bf9b9def7bac55d87c6b966f203077bed1b12/theme.css#L218).
  Селектор: `.theme-dark ::selection, .theme-dark .markdown-preview-view ::selection, .theme-dark .markdown-rendered ::selection, .theme-dark .markdown-source-view.mod-cm6 .cm-editor .cm-line ::selection, .theme-dark .cm-editor .cm-line ::selection`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11369), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11369).
  Селектор: `.textLayer ::selection, .xfaLayer .highlight`.
- [[atlas/! themes/primary|Primary]]: правило CSS без отдельного переключателя — [исходник](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `::selection`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `.colorscheme-everforest.theme-light ::selection`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L22125), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L22125).
  Селектор: `.pdf-container .textLayer ::selection, .markdown-source-view.mod-cm6 .pdf-container .textLayer ::selection`.
- [[atlas/! themes/border|Border]]: правило CSS без отдельного переключателя — [исходник](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8584), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8584).
  Селектор: `.css-settings-manager:not(.codeblock-style-customize) .cm-s-obsidian .HyperMD-codeblock ::selection, .css-settings-manager:not(.codeblock-style-customize) .markdown-rendered pre ::selection, .css-settings-manager:not(.codeblock-style-customize) .markdown-source-view.mod-cm6 .code-block-flair:hover, .css-settings-manager:not(.codeblock-style-customize) .markdown-rendered button.copy-code-button:hover`.
- [[atlas/! themes/dracula-for-obsidian|Dracula for Obsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L216), [реализация](https://github.com/jarodise/Dracula-for-Obsidian.md/blob/947258eb9dc3ebb31e8724280d75925c6b2b6c11/obsidian.css#L216).
  Селектор: `::selection`.
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L1499), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L1499).
  Селектор: `.workspace-leaf.mod-active .view-header-title::selection`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L958), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L958).
  Селектор: `.workspace-leaf.mod-active .view-header-title::selection`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L276), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L276).
  Селектор: `.theme-light .markdown-preview-view code::selection, .theme-light .markdown-preview-view code > *::selection, .theme-light .markdown-preview-view pre::selection, .theme-light .markdown-preview-view pre > *::selection, .theme-dark .markdown-preview-view code::selection, .theme-dark .markdown-preview-view code > *::selection, .theme-dark .markdown-preview-view pre::selection, .theme-dark .markdown-preview-view pre > *::selection, *::selection`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L958), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L958).
  Селектор: `.workspace-leaf.mod-active .view-header-title::selection`.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6142), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6142).
  Селектор: `.heading-h1-block :is(.HyperMD-header-1 .cm-header:not(.cm-formatting-header), .markdown-rendered h1)::selection`.
- [[atlas/! themes/sodalite|Sodalite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tomzorz/Sodalite/blob/a995d82ca00ac9c63f5be00a2fc05ebbd238bff0/theme.css#L648), [реализация](https://github.com/tomzorz/Sodalite/blob/a995d82ca00ac9c63f5be00a2fc05ebbd238bff0/theme.css#L648).
  Селектор: `::selection, .CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection, .CodeMirror-selected, .CodeMirror-focused .CodeMirror-selected`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L9351), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L9351).
  Селектор: `::selection`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L1031), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L1031).
  Селектор: `.textLayer ::selection`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L319), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L319).
  Селектор: `code[class*="language-"]::selection, code[class*="language-"] ::selection, pre[class*="language-"]::selection, pre[class*="language-"] ::selection`.
- [[atlas/! themes/moonlight|Moonlight]]: правило CSS без отдельного переключателя — [исходник](https://github.com/kartik-karz/moonlight-obsidian/blob/2476123611b1197c8a81149f80d63115f61a22b7/obsidian.css#L73), [реализация](https://github.com/kartik-karz/moonlight-obsidian/blob/2476123611b1197c8a81149f80d63115f61a22b7/obsidian.css#L73).
  Селектор: `::selection`.
- [[atlas/! themes/pisum|Pisum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L237), [реализация](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L237).
  Селектор: `::selection`.
- [[atlas/! themes/kanagawa|Kanagawa]]: правило CSS без отдельного переключателя — [исходник](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L728), [реализация](https://github.com/sspaeti/obsidian_kanagawa/blob/4594f5d39e70ffffe04d6982af2eb57057dbe485/theme.css#L728).
  Селектор: `::selection`.
- [[atlas/! themes/pine-forest-berry|Pine Forest Berry]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L200), [реализация](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L200).
  Селектор: `::selection`.

```hacksidian-files
note-selection
```
