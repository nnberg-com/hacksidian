---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Прогресс прокрутки
category: code
sources: []
format: markdown
themes: []
---

```hacksidian-id
code-e060
```

```hacksidian-live
code-e060
```

```hacksidian-details
> Зачем
Показать, какая доля длинного листинга уже прокручена.

> Как работает
Полоска pre::before закреплена сверху. Её scaleX связан с вертикальной прокруткой родителя через animation-timeline: scroll(nearest block).

> Ограничения
Прокрутите от начала до конца: полоска вырастет от 0 до 100%. В неподдерживающем браузере остаются обычный прокручиваемый лог и явная пометка.
```

```hacksidian-sources
code-e060
```

```hacksidian-files
code-e060
```
