---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Скрыт только ответ, вопрос виден
category: taskplus
sources:
  - https://forum.obsidian.md/t/spoiler-css-snippet/80140
format: markdown
themes: []
---

```hacksidian-id
taskplus-e32
```

```hacksidian-live
taskplus-e32
```

```hacksidian-details
> Зачем
Упражнения с постоянно видимым вопросом.

> Как работает
Вложенный blockquote получается обычным Markdown. Его видимость управляется наведением и фокусом родителя.

> Ограничения
Для сенсорного экрана предпочтительнее постоянно видимый ответ; hover ненадёжен.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
taskplus-e32
```

```hacksidian-files
taskplus-e32
```
