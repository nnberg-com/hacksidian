---
tags:
  - hacksidian_technique
  - hacksidian_quote
title: Классическая цитата с линией
category: quote
sources:
  - https://spec.commonmark.org/0.31.2/#block-quotes
format: markdown
themes:
  - blue-topaz
  - obsidianite
  - sanctum
  - notation
  - ono-sendai
  - shiba-inu
  - obuntu
  - ukiyo
  - royal-velvet
  - obsidianotion
  - ultra-lobster
  - obsidiania
  - typora-vue
  - wyrd
  - gitsidian
  - dawn
  - faded
  - dark-graphite-pie
  - lagom
---

```hacksidian-id
quote-line
```

```hacksidian-live
quote-line
```

```hacksidian-details
> Зачем
Цитирование источника внутри авторского текста.

> Как работает
blockquote получает логическую левую границу и внутренний отступ.
```

```hacksidian-sources
quote-line
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12713), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12713).
  Селектор: `:is(.markdown-preview-view,.markdown-rendered) blockquote`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L1003), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L1003).
  Селектор: `.markdown-source-view.mod-cm6.is-live-preview .HyperMD-quote, .markdown-preview-view blockquote`.
- [[atlas/! themes/sanctum|Sanctum]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L515), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L515).
  Селектор: `.markdown-rendered blockquote`.
- [[atlas/! themes/notation|Notation]]: правило CSS без отдельного переключателя — [исходник](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L396), [реализация](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L396).
  Селектор: `.markdown-preview-view blockquote, .cm-s-obsidian pre.HyperMD-quote-1`.
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L1199), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L1199).
  Селектор: `.markdown-preview-view blockquote`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1236), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1236).
  Селектор: `:is(.markdown-preview-view, .markdown-rendered) blockquote`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L1138), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L1138).
  Селектор: `.markdown-preview-view blockquote`.
- [[atlas/! themes/ukiyo|Ukiyo]]: правило CSS без отдельного переключателя — [исходник](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394), [реализация](https://github.com/technerium/obsidian-ukiyo/blob/e3115884c6fd30cff56381aee9eccffa1504b2e7/theme.css#L394).
  Селектор: `.theme-dark .markdown-preview-view blockquote, .theme-light .markdown-preview-view blockquote`.
  Условия CSS: `@media print`
- [[atlas/! themes/royal-velvet|Royal Velvet]]: правило CSS без отдельного переключателя — [исходник](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L739), [реализация](https://github.com/caro401/royal-velvet/blob/1c4f985cda861771a31f8c22c1d575deea32643a/theme.css#L739).
  Селектор: `.markdown-source-view.mod-cm6.is-live-preview .HyperMD-quote:before, .markdown-source-view.mod-cm6 .cm-blockquote-border:before`.
- [[atlas/! themes/obsidianotion|Obsidianotion]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L262), [реализация](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L262).
  Селектор: `blockquote`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21781), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L21781).
  Селектор: `.markdown-preview-view blockquote`.
  Условия CSS: `@media print`
- [[atlas/! themes/obsidiania|obsidian_ia]]: правило CSS без отдельного переключателя — [исходник](https://github.com/rcvd/obsidian_ia/blob/37b78a79e78a2300a8bbc190e942f4aa2612587f/obsidian.css#L368), [реализация](https://github.com/rcvd/obsidian_ia/blob/37b78a79e78a2300a8bbc190e942f4aa2612587f/obsidian.css#L368).
  Селектор: `.markdown-preview-view blockquote`.
- [[atlas/! themes/typora-vue|Typora-Vue]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L49), [реализация](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L49).
  Селектор: `.markdown-rendered blockquote`.
- [[atlas/! themes/wyrd|Wyrd]]: правило CSS без отдельного переключателя — [исходник](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L253), [реализация](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L253).
  Селектор: `.markdown-rendered blockquote`.
- [[atlas/! themes/gitsidian|Gitsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L341), [реализация](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L341).
  Селектор: `.markdown-preview-view blockquote`.
- [[atlas/! themes/dawn|Dawn]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1336), [реализация](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1336).
  Селектор: `.callout-title-inner > blockquote`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1928), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1928).
  Селектор: `.markdown-source-view.mod-cm6 .cm-blockquote-border:before`.
- [[atlas/! themes/dark-graphite-pie|Dark Graphite Pie]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ryjjin/Obsidian-Dark-Graphite-Pie-theme/blob/64dfa78349d4d3d698b18fe5459761bc1aac31f5/theme.css#L530), [реализация](https://github.com/ryjjin/Obsidian-Dark-Graphite-Pie-theme/blob/64dfa78349d4d3d698b18fe5459761bc1aac31f5/theme.css#L530).
  Селектор: `blockquote`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L454), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L454).
  Селектор: `.markdown-rendered blockquote, .blockquote-normal`.

```hacksidian-files
quote-line
```
