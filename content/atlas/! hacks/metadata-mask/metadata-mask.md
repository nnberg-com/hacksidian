---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Иконка из SVG-маски
category: metadata
sources:
  - https://forum.obsidian.md/t/minimal-properties/104415
format: properties
themes: []
---

```hacksidian-id
metadata-mask
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Сделать характерный знак метаданных, который перекрашивается вместе с темой.

> Как работает
before создаёт квадрат, mask-image вырезает силуэт, background-color задаёт цвет.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-mask
```

```hacksidian-files
metadata-mask
```
