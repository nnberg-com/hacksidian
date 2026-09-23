---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Негатив
category: image
sources: []
format: markdown
themes:
  - minimal
  - its-theme
  - prism
  - cupertino
  - baseline
  - yin-and-yang
---

```hacksidian-id
image-e034
```

```hacksidian-live
image-e034
```

```hacksidian-details
> Зачем
Экспериментальная графика и технические иллюстрации.

> Как работает
Фильтр изменяет только отображение исходного файла.
```

```hacksidian-sources
image-e034
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: правило CSS без отдельного переключателя — [исходник](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3468), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L3468).
  Селектор: `.theme-dark img[src$="#invert"], .theme-dark div[src$="#invert"] img, .theme-dark span[src$="#invert"] img`.
- [[atlas/! themes/its-theme|ITS Theme]]: правило CSS без отдельного переключателя — [исходник](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7618), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L7618).
  Селектор: `.theme-dark img[alt*=invertb], .theme-dark .image-embed[src*="#invertb"]`.
- [[atlas/! themes/prism|Prism]]: правило CSS без отдельного переключателя — [исходник](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L5415), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L5415).
  Селектор: `.pt-pdf-dark-theme.theme-dark .pdfViewer .canvasWrapper, .pt-pdf-dark-theme.theme-dark .pdf-sidebar-container img.thumbnailImage`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.theme-light img[src$="#invertW"], .theme-light div[src$="#invertW"] img, .theme-light span[src$=invertW] img`.
- [[atlas/! themes/baseline|Baseline]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `.theme-light img[src$="#invertW"], .theme-light div[src$="#invertW"] img, .theme-light span[src$=invertW] img`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4425), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4425).
  Селектор: `.theme-dark img[alt*="invertdark"]`.

```hacksidian-files
image-e034
```
