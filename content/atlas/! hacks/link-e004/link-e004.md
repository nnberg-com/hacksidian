---
tags:
  - hacksidian_technique
  - hacksidian_link
title: Только цвет — без линии
category: link
sources: []
format: markdown
themes:
  - blue-topaz
  - primary
  - cupertino
  - shiba-inu
  - pln
  - ultra-lobster
---

```hacksidian-id
link-e004
```

```hacksidian-live
link-e004
```

```hacksidian-details
> Зачем
Контекст явно подсказывает наличие ссылки, например меню. В абзаце одного цвета может быть недостаточно.

> Как работает
text-decoration:none убирает линию.
```

```hacksidian-sources
link-e004
```

- Основа: пользовательский материал «2026-09-08 • Возможности оформления ссылок.md» из хранилища CallMeRed.


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle internal link underline** (`link-underline-internal`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3277), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14801).
  Селектор: `body.link-underline-external .markdown-source-view.mod-cm6 .cm-link .cm-underline, body.link-underline-externa .markdown-source-view.mod-cm6 .cm-url .cm-underline, body.link-underline-external a.external-link, body:not(.link-underline-internal) .markdown-source-view.mod-cm6 .cm-hmd-internal-link >*:not(.is-unresolved).cm-underline, body:not(.link-underline-internal) :is(.markdown-preview-view,.markdown-rendered) .internal-link:not(.is-unresolved)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Disable external link underline** (`link-underline-external`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3283), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14801).
  Селектор: `body.link-underline-external .markdown-source-view.mod-cm6 .cm-link .cm-underline, body.link-underline-externa .markdown-source-view.mod-cm6 .cm-url .cm-underline, body.link-underline-external a.external-link, body:not(.link-underline-internal) .markdown-source-view.mod-cm6 .cm-hmd-internal-link >*:not(.is-unresolved).cm-underline, body:not(.link-underline-internal) :is(.markdown-preview-view,.markdown-rendered) .internal-link:not(.is-unresolved)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Disable unresolved link underline** (`link-underline-unresolved`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3289), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L14716).
  Селектор: `body.link-underline-unresolved :is(.markdown-preview-view,.markdown-rendered) .internal-link.is-unresolved>*, body.link-underline-unresolved *>.internal-link.is-unresolved, body.link-underline-unresolved .markdown-source-view.mod-cm6 .cm-hmd-internal-link .is-unresolved .cm-underline, body.link-underline-unresolved .markdown-source-view.mod-cm6 .is-unresolved .cm-underline, body.link-underline-unresolved :is(.markdown-preview-view,.markdown-rendered) .internal-link.is-unresolved, body.link-underline-unresolved .cm-hmd-internal-link .is-unresolved .cm-underline`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/primary|Primary]]: **Remove Link Underline** (`no-decor-link`) — [описание настройки](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L1782), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `body.no-decor-link`.
  Проверяемое свойство: `--link-decoration`.
- [[atlas/! themes/cupertino|Cupertino]]: **Underlined links** (`clean-link-off`) — [описание настройки](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L143), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `body:not(.clean-link-off)`.
  Условия CSS: `@media screen,print`
  Проверяемое свойство: `--link-decoration`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Toggle Internal Link Underline** (`link-underline-internal`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7571), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L2015).
  Селектор: `body.link-underline-externa .markdown-source-view.mod-cm6 .cm-url .cm-underline, body.link-underline-external .markdown-source-view.mod-cm6 .cm-link .cm-underline, body.link-underline-external a.external-link, body:not(.link-underline-internal) .markdown-source-view.mod-cm6 .cm-hmd-internal-link > :not(.is-unresolved).cm-underline, body:not(.link-underline-internal) :is(.markdown-preview-view, .markdown-rendered) .internal-link:not(.is-unresolved)`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Disable External Link Underline** (`link-underline-external`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7576), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L2015).
  Селектор: `body.link-underline-externa .markdown-source-view.mod-cm6 .cm-url .cm-underline, body.link-underline-external .markdown-source-view.mod-cm6 .cm-link .cm-underline, body.link-underline-external a.external-link, body:not(.link-underline-internal) .markdown-source-view.mod-cm6 .cm-hmd-internal-link > :not(.is-unresolved).cm-underline, body:not(.link-underline-internal) :is(.markdown-preview-view, .markdown-rendered) .internal-link:not(.is-unresolved)`.
- [[atlas/! themes/shiba-inu|Shiba Inu]]: **Toggle Unresolved Link Underline** (`link-underline-unresolved`) — [описание настройки](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L7581), [реализация](https://github.com/faroukx/Obsidian-shiba-inu-theme/blob/cd2d760ea598f57f62913a685cd4112186c31f4d/theme.css#L1970).
  Селектор: `body.link-underline-unresolved * > .internal-link.is-unresolved, body.link-underline-unresolved .cm-hmd-internal-link .is-unresolved .cm-underline, body.link-underline-unresolved .markdown-source-view.mod-cm6 .cm-hmd-internal-link .is-unresolved, body.link-underline-unresolved .markdown-source-view.mod-cm6 .is-unresolved, body.link-underline-unresolved :is(.markdown-preview-view, .markdown-rendered) .internal-link.is-unresolved, body.link-underline-unresolved :is(.markdown-preview-view, .markdown-rendered) .internal-link.is-unresolved > *`.
- [[atlas/! themes/pln|PLN]]: **Link modifications** (`pln-link-mods`) — [описание настройки](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L313), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1468).
  Селектор: `:is(body.pln-link-mods)`.
  Проверяемое свойство: `--link-decoration`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Internal Link Style** (`ulu-internal-link-style`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L910), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L8010).
  Селектор: `body.ulu-internal-link-underline .markdown-preview-view a.internal-link, body.ulu-internal-link-underline .markdown-rendered .internal-link`.
  Проверяемое свойство: `text-decoration`.
  Варианты: underline (ulu-internal-link-underline); minimal (ulu-internal-link-minimal); dot-morph (ulu-internal-link-dot-morph)
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **External Link Style** (`ulu-external-link-style`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L923), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L8141).
  Селектор: `body.ulu-external-link-chip .markdown-preview-view a.external-link, body.ulu-external-link-chip .markdown-rendered a.external-link`.
  Проверяемое свойство: `text-decoration`.
  Варианты: chip (ulu-external-link-chip); minimal (ulu-external-link-minimal); dot-morph (ulu-external-link-dot-morph)

```hacksidian-files
link-e004
```
