---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Плашки вокруг значений
category: metadata
sources:
  - https://forum.obsidian.md/t/option-to-hide-frontmatter-in-live-preview/28090
format: properties
themes: []
---

```hacksidian-id
metadata-yaml-chips
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Придать исходнику более визуальный вид, сохранив строки YAML.

> Как работает
Фон, радиус и box-decoration-break: clone у строковых и числовых токенов; на активной строке декор снимается.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-yaml-chips
```

```hacksidian-files
metadata-yaml-chips
```
