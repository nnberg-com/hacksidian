---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Единый формат кадра
category: image
sources:
  - https://spec.commonmark.org/0.31.2/#images
format: markdown
themes: []
---

```hacksidian-id
image-crop
```

```hacksidian-live
image-crop
```

```hacksidian-details
> Зачем
Подборки изображений разного размера.

> Как работает
Изображение занимает всю ширину колонки и получает широкий кадр 16:7. object-fit:cover сохраняет пропорции исходника, обрезая лишнее по центру; картинка не растягивается с искажением. Это фиксированный вариант «Масштаба с обрезкой» (image-e010), без настроек ширины, пропорции и положения кадра.

> Ограничения
Часть изображения обрезается. Для схем и текста внутри картинки обычно лучше object-fit:contain.
```

```hacksidian-sources
image-crop
```


```hacksidian-files
image-crop
```
