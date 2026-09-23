---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Лигатуры
category: heading
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/OpenType_fonts
format: markdown
themes:
  - typomagical
---

```hacksidian-id
heading-e074
```

```hacksidian-details
> Зачем
Объединяет некоторые пары букв в один согласованный знак.

> Как работает
font-variant-ligatures переключает common-ligatures. Здесь латинское ffi и fi в Roboto Flex.

> Ограничения
Эффект зависит от наличия конкретной лигатуры в шрифте.

Живой пример пока не готов: рецепт требует специального шрифта, который встроенный просмотрщик ещё не подключает. Без него показывать эффект как работающий было бы неверно.
```
Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e074
```

###### Локальные зависимости

- [assets/RobotoFlex.ttf](<./assets/RobotoFlex.ttf>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/typomagical|Typomagical]]: **Heading ligatures** (`heading-ligatures`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L691), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L766).
  Селектор: `.css-settings-manager.heading-ligatures h1, .css-settings-manager.heading-ligatures .cm-header-1, .css-settings-manager.heading-ligatures .inline-title, .css-settings-manager.heading-ligatures h2, .css-settings-manager.heading-ligatures .cm-header-2, .css-settings-manager.heading-ligatures h3, .css-settings-manager.heading-ligatures .cm-header-3, .css-settings-manager.heading-ligatures h4, .css-settings-manager.heading-ligatures .cm-header-4, .css-settings-manager.heading-ligatures h5, .css-settings-manager.heading-ligatures .cm-header-5, .css-settings-manager.heading-ligatures h6, .css-settings-manager.heading-ligatures .cm-header-6`.

```hacksidian-files
heading-e074
```
