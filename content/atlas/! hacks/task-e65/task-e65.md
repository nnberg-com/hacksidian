---
tags:
  - hacksidian_technique
  - hacksidian_parameter_experiment
  - hacksidian_task
title: Итог на заголовке раздела
category: task
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
format: markdown
themes: []
favourite: true
---

```hacksidian-id
task-e65
```

```hacksidian-live
task-e65
```

```hacksidian-details
> Зачем
Видеть готовность списка ещё до чтения пунктов.

> Как работает
h2:has(+ ul …) смотрит на следующий список и меняет подпись заголовка.

Параметр «Подпись завершённого раздела» задаёт текст через CSS-переменную; по умолчанию — «готово». Можно ввести, например, «done» или оставить поле пустым. Разделитель и галочка сохраняются. Подпись незавершённого раздела остаётся «в работе». Для включённого оформления используйте кнопку «Обновить уже существующий стиль».

> Ограничения
Список должен непосредственно следовать за заголовком. ID заголовка для этого приёма не нужен.
```

```hacksidian-sources
task-e65
```

```hacksidian-files
task-e65
```
