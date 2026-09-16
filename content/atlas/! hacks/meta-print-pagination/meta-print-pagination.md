---
tags:
  - hacksidian_technique
  - hacksidian_meta
title: Печатные страницы без одиноких заголовков
category: meta
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing
format: markdown
themes:
  - maple
---

```hacksidian-id
meta-print-pagination
```

```hacksidian-details
> Зачем
Не оставлять заголовок на нижней строке страницы учебного материала.

> Как работает
Правила break-after, break-inside, orphans и widows задают предпочтения разбиения на страницы.

> Ограничения
Это пожелания движку печати. Блок длиннее страницы всё равно разорвётся; эффект зависит от размера бумаги.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение ограничено заметками с callmered-coloring. Условия media проверяются браузером или приложением; атлас не имитирует их автоматически.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
meta-print-pagination
```

###### CSS для Obsidian

```css
@media print { .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) :is(h1,h2,h3,h4) {break-after:avoid-page} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) :is(blockquote,pre,tr) {break-inside:avoid-page} .callmered-coloring:is(.markdown-preview-view, .markdown-source-view) p {orphans:3;widows:3} }
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/maple|Maple]]: **Better Page Break Strategy** (`pdf-export-page-break`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L2054), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6523).
  Селектор: `body.pdf-export-page-break :is(h1, h2, h3, h4, h5, h6)`.
  Условия CSS: `@media print`

```hacksidian-files
meta-print-pagination
```
