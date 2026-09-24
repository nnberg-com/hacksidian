---
tags:
  - hacksidian_technique
  - hacksidian_image
title: Рамка и тень для screenshot
category: image
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors
format: markdown
themes: []
---

```hacksidian-id
image-technical-shadow
```

```hacksidian-live
image-technical-shadow
```

```hacksidian-details
> Зачем
Автоматически выделять скриншоты рамкой и мягкой тенью, как в callout-technical-shadow.

> Как работает
Селектор img[src*="screenshot" i] выбирает изображения, в адресе которых встречается screenshot, без учёта регистра: screenshot.png, Screenshot-01.png и my-screenshot.png.

Фон, рамка, отступы и тень взяты из callout-technical-shadow. Ограничение ширины оставляет место для боковых отступов. Размер, заданный в Markdown, сохраняется, пока изображение помещается в строку.

Параметр «Скругление» задаёт радиус углов: по умолчанию 0.5em, диапазон от 0 до 4em с шагом 0.1em. Значение 0 убирает скругление.

Работает с отображаемыми изображениями в режиме чтения и Live Preview, если src сохраняет имя файла. Подпись и alt на выбор не влияют.

> Ограничения
CSS проверяет весь src, а не только имя файла: screenshot в названии папки или параметрах URL тоже вызовет оформление. Совпадение ищется как подстрока, а не отдельное слово. Для адресов blob: или data: без исходного имени этот способ не подходит.
```

```hacksidian-sources
image-technical-shadow
```

```hacksidian-files
image-technical-shadow
```
