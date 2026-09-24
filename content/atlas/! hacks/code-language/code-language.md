---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Метка языка из fenced code
category: code
sources:
  - https://spec.commonmark.org/0.31.2/#fenced-code-blocks
format: markdown
themes: []
favourite: true
---

```hacksidian-id
code-language
```

```hacksidian-live
code-language
```

```hacksidian-details
> Зачем
Быстрая ориентация в заметке с несколькими языками.

> Как работает
Метка берётся только из класса language-*, служебные классы вроде is-loaded игнорируются. Для распространённых языков есть CSS-подписи без зависимости от обработчика.
Рендерер переносит css после тройных обратных кавычек в class="language-css" у code. Метка выводится через pre::before; code::before остаётся свободным для знака команды из code-e054. Приём оформляет только метку, не меняя фон, внутренние отступы, рамку и шрифт самого блока кода.
Цвет метки настраивается отдельно: цвет текста темы, один из восьми семантических цветов Obsidian или свой цвет. По умолчанию используется приглушённый текст темы.

> Ограничения
Класс создаёт Markdown-рендерер, автор его не пишет. Если рендерер не сохраняет язык, метки не будет. Подсветки токенов здесь нет.
```

```hacksidian-sources
code-language
```


```hacksidian-files
code-language
```
