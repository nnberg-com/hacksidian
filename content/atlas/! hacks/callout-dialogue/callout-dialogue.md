---
tags:
  - hacksidian_technique
  - hacksidian_composition
title: Переписка
category: composition
sources:
  - https://elsatam.github.io/obsidian-fancy-a-story/docs/callouts/conversation.html
format: markdown
themes:
  - fancy-a-story
  - anuppuccin
  - blue-topaz
favourite: false
---

```hacksidian-id
callout-dialogue
```

```hacksidian-live
callout-dialogue
```

```hacksidian-details
> Зачем
Показать специально помеченные callout’ы как диалог в чате: переписку с репликами двух собеседников в пузырях слева и справа. Подходит для интервью и обсуждений.

Chat dialogue / conversation: selected callouts become alternating speech bubbles.

> Как работает
Используйте тип callout `[!dialogue]`: оформление применяется только к нему, остальные callout’ы не меняются. Заголовок callout и иконка скрыты. Фон и правые реплики используют светлый и тёмный оттенки параметра «Базовый цвет»: один из восьми семантических цветов текущей палитры, по умолчанию cyan. Внешний callout без рамки, с прямым нижним правым углом; остальные углы скруглены сильнее внутренних реплик. Декоративные рамки через псевдоэлементы внешнего callout также скрыты. Один абзац — одна реплика. CSS чередует стороны через :nth-child(); имя в **жирном** становится строкой автора.

> Ограничения
Чередование рассчитано на двух собеседников и одну реплику в каждом абзаце. CSS не определяет автора по тексту.
```

```hacksidian-sources
callout-dialogue
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/anuppuccin|AnuPpuccin]]: **Enable Speech Bubbles** (`anp-speech-bubble`) — [описание настройки](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L489), [реализация](https://github.com/anubisnekhet/AnuPpuccin/blob/82d207c646904e7af371ced499f682fbdfad1012/theme.css#L7151).
  Селектор: `.anp-speech-bubble [data-task="0"], .anp-speech-bubble [data-task="1"], .anp-speech-bubble [data-task="2"], .anp-speech-bubble [data-task="3"], .anp-speech-bubble [data-task="4"], .anp-speech-bubble [data-task="5"], .anp-speech-bubble [data-task="6"], .anp-speech-bubble [data-task="7"], .anp-speech-bubble [data-task="8"], .anp-speech-bubble [data-task="9"]`.
  Проверяемое свойство: `border-radius`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Enable speech bubble style** (`bt-speech-bubble`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3412), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L30114).
  Селектор: `body.bt-speech-bubble.theme-light`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Dialogue & Chatview Style** (`dialogue-style`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L4584), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L21608).
  Селектор: `body.dialogue-style-wechat .dialogue-plugin-block-wrapper`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Варианты: Default (dialogue-style-default); Wechat (dialogue-style-wechat); Chat (dialogue-style-chat)

```hacksidian-files
callout-dialogue
```
