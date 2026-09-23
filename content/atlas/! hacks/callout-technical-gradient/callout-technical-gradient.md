---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Растворяющаяся рамка
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - typomagical
---

```hacksidian-id
callout-technical-gradient
```

```hacksidian-live
callout-technical-gradient
```

```hacksidian-details
> Зачем
Выделяет левый край выноски; рамка постепенно растворяется вправо в цвете фона заметки.

> Как работает
Внутренний слой `background` заполняет выноску цветом `--background-primary`. Внешний слой рисует рамку толщиной 2 px: слева цвет типа выноски `--callout-color`, справа — тот же `--background-primary`. Поэтому рамка исчезает в фоне без жёстко заданного белого цвета.

> Ограничения
Цвет назначения — основной фон текущей темы Obsidian. Если выноска расположена на другом фоне, например внутри цветной выноски, полного слияния с окружением может не быть.
```

```hacksidian-sources
callout-technical-gradient
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/typomagical|Typomagical]]: **Callout style** (`callout-style`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1962), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1069).
  Селектор: `.callout-border-gradient .callout`.
  Проверяемое свойство: `border-image`.
  Варианты: Obsidian default (callout-default); Icon only (callout-icon-only); Icon and gradient border (callout-border-gradient)

```hacksidian-files
callout-technical-gradient
```
