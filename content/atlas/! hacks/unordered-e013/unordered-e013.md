---
tags:
  - hacksidian_technique
  - hacksidian_unordered
title: Без видимых маркеров
category: unordered
sources: []
format: markdown
themes:
  - cyber-glow
---

```hacksidian-id
unordered-e013
```

```hacksidian-live
unordered-e013
```

```hacksidian-details
> Зачем
Сохраняет структуру короткого перечисления, когда достаточно вертикальных интервалов.

> Как работает
list-style: none убирает знак; padding снимает оставшийся отступ.

> Ограничения
Вид достигается чистым CSS. Проверка доступности в Safari и скринридерах не выполнялась; Markdown не добавляет role="list".
```

```hacksidian-sources
unordered-e013
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/cyber-glow|Cyber Glow]]: **Disable Bullets in Callout** (`CG-bulletcallout`) — [описание настройки](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L307), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L2801).
  Селектор: `.CG-bulletcallout .callout-content li:not(.is-collapsed) .list-bullet:after, .CG-bulletcallout .callout-content .cm-formatting-list .list-bullet:after, .CG-bulletcallout .callout-content.markdown-source-view.mod-cm6 .cm-formatting-list-ul, .CG-bulletcallout .callout-content .markdown-source-view.mod-cm6 .cm-formatting-list-ol`.
  Проверяемое свойство: `color`.

```hacksidian-files
unordered-e013
```
