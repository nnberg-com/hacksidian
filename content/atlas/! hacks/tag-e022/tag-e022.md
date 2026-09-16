---
tags:
  - hacksidian_technique
  - hacksidian_tag
title: Контурная капсула
category: tag
sources: []
format: markdown
themes:
  - its-theme
  - pln
  - maple
  - composer
---

```hacksidian-id
tag-e022
```

```hacksidian-live
tag-e022
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: тегов в режиме чтения и, где они были, фрагментов CodeMirror. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Компактная навигация без тяжёлых цветных пятен.

> Как работает
Прозрачный фон и тонкая граница.
```

```hacksidian-sources
tag-e022
```

- Обзор оформления тегов опирался на Minimal, Blue Topaz и Things. Компактные рецепты и декоративные расширения составлены для атласа; это не подтверждение наличия каждого варианта во всех трёх темах.


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/its-theme|ITS Theme]]: **Outline Tags** (`tag-outline`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1748), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11984).
  Селектор: `.tag-outline`.
  Проверяемое свойство: `--tag-border-width`.
- [[atlas/! themes/pln|PLN]]: **Box tags** (`pln-boxed-tags`) — [описание настройки](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L373), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1768).
  Селектор: `:is(.pln-boxed-tags)`.
  Проверяемое свойство: `--tag-border-width`.
- [[atlas/! themes/maple|Maple]]: **Tag Style** (`tag-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1968), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5645).
  Селектор: `.tag-outline`.
  Проверяемое свойство: `--tag-border-width`.
  Варианты: Default (tag-default); Plain (tag-plain); Outline (tag-outline); Fill (tag-fill)
- [[atlas/! themes/composer|Composer]]: **Simple Tag Style** (`composer--ComponentsSimpleTag`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L598), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L2950).
  Селектор: `.composer--ComponentsSimpleTag .theme-dark .components--tag, .composer--ComponentsSimpleTag .components--tag`.
  Проверяемое свойство: `border`.

```hacksidian-files
tag-e022
```
