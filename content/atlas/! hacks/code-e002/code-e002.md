---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Контур без заливки
category: code
sources: []
format: markdown
themes:
  - things
  - blue-topaz
  - prism
  - border
  - sanctum
  - cupertino
  - pink-topaz
  - cyber-glow
  - baseline
  - yin-and-yang
  - red-graphite
  - golden-topaz
  - obsidianotion
  - lyt-mode
  - retroma
  - maple
  - ultra-lobster
  - dune
  - sandstorm
  - typora-vue
  - velocity
  - everforest-enchanted
  - dracula-lyt
  - origami
  - nebula
  - faded
  - pine-forest-berry
  - sparkling-night
  - lagom
---

```hacksidian-id
code-e002
```

```hacksidian-live
code-e002
```

```hacksidian-details
> Зачем
Листинг остаётся частью белой страницы, но получает ясные границы.

> Как работает
Прозрачный фон и тонкая рамка.
```

```hacksidian-sources
code-e002
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/things|Things]]: правило CSS без отдельного переключателя — [исходник](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L706), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L706).
  Селектор: `body.fancy-code .markdown-preview-view.markdown-preview-view pre`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L15963), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L15963).
  Селектор: `:is(.markdown-preview-view,.markdown-rendered) pre.language-note-important, :is(.markdown-preview-view,.markdown-rendered) pre.language-note-imp, .print pre.language-note-important, .print pre.language-note-imp, .popover :is(.markdown-preview-view,.markdown-rendered) pre.language-note-important, .popover :is(.markdown-preview-view,.markdown-rendered) pre.language-note-imp`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/prism|Prism]]: правило CSS без отдельного переключателя — [исходник](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L3765), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L3765).
  Селектор: `.markdown-rendered pre`.
- [[atlas/! themes/border|Border]]: правило CSS без отдельного переключателя — [исходник](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8504), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8504).
  Селектор: `.markdown-rendered pre`.
- [[atlas/! themes/sanctum|Sanctum]]: **Code borders** (`code-border`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7344), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L811).
  Селектор: `.code-border .markdown-rendered pre, .code-border .markdown-rendered p > code`.
  Проверяемое свойство: `outline`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.callout:not([data-callout=note-toolbar]) pre`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L3191), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L3191).
  Селектор: `.app-container .markdown-preview-view pre.language-note-important, .app-container .markdown-preview-view pre.language-note-imp`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2976), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2976).
  Селектор: `.inlineblock-border .markdown-rendered pre code, .inlineblock-border .markdown-source-view.mod-cm6 .cm-hmd-codeblock`.
- [[atlas/! themes/baseline|Baseline]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.callout:not([data-callout=note-toolbar]) pre`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: **Remove Block Borders** (`no-show-code-block-border`) — [описание настройки](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L512), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2544).
  Селектор: `.no-show-code-block-border .cm-s-obsidian div.HyperMD-codeblock-begin-bg, .no-show-code-block-border .cm-s-obsidian div.HyperMD-codeblock-end-bg, .no-show-code-block-border .cm-s-obsidian div.HyperMD-codeblock-bg`.
  Проверяемое свойство: `border`.
- [[atlas/! themes/red-graphite|Red Graphite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seanwcom/Red-Graphite-for-Obsidian/blob/b03e01004c108e33d7c81735d74385913980c0b2/theme.css#L1), [реализация](https://github.com/seanwcom/Red-Graphite-for-Obsidian/blob/b03e01004c108e33d7c81735d74385913980c0b2/theme.css#L1).
  Селектор: `.cm-s-obsidian div.HyperMD-codeblock-bg`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L3191), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L3191).
  Селектор: `.app-container .markdown-preview-view pre.language-note-important, .app-container .markdown-preview-view pre.language-note-imp`.
- [[atlas/! themes/obsidianotion|Obsidianotion]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L274), [реализация](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L274).
  Селектор: `pre`.
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L1949), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L1949).
  Селектор: `pre.frontmatter.language-yaml`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L3897), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L3897).
  Селектор: `pre, .markdown-source-view pre, .markdown-rendered pre`.
- [[atlas/! themes/maple|Maple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L7640), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L7640).
  Селектор: `body.scrollbar-enable:not(.is-mobile).scrollbar-movein-animation-enable :is(textarea:not(.excalidraw-wysiwyg), pre)::-webkit-scrollbar-thumb`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Codeblock Style** (`ulu-codeblocks`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L487), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L14203).
  Селектор: `.ulu-gummy-codeblock .markdown-rendered pre`.
  Проверяемое свойство: `border`.
  Варианты: gummy (ulu-gummy-codeblock); notosx (ulu-ntosx-codeblock)
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4485), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4485).
  Селектор: `.markdown-rendered pre:not([class*="language-br"], [class*="language-memo"], [class*="language-wave"], [class*="language-fade"], [class*="language-stars"], [class*="language-deko"], [class*="language-trenner"], [class*="language-sterne"])`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L13055), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L13055).
  Селектор: `.markdown-rendered pre`.
- [[atlas/! themes/typora-vue|Typora-Vue]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L78), [реализация](https://github.com/zekunc/Obsidian-Typora-Vue-Theme/blob/97d4fb65bbbb94a0615a2bd50d2aee118209944d/theme.css#L78).
  Селектор: `.markdown-rendered pre`.
- [[atlas/! themes/velocity|Velocity]]: правило CSS без отдельного переключателя — [исходник](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `.markdown-rendered :is(code,pre)`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L505), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L505).
  Селектор: `pre`.
- [[atlas/! themes/dracula-lyt|Dracula + LYT]]: правило CSS без отдельного переключателя — [исходник](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L2671), [реализация](https://github.com/xryul/ObsidianMD_Dracula_x_LYT/blob/ed43026f30de61897a4529cd161e4470e7d10b9b/obsidian.css#L2671).
  Селектор: `pre.frontmatter.language-yaml`.
- [[atlas/! themes/origami|Origami]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4410), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4410).
  Селектор: `.markdown-rendered pre`.
- [[atlas/! themes/nebula|Nebula]]: правило CSS без отдельного переключателя — [исходник](https://github.com/devmandalia/Nebula/blob/8f28486f4b1bd60cdd7e5b82002df8cc2c0b5480/theme.css#L250), [реализация](https://github.com/devmandalia/Nebula/blob/8f28486f4b1bd60cdd7e5b82002df8cc2c0b5480/theme.css#L250).
  Селектор: `.markdown-rendered pre`.
- [[atlas/! themes/faded|Faded]]: правило CSS без отдельного переключателя — [исходник](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1895), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L1895).
  Селектор: `.callout :not(pre) > code[class*="language-"], .callout pre[class*="language-"]`.
- [[atlas/! themes/pine-forest-berry|Pine Forest Berry]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L857), [реализация](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L857).
  Селектор: `.theme-dark .workspace-split.mod-vertical :not(:last-child) .workspace-leaf.mod-active .view-content pre[class*="language-"]`.
- [[atlas/! themes/sparkling-night|Sparkling Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L305), [реализация](https://github.com/isax785/obsidian-sparkling-night/blob/5ed4031995e60ee1741bcb861b6e7e33acf873ea/theme.css#L305).
  Селектор: `pre code`.
- [[atlas/! themes/lagom|Lagom]]: правило CSS без отдельного переключателя — [исходник](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L614), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L614).
  Селектор: `.markdown-rendered pre`.

```hacksidian-files
code-e002
```
