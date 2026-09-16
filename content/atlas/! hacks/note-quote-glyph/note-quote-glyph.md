---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Большая кавычка на поле
category: note
sources:
  - https://spec.commonmark.org/0.31.2/#block-quotes
format: markdown
themes:
  - maple
  - blue-topaz
  - yin-and-yang
---

```hacksidian-id
note-quote-glyph
```

```hacksidian-live
note-quote-glyph
```

```hacksidian-details
> Зачем
Редакционная врезка с узнаваемым силуэтом цитаты.

> Как работает
blockquote::before рисует кавычку; relative/absolute оставляют её внутри предусмотренного поля.
```

```hacksidian-sources
note-quote-glyph
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Blockquote** (`blockquote-style-change-options`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2930), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L24049).
  Селектор: `body.blockquote-style-quotation-mark :is(.markdown-preview-view,.markdown-rendered) blockquote p:first-of-type::before`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `content`.
  Варианты: Default (blockquote-style-default); With quotation mark (blockquote-style-quotation-mark); Speech Bubble 1 (blockquote-style-speech-bubble-one); Speech Bubble 2 (blockquote-style-speech-bubble-two); Outline (blockquote-style-outline); Border left (blockquote-style-border-left)
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: **Remove Blockquote Icon** (`naked-bq`) — [описание настройки](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L531), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L2480).
  Селектор: `.naked-bq .markdown-preview-view blockquote:before`.
  Проверяемое свойство: `content`.
- [[atlas/! themes/maple|Maple]]: **Enable Quote Mark Style in Reading View** (`quote-mark`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1765), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L5465).
  Селектор: `.quote-mark blockquote`.

```hacksidian-files
note-quote-glyph
```
