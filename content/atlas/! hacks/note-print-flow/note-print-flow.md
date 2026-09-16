---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Разрывы страниц и висячие строки
category: note
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing
format: markdown
themes:
  - blue-topaz
  - maple
  - everforest-enchanted
---

```hacksidian-id
note-print-flow
```

```hacksidian-details
> Зачем
Печатная памятка или PDF из браузера.

> Как работает
@media print задаёт break-after:avoid заголовкам, break-inside:avoid коротким цитатам и пунктам, widows/orphans абзацам.

> Ограничения
Это пожелания алгоритму пагинации. Блок длиннее страницы всё равно придётся разбить.

Встроенного экранного примера нет: эффект проявляется при печати или экспорте в PDF. Проверять его нужно на отдельной заметке в этом режиме.
```
```hacksidian-sources
note-print-flow
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Use hr (---) for paging** (`hr-for-pagination`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2970), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L25986).
  Селектор: `body.hr-for-pagination .markdown-rendered hr`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `break-after`.
- [[atlas/! themes/maple|Maple]]: **Standard Spacing Between Paragraphs and List** (`pdf-export-standard`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L2061), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L6532).
  Селектор: `body.pdf-export-standard p`.
  Условия CSS: `@media print`
  Проверяемое свойство: `widows`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2810), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L2810).
  Селектор: `hr.page-break`.
  Условия CSS: `@media print`

```hacksidian-files
note-print-flow
```
