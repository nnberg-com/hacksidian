---
tags:
  - hacksidian_technique
  - hacksidian_footnote
title: Настоящие надстрочные глифы в сносках
category: footnote
sources: 
  - "https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L944"
  - "https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7958"
  - "https://github.com/7368697661/Ultra-Lobster"
format: markdown
research: theme-survey-2026-09-16
verification: adapted-source
themes:
  - ultra-lobster
---

```hacksidian-id
footnote-opentype-superscript
```

```hacksidian-live
footnote-opentype-superscript
```

```hacksidian-details
> Зачем
Показывать номер сноски специально нарисованным надстрочным глифом шрифта, сохраняя его толщину и читаемость.

> Как работает
`font-feature-settings: "sups" 1` включает OpenType-подстановку надстрочных цифр. `font-size: inherit` и `vertical-align: baseline` отменяют обычное уменьшение и подъём номера: положение и размер уже заложены в самом глифе. Правила охватывают и контейнер `.footnote-ref`, и ссылку `.footnote-link`, чтобы не уменьшить цифру дважды.

> Ограничения
Эффект зависит от шрифта текста: нужны надстрочные глифы цифр и функция `sups`. Например, она есть в Onest и JetBrains Mono. Без неё номер останется обычной цифрой на базовой линии — в этом случае приём не подходит. CSS не заменяет шрифт заметки. Пример предназначен для режима чтения; оформление маркеров в редакторе не адаптировано. Визуальная проверка в установленном Obsidian ещё не проведена.
```

```hacksidian-sources
footnote-opentype-superscript
```

- github.com — Ultra Lobster, kneecaps: настройка **OpenType Superscript Footnotes** (`ulu-superscript-footnotes`) — описание, CSS.
- Рецепт адаптирован к контейнерам сносок в режиме чтения Obsidian. Установка Ultra Lobster и Style Settings для этого самостоятельного рецепта не требуется.


```hacksidian-files
footnote-opentype-superscript
```
