---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Блокнот с линованной бумагой
category: note
sources:
  - https://github.com/oxalorg/sakura
format: markdown
themes:
  - blue-topaz
  - its-theme
---

```hacksidian-id
note-paper
```

```hacksidian-live
note-paper
```

```hacksidian-details
> Зачем
Личные записи с узнаваемым бумажным характером.

> Как работает
Фон корня — повторяющийся градиент; ритм коротких абзацев согласован с шагом линий.

> Ограничения
Линии совпадают только при согласованном интерлиньяже и отступах. Смешанные заголовки и изображения нарушают этот ритм.
```

```hacksidian-sources
note-paper
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle notebook-liked background** (`background-notebook-liked-switch`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L362), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L22562).
  Селектор: `body.background-notebook-liked-switch .markdown-embed :is(.markdown-preview-view, .markdown-rendered), body.background-notebook-liked-switch .cm-s-obsidian .cm-embed-block`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: **Document** (`writing-document`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L601), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11787).
  Селектор: `.writing-document:not(.is-mobile), .writing-document.is-tablet.is-tablet`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Paper Shadow** (`paper`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L606), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L11825).
  Селектор: `.paper`.

```hacksidian-files
note-paper
```
