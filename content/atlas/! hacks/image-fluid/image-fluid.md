---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Изображение по ширине заметки
category: image
sources:
  - https://spec.commonmark.org/0.31.2/#images
format: markdown
themes:
  - shimmering-focus
  - cupertino
  - baseline
---

```hacksidian-id
image-fluid
```

```hacksidian-live
image-fluid
```

```hacksidian-details
> Зачем
Иллюстрация, которая не раздвигает страницу.

> Как работает
max-inline-size:100% и height:auto сохраняют пропорции; display:block убирает зазор текстовой строки.
```

```hacksidian-sources
image-fluid
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **between reduced and full image size** (`max-image-size-toggle`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L396), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `body:not(.is-mobile,.max-image-size-toggle) .workspace-leaf-content:not([data-type=image]) img:not(:active), body:not(.is-mobile,.max-image-size-toggle) .oz-image-widget-cm6>img:not(:active)`.
  Проверяемое свойство: `max-width`.
- [[atlas/! themes/cupertino|Cupertino]]: описанный автором способ применения — [руководство](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/README.md#L81), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-p p:has(img), body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-iframe, body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .cm-content .image-embed`.
  Применение: cssclasses: [img-100] задаёт изображению полную доступную ширину.
- [[atlas/! themes/cupertino|Cupertino]]: **Disable full-width elements** (`full-width-media-off`) — [описание настройки](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L94), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `body:not(.full-width-media-off) .markdown-preview-sizer .image-embed:not([width]), body:not(.full-width-media-off) .markdown-preview-sizer .image-embed:not([width])>.image-wrapper, body:not(.full-width-media-off) .markdown-preview-sizer iframe, body:not(.full-width-media-off) .markdown-preview-sizer video, body:not(.full-width-media-off) .markdown-preview-sizer img:not([width],.cm-widgetBuffer,.link-favicon,.emoji,[alt=banner]), body:not(.full-width-media-off) .cm-content .image-embed:not([width]), body:not(.full-width-media-off) .cm-content .image-embed:not([width])>.image-wrapper, body:not(.full-width-media-off) .cm-content iframe, body:not(.full-width-media-off) .cm-content video, body:not(.full-width-media-off) .cm-content img:not([width],.cm-widgetBuffer,.link-favicon,.emoji,[alt=banner])`.
  Условия CSS: `@media screen,print`
  Проверяемое свойство: `width`.
- [[atlas/! themes/baseline|Baseline]]: описанный автором способ применения — [руководство](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/README.md#L83), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body:not(.block-width-off):is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-p p:has(img), body:not(.block-width-off):is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-iframe, body:not(.block-width-off):is(.img-wide,.img-max,.img-100) .cm-content .image-embed, body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-p p:has(img), body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-iframe, body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .cm-content .image-embed`.
  Применение: cssclasses: [img-100] задаёт изображению полную доступную ширину.
- [[atlas/! themes/baseline|Baseline]]: **Media width** (`media-width`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2942), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .markdown-preview-sizer .image-embed:not([width]), body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .markdown-preview-sizer .image-embed:not([width])>.image-wrapper, body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .markdown-preview-sizer iframe, body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .markdown-preview-sizer video, body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .markdown-preview-sizer img:not([width],.cm-widgetBuffer,.link-favicon,.emoji,[alt=banner]), body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .cm-content .image-embed:not([width]), body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .cm-content .image-embed:not([width])>.image-wrapper, body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .cm-content iframe, body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .cm-content video, body:is(.media-width-full,.media-width-full-always,:not(.css-settings-manager)) .cm-content img:not([width],.cm-widgetBuffer,.link-favicon,.emoji,[alt=banner])`.
  Условия CSS: `@media screen,print`
  Проверяемое свойство: `width`.
  Варианты: Full width (media-width-full); Full width (Always) (media-width-full-always); Auto (media-width-fit); Auto (Center) (media-width-fit-center)
- [[atlas/! themes/baseline|Baseline]]: **Image block width** (`image-block-width`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1540), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body:not(.block-width-off):is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-p p:has(img), body:not(.block-width-off):is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-iframe, body:not(.block-width-off):is(.img-wide,.img-max,.img-100) .cm-content .image-embed, body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-p p:has(img), body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .markdown-preview-sizer>.el-iframe, body:not(.block-width-off) div:is(.img-wide,.img-max,.img-100) .cm-content .image-embed`.
  Варианты: Default (img-normal); Wide line width (img-wide); Maximum line width (img-max); 100% pane width (img-100)

```hacksidian-files
image-fluid
```
