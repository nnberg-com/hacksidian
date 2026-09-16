---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Заметный клавиатурный фокус
category: interface
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible
format: html
themes:
  - border
  - retroma
  - sandstorm
---

```hacksidian-id
interface-keyboard-focus
```

```hacksidian-details
> Зачем
Понимать, какую кнопку активирует Enter при работе без мыши.

> Как работает
:focus-visible использует эвристику браузера и выделяет фокус при клавиатурном вводе.

> Ограничения
CSS не делает неклавиатурные элементы фокусируемыми и не задаёт порядок переходов. Итоговый контраст зависит от темы.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-keyboard-focus
```

###### CSS для Obsidian

```css
.workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) :is(button,a,[tabindex]):focus-visible {outline:3px solid var(--interactive-accent);outline-offset:2px}
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/border|Border]]: правило CSS без отдельного переключателя — [исходник](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L6688), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L6688).
  Селектор: `body:not(.is-mobile) input[type=range]:is(:focus, :focus-visible)::-webkit-slider-thumb`.
- [[atlas/! themes/retroma|Retroma]]: правило CSS без отдельного переключателя — [исходник](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L1729), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L1729).
  Селектор: `:is(button:not(.excalidraw button, .mod-warning, .mod-cta, .pcr-app button, .cm-panel button, .draw-in-canvas-color-palette button):focus-visible, .mobile-toolbar-option:focus-visible, .tappable:not(.mod-root .workspace-tab-header, .tree-item-self, .search-result-file-match, .empty-state-action, .mod-navigable, hr, .mobile-navbar-action.has-longpress-menu, .setting-item).selected, .clickable-icon:focus-visible, .text-icon-button:focus-visible, .is-mobile .workspace-drawer-tab-select .workspace-tab-header-inner:focus-visible, .mobile-tab .mobile-tab-pin:focus-visible, .mobile-tab .close-button:focus-visible, .metadata-add-button:focus-visible, .canvas-control-item:focus-visible, .mod-root .workspace-tab-header-inner:not(.mod-root .workspace-tab-header.is-active .workspace-tab-header-inner):focus-visible), .setting-group-filter:focus-visible, .style-manager-tab-actions .style-manager-icon-button:focus-visible, .style-manager-theme-trigger:focus-visible, .style-manager-isolate-badge:focus-visible`.
- [[atlas/! themes/sandstorm|Sandstorm]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L111), [реализация](https://github.com/jaysan0/obsidian-sandstorm/blob/27bc77c071a939ef58fe589b9c52f073515524f9/theme.css#L111).
  Селектор: `.messageBar button:focus-visible`.

```hacksidian-files
interface-keyboard-focus
```
