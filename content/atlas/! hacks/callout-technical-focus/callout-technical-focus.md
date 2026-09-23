---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Реакция на наведение и фокус ссылки
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes: []
---

```hacksidian-id
callout-technical-focus
```

```hacksidian-live
callout-technical-focus
```

```hacksidian-details
> Зачем
Выделяет примечание, со ссылкой которого вы взаимодействуете мышью или клавиатурой.

> Как работает
При наведении на ссылку внутри тела выноски `:has(a:hover)` включает контур вокруг всей выноски. `:focus-within` сохраняет тот же акцент при клавиатурном фокусе внутри. Ссылка получает собственный тонкий контур.

> Ограничения
Наведите указатель именно на ссылку внутри примера или перейдите к ней клавишей Tab. Наведение на фон и обычный текст не включает подсветку. Доступность перехода по Tab зависит от режима и настроек Obsidian.
```

```hacksidian-sources
callout-technical-focus
```


```hacksidian-files
callout-technical-focus
```
