---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Незнакомый символ не пропадает
category: pseudo-task
sources:
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
pseudo-task-e26
```

```hacksidian-live
pseudo-task-e26
```

```hacksidian-details
> Зачем
Расширяемый личный словарь.

> Как работает
Базовый content:attr(data-task) показывает любой сохранённый символ; известные можно переопределить.

> Ограничения
Поддержка конкретного символа зависит от Markdown-рендерера. Этот сборщик допускает один Unicode-символ.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e26
```

```hacksidian-files
pseudo-task-e26
```
