---
tags:
  - hacksidian_technique
  - hacksidian_footnote
title: Карточка у номера по клику
category: footnote
sources: []
format: markdown
themes: []
---

```hacksidian-id
footnote-e043
```

```hacksidian-details
> Зачем
Читать короткую сноску рядом с фразой.

> Как работает
Ссылка объявлена anchor-name, li получает position-anchor и position-area:bottom. Запасные положения помогают у края окна.

> Ограничения
Без поддержки якорей работает обычный переход к списку. Это позиционированный li, а не нативный popover; предки с overflow могут его обрезать.

Anchor Positioning

Разметка сносок в режиме чтения отличается от Live Preview; совпадение поведения в редакторе этим примером не подтверждается.

Живой пример пока не готов: CSS использует идентификаторы сносок старого HTML-генератора. Нужна адаптация к разметке Obsidian; отсутствие примера здесь — незавершённая работа.
```
```hacksidian-sources
footnote-e043
```

```hacksidian-files
footnote-e043
```
