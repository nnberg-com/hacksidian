---
tags:
  - hacksidian_technique
  - hacksidian_footnote
title: Развёрнутая сноска при печати
category: footnote
sources:
  - https://github.com/markdown-it/markdown-it-footnote
format: markdown
themes: []
---

```hacksidian-id
footnote-e053
```

```hacksidian-live
footnote-e053
```

```hacksidian-details
> Зачем
Все примечания попадают в печатную версию.

> Как работает
@media print отменяет fixed, скрытие, ограничение высоты и анимацию.

Нажмите ссылку внутри примера, чтобы выбрать цель и увидеть эффект `:target`. Встроенный просмотрщик воспроизводит это состояние локально, без перехода по всей карточке.

> Ограничения
В печати это концевые примечания. Распределение сносок по низу каждой печатной страницы обычный браузер здесь не выполняет.

Обычный CSS

Разметка сносок в режиме чтения отличается от Live Preview; совпадение поведения в редакторе этим примером не подтверждается.
```
```hacksidian-sources
footnote-e053
```

```hacksidian-files
footnote-e053
```
