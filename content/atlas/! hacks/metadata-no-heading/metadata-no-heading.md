---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Без заголовка Properties
category: metadata
sources:
  - https://github.com/kepano/obsidian-minimal/blob/master/theme.css
format: properties
themes:
  - minimal
  - willemstad
  - pln
  - baseline
---

```hacksidian-id
metadata-no-heading
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: Properties и строк редактора. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Убрать повторяющуюся подпись в заметках с очевидной структурой.

> Как работает
display: none у всей строки заголовка.

> Ограничения
Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
```hacksidian-sources
metadata-no-heading
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Hide properties heading** (`metadata-heading-off`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7903), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L716).
  Селектор: `body.metadata-heading-off .metadata-properties-heading`.
- [[atlas/! themes/willemstad|Willemstad]]: **Hide 'Properties' Title** (`ssopt-hide-properties-title`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L49367), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28466).
  Селектор: `body:is(.ssopt-hide-properties-title) .metadata-properties-heading`.
- [[atlas/! themes/pln|PLN]]: **Hide properties heading** (`pln-props-heading`) — [описание настройки](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L512), [реализация](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L1078).
  Селектор: `:is(body).pln-props-heading .metadata-properties-heading`.
- [[atlas/! themes/baseline|Baseline]]: **Hide property heading** (`metadata-heading-off`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1666), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.metadata-heading-off .metadata-properties-heading`.
  Условия CSS: `@media screen,print`

```hacksidian-files
metadata-no-heading
```
