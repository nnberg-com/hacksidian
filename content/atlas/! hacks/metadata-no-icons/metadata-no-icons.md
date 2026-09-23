---
tags:
  - hacksidian_technique
  - hacksidian_metadata
title: Без иконок типов
category: metadata
sources:
  - https://github.com/kepano/obsidian-minimal/blob/master/theme.css
format: properties
themes:
  - minimal
  - baseline
  - its-theme
  - prism
  - cybertron
  - cupertino
  - lyt-mode
  - ultra-lobster
  - kakano
---

```hacksidian-id
metadata-no-icons
```

```hacksidian-live
metadata-no-icons
```

HTML-модель панели свойств или YAML-редактора. Можно менять значения, флажки и фокус внутри примера; заметка не изменяется. Переключатель приёма показывает эффект актуального CSS.


```hacksidian-details
> Зачем
Снизить пестроту, когда названия полей достаточно понятны.

> Как работает
Убирается только .metadata-property-icon.

> Ограничения
Демонстрация моделирует разметку Properties или YAML, а не запускает настоящий редактор Obsidian. Поведение в самой заметке зависит от её режима и темы.
```
```hacksidian-sources
metadata-no-icons
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Hide property icons** (`metadata-icons-off`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7915), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L729).
  Селектор: `.metadata-icons-off .workspace-leaf-content[data-type=all-properties] .tree-item-inner`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Metadata Title No Icon** (`metadata-title-no-icon`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L2058), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11578).
  Селектор: `.metadata-title-no-icon`.
  Проверяемое свойство: `--metadata-title-icon`.
- [[atlas/! themes/prism|Prism]]: правило CSS без отдельного переключателя — [исходник](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L4426), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L4426).
  Селектор: `.metadata-property-icon::before`.
- [[atlas/! themes/cybertron|Cybertron]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L1222), [реализация](https://github.com/nickmilo/Cybertron/blob/fe7bcb027b40ce391bd89e8379dda8672cb4a22b/theme.css#L1222).
  Селектор: `.metadata-property-icon::before`.
- [[atlas/! themes/cupertino|Cupertino]]: правило CSS без отдельного переключателя — [исходник](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147), [реализация](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L147).
  Селектор: `.metadata-property-icon::before`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/baseline|Baseline]]: **Hide property icons** (`metadata-icons-off`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L1670), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.metadata-icons-off .metadata-property-icon`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/lyt-mode|LYT Mode]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L5423), [реализация](https://github.com/nickmilo/LYT-Mode/blob/28f67f18a24f5c8d3b58954eb8374bf2ecffbb50/theme.css#L5423).
  Селектор: `.metadata-property-icon::before`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17998), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L17998).
  Селектор: `.metadata-property-icon`.
- [[atlas/! themes/kakano|Kakano]]: правило CSS без отдельного переключателя — [исходник](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L5763), [реализация](https://github.com/isaacfreeman/kakano-obsidian-theme/blob/358388cb3a5929dbcaaa19906c210f4508332665/theme.css#L5763).
  Селектор: `.metadata-property-icon:before`.

```hacksidian-files
metadata-no-icons
```
