---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Незнакомый символ не пропадает
category: taskplus
sources:
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
taskplus-e26
```

```hacksidian-live
taskplus-e26
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
taskplus-e26
```

```hacksidian-files
taskplus-e26
```
