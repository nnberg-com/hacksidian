---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Рисунок на цветной бумаге
category: image
sources: []
format: markdown
themes:
  - minimal
  - cupertino
  - baseline
  - fancy-a-story
---

```hacksidian-id
image-e037
```

```hacksidian-live
image-e037
```

```hacksidian-details
> Зачем
Визуально убирает белую подложку линейного рисунка.

> Как работает
multiply смешивает белый фон с цветом абзаца.
```

```hacksidian-sources
image-e037
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Blend images in light mode** (`image-blend-light`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7617), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3436).
  Селектор: `.image-blend-light`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.theme-light img[src$="#blend"], .theme-light div[src$="#blend"] img, .theme-light span[src$="#blend"] img`.
- [[atlas/! themes/baseline|Baseline]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.theme-light img[src$="#blend"], .theme-light div[src$="#blend"] img, .theme-light span[src$="#blend"] img`.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: правило CSS без отдельного переключателя — [исходник](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L222), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L222).
  Селектор: `.footer-img-accent>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-blue>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-brown>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-cyan>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-gray>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-green>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-orange>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-pink>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-purple>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-red>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img-yellow>.markdown-preview-section>div:nth-last-child(1 of div.el-p), .footer-img>.markdown-preview-section>div:nth-last-child(1 of div.el-p)`.
  Условия CSS: `@media screen`

```hacksidian-files
image-e037
```
