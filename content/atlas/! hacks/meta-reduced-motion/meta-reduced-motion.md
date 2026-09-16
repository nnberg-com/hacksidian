---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Уважать уменьшение движения
category: meta
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
format: markdown
themes:
  - primary
  - border
  - cupertino
  - baseline
  - ultra-lobster
  - underwater
  - everforest-enchanted
  - transparent
---

```hacksidian-id
meta-reduced-motion
```

```hacksidian-details
> Зачем
Отключать декоративные переходы по системному предпочтению пользователя.

> Как работает
Системный media query отключает CSS-анимацию, переходы и плавную прокрутку только внутри оформленной заметки.

> Ограничения
Видео, GIF и JavaScript-анимация не останавливаются. Важную информацию нельзя передавать только движением.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-reduced-motion
```

###### CSS для Obsidian

```css
.callmered-coloring:is(.markdown-preview-view, .markdown-source-view) a {transition:color .35s,background-color .35s} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) a:hover {background:var(--background-secondary)} @media (prefers-reduced-motion:reduce) { .callmered-coloring:is(.markdown-preview-view, .markdown-source-view), .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) * {animation:none!important;transition:none!important;scroll-behavior:auto!important} }
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/primary|Primary]]: **Remove Jumpy Tab Animations** (`zero-tab-anim`) — [описание настройки](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L370), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `body.zero-tab-anim .workspace-tab-header.workspace-tab-header:not(.is-active), body.zero-tab-anim .workspace-tab-header.workspace-tab-header:not(.is-active):active, body.zero-tab-anim .workspace-tab-header.workspace-tab-header:not(.is-active):hover`.
- [[atlas/! themes/primary|Primary]]: **Remove Popup and Pop Down Animations** (`zero-popup-popdown`) — [описание настройки](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L374), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `body.zero-popup-popdown`.
- [[atlas/! themes/border|Border]]: **Remove additional added animation** (`extra-anim-remove`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L281), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L4167).
  Селектор: `body:not(.is-phone, .extra-anim-remove) .prompt, body:not(.is-mobile, .extra-anim-remove) .document-search-container`.
- [[atlas/! themes/cupertino|Cupertino]]: **Reduce motion** (`reduce-motion`) — [описание настройки](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L113), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L1).
  Селектор: `body.reduce-motion`.
- [[atlas/! themes/baseline|Baseline]]: **Reduce motion** (`reduce-motion`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L811), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1).
  Селектор: `body.reduce-motion`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Reduce Motion** (`ulu-no-motion`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L397), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L9999).
  Селектор: `body.ulu-no-motion *, body.ulu-no-motion *::before, body.ulu-no-motion *::after`.
- [[atlas/! themes/underwater|Underwater]]: **Disable slight image animation on hover** (`no-animation`) — [описание настройки](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2729), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1263).
  Селектор: `body:not(.no-animation) img`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: **Disable menu animations** (`disable-menu-animations`) — [описание настройки](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1400), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L383).
  Селектор: `body:not(.disable-menu-animations, .enable-menu-blur) .modal-bg`.
- [[atlas/! themes/transparent|Transparent]]: **Disable All Animations** (`no-animation`) — [описание настройки](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L317), [реализация](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L1811).
  Селектор: `body.no-animation *, body.no-animation *::before, body.no-animation *::after`.

```hacksidian-files
meta-reduced-motion
```
