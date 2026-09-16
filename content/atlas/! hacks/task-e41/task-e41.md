---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Подсветка строки
category: task
sources:
  - https://github.github.com/gfm/#task-list-items-extension-
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters
  - https://minimal.guide/checklists
format: markdown
themes:
  - minimal
---

```hacksidian-id
task-e41
```

```hacksidian-live
task-e41
```

```hacksidian-details
> Зачем
Не терять пункт при работе мышью или клавиатурой.

> Как работает
hover и focus-within меняют фон li. Для клавиатуры в задаче есть обычная ссылка.

> Ограничения
Наведите указатель или перейдите к ссылке клавишей Tab.
```

```hacksidian-sources
task-e41
```

###### Общие ограничения CSS-приёмов для задач
- CSS не читает смысл текста и не вычисляет просрочку из написанной даты.
- CSS не меняет Markdown и не создаёт работающий `label`.
- Альтернативные маркеры вроде `[/]` не входят в GFM task list.
- Проценты в исходном примере 48 рассчитаны правилами для фиксированных трёх пунктов.
- Визуальные счётчики и подписи не заменяют семантический статус приложения.


```hacksidian-files
task-e41
```
