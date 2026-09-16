---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Адреса ссылок на бумаге
category: meta
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing
format: markdown
themes: []
---

```hacksidian-id
meta-print-links
```

```hacksidian-details
> Зачем
Сохранить адреса источников в распечатке конспекта или задания.

> Как работает
В печатном media-режиме CSS добавляет адрес после внешней ссылки. На экране текст не меняется.

> Ограничения
В адресе могут быть приватные параметры; проверьте ссылки перед передачей PDF. Внутренние wikilinks не раскрываются.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-print-links
```

###### CSS для Obsidian

```css
@media print { .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) a[href^="https://"]::after {content:" (" attr(href) ")";font-size:.8em;overflow-wrap:anywhere} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) a[href^="http://"]::after {content:" (" attr(href) ")";font-size:.8em;overflow-wrap:anywhere} }
```

```hacksidian-files
meta-print-links
```
