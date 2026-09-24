---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Лигатуры отключены
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-06
```

```hacksidian-live
inline-code-ex-06
```

```hacksidian-details
> Зачем
Для инструкций, где нужно ясно различать каждый набираемый символ.

> Как работает
Приём отключает лигатуры через font-variant-ligatures:none. В примере первая строка служит контрольной: в ней лигатуры явно разрешены.

> Ограничения
В демо локально подключён JetBrains Mono с лигатурами. У шрифта без лигатур визуальной разницы не будет.

Живой пример подключает вложенный JetBrains Mono только внутри демонстрации. Применённый приём сохраняет ваш шрифт; эффект зависит от поддержки нужной OpenType-функции.
```
```hacksidian-sources
inline-code-ex-06
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.



```hacksidian-files
inline-code-ex-06
```
