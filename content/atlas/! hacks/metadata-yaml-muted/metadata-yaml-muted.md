---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Активная строка контрастнее
category: metadata
sources:
  - https://forum.obsidian.md/t/snippet-muted-frontmatter-in-livepreview/55396
format: properties
themes: []
---

```hacksidian-id
metadata-yaml-muted
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Не отвлекаться на YAML вне текущего места редактирования.

> Как работает
В Obsidian активную строку отмечает .cm-active. В этой странице фокус на строке имитирует его через :focus.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-yaml-muted
```

```hacksidian-files
metadata-yaml-muted
```
