---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Отдельная поверхность заголовка
category: interface
sources:
  - https://docs.obsidian.md/Reference/CSS%20variables/About%20styling
  - https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors
format: html
themes:
  - its-theme
  - encore
---

```hacksidian-id
interface-header-surface
```

```hacksidian-details
> Зачем
Отделить управление заметкой от её содержимого.

> Как работает
Переменные file-header из локального app.css меняют фон, границу и насыщенность заголовка. Цвета берутся из текущей темы.

> Ограничения
Тема может рисовать собственный заголовок и не использовать эти переменные. Проверено наличие переменных в локальном CSS, не нативное отображение.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-header-surface
```

###### CSS для Obsidian

```css
.workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) {--file-header-background:var(--background-secondary);--file-header-background-focused:var(--background-secondary);--file-header-border:1px solid var(--background-modifier-border);--file-header-font-weight:600}
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/its-theme|ITS Theme]]: **Note Title Styling** (`ITS-Note-Title-Styling`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L803), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12222).
  Селектор: `.file-header-gradient`.
  Варианты: Note Title Gradient (file-header-gradient); Note Title Underline (note-title-underline); Note Title Overline (note-title-overline)
- [[atlas/! themes/encore|Encore]]: **✨ Fancy View Headers** (`encore-fancy-headers`) — [описание настройки](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L249), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L522).
  Селектор: `body.theme-light .mod-root.encore-fancy-headers .workspace-tab-container .workspace-leaf-content > .view-header`.
  Проверяемое свойство: `background-color`.

```hacksidian-files
interface-header-surface
```
