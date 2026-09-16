---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Значки по адресам ссылок
category: metadata
sources:
  - https://github.com/kepano/obsidian-minimal
  - https://obsidian.md/help/properties
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: properties
themes:
  - minimal
---

```hacksidian-id
metadata-link-domain
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Различать ссылку на репозиторий и справочный материал.

> Как работает
href содержит адрес: селектор атрибута добавляет короткую метку через ::before.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-link-domain
```

```hacksidian-files
metadata-link-domain
```
