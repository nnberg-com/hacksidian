---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Рамка при системном повышенном контрасте
category: code
sources: []
format: markdown
themes: []
---

```hacksidian-id
code-e058
```

```hacksidian-live
code-e058
```

```hacksidian-details
> Зачем
Сохранить границу блока, когда пользователь усиливает контраст.

> Как работает
В обычном режиме приём ничего не меняет. При prefers-contrast: more появляется рамка толщиной 2 px. При forced-colors: active используются системные цвета текста, фона и рамки. Это адаптация границ блока к системной настройке, а не усиление цветов синтаксиса.

> Ограничения
Эффект виден при соответствующей настройке браузера или системы. Декоративный фон может быть отключён системой.
```

```hacksidian-sources
code-e058
```

```hacksidian-files
code-e058
```
