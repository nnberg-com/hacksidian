---
tags:
  - hacksidian_technique
  - hacksidian_text
title: Знак окончания заметки
category: text
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/:has
format: markdown
themes: []
---

```hacksidian-id
text-endmark
```

```hacksidian-live
text-endmark
```

```hacksidian-details
> Зачем
Редакционное завершение короткого текста.

> Как работает
Последний абзац получает декоративный символ через ::after. Параметр «Знак окончания» позволяет ввести свой знак или короткую последовательность до 16 символов: например ◆, ■, ✦ или ***. Пустое значение убирает знак.

> Ограничения
Если заметка заканчивается списком или картинкой, нужен другой структурный селектор. Знак не часть исходника.
```

```hacksidian-sources
text-endmark
```

```hacksidian-files
text-endmark
```
