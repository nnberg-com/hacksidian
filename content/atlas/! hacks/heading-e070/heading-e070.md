---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: Появление при прокрутке
category: heading
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
format: markdown
themes: []
---

```hacksidian-id
heading-e070
```

```hacksidian-live
heading-e070
```

```hacksidian-details
> Зачем
Связывает проявление названия с его входом в видимую область.

> Как работает
view() использует видимость заголовка в ближайшем скроллере. В неподдерживающем браузере остаётся обычный текст.

> Ограничения
Только обычные абзацы и заголовок. Высота и overflow контейнера создают локальную сцену; без поддержки view() текст остаётся статичным.
```

```hacksidian-sources
heading-e070
```

```hacksidian-files
heading-e070
```
