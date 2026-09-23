---
tags:
  - hacksidian_technique
  - hacksidian_parameter_experiment
  - hacksidian_heading
title: Черта на всю ширину
category: heading
sources: []
format: markdown
themes:
  - minimal
  - things
  - anuppuccin
  - blue-topaz
  - obsidianite
  - its-theme
  - prism
  - border
  - tokyo-night
  - sanctum
  - github-theme
  - ono-sendai
  - shiba-inu
  - encore
  - pink-topaz
  - cyber-glow
  - obuntu
  - baseline
  - yin-and-yang
  - golden-topaz
  - ultra-lobster
  - light-bright
  - wy-console
  - wikipedia
  - underwater
  - nier
  - everforest-enchanted
  - gitsidian
  - origami
  - dawn
  - dark-graphite-pie
  - soft-paper
  - zen
  - maple
  - lagom
favourite: false
---

```hacksidian-id
heading-e019
```

```hacksidian-live
heading-e019
```

```hacksidian-details
> Зачем
Отделяет крупные разделы документа.

> Как работает
Параметры на карточке: толщина черты и отступ от заголовка H3. Значения сохраняются в CSS приёма; для включённого оформления используется кнопка «Обновить уже существующий стиль».

Черта применяется только к заголовкам третьего уровня (`###`, H3): нижняя граница и отступ до неё.

> Ограничения
Уровень заголовка закреплён селектором `h3`. CSS-переменную нельзя подставить в селектор, поэтому параметра выбора уровня нет. Через CSS Variables настраиваются толщина черты и отступ под H3.
```

Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e019
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **H1 divider line** (`h1-l`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7200), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L4068).
  Селектор: `.h1-l .markdown-reading-view h1:not(.embedded-note-title), .h1-l .mod-cm6 .cm-editor .HyperMD-header-1`.
- [[atlas/! themes/minimal|Minimal]]: **H2 divider line** (`h2-l`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7268), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L4075).
  Селектор: `.h2-l .markdown-reading-view h2, .h2-l .mod-cm6 .cm-editor .HyperMD-header-2`.
- [[atlas/! themes/minimal|Minimal]]: **H3 divider line** (`h3-l`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7336), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L4082).
  Селектор: `.h3-l .markdown-reading-view h3, .h3-l .mod-cm6 .cm-editor .HyperMD-header-3`.
- [[atlas/! themes/minimal|Minimal]]: **H4 divider line** (`h4-l`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7404), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L4089).
  Селектор: `.h4-l .markdown-reading-view h4, .h4-l .mod-cm6 .cm-editor .HyperMD-header-4`.
- [[atlas/! themes/minimal|Minimal]]: **H5 divider line** (`h5-l`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7472), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L4096).
  Селектор: `.h5-l .markdown-reading-view h5, .h5-l .mod-cm6 .cm-editor .HyperMD-header-5`.
- [[atlas/! themes/minimal|Minimal]]: **H6 divider line** (`h6-l`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7540), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L4103).
  Селектор: `.h6-l .markdown-reading-view h6, .h6-l .mod-cm6 .cm-editor .HyperMD-header-6`.
- [[atlas/! themes/things|Things]]: **H1 underline** (`h1-underline`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1707), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L386).
  Селектор: `body.h1-underline h1`.
- [[atlas/! themes/things|Things]]: **H2 underline** (`h2-no-underline`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1737), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L348).
  Селектор: `body.h2-no-underline .markdown-preview-view h2, body.h2-no-underline .markdown-rendered h2`.
- [[atlas/! themes/things|Things]]: **H3 underline** (`h3-underline`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1779), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L396).
  Селектор: `body.h3-underline h3`.
- [[atlas/! themes/things|Things]]: **H4 underline** (`h4-underline`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1828), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L406).
  Селектор: `body.h4-underline h4`.
- [[atlas/! themes/things|Things]]: **H5 underline** (`h5-underline`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1864), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L416).
  Селектор: `body.h5-underline h5`.
- [[atlas/! themes/things|Things]]: **H6 underline** (`h6-underline`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1900), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L426).
  Селектор: `body.h6-underline h6`.
- [[atlas/! themes/things|Things]]: **Match underline color to heading color** (`heading-underline-color`) — [описание настройки](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1671), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L438).
  Селектор: `body.heading-underline-color.h1-underline h1, body.heading-underline-color.h1-underline .HyperMD-header.HyperMD-header-1.cm-line`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H1 Divider** (`anp-h1-divider`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1580), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5073).
  Селектор: `.anp-h1-divider .markdown-rendered h1, .anp-h1-divider .HyperMD-header-1`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H2 Divider** (`anp-h2-divider`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1664), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5157).
  Селектор: `.anp-h2-divider .markdown-rendered h2, .anp-h2-divider .HyperMD-header-2`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H3 Divider** (`anp-h3-divider`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1748), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5241).
  Селектор: `.anp-h3-divider .markdown-rendered h3, .anp-h3-divider .HyperMD-header-3`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H4 Divider** (`anp-h4-divider`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1832), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5325).
  Селектор: `.anp-h4-divider .markdown-rendered h4, .anp-h4-divider .HyperMD-header-4`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H5 Divider** (`anp-h5-divider`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L1916), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5409).
  Селектор: `.anp-h5-divider .markdown-rendered h5, .anp-h5-divider .HyperMD-header-5`.
- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **H6 Divider** (`anp-h6-divider`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L2000), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L5493).
  Селектор: `.anp-h6-divider .markdown-rendered h6, .anp-h6-divider .HyperMD-header-6`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h1 underline** (`h1-toggle-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1315), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12192).
  Селектор: `body.h1-toggle-underline :is(.markdown-preview-view,.markdown-rendered) h1, body.h1-toggle-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **toggle h2 underline** (`h2-toggle-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1419), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12196).
  Селектор: `body.h2-toggle-underline :is(.markdown-preview-view,.markdown-rendered) h2, body.h2-toggle-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **toggle h3 underline** (`h3-toggle-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1524), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12200).
  Селектор: `body.h3-toggle-underline :is(.markdown-preview-view,.markdown-rendered) h3, body.h3-toggle-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **toggle h4 underline** (`h4-toggle-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1629), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12204).
  Селектор: `body.h4-toggle-underline :is(.markdown-preview-view,.markdown-rendered) h4, body.h4-toggle-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **toggle h5 underline** (`h5-toggle-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1733), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12208).
  Селектор: `body.h5-toggle-underline :is(.markdown-preview-view,.markdown-rendered) h5, body.h5-toggle-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h6 underline** (`h6-toggle-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1832), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12212).
  Селектор: `body.h6-toggle-underline :is(.markdown-preview-view,.markdown-rendered) h6, body.h6-toggle-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h1 underline (Shorter)** (`h1-toggle-short-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1343), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12221).
  Селектор: `body.h1-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h1, body.h2-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h2, body.h3-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h3, body.h4-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h4, body.h5-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h5, body.h6-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h6, body.h1-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line, body.h2-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line, body.h3-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line, body.h4-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line, body.h5-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line, body.h6-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line, body.inline-title-toggle-short-underline .inline-title`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-decoration`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h2 underline (Shorter)** (`h2-toggle-short-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1447), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12221).
  Селектор: `body.h1-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h1, body.h2-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h2, body.h3-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h3, body.h4-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h4, body.h5-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h5, body.h6-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h6, body.h1-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line, body.h2-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line, body.h3-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line, body.h4-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line, body.h5-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line, body.h6-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line, body.inline-title-toggle-short-underline .inline-title`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-decoration`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h3 underline (Shorter)** (`h3-toggle-short-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1552), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12221).
  Селектор: `body.h1-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h1, body.h2-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h2, body.h3-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h3, body.h4-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h4, body.h5-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h5, body.h6-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h6, body.h1-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line, body.h2-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line, body.h3-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line, body.h4-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line, body.h5-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line, body.h6-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line, body.inline-title-toggle-short-underline .inline-title`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-decoration`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h4 underline (Shorter)** (`h4-toggle-short-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1657), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12221).
  Селектор: `body.h1-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h1, body.h2-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h2, body.h3-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h3, body.h4-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h4, body.h5-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h5, body.h6-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h6, body.h1-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line, body.h2-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line, body.h3-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line, body.h4-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line, body.h5-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line, body.h6-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line, body.inline-title-toggle-short-underline .inline-title`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-decoration`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h5 underline (Shorter)** (`h5-toggle-short-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1761), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12221).
  Селектор: `body.h1-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h1, body.h2-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h2, body.h3-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h3, body.h4-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h4, body.h5-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h5, body.h6-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h6, body.h1-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line, body.h2-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line, body.h3-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line, body.h4-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line, body.h5-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line, body.h6-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line, body.inline-title-toggle-short-underline .inline-title`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-decoration`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle h6 underline (Shorter)** (`h6-toggle-short-underline`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1860), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12221).
  Селектор: `body.h1-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h1, body.h2-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h2, body.h3-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h3, body.h4-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h4, body.h5-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h5, body.h6-toggle-short-underline :is(.markdown-preview-view,.markdown-rendered) h6, body.h1-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line, body.h2-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line, body.h3-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line, body.h4-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line, body.h5-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line, body.h6-toggle-short-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line, body.inline-title-toggle-short-underline .inline-title`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `text-decoration`.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L556), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L556).
  Селектор: `.markdown-preview-view h2, .markdown-preview-view h3, .markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Hide Header Underline** (`hide-header-underline`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L939), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12725).
  Селектор: `.h-line.h-line, .hide-header-underline.hide-header-underline, :is(.h-line, .hide-header-underline) div`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Hide H1 Underline** (`hide-header-underline-1`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1370), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12737).
  Селектор: `.hide-header-underline-1 div`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Hide H2 Underline** (`hide-header-underline-2`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1375), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12741).
  Селектор: `.hide-header-underline-2 div`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Hide H3 Underline** (`hide-header-underline-3`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1380), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12745).
  Селектор: `.hide-header-underline-3 div`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Hide H4 Underline** (`hide-header-underline-4`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1385), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12749).
  Селектор: `.hide-header-underline-4 div`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Hide H5 Underline** (`hide-header-underline-5`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1390), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12753).
  Селектор: `.hide-header-underline-5 div`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Hide H6 Underline** (`hide-header-underline-6`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1395), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12757).
  Селектор: `.hide-header-underline-6 div`.
- [[atlas/! themes/prism|Prism]]: правило CSS без отдельного переключателя — [исходник](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L6501), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L6501).
  Селектор: `.modal.kanban-plugin__board-settings-modal :is(h3, h4)`.
- [[atlas/! themes/border|Border]]: **Enable H1 divider** (`h1-divider-on`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2425), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7084).
  Селектор: `body.h1-divider-on :is(.markdown-preview-sizer>div>h1, .markdown-rendered>h1, .HyperMD-header-1>.cm-header-1)::after`.
- [[atlas/! themes/border|Border]]: **Enable H2 divider** (`h2-divider-on`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2488), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7172).
  Селектор: `body.h2-divider-on :is(.markdown-preview-sizer>div>h2, .markdown-rendered>h2, .HyperMD-header-2>.cm-header-2)::after`.
- [[atlas/! themes/border|Border]]: **Enable H3 divider** (`h3-divider-on`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2551), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7259).
  Селектор: `body.h3-divider-on :is(.markdown-preview-sizer>div>h3, .markdown-rendered>h3, .HyperMD-header-3>.cm-header-3)::after`.
- [[atlas/! themes/border|Border]]: **Enable H4 divider** (`h4-divider-on`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2614), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7347).
  Селектор: `body.h4-divider-on :is(.markdown-rendered>h4, .markdown-preview-sizer>div>h4, .HyperMD-header-4>.cm-header-4)::after`.
- [[atlas/! themes/border|Border]]: **Enable H5 divider** (`h5-divider-on`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2677), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7435).
  Селектор: `body.h5-divider-on :is(.markdown-rendered>h5, .markdown-preview-sizer>div>h5, .HyperMD-header-5>.cm-header-5)::after`.
- [[atlas/! themes/border|Border]]: **Enable H6 divider** (`h6-divider-on`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2740), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7523).
  Селектор: `body.h6-divider-on :is(.markdown-rendered>h6, .markdown-preview-sizer>div>h6, .HyperMD-header-6>.cm-header-6)::after`.
- [[atlas/! themes/border|Border]]: **Remove inline title divider** (`inline-title-divider-remove`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2363), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L7007).
  Селектор: `body:not(.is-phone):not(.inline-title-divider-remove) .inline-title:not(.mk-inline-title)`.
  Проверяемое свойство: `border-bottom`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: **disable H1 divider** (`h1-divider-on`) — [описание настройки](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1173), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L286).
  Селектор: `body.h1-divider-on :is(.markdown-preview-sizer>div>h1, .markdown-rendered>h1, .HyperMD-header-1)::after`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: **disable H2 divider** (`h2-divider-on`) — [описание настройки](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1209), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L297).
  Селектор: `body.h2-divider-on :is(.markdown-preview-sizer>div>h2, .markdown-rendered>h2, .HyperMD-header-2)::after`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: **disable H3 divider** (`h3-divider-on`) — [описание настройки](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1245), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L308).
  Селектор: `body.h3-divider-on :is(.markdown-preview-sizer>div>h3, .markdown-rendered>h3, .HyperMD-header-3)::after`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: **disable H4 divider** (`h4-divider-on`) — [описание настройки](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1281), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L319).
  Селектор: `body.h4-divider-on :is(.markdown-preview-sizer>div>h4, .markdown-rendered>h4, .HyperMD-header-4)::after`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: **disable H5 divider** (`h5-divider-on`) — [описание настройки](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1317), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L330).
  Селектор: `body.h5-divider-on :is(.markdown-preview-sizer>div>h5, .markdown-rendered>h5, .HyperMD-header-5)::after`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: **disable H6 divider** (`h6-divider-on`) — [описание настройки](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1353), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L341).
  Селектор: `body.h6-divider-on :is(.markdown-preview-sizer>div>h6, .markdown-rendered>h6, .HyperMD-header-6)::after`.
- [[atlas/! themes/sanctum|Sanctum]]: **H1 divider line** (`h1-line`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7600), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2104).
  Селектор: `.h1-line h1, .h1-line .markdown-rendered h1`.
- [[atlas/! themes/sanctum|Sanctum]]: **H2 divider line** (`h2-line`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7668), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2108).
  Селектор: `.h2-line h2, .h2-line .markdown-rendered h2`.
- [[atlas/! themes/sanctum|Sanctum]]: **H3 divider line** (`h3-line`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7736), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2112).
  Селектор: `.h3-line h3, .h3-line .markdown-rendered h3`.
- [[atlas/! themes/sanctum|Sanctum]]: **H4 divider line** (`h4-line`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7804), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2116).
  Селектор: `.h4-line h4, .h4-line .markdown-rendered h4`.
- [[atlas/! themes/sanctum|Sanctum]]: **H5 divider line** (`h5-line`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7872), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2120).
  Селектор: `.h5-line h5, .h5-line .markdown-rendered h5`.
- [[atlas/! themes/sanctum|Sanctum]]: **H6 divider line** (`h6-line`) — [описание настройки](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7940), [реализация](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L2124).
  Селектор: `.h6-line h6, .h6-line .markdown-rendered h6`.
- [[atlas/! themes/github-theme|GitHub Theme]]: **H1 header underline enabled** (`h1-underline`) — [описание настройки](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L46), [реализация](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L1238).
  Селектор: `body.h1-underline h1, body.h1-underline.markdown-rendered h1`.
- [[atlas/! themes/github-theme|GitHub Theme]]: **H2 header underline enabled** (`h2-underline`) — [описание настройки](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L50), [реализация](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L1242).
  Селектор: `body.h2-underline h2, body.h2-underline.markdown-rendered h2`.
- [[atlas/! themes/ono-sendai|Ono Sendai]]: правило CSS без отдельного переключателя — [исходник](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L330), [реализация](https://github.com/cannibalox/ono-sendai_obsdn/blob/c05841901d10ce280b9cf614a343e75000f0d738/obsidian.css#L330).
  Селектор: `h1`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H1 Underline** (`shib-h1-underline`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L6908), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1589).
  Селектор: `.shib-h1-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-1.cm-line, .shib-h1-underline :is(.markdown-preview-view, .markdown-rendered) h1`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H2 Underline** (`shib-h2-underline`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7006), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1596).
  Селектор: `.shib-h2-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-2.cm-line, .shib-h2-underline :is(.markdown-preview-view, .markdown-rendered) h2`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H3 Underline** (`shib-h3-underline`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7104), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1603).
  Селектор: `.shib-h3-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-3.cm-line, .shib-h3-underline :is(.markdown-preview-view, .markdown-rendered) h3`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H4 Underline** (`shib-h4-underline`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7202), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1610).
  Селектор: `.shib-h4-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-4.cm-line, .shib-h4-underline :is(.markdown-preview-view, .markdown-rendered) h4`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H5 Underline** (`shib-h5-underline`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7300), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1617).
  Селектор: `.shib-h5-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-5.cm-line, .shib-h5-underline :is(.markdown-preview-view, .markdown-rendered) h5`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **H6 Underline** (`shib-h6-underline`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7398), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1624).
  Селектор: `.shib-h6-underline .markdown-source-view.is-live-preview .HyperMD-header.HyperMD-header-6.cm-line, .shib-h6-underline :is(.markdown-preview-view, .markdown-rendered) h6`.
- [[atlas/! themes/encore|Encore]]: правило CSS без отдельного переключателя — [исходник](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1349), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L1349).
  Селектор: `.dataview-container h4`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1321), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L1321).
  Селектор: `.markdown-preview-view h1`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: правило CSS без отдельного переключателя — [исходник](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2241), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2241).
  Селектор: `.callout.callout[data-callout~=infobox] .callout-content > :is(h1, h2, h3, h4, h5, h6)`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L527), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L527).
  Селектор: `h1`.
- [[atlas/! themes/baseline|Baseline]]: **H1 divider** (`h1-l`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1831), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.h1-l .markdown-reading-view h1, .h1-l .markdown-source-view .HyperMD-header-1`.
- [[atlas/! themes/baseline|Baseline]]: **H2 divider** (`h2-l`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1927), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.h2-l .markdown-reading-view h2, .h2-l .markdown-source-view .HyperMD-header-2`.
- [[atlas/! themes/baseline|Baseline]]: **H3 divider** (`h3-l`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2023), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.h3-l .markdown-reading-view h3, .h3-l .markdown-source-view .HyperMD-header-3`.
- [[atlas/! themes/baseline|Baseline]]: **H4 divider** (`h4-l`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2119), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.h4-l .markdown-reading-view h4, .h4-l .markdown-source-view .HyperMD-header-4`.
- [[atlas/! themes/baseline|Baseline]]: **H5 divider** (`h5-l`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2216), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.h5-l .markdown-reading-view h5, .h5-l .markdown-source-view .HyperMD-header-5`.
- [[atlas/! themes/baseline|Baseline]]: **H6 divider** (`h6-l`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2312), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.h6-l .markdown-reading-view h6, .h6-l .markdown-source-view .HyperMD-header-6`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L9420), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L9420).
  Селектор: `.nav-header h6`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1321), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L1321).
  Селектор: `.markdown-preview-view h1`.
- [[atlas/! themes/maple|Maple]]: **H1 Style** (`heading-h1-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1114), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5977).
  Селектор: `.heading-h1-underline :is(.HyperMD-header-1 .cm-header:not(.cm-formatting), .markdown-rendered h1)`.
  Проверяемое свойство: `text-decoration`.
  Варианты: Normal (heading-h1-normal); Underline (heading-h1-underline); Full Line (heading-h1-full-line); Block (heading-h1-block)
- [[atlas/! themes/maple|Maple]]: **H2 Style** (`heading-h2-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1201), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5981).
  Селектор: `.heading-h2-underline :is(.HyperMD-header-2 .cm-header:not(.cm-formatting), .markdown-rendered h2)`.
  Проверяемое свойство: `text-decoration`.
  Варианты: Normal (heading-h2-normal); Underline (heading-h2-underline); Full Line (heading-h2-full-line); Block (heading-h2-block)
- [[atlas/! themes/maple|Maple]]: **H3 Style** (`heading-h3-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1288), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5985).
  Селектор: `.heading-h3-underline :is(.HyperMD-header-3 .cm-header:not(.cm-formatting), .markdown-rendered h3)`.
  Проверяемое свойство: `text-decoration`.
  Варианты: Normal (heading-h3-normal); Underline (heading-h3-underline); Full Line (heading-h3-full-line); Block (heading-h3-block)
- [[atlas/! themes/maple|Maple]]: **H4 Style** (`heading-h4-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1375), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5989).
  Селектор: `.heading-h4-underline :is(.HyperMD-header-4 .cm-header:not(.cm-formatting), .markdown-rendered h4)`.
  Проверяемое свойство: `text-decoration`.
  Варианты: Normal (heading-h4-normal); Underline (heading-h4-underline); Full Line (heading-h4-full-line); Block (heading-h4-block)
- [[atlas/! themes/maple|Maple]]: **H5 Style** (`heading-h5-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1462), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5993).
  Селектор: `.heading-h5-underline :is(.HyperMD-header-5 .cm-header:not(.cm-formatting), .markdown-rendered h5)`.
  Проверяемое свойство: `text-decoration`.
  Варианты: Normal (heading-h5-normal); Underline (heading-h5-underline); Full Line (heading-h5-full-line); Block (heading-h5-block)
- [[atlas/! themes/maple|Maple]]: **H6 Style** (`heading-h6-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1549), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5997).
  Селектор: `.heading-h6-underline :is(.HyperMD-header-6 .cm-header:not(.cm-formatting), .markdown-rendered h6)`.
  Проверяемое свойство: `text-decoration`.
  Варианты: Normal (heading-h6-normal); Underline (heading-h6-underline); Full Line (heading-h6-full-line); Block (heading-h6-block)
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Disable H2 Underline** (`ulu-no-h2-line`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1066), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L8947).
  Селектор: `body:not(.ulu-no-h2-line) .HyperMD-header-2`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **H1 Underline** (`ulu-header-line-h1`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1644), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17367).
  Селектор: `.ulu-header-line-h1 .markdown-reading-view h1:not(.embedded-note-title), .ulu-header-line-h1 .markdown-source-view.mod-cm6 .cm-editor .HyperMD-header-1`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **H2 Underline** (`ulu-header-line-h2`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1647), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17380).
  Селектор: `.ulu-header-line-h2 .markdown-reading-view h2, .ulu-header-line-h2 .markdown-source-view.mod-cm6 .cm-editor .HyperMD-header-2`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **H3 Underline** (`ulu-header-line-h3`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1650), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17393).
  Селектор: `.ulu-header-line-h3 .markdown-reading-view h3, .ulu-header-line-h3 .markdown-source-view.mod-cm6 .cm-editor .HyperMD-header-3`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **H4 Underline** (`ulu-header-line-h4`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1653), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17406).
  Селектор: `.ulu-header-line-h4 .markdown-reading-view h4, .ulu-header-line-h4 .markdown-source-view.mod-cm6 .cm-editor .HyperMD-header-4`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **H5 Underline** (`ulu-header-line-h5`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1656), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17419).
  Селектор: `.ulu-header-line-h5 .markdown-reading-view h5, .ulu-header-line-h5 .markdown-source-view.mod-cm6 .cm-editor .HyperMD-header-5`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **H6 Underline** (`ulu-header-line-h6`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L1659), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17432).
  Селектор: `.ulu-header-line-h6 .markdown-reading-view h6, .ulu-header-line-h6 .markdown-source-view.mod-cm6 .cm-editor .HyperMD-header-6`.
- [[atlas/! themes/light-bright|Light & Bright]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L431), [реализация](https://github.com/bluemoondragon07/obsidian-light-and-bright-theme/blob/4544ececda4ae91ed4c8dd852242f63866b36bdf/theme.css#L431).
  Селектор: `h2, .markdown-rendered h2, .HyperMD-header-2, .HyperMD-list-line .cm-header-2`.
- [[atlas/! themes/wy-console|WY Console]]: правило CSS без отдельного переключателя — [исходник](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L774), [реализация](https://github.com/satchelmouth/Obsidian-Theme-WYConsole/blob/b5d933b90faed13b7ac9b07afc3ec1037f87647b/theme.css#L774).
  Селектор: `.markdown-preview-view h1`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/wikipedia|Wikipedia]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L65), [реализация](https://github.com/bluemoondragon07/Wikipedia-Theme/blob/b3187a105ebc4c28693777d228fd1707d3c01c06/theme.css#L65).
  Селектор: `.markdown-reading-view h1, .embed-title, h1`.
- [[atlas/! themes/underwater|Underwater]]: правило CSS без отдельного переключателя — [исходник](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1230), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1230).
  Селектор: `.HyperMD-header.HyperMD-header-1, h1`.
- [[atlas/! themes/nier|Nier]]: правило CSS без отдельного переключателя — [исходник](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L464), [реализация](https://github.com/exloseur3d/nier-theme/blob/5f5778fcd1b23e4f59a9b58b0f4737649af1b119/theme.css#L464).
  Селектор: `.HyperMD-header-1, h1, h1, .markdown-rendered h1`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Headers - h1 underline** (`h1-underline`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1500), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2013).
  Селектор: `body.h1-underline h1, body.h1-underline .HyperMD-header-1.cm-line`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Headers - H2 underline** (`h2-underline`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1528), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2020).
  Селектор: `body.h2-underline h2, body.h2-underline .HyperMD-header-2.cm-line`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Headers - h3 underline** (`h3-underline`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1556), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2027).
  Селектор: `body.h3-underline h3, body.h3-underline .HyperMD-header-3.cm-line`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Headers - h4 underline** (`h4-underline`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1584), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2034).
  Селектор: `body.h4-underline h4, body.h4-underline .HyperMD-header-4.cm-line`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Headers - h5 underline** (`h5-underline`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1612), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2041).
  Селектор: `body.h5-underline h5, body.h5-underline .HyperMD-header-5.cm-line`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Headers - h6 underline** (`h6-underline`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1640), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2048).
  Селектор: `body.h6-underline h6, body.h6-underline .HyperMD-header-6.cm-line`.
- [[atlas/! themes/gitsidian|Gitsidian]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L378), [реализация](https://github.com/ismailgunacar/gitsidian/blob/0fd34ca2838bfe2c2a375bf7a64c370366a7137e/obsidian.css#L378).
  Селектор: `.markdown-preview-view h1, .markdown-preview-view h2`.
- [[atlas/! themes/origami|Origami]]: **header 1 underline** (`o-header-line-h1`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L280), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5097).
  Селектор: `.o-header-line-h1 .markdown-reading-view h1:not(.embedded-note-title), .o-header-line-h1 .mod-cm6 .cm-editor .HyperMD-header-1`.
- [[atlas/! themes/origami|Origami]]: **header 2 underline** (`o-header-line-h2`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L284), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5104).
  Селектор: `.o-header-line-h2 .markdown-reading-view h2, .o-header-line-h2 .mod-cm6 .cm-editor .HyperMD-header-2`.
- [[atlas/! themes/origami|Origami]]: **header 3 underline** (`o-header-line-h3`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L288), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5111).
  Селектор: `.o-header-line-h3 .markdown-reading-view h3, .o-header-line-h3 .mod-cm6 .cm-editor .HyperMD-header-3`.
- [[atlas/! themes/origami|Origami]]: **header 4 underline** (`o-header-line-h4`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L292), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5118).
  Селектор: `.o-header-line-h4 .markdown-reading-view h4, .o-header-line-h4 .mod-cm6 .cm-editor .HyperMD-header-4`.
- [[atlas/! themes/origami|Origami]]: **header 5 underline** (`o-header-line-h5`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L296), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5125).
  Селектор: `.o-header-line-h5 .markdown-reading-view h5, .o-header-line-h5 .mod-cm6 .cm-editor .HyperMD-header-5`.
- [[atlas/! themes/origami|Origami]]: **header 6 underline** (`o-header-line-h6`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L300), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5132).
  Селектор: `.o-header-line-h6 .markdown-reading-view h6, .o-header-line-h6 .mod-cm6 .cm-editor .HyperMD-header-6`.
- [[atlas/! themes/dawn|Dawn]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1695), [реализация](https://github.com/ds-package/Dawn/blob/24e4b9888e69301b0d469d5be3ea767d0eed98ab/theme.css#L1695).
  Селектор: `.markdown-rendered h6`.
- [[atlas/! themes/dark-graphite-pie|Dark Graphite Pie]]: правило CSS без отдельного переключателя — [исходник](https://github.com/ryjjin/Obsidian-Dark-Graphite-Pie-theme/blob/64dfa78349d4d3d698b18fe5459761bc1aac31f5/theme.css#L231), [реализация](https://github.com/ryjjin/Obsidian-Dark-Graphite-Pie-theme/blob/64dfa78349d4d3d698b18fe5459761bc1aac31f5/theme.css#L231).
  Селектор: `.markdown-preview-view h1`.
- [[atlas/! themes/soft-paper|Soft Paper]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L627), [реализация](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L627).
  Селектор: `.markdown-rendered h1, .HyperMD-header-1`.
- [[atlas/! themes/zen|Zen]]: **Hide the Heading bottom line in the editor.** (`heading-bottom-line-off`) — [описание настройки](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L96), [реализация](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L1120).
  Селектор: `body:not(.heading-bottom-line-off) .inline-title:not(:empty):not(:has(h1)):not(:has(h2)):not(:has(h3)):not( :has(h4) ):not(:has(h5)):not(:has(h6))`.
- [[atlas/! themes/lagom|Lagom]]: **Inline title separator** (`enable-inline-title-separator`) — [описание настройки](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2632), [реализация](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L394).
  Селектор: `.enable-inline-title-separator .cm-editor .inline-title`.

```hacksidian-files
heading-e019
```
