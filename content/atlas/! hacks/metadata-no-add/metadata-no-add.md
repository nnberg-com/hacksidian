---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Без строки добавления
category: metadata
sources:
  - https://github.com/kepano/obsidian-minimal/blob/master/theme.css
format: properties
themes:
  - minimal
  - soft-paper
  - shimmering-focus
  - willemstad
  - baseline
  - dune
  - velocity
---

```hacksidian-id
metadata-no-add
```

```hacksidian-live
metadata-no-add
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Показывать готовый набор полей шаблона компактнее.

> Как работает
Скрывается только .metadata-add-button.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-no-add
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Hide "Add property" button** (`metadata-add-property-off`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7909), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L720).
  Селектор: `.metadata-add-property-off .mod-root .metadata-add-button`.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: правило CSS без отдельного переключателя — [исходник](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `.metadata-add-button.text-icon-button .text-button-label`.
- [[atlas/! themes/willemstad|Willemstad]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28474), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L28474).
  Селектор: `body:not(.ssopt-properties-button-original) .metadata-add-button .text-button-label`.
- [[atlas/! themes/baseline|Baseline]]: **Add property button visibility** (`metadata-add-property`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1630), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.metadata-add-property-hover .markdown-reading-view .metadata-container:not(:hover) .text-icon-button`.
  Условия CSS: `@media screen,print`
  Проверяемое свойство: `opacity`.
  Варианты: Always (metadata-add-property-always); Hover only (metadata-add-property-hover); Hidden (metadata-add-property-hidden)
- [[atlas/! themes/dune|Dune]]: правило CSS без отдельного переключателя — [исходник](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L3010), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L3010).
  Селектор: `.metadata-container .metadata-add-button .text-button-label`.
- [[atlas/! themes/velocity|Velocity]]: правило CSS без отдельного переключателя — [исходник](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1), [реализация](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L1).
  Селектор: `.mod-root .workspace-leaf-content[data-type=file-properties] .metadata-add-button>.text-button-icon, .markdown-source-view .metadata-add-button>.text-button-icon, .markdown-preview-view .metadata-add-button>.text-button-icon`.
- [[atlas/! themes/soft-paper|Soft Paper]]: **Hide "Add property" button** (`sp-hide-add-property`) — [описание настройки](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L83), [реализация](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L152).
  Селектор: `.sp-hide-add-property .metadata-add-button`.

```hacksidian-files
metadata-no-add
```
