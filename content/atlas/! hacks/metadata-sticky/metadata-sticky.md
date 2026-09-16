---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: "Закреплённый паспорт: ограниченный стенд"
category: metadata
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position
format: properties
themes: []
---

```hacksidian-id
metadata-sticky
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Держать свойства на виду при прокрутке длинного документа.

> Как работает
position: sticky, top, непрозрачный фон и z-index. В образце заранее создан подходящий scroll-контейнер.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-sticky
```

```hacksidian-files
metadata-sticky
```
