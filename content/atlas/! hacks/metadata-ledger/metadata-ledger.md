---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Таблица с разделителями
category: metadata
sources:
  - https://github.com/kepano/obsidian-minimal/blob/master/theme.css
format: properties
themes:
  - minimal
---

```hacksidian-id
metadata-ledger
```

```hacksidian-live
metadata-ledger
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Быстро просматривать много однотипных свойств.

> Как работает
Штатные переменные включают границу каждой строки; между строками нет зазора.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-ledger
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Property row lines** (`metadata-dividers`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7921), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L724).
  Селектор: `.metadata-dividers`.

```hacksidian-files
metadata-ledger
```
