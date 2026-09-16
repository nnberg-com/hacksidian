---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Отдельная типографика YAML
category: metadata
sources:
  - https://forum.obsidian.md/t/modifying-the-style-of-frontmatter-in-source-mode/66574
format: properties
themes: []
---

```hacksidian-id
metadata-yaml-font
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Сделать служебный исходник компактным и легко узнаваемым.

> Как работает
Шрифт и размер применены к строке с frontmatter. Моноширинная гарнитура сохраняет выравнивание.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-yaml-font
```

```hacksidian-files
metadata-yaml-font
```
