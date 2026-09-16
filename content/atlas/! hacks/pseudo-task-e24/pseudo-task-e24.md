---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Слова вместо криптограммы
category: pseudo-task
sources:
  - https://github.com/AnubisNekhet/AnuPpuccin/blob/main/theme.css
format: markdown
themes:
  - anuppuccin
---

```hacksidian-id
pseudo-task-e24
```

```hacksidian-live
pseudo-task-e24
```

```hacksidian-details
> Зачем
Когда читателю не знаком словарь значков.

> Как работает
li::before выводит короткую подпись, отступ резервирует колонку.

> Ограничения
Подписи созданы CSS и не становятся частью Markdown.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e24
```

###### Локальные зависимости

- [assets/Onest.ttf](<./assets/Onest.ttf>)

```hacksidian-files
pseudo-task-e24
```
