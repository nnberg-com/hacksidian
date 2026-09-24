---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Тонкая настройка цветов inline code
category: inline-code
sources: []
format: markdown
themes: []
---

```hacksidian-id
inline-code-colors
```

```hacksidian-live
inline-code-colors
```

```hacksidian-details
> Зачем
Независимо настроить фон и текст inline code, сохранив форму и размер от других приёмов.

> Как работает
Два цвета: фон и текст. У каждого есть свой цвет и список источников: «Как есть», цвета темы, восемь семантических цветов и «Контраст». По умолчанию оба цвета остаются как есть. Отступы, скругление и размер шрифта не меняются. Семантические цвета следуют палитре.

> Ограничения
«Контраст» использует contrast-color(); на старых движках — приближение по светлоте OKLCH с порогом 0.65. Текст сравнивается с выбранным фоном, а при «Как есть» — с --code-background. Фон сравнивается с --background-primary. CSS не читает произвольные фоны и градиенты других приёмов. Блоки pre не затрагиваются.
```

```hacksidian-sources
inline-code-colors
```

```hacksidian-files
inline-code-colors
```
