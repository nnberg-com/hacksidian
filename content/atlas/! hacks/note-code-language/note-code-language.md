---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Метка языка из fenced code
category: note
sources:
  - https://spec.commonmark.org/0.31.2/#fenced-code-blocks
format: markdown
themes: []
---

```hacksidian-id
note-code-language
```

```hacksidian-live
note-code-language
```

```hacksidian-details
> Зачем
Быстрая ориентация в заметке с несколькими языками.

> Как работает
Рендерер переносит css после тройных обратных кавычек в class="language-css" у code. Его ::before выводит метку.

> Ограничения
Класс создаёт Markdown-рендерер, автор его не пишет. Если рендерер не сохраняет язык, метки не будет. Подсветки токенов здесь нет.
```

```hacksidian-sources
note-code-language
```

###### Локальные зависимости

- [assets/Onest.ttf](<./assets/Onest.ttf>)

```hacksidian-files
note-code-language
```
