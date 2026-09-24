---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Маленькое без растягивания
category: image
sources: []
format: markdown
themes: []
---

```hacksidian-id
image-e003
```

```hacksidian-live
image-e003
```

```hacksidian-details
> Зачем
Иконки и небольшие исходники не увеличиваются до размера колонки.

> Как работает
width:auto сбрасывает принудительное растягивание и возвращает собственный размер изображения. В примере это пиксельная иконка 16×16px. max-width:100% уменьшит слишком большой исходник, а height:auto сохранит пропорции. В отличие от image-e001, приём явно сбрасывает width, если тема растягивает картинки.
```

```hacksidian-sources
image-e003
```


```hacksidian-files
image-e003
```
