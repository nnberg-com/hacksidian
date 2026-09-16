---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Перечёркнутый ноль
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-07
```

```hacksidian-details
> Зачем
Чтобы отличать ноль от буквы O в идентификаторах.

> Как работает
Вторая строка включает OpenType-вариант slashed-zero у JetBrains Mono.

> Ограничения
Шрифт с нужной функцией вложен в демо; CSS не рисует черту самостоятельно.

Живой пример пока не готов: рецепт требует специального шрифта, который встроенный просмотрщик ещё не подключает. Без него показывать эффект как работающий было бы неверно.
```
```hacksidian-sources
inline-code-ex-07
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


###### Локальные зависимости

- [assets/JetBrainsMono-Regular.ttf](<./assets/JetBrainsMono-Regular.ttf>)

```hacksidian-files
inline-code-ex-07
```
