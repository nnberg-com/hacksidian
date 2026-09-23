---
tags:
  - hacksidian_technique
  - hacksidian_taskplus
title: Цитата, источник и код внутри пункта
category: taskplus
sources:
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
taskplus-e43
```

```hacksidian-live
taskplus-e43
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
taskplus-e43
```

```hacksidian-files
taskplus-e43
```
