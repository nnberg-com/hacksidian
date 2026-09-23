---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Слова вместо криптограммы
category: taskplus
sources:
  - https://github.com/AnubisNekhet/AnuPpuccin/blob/main/theme.css
format: markdown
themes:
  - anuppuccin
---

```hacksidian-id
taskplus-e24
```

```hacksidian-live
taskplus-e24
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
taskplus-e24
```


```hacksidian-files
taskplus-e24
```
