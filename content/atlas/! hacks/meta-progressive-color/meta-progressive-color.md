---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Современный цвет с запасным вариантом
category: meta
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports
  - https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors
format: markdown
themes: []
---

```hacksidian-id
meta-progressive-color
```

```hacksidian-details
> Зачем
Добавить мягкую тонировку без потери границы в старом движке.

> Как работает
Сначала объявлена работоспособная база. @supports включает color-mix только при поддержке свойства и значения.

> Ограничения
Поддержка синтаксиса не гарантирует достаточный контраст. Итоговые цвета зависят от темы.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-progressive-color
```

###### CSS для Obsidian

```css
.callmered-coloring:is(.markdown-preview-view, .markdown-source-view) blockquote {border-inline-start:3px solid var(--text-accent);background:var(--background-secondary)!important} @supports (background:color-mix(in srgb,red 10%,transparent)) { .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) blockquote {background:color-mix(in srgb,var(--text-accent) 12%,var(--background-primary))!important} }
```

```hacksidian-files
meta-progressive-color
```
