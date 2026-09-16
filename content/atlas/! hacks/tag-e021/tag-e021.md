---
tags:
  - hacksidian_technique
  - hacksidian_tag
title: Мягкая капсула
category: tag
sources: []
format: markdown
themes:
  - its-theme
  - catppuccin
---

```hacksidian-id
tag-e021
```

```hacksidian-live
tag-e021
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: тегов в режиме чтения и, где они были, фрагментов CodeMirror. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Универсальный тег в каталоге.

> Как работает
Фон, боковые отступы и большой радиус.
```

```hacksidian-sources
tag-e021
```

- Обзор оформления тегов опирался на Minimal, Blue Topaz и Things. Компактные рецепты и декоративные расширения составлены для атласа; это не подтверждение наличия каждого варианта во всех трёх темах.


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/its-theme|ITS Theme]]: **Tag Radius Style** (`ITS-Tag-Style`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1735), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11974).
  Селектор: `.tag-notion.tag-notion`.
  Проверяемое свойство: `--tag-radius`.
  Варианты: Bubble Tags (tag-bubble); Notion Tags (tag-notion)
- [[atlas/! themes/catppuccin|Catppuccin]]: **Pill-shaped tags** (`ctp-tag-pill`) — [описание настройки](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1329), [реализация](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L2339).
  Селектор: `body:not(.ctp-tag-pill) .cm-hashtag.cm-hashtag-end`.

```hacksidian-files
tag-e021
```
