---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Шкала заголовков H1–H6
category: note
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters
format: markdown
themes:
  - typomagical
  - kakano
  - origami
---

```hacksidian-id
note-hierarchy
```

```hacksidian-live
note-hierarchy
```

```hacksidian-details
> Зачем
Многоуровневая справочная заметка.

> Как работает
Размер и насыщенность уменьшаются по уровню; младшие заголовки сохраняют читаемый размер.
```

```hacksidian-sources
note-hierarchy
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/typomagical|Typomagical]]: **Heading scale** (`text-scale`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L654), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L79).
  Селектор: `body.type-scale-none`.
  Проверяемое свойство: `--h6-size`.
  Варианты: 1.00 No scaling (type-scale-none); 1.067 Minor Second (type-scale-minor-second); 1.125 Major Second (type-scale-major-second); 1.20 Minor Third (type-scale-minor-third); 1.25 Major Third (type-scale-major-third)
- [[atlas/! themes/typomagical|Typomagical]]: **Source mode heading size reset** (`source-mode-headings-regular`) — [описание настройки](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L677), [реализация](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L788).
  Селектор: `body:not(.source-mode-headings-regular) .markdown-source-view:not(.is-live-preview)`.
  Проверяемое свойство: `--h1-size`.
- [[atlas/! themes/kakano|Kakano]]: **Heading scale factor – desktop/tablet** (`theme-setting-headingScaleFactor`) — [описание настройки](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L257), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L1771).
  Селектор: `body.theme-setting-headingScaleFactor1point067`.
  Варианты: 1.067 - Minor Second (theme-setting-headingScaleFactor1point067); 1.125 - Major Second (theme-setting-headingScaleFactor1point125); 1.200 - Minor Third (theme-setting-headingScaleFactor1point2); 1.250 - Major Third (theme-setting-headingScaleFactor1point25); 1.333 - Perfect Fourth (theme-setting-headingScaleFactor1point333); 1.414 - Augmented Fourth (theme-setting-headingScaleFactor1point414); 1.500 - Perfect Fifth (theme-setting-headingScaleFactor1point5); 1.618 - Golden Ratio (theme-setting-headingScaleFactor1point618)
- [[atlas/! themes/kakano|Kakano]]: **Heading scale factor – phone** (`theme-setting-headingScaleFactorPhone`) — [описание настройки](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L289), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L1866).
  Селектор: `body.is-phone.theme-setting-headingScaleFactorPhone1point067`.
  Варианты: 1.067 - Minor Second (theme-setting-headingScaleFactorPhone1point067); 1.125 - Major Second (theme-setting-headingScaleFactorPhone1point125); 1.200 - Minor Third (theme-setting-headingScaleFactorPhone1point2); 1.250 - Major Third (theme-setting-headingScaleFactorPhone1point25); 1.333 - Perfect Fourth (theme-setting-headingScaleFactorPhone1point333); 1.414 - Augmented Fourth (theme-setting-headingScaleFactorPhone1point414); 1.500 - Perfect Fifth (theme-setting-headingScaleFactorPhone1point5); 1.618 - Golden Ratio (theme-setting-headingScaleFactorPhone1point618)
- [[atlas/! themes/origami|Origami]]: **header size arrays** (`o-header-size`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L238), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L5016).
  Селектор: `.o-headings-origami`.
  Варианты: origami (o-headings-origami); origami small (o-headings-origami-smaller); opinionated (o-headings-opinionated); descending (o-headings-descending); flat (o-headings-flat); fabulous (o-headings-fabulous)

```hacksidian-files
note-hierarchy
```
