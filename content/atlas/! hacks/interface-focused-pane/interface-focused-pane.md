---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Рамка панели с фокусом
category: interface
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible
  - https://docs.obsidian.md/Reference/CSS%20variables/About%20styling
format: html
themes:
  - border
---

```hacksidian-id
interface-focused-pane
```

```hacksidian-details
> Зачем
Не потерять текущую панель, когда открыты несколько заметок.

> Как работает
Рамка появляется у контейнера workspace-leaf, пока фокус находится внутри него. :has ограничивает действие панелью с оформленной заметкой.

> Ограничения
Это индикатор DOM-фокуса, а не сохранённого состояния активной вкладки. Класс контейнера зависит от версии Obsidian.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-focused-pane
```

###### CSS для Obsidian

```css
.workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)):focus-within {outline:2px solid var(--interactive-accent);outline-offset:-2px}
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/border|Border]]: **Highlight active card** (`card-highlight-light`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1241), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L4838).
  Селектор: `body:not(.is-mobile).card-highlight-light.card-layout-open-light.theme-light .mod-root:has(.workspace-tabs+.workspace-tabs) .workspace-tabs.mod-active .workspace-tab-container, body:not(.is-mobile).card-highlight-dark.card-layout-open-dark.theme-dark .mod-root:has(.workspace-tabs+.workspace-tabs) .workspace-tabs.mod-active .workspace-tab-container`.
  Проверяемое свойство: `outline`.
- [[atlas/! themes/border|Border]]: **Highlight active card** (`card-highlight-dark`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2198), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L4838).
  Селектор: `body:not(.is-mobile).card-highlight-light.card-layout-open-light.theme-light .mod-root:has(.workspace-tabs+.workspace-tabs) .workspace-tabs.mod-active .workspace-tab-container, body:not(.is-mobile).card-highlight-dark.card-layout-open-dark.theme-dark .mod-root:has(.workspace-tabs+.workspace-tabs) .workspace-tabs.mod-active .workspace-tab-container`.
  Проверяемое свойство: `outline`.

```hacksidian-files
interface-focused-pane
```
