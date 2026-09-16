---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Спрятанные технические поля
category: metadata
sources:
  - https://forum.obsidian.md/t/properties-view-css-the-fall-collection/66512
format: properties
themes: []
---

```hacksidian-id
metadata-technical
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Убрать cssclasses и внутренний ID из основной формы.

> Как работает
Точное сопоставление data-property-key. В HTML и исходном YAML поля остаются.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-technical
```

```hacksidian-files
metadata-technical
```
