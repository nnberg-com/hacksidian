---
tags:
  - hacksidian_technique
  - hacksidian_ordered
title: Крупные номера шагов
category: ordered
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/::marker
format: markdown
themes: []
---

```hacksidian-id
ordered-steps
```

```hacksidian-live
ordered-steps
```

```hacksidian-details
> Зачем
Пошаговая инструкция с пояснением каждого действия.

> Как работает
ol задаёт счётчик; li::before рисует номер в круге. Каждый пункт уже является контейнером.

> Ограничения
Демонстрационный счётчик начинается с 1. Для ol с другим start используйте нативную нумерацию или отдельное правило.
```

```hacksidian-sources
ordered-steps
```

```hacksidian-files
ordered-steps
```
