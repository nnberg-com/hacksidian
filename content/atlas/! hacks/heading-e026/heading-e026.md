---
tags:
  - hacksidian_technique
  - hacksidian_heading
title: След маркера
category: heading
sources: []
format: markdown
themes: []
---

```hacksidian-id
heading-e026
```

```hacksidian-live
heading-e026
```

```hacksidian-details
> Зачем
Подсвечивает нижнюю часть букв, оставляя верх открытым.

> Как работает
Markdown *…* создаёт строчный em. На нём CSS рисует подложку; box-decoration-break: clone повторяет оформление на каждой строке.

> Ограничения
Здесь выделен весь текст заголовка средствами Markdown. Специальный span не нужен.
```

Параметр «Уровень заголовка» выбирает H1–H6 в Preview mode. Пример перестраивается под выбранный уровень; исходная заметка не изменяется. Остальные параметры настраиваются независимо.

```hacksidian-sources
heading-e026
```

```hacksidian-files
heading-e026
```
