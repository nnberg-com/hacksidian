---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Тихая панель действий
category: interface
sources:
  - https://github.com/kepano/obsidian-minimal/blob/master/docs/Plugins/Minimal%20Theme%20Settings.md
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible
format: html
themes:
  - minimal
  - shimmering-focus
  - border
  - composer
---

```hacksidian-id
interface-quiet-actions
```

```hacksidian-details
> Зачем
Уменьшить визуальный шум кнопок, сохранив доступ к ним.

> Как работает
Адаптация идеи focus mode: приглушаются только действия панели. Hover и focus-within возвращают полную видимость; сенсорные экраны исключены.

> Ограничения
Кнопки остаются видимыми и доступными. Это не полное скрытие интерфейса из Minimal; CSS написан отдельно.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-quiet-actions
```

###### CSS для Obsidian

```css
@media (hover:hover) and (pointer:fine) { .workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) .view-actions {opacity:.45;transition:opacity .15s} .workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)):hover .view-actions, .workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)):focus-within .view-actions {opacity:1} } @media (prefers-reduced-motion:reduce) { .workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) .view-actions {transition:none} }
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **Permanently show the sidebar header buttons** (`show-sidebar-header-buttons`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L53), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `body:not(.show-sidebar-header-buttons) :is(.mod-left-split,.mod-right-split) :is(.workspace-tab-header-container,.workspace-tab-header-container-inner)`.
- [[atlas/! themes/border|Border]]: **Auto hide header icons in sidepane** (`nav-header-autohide`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L45), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L5496).
  Селектор: `body:not(.is-mobile).nav-header-autohide :is(.workspace-leaf-content, .view-content)>.nav-header .nav-buttons-container`.
- [[atlas/! themes/composer|Composer]]: **Disable Nav Header Auto Hide** (`composer--DisableNavHeaderAutoHide`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L367), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L2140).
  Селектор: `body:not(.is-mobile):not(.composer--DisableNavHeaderAutoHide) .mod-sidedock .workspace-leaf-content .nav-header .nav-buttons-container`.

```hacksidian-files
interface-quiet-actions
```
