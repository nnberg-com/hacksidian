---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Кнопки панели с удобной областью нажатия
category: interface
sources:
  - https://docs.obsidian.md/Reference/CSS%20variables/About%20styling
format: html
themes: []
---

```hacksidian-id
interface-roomy-actions
```

```hacksidian-details
> Зачем
Уменьшить промахи по маленьким кнопкам заголовка.

> Как работает
Увеличивается область нажатия, а не размер символа. Изменение ограничено действиями панели.

> Ограничения
В очень узкой панели длинный заголовок получит меньше места. 36 px — выбранный размер, не заявление о соответствии стандарту доступности.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-roomy-actions
```

###### CSS для Obsidian

```css
.workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) .view-actions .clickable-icon {min-width:36px;min-height:36px;padding:8px} .workspace-leaf:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) .view-actions {gap:4px}
```

```hacksidian-files
interface-roomy-actions
```
