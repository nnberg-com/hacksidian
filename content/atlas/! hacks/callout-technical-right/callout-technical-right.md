---
tags:
  - hacksidian_technique
  - hacksidian_parameter_experiment
  - hacksidian_callout
title: Акцент справа
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes: []
favourite: false
---

```hacksidian-id
callout-technical-right
```

```hacksidian-live
callout-technical-right
```

```hacksidian-details
> Зачем
Вариант для текста с активным левым краем.

> Как работает
Линия на логическом правом краю выноски рисуется отдельным псевдоэлементом `::after`. CSS-параметры задают толщину линии (по умолчанию 4px) и радиус её скругления (по умолчанию 0px). Скругляется сама линия, а не весь Callout.

Для полностью круглых концов задайте радиус, равный половине толщины линии: например, 2px при толщине 4px. Толщина 0px скрывает линию. Для включённого оформления используйте кнопку «Обновить уже существующий стиль».
```

```hacksidian-sources
callout-technical-right
```

###### Локальные зависимости

- [assets/abstract.svg](<./assets/abstract.svg>)
- [assets/bug.svg](<./assets/bug.svg>)
- [assets/danger.svg](<./assets/danger.svg>)
- [assets/example.svg](<./assets/example.svg>)
- [assets/failure.svg](<./assets/failure.svg>)
- [assets/info.svg](<./assets/info.svg>)
- [assets/note.svg](<./assets/note.svg>)
- [assets/question.svg](<./assets/question.svg>)
- [assets/quote.svg](<./assets/quote.svg>)
- [assets/success.svg](<./assets/success.svg>)
- [assets/tip.svg](<./assets/tip.svg>)
- [assets/todo.svg](<./assets/todo.svg>)
- [assets/warning.svg](<./assets/warning.svg>)

```hacksidian-files
callout-technical-right
```
