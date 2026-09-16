---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Усиление границ по системной настройке
category: meta
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast
format: markdown
themes: []
---

```hacksidian-id
meta-higher-contrast
```

```hacksidian-details
> Зачем
Сделать структуры заметки различимее при запросе повышенного контраста.

> Как работает
prefers-contrast усиливает границы и подчёркивания, сохраняя цветовую систему текущей темы.

> Ограничения
Это не режим forced-colors и не автоматическая проверка WCAG. Обработка настройки различается между платформами.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-higher-contrast
```

###### CSS для Obsidian

```css
@media (prefers-contrast:more) { .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) {--text-muted:var(--text-normal)} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) :is(blockquote,th,td) {border-color:var(--text-normal)!important;border-width:2px!important} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) a {text-decoration:underline;text-decoration-thickness:2px} }
```

```hacksidian-files
meta-higher-contrast
```
