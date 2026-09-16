---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Адаптация к ширине панели
category: meta
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
format: markdown
themes: []
---

```hacksidian-id
meta-pane-container
```

```hacksidian-details
> Зачем
Сделать одну заметку удобной и в узком split, и на широком экране.

> Как работает
Container query измеряет ширину контейнера заметки, а не всего окна. Узкая версия уплотняет цитаты и таблицы.

> Ограничения
CSS containment может влиять на позиционирование расширений. Таблицу с большим числом колонок всё равно потребуется прокручивать.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-pane-container
```

###### CSS для Obsidian

```css
.callmered-coloring:is(.markdown-preview-view, .markdown-source-view) {container-type:inline-size} @container (width < 420px) { .callmered-coloring:is(.markdown-preview-view, .markdown-source-view).callmered-coloring:is(.markdown-preview-view, .markdown-source-view) blockquote {margin-inline:0!important;padding-inline:.65em!important} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) table {font-size:.85em!important} }
```

```hacksidian-files
meta-pane-container
```
