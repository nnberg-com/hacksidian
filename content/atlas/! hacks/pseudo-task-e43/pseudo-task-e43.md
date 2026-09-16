---
tags:
  - hacksidian_technique
  - hacksidian_pseudo-task
title: Цитата, источник и код внутри пункта
category: pseudo-task
sources:
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
pseudo-task-e43
```

```hacksidian-live
pseudo-task-e43
```

```hacksidian-details
> Зачем
Исследовательские записи с обычной Markdown-структурой.

> Как работает
CSS оформляет strong, blockquote, a и code, уже созданные Markdown-рендерером.

> Ограничения
Служебные карточки не вставляются в Markdown — карточкой становится li.

CSS меняет оформление, но не разбирает текстовые статусы и сроки и не сохраняет новое состояние задачи. Селекторы зависят от `data-task` и расположения checkbox в HTML; Live Preview использует другую разметку. Текст из `content` не заменяет доступное имя элемента.
```
```hacksidian-sources
pseudo-task-e43
```

```hacksidian-files
pseudo-task-e43
```
