---
tags:
  - hacksidian_technique
  - hacksidian_composition
title: Билет на встречу
category: composition
sources:
  - https://github.com/emarpiee/Retroma/blob/main/assets/examples/retroma-retro-callouts.md
format: markdown
themes:
  - retroma
---

```hacksidian-id
composition-ticket
```

```hacksidian-live
composition-ticket
```

```hacksidian-details
> Зачем
Собрать событие, место и время в один компактный блок с отрывным корешком.

> Как работает
Основной callout хранит событие; вложенный callout — корешок. CSS Grid выделяет ему боковую колонку с перфорацией, на телефоне переносит вниз.

> Ограничения
Визуальная карточка события. Номер — текст из Markdown, без проверки доступа или бронирования.
```

```hacksidian-sources
composition-ticket
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/retroma|Retroma]]: описанный автором способ применения — [руководство](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/assets/examples/retroma-retro-callouts.md#L121), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L8614).
  Селектор: `body.rtm-ss-retro-callout .callout[data-callout="ticketstub"], body.rtm-ss-retro-callout .callout[data-callout="ticketstub-s"], body.rtm-ss-retro-callout .callout[data-callout="ticketstub-m"], body.rtm-ss-retro-callout .callout[data-callout="ticketstub-l"]`.
  Применение: Тип `ticketstub` оформляет заметку билетом; это декоративный документ.

```hacksidian-files
composition-ticket
```
