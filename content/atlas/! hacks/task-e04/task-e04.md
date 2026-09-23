---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Круг с галочкой
category: task
sources: []
format: markdown
themes:
  - blue-topaz
  - obuntu
  - ultra-lobster
  - dune
  - underwater
---

```hacksidian-id
task-e04
```

```hacksidian-live
task-e04
```

```hacksidian-details
> Зачем
Мягкое оформление личного списка.

> Как работает
Тот же самостоятельный чекбокс, но border-radius делает его круглым.
```

```hacksidian-sources
task-e04
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Circular checkbox** (`circular-checkbox`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3379), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12082).
  Селектор: `body.circular-checkbox input[type=checkbox]`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `border-radius`.
- [[atlas/! themes/obuntu|Obuntu]]: правило CSS без отдельного переключателя — [исходник](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L232), [реализация](https://github.com/dmytrodubinin/Obuntu-theme-for-Obsidian/blob/d4b7dadb9fd38a8ed99d1381032335fb970effff/obsidian.css#L232).
  Селектор: `input[type="checkbox"]`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L16942), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L16942).
  Селектор: `input[type="checkbox"]`.
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4648), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L4648).
  Селектор: `.suggestion-item.bases-toolbar-menu-item input[type=checkbox]:checked`.
- [[atlas/! themes/underwater|Underwater]]: **Checkboxes style** (`checkbox`) — [описание настройки](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2633), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2179).
  Селектор: `.checkbox-circle`.
  Проверяемое свойство: `--checkbox-radius`.
  Варианты: Rounded (normal); Circle (checkbox-circle)

```hacksidian-files
task-e04
```
