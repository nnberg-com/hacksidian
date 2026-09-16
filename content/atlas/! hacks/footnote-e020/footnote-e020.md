---
tags:
  - hacksidian_technique
  - hacksidian_footnote
title: Счётчик в отдельном кружке
category: footnote
sources: []
format: markdown
themes: []
---

```hacksidian-id
footnote-e020
```

```hacksidian-live
footnote-e020
```

```hacksidian-details
> Зачем
Полный контроль над формой номера в списке.

> Как работает
Счётчик увеличивается только на li внешнего списка, а не на ссылки в тексте. ::before рисует номер.

> Ограничения
Порядок списка должен совпадать с нумерацией рендерера. Скрывать или переставлять отдельные пункты после этого нельзя без пересмотра счётчика.

Обычный CSS

Разметка сносок в режиме чтения отличается от Live Preview; совпадение поведения в редакторе этим примером не подтверждается.
```
```hacksidian-sources
footnote-e020
```

```hacksidian-files
footnote-e020
```
