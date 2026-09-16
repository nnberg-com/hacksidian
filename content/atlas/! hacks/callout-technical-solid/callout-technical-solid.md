---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Плотная цветная панель
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - underwater
  - vicious
---

```hacksidian-id
callout-technical-solid
```

```hacksidian-live
callout-technical-solid
```

```hacksidian-details
> Зачем
Редкое и действительно заметное предупреждение.

> Как работает
Контейнер и заголовок получают контрастную пару светлого текста и тёмного фона.
```

```hacksidian-sources
callout-technical-solid
```

###### Локальные зависимости

- [assets/abstract.svg](<./assets/abstract.svg>)
- [assets/bug.svg](<./assets/bug.svg>)
- [assets/danger.svg](<./assets/danger.svg>)
- [assets/example.svg](<./assets/example.svg>)
- [assets/failure.svg](<./assets/failure.svg>)
- [assets/info.svg](<./assets/info.svg>)
- [assets/note.svg](<./assets/note.svg>)
- [assets/question.svg](<./assets/question.svg>)
- [assets/quote.svg](<./assets/quote.svg>)
- [assets/success.svg](<./assets/success.svg>)
- [assets/tip.svg](<./assets/tip.svg>)
- [assets/todo.svg](<./assets/todo.svg>)
- [assets/warning.svg](<./assets/warning.svg>)

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/underwater|Underwater]]: **Callout style** (`callout`) — [описание настройки](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2601), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L1158).
  Селектор: `.callout[data-callout="bookmark"]`.
  Варианты: Solid (callout-solid); Classic (normal); Outlined (callout-outlined); Math (callout-math)
- [[atlas/! themes/vicious|Vicious]]: **Callout Style** (`callout Style`) — [описание настройки](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L51), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1379).
  Селектор: `.callout-style-03 .callout`.
  Варианты: Default (callout-style-01); Static (callout-style-04); Vibrant (callout-style-02); One Color (callout-style-03)

```hacksidian-files
callout-technical-solid
```
