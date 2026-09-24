---
tags:
  - hacksidian_technique
  - hacksidian_inline-code
title: Компенсация размера
category: inline-code
sources:
  - https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css
format: markdown
themes: []
---

```hacksidian-id
inline-code-ex-02
```

```hacksidian-live
inline-code-ex-02
```

```hacksidian-details
> Зачем
Чтобы широкий моноширинный шрифт не казался крупнее основного.

> Как работает
Размер задаётся одним параметром в процентах от окружающего текста: 100% — тот же размер, 90% — уменьшение на 10%. Диапазон 50–150%, по умолчанию 90%. Настройка действует на все фрагменты, а не на отдельные номера абзацев.

> Ограничения
Подбирать нужно по реальной паре шрифтов; 85% — не универсальная норма.
```

```hacksidian-sources
inline-code-ex-02
```

- В исходном обзоре примеры GitHub, Bootstrap и Tailwind адаптировались к обычному `code`; остальные сочетания составлены для атласа. Ссылки на CSS-механизмы не означают, что рецепт заимствован у этих проектов.


```hacksidian-files
inline-code-ex-02
```
