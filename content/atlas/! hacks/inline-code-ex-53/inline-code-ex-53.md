---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Выделение фрагмента целиком
category: inline-code
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-53
```

```hacksidian-live
inline-code-ex-53
```

```hacksidian-details
> Зачем
Для команд, которые обычно копируют полностью.

> Как работает
user-select:all делает текст code атомарной единицей выделения. Когда весь текст фрагмента выделен, плагин подсвечивает его подложку целиком, включая отступы и текущие скруглённые углы. Текст и содержимое буфера обмена не меняются.

> Ограничения
Подсветка всей подложки требует работающего плагина и режима чтения; один CSS сохраняет только атомарное выделение текста. Это не кнопка копирования. Выделить отдельный аргумент становится сложнее.
```

```hacksidian-sources
inline-code-ex-53
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-53
```
