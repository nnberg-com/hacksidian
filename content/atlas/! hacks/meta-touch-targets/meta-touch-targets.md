---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Крупные цели для сенсорного ввода
category: meta
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/pointer
format: markdown
themes: []
---

```hacksidian-id
meta-touch-targets
```

```hacksidian-details
> Зачем
Разнести ссылки и чекбоксы на устройстве с неточным основным указателем.

> Как работает
pointer:coarse проверяет основной способ ввода, а не название устройства или ширину экрана.

> Ограничения
На гибридном устройстве основным указателем может остаться мышь. Inline-ссылки могут увеличить высоту строк.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-touch-targets
```

###### CSS для Obsidian

```css
@media (pointer:coarse) { .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) a {display:inline-block;min-height:44px;padding:.35em .15em} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) li.task-list-item {min-height:44px;padding-block:.35em} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) input[type=checkbox] {min-width:24px;min-height:24px} }
```

```hacksidian-files
meta-touch-targets
```
