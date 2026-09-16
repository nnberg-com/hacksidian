---
tags:
  - hacksidian_technique
  - hacksidian_interface
title: Больше места названиям вкладок
category: interface
sources:
  - https://docs.obsidian.md/Reference/CSS%20variables/Components/Tabs
format: html
themes:
  - baseline
  - adwaita
---

```hacksidian-id
interface-readable-tabs
```

```hacksidian-details
> Зачем
Различать заметки с длинными похожими именами.

> Как работает
Ширина и размер шрифта задаются через переменные Obsidian. В модели эти переменные питают размеры условных вкладок.

> Ограничения
Когда вкладок много, приложение всё равно сжимает их. Это не отключает ограничения полосы вкладок.

Встроенного примера нет: приём меняет интерфейс или свойства Obsidian, которые не воспроизводятся внутри Markdown-фрагмента. Его проверяют на соответствующем элементе приложения.
```
###### Использование и проверка

Применение: группа интерфейса затрагивает панель (или группу вкладок), содержащую заметку с callmered-coloring. Модель использует заменённые имена контейнеров; селекторы действующего приёма находятся в recipe.css.

Оригинальный CSS-пример по документированным механизмам и указанным практикам; это адаптация, не копия кода источника. Нативный результат в установленном Obsidian не проверен.

```hacksidian-sources
interface-readable-tabs
```

###### CSS для Obsidian

```css
.workspace-tabs:has(.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)) {--tab-width:220px;--tab-max-width:260px;--tab-font-size:14px}
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/baseline|Baseline]]: **Full width tabs** (`tab-full-width`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L919), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1).
  Селектор: `body.tab-full-width`.
- [[atlas/! themes/adwaita|Adwaita]]: **Short** (`adwaita-tabs-short`) — [описание настройки](https://github.com/birneee/obsidian-adwaita-theme/blob/75efcbbd6a89abc04265b467997fb60638de9157/theme.css#L78), [реализация](https://github.com/birneee/obsidian-adwaita-theme/blob/75efcbbd6a89abc04265b467997fb60638de9157/theme.css#L505).
  Селектор: `body:not(.adwaita-tabs-always, .adwaita-tabs-linux-only, .adwaita-tabs-never).mod-linux:not(.adwaita-tabs-short), body.adwaita-tabs-always:not(.adwaita-tabs-short), body.adwaita-tabs-linux-only.mod-linux:not(.adwaita-tabs-short)`.

```hacksidian-files
interface-readable-tabs
```
