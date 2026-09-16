---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Следовать теме Obsidian, а не системе
category: meta
sources:
  - https://docs.obsidian.md/Reference/CSS%20variables/About%20styling
  - https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors
format: markdown
themes: []
---

```hacksidian-id
meta-follow-obsidian-theme
```

```hacksidian-details
> Зачем
Согласовать выделения с темой приложения, даже если она отличается от темы ОС.

> Как работает
Ветви theme-light и theme-dark читают состояние Obsidian. prefers-color-scheme здесь намеренно не используется.

> Ограничения
Браузерный preview не синхронизируется с Obsidian в реальном времени. В standalone-сборке без классов темы ветви не активируются.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-follow-obsidian-theme
```

###### CSS для Obsidian

```css
.theme-light .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) mark {background:var(--background-secondary);color:var(--text-normal);outline:1px solid var(--text-accent)} .theme-dark .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) mark {background:var(--background-primary-alt);color:var(--text-normal);outline:2px solid var(--text-accent)}
```

```hacksidian-files
meta-follow-obsidian-theme
```
