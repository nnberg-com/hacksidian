---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Галерея из списка картинок
category: image
sources:
  - https://spec.commonmark.org/0.31.2/#images
format: markdown
themes:
  - blue-topaz
  - baseline
---

```hacksidian-id
image-gallery
```

```hacksidian-live
image-gallery
```

```hacksidian-details
> Зачем
Несколько визуальных наблюдений рядом.

> Как работает
ul с изображениями превращается в grid; каждому img задаётся одинаковое соотношение сторон.

> Ограничения
Правило выбирает все списки с изображениями. Для смешанного содержимого нужна более строгая структурная договорённость.
```

```hacksidian-sources
image-gallery
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Enable global image grid** (`img-grid`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3504), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10336).
  Селектор: `.img-grid :is(.markdown-preview-section,.markdown-rendered)>div>p>.image-embed[alt*="."]:last-child`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/baseline|Baseline]]: **Always show image grids** (`img-grid`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2969), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.img-grid .markdown-preview-section .el-p>p:has(>.image-embed):has(span:last-child), .img-grid .markdown-preview-section .el-p>p:has(>img):not(:has(>:not(img)))`.
  Условия CSS: `@media screen,print`
  Проверяемое свойство: `display`.

```hacksidian-files
image-gallery
```
