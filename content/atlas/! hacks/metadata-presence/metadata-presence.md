---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Вид блока по наличию свойства
category: metadata
sources:
  - https://obsidian.md/help/properties
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: properties
themes: []
---

```hacksidian-id
metadata-presence
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Отличать карточки источников от обычных заметок.

> Как работает
Контейнер с полем source получает акцентный верхний край через :has([data-property-key=source]).

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-presence
```

```hacksidian-files
metadata-presence
```
