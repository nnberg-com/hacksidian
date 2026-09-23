---
tags:
  - hacksidian_technique
  - hacksidian_strikethrough
title: Псевдоспойлер
category: strikethrough
sources: []
format: markdown
themes:
  - dune
  - wyrd
  - blue-topaz
  - underwater
---

```hacksidian-id
emphasis-s37
```

```hacksidian-live
emphasis-s37
```

```hacksidian-sources
emphasis-s37
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Cancel cloze Style** (`remove-cloze-style`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3207), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10609).
  Селектор: `.markdown-source-view.is-live-preview.cloze .cm-highlight.cm-strikethrough:not([class*="formatting"]), body:not(.remove-cloze-style) .markdown-source-view.is-live-preview .cm-highlight.cm-strikethrough:not([class*="formatting"])`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `color`.
- [[atlas/! themes/dune|Dune]]: описанный автором способ применения — [руководство](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/Wiki/cheatsheet-Callouts%2C%20Fences%2C%20Tags.md#L443), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L3695).
  Селектор: `a.tag:is([href="#-tips"], [href="#-geheim"], [href="#-spoiler"])`.
  Применение: Используйте `#-spoiler ==текст==`; содержимое лишь визуально скрыто, оно остаётся доступным в исходнике.
- [[atlas/! themes/underwater|Underwater]]: описанный автором способ применения — [руководство](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/README.md#L53), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1346).
  Селектор: `.cloze strong:hover, .cloze strong em:hover`.
  Применение: Добавьте cssclasses: [cloze]; **жирный текст** скрыт цветом и открывается на hover, только Reading View.
- [[atlas/! themes/wyrd|Wyrd]]: правило CSS без отдельного переключателя — [исходник](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L1054), [реализация](https://github.com/curio-heart/obsidian-wyrd/blob/69026fb887ace5a89e9010145a495eee81970dac/theme.css#L1054).
  Селектор: `.markdown-rendered del > mark, .cm-s-obsidian .cm-highlight.cm-strikethrough`.

```hacksidian-files
emphasis-s37
```
