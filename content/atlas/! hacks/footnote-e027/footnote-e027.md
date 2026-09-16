---
tags:
  - hacksidian_technique
  - hacksidian_footnote
title: Подсветка абзаца при возврате
category: footnote
sources: []
format: markdown
themes: []
---

```hacksidian-id
footnote-e027
```

```hacksidian-live
footnote-e027
```

```hacksidian-details
> Зачем
Вернуть контекст, а не только маленький номер.

> Как работает
p:has(.footnote-ref a:target) находит абзац с выбранной меткой.

Нажмите ссылку внутри примера, чтобы выбрать цель и увидеть эффект `:target`. Встроенный просмотрщик воспроизводит это состояние локально, без перехода по всей карточке.

> Ограничения
:has()

Разметка сносок в режиме чтения отличается от Live Preview; совпадение поведения в редакторе этим примером не подтверждается.
```
```hacksidian-sources
footnote-e027
```

```hacksidian-files
footnote-e027
```
