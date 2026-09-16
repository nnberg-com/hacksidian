---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Пустые необязательные поля появляются
category: metadata
sources:
  - https://forum.obsidian.md/t/properties-view-css-the-fall-collection/66512
format: properties
themes: []
---

```hacksidian-id
metadata-empty-hide
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Сократить форму до заполненных свойств и вернуть пустые при взаимодействии.

> Как работает
Пустые текстовые строки скрыты только на устройствах с мышью, вне hover и focus-within контейнера.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-empty-hide
```

```hacksidian-files
metadata-empty-hide
```
