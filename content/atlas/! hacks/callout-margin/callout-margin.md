---
tags:
  - hacksidian_technique
  - hacksidian_composition
title: Заметка на полях
category: composition
sources:
  - https://github.com/efemkay/obsidian-modular-css-layout#float-callout
format: markdown
themes:
  - blue-topaz
  - its-theme
  - willemstad
  - sanctum
  - cyber-glow
  - ultra-lobster
  - dune
  - wikipedia
  - fancy-a-story
  - origami
  - ebullientworks
  - faded
favourite: false
---

```hacksidian-id
callout-margin
```

```hacksidian-live
callout-margin
```

```hacksidian-details
> Зачем
Дать локальное пояснение, сохранив непрерывность основного рассказа.

> Как работает
Callout плавает справа через float. Следующие абзацы обтекают его. При недостатке ширины CSS возвращает блок в обычный поток.

> Ограничения
Для эффекта нужны соседние абзацы и общий контейнер. В Obsidian разные режимы просмотра могут по-разному ограничивать обтекание.
```

```hacksidian-sources
callout-margin
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L26372), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L26372).
  Селектор: `.callout.callout[data-callout*=cards] table.dataview thead`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L9140), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L9140).
  Селектор: `:not(.is-live-preview) .callout.callout:is([data-callout-metadata~="p+r"], [data-callout-metadata~=right])`.
- [[atlas/! themes/willemstad|Willemstad]]: **Float Aside Callouts Left** (`ssopt-callout-aside-float-left`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L50224), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L30254).
  Селектор: `body.ssopt-callout-aside-float-left`.
- [[atlas/! themes/sanctum|Sanctum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2657), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2657).
  Селектор: `.callout[data-callout~=aside]`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2203), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2203).
  Селектор: `.callout.callout[data-callout~=infobox]`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L14156), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L14156).
  Селектор: `.callout[data-callout="aside"]`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4746), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4746).
  Селектор: `.callout:is([data-callout-metadata~="r"], [data-callout-metadata~="rh"], [data-callout-metadata~="rv"])`.
- [[atlas/! themes/wikipedia|Wikipedia]]: **Don't Render Info Callout as an Infobox** (`info-normal`) — [описание настройки](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L1063), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L330).
  Селектор: `body:not(.info-normal) .callout[data-callout="info"]:not([data-callout-metadata~="normal"]), .callout[data-callout-metadata~="info"]`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Use > [!infobox]** (`fas-callout-infobox`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1120), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L72).
  Селектор: `.fas-callout-infobox`.
  Проверяемое свойство: `--fas-callout-infobox`.
  Применение: Infobox — боковой блок, не отдельный data-heading с портретом.
- [[atlas/! themes/origami|Origami]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5343), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5343).
  Селектор: `.callout[data-callout~=aside]`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2372), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L2372).
  Селектор: `.callout[data-callout=toc], .callout[data-callout-metadata=right]`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L4718), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L4718).
  Селектор: `[data-callout-metadata*="float-right"].cm-embed-block.cm-callout, .markdown-reading-view div[data-callout-metadata*="right"].callout`.
  Условия CSS: `@media (min-width: 500px)`

```hacksidian-files
callout-margin
```
