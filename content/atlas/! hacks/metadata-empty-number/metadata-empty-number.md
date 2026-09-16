---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Пустое число и настоящее значение 0
category: metadata
sources:
  - https://forum.obsidian.md/t/minimal-properties/104415
format: properties
themes: []
---

```hacksidian-id
metadata-empty-number
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Не путать отсутствие значения с нулевой оценкой.

> Как работает
input:placeholder-shown проверяет показ placeholder. Поле с 0 остаётся заполненным.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-empty-number
```

```hacksidian-files
metadata-empty-number
```
