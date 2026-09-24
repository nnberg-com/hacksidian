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

```hacksidian-live
inline-code-ex-07
```

```hacksidian-details
> Зачем
Чтобы отличать ноль от буквы O в идентификаторах.

> Как работает
Приём включает OpenType-вариант slashed-zero. В первой строке примера эта функция явно отключена для сравнения.

> Ограничения
Шрифт с нужной функцией вложен в демо; CSS не рисует черту самостоятельно.

Живой пример подключает вложенный JetBrains Mono только внутри демонстрации. Применённый приём сохраняет ваш шрифт; эффект зависит от поддержки нужной OpenType-функции.
```
```hacksidian-sources
inline-code-ex-07
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.



```hacksidian-files
inline-code-ex-07
```
