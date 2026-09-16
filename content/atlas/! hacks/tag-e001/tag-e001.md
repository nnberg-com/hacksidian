---
tags:
  - hacksidian_technique
  - hacksidian_tag
title: Только акцентный цвет
category: tag
sources: []
format: markdown
themes:
  - minimal
  - its-theme
  - baseline
  - ebullientworks
---

```hacksidian-id
tag-e001
```

```hacksidian-live
tag-e001
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: тегов в режиме чтения и, где они были, фрагментов CodeMirror. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Спокойная навигационная метка внутри предложения.

> Как работает
Цвет отличает тег от основного текста; фон и рамка отсутствуют.
```

```hacksidian-sources
tag-e001
```

- Обзор оформления тегов опирался на Minimal, Blue Topaz и Things. Компактные рецепты и декоративные расширения составлены для атласа; это не подтверждение наличия каждого варианта во всех трёх темах.


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Plain tags** (`minimal-unstyled-tags`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L8267), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L1726).
  Селектор: `body.minimal-unstyled-tags`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Colored Text Tags** (`tag-text`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1731), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11992).
  Селектор: `.tag-text.tag-text`.
  Проверяемое свойство: `--tag-background`.
- [[atlas/! themes/baseline|Baseline]]: **Plain tags** (`unstyled-tags`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3121), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.unstyled-tags`.
  Условия CSS: `@media screen,print`
  Проверяемое свойство: `--tag-background`.
- [[atlas/! themes/ebullientworks|Ebullientworks]]: **Suppress/Remove this theme's tag styles** (`ebullientworks-nix-tags`) — [описание настройки](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L19), [реализация](https://github.com/ebullient/obsidian-theme-ebullientworks/blob/a4ea25406cb354561365e4e0f622941650c06218/theme.css#L1402).
  Селектор: `body:not(.ebullientworks-nix-tags)`.

```hacksidian-files
tag-e001
```
