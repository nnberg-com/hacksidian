---
tags:
  - hacksidian_technique
  - hacksidian_unordered
title: Линии вложенного плана
category: unordered
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::marker
format: markdown
themes:
  - things
  - blue-topaz
  - shimmering-focus
  - sanctum
  - cupertino
  - ono-sendai
  - pink-topaz
  - dracula-official
  - obuntu
  - baseline
  - yin-and-yang
  - royal-velvet
  - golden-topaz
  - maple
  - ultra-lobster
  - sandstorm
  - underwater
  - typora-vue
  - fancy-a-story
  - origami
  - pisum
  - faded
  - dark-graphite-pie
  - lagom
---

```hacksidian-id
unordered-tree
```

```hacksidian-live
unordered-tree
```

```hacksidian-details
> Зачем
Видимая связь родительской темы и подпунктов.

> Как работает
Вложенные ul получают вертикальную границу; псевдоэлемент li добавляет короткую ветку.
```

```hacksidian-sources
unordered-tree
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/things|Things]]: правило CSS без отдельного переключателя — [исходник](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L553), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L553).
  Селектор: `body.active-line .cm-active:not(.HyperMD-header, .HyperMD-codeblock)::before, body.active-line .cm-active.HyperMD-quote::before`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **List style in reading view** (`list-style-change-options`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2604), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L13555).
  Селектор: `body.list-no-border ul>li:not(.task-list-item)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Варианты: Bracket 1 (list-bracket-style); Bracket 2 (1.1.1) (list-bracket-style-two); Bracket 3 (list-bracket-style-three); Vertical line 1 (1.1.1) (list-vertical-line-one); Using Ob Settings (list-no-border)
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `body:not(.no-active-line-highlight,.active-line-background) .cm-active:not(.HyperMD-quote,.HyperMD-header,.HyperMD-codeblock):before`.
- [[atlas/! themes/sanctum|Sanctum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1424), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L1424).
  Селектор: `.alternate-marker-odd-6 ul > li .list-bullet:after, .alternate-marker-odd-6 ol > li > ul > li .list-bullet:after, .alternate-marker-odd-6 ul > li > ul > li > ul > li .list-bullet:after, .alternate-marker-odd-6 ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet:after, .alternate-marker-odd-6 ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet:after, .alternate-marker-odd-6 ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet:after, .alternate-marker-even-6 ul > li > ul > li .list-bullet::after, .alternate-marker-even-6 ol > li > ul > li > ul > li .list-bullet::after, .alternate-marker-even-6 ul > li > ul > li > ul > li > ul > li .list-bullet::after, .alternate-marker-even-6 ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet::after, .alternate-marker-even-6 ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet::after, .alternate-marker-even-6 ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li > ul > li .list-bullet::after`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `body:not(.active-line-off) .view-content>.markdown-source-view .cm-line.cm-active:not(:has(.cm-fold-indicator):hover)::before`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L210), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L210).
  Селектор: `.cm-hmd-list-indent .cm-tab::before, ul ul::before`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1546), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1546).
  Селектор: `.cm-hmd-list-indent .cm-tab::before`.
- [[atlas/! themes/dracula-official|Dracula Official]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L808), [реализация](https://github.com/dracula/obsidian/blob/ddb95ec25babe3ef21907b8b612bbdb9fc2904c9/theme.css#L808).
  Селектор: `.cm-hmd-list-indent .cm-tab::before, ul ul::before`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L399), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L399).
  Селектор: `.cm-hmd-list-indent .cm-tab::before, ul ul::before`.
- [[atlas/! themes/baseline|Baseline]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.active-line-side .view-content>.markdown-source-view .cm-line.cm-active:not(:has(.cm-fold-indicator):hover)::before`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L1267), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L1267).
  Селектор: `ul > li::before, ol > li::before`.
  Условия CSS: `@media print`
- [[atlas/! themes/royal-velvet|Royal Velvet]]: правило CSS без отдельного переключателя — [исходник](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L739), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L739).
  Селектор: `.markdown-source-view.mod-cm6.is-live-preview .HyperMD-quote:before, .markdown-source-view.mod-cm6 .cm-blockquote-border:before`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1546), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1546).
  Селектор: `.cm-hmd-list-indent .cm-tab::before`.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5026), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5026).
  Селектор: `.list-enable.list-bullet-thread-style .HyperMD-list-line-2:not(:has(~ .HyperMD-list-line-2 ~ .HyperMD-list-line.cm-active)):not(.HyperMD-task-line):not(:has(.cm-formatting-list-ol)):is(.cm-active, :has(~ :is(.HyperMD-list-line-3, .HyperMD-list-line-4, .HyperMD-list-line-5, .HyperMD-list-line-6, .HyperMD-list-line-7, .HyperMD-list-line-8).cm-active)) > .cm-hmd-list-indent::after`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Indent Guide — Dashed** (`ulu-indent-dashed`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L981), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L9323).
  Селектор: `body.ulu-indent-dashed .markdown-preview-view ul li:has(> ul)::before`.
  Проверяемое свойство: `background-image`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L9191), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L9191).
  Селектор: `.markdown-rendered.show-indentation-guide li>ul::before, .markdown-rendered.show-indentation-guide li>ol::before`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L983), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L983).
  Селектор: `.markdown-rendered.show-indentation-guide li > ul::before, .markdown-rendered.show-indentation-guide li > ol::before, .markdown-source-view.mod-cm6 .cm-indent::before`.
- [[atlas/! themes/typora-vue|Typora-Vue]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L55), [реализация](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L55).
  Селектор: `.markdown-source-view.mod-cm6.is-live-preview .HyperMD-quote:before`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L251), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L251).
  Селектор: `.markdown-rendered li:hover>*>li:not(li:hover~li):not(:hover):before`.
  Условия CSS: `@container style(--fas-list-style: bullet-threading)`
- [[atlas/! themes/origami|Origami]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4365), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4365).
  Селектор: `.markdown-source-view.mod-cm6.is-live-preview .HyperMD-quote:before, .markdown-source-view.mod-cm6 .cm-blockquote-border:before`.
- [[atlas/! themes/pisum|Pisum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L978), [реализация](https://github.com/guangluwu/obsidian-pisum/blob/85b354088b0ab658b9b342bab9ee9e4a44f4e617/obsidian.css#L978).
  Селектор: `.cm-hmd-list-indent .cm-tab::before`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1922), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1922).
  Селектор: `.markdown-source-view.mod-cm6.is-live-preview .HyperMD-quote:before`.
- [[atlas/! themes/dark-graphite-pie|Dark Graphite Pie]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ryjjin/Obsidian-Dark-Graphite-Pie-theme/blob/64dfa78349d4d3d698b18fe5459761bc1aac31f5/theme.css#L453), [реализация](https://github.com/ryjjin/Obsidian-Dark-Graphite-Pie-theme/blob/64dfa78349d4d3d698b18fe5459761bc1aac31f5/theme.css#L453).
  Селектор: `.cm-hmd-list-indent .cm-tab::before, ul ul::before`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L499), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L499).
  Селектор: `.cm-hmd-list-indent .cm-tab::before, ul ul::before`.

```hacksidian-files
unordered-tree
```
