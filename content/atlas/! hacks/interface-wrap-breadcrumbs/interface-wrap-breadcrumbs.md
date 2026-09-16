---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Путь заметки без обрезания
category: interface
sources:
  - https://docs.obsidian.md/Reference/CSS%20variables/About%20styling
format: html
themes: []
---

```hacksidian-id
interface-wrap-breadcrumbs
```

```hacksidian-details
> Зачем
Видеть папку и длинное имя заметки в узкой панели.

> Как работает
Заголовку разрешена переменная высота, а пути — перенос строк.

> Ограничения
Селекторы view-header и view-header-title-container взяты из локального app.css, а не публичного API. Требуют проверки после обновлений.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-wrap-breadcrumbs
```

###### CSS для Obsidian

```css
.workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) .view-header {height:auto;min-height:40px} .workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) .view-header-title-container {white-space:normal;overflow-wrap:anywhere;flex-wrap:wrap;height:auto}
.workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) .view-header-title-container :is(.view-header-title-parent,.view-header-title,.view-header-breadcrumb) {white-space:normal;overflow-wrap:anywhere;flex-wrap:wrap}
```

```hacksidian-files
interface-wrap-breadcrumbs
```
