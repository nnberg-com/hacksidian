---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Акцент по языку
category: code
sources: []
format: markdown
themes: []
---

```hacksidian-id
code-e051
```

```hacksidian-live
code-e051
```

```hacksidian-details
> Зачем
Различать листинги разных языков без синтаксической раскраски.

> Как работает
Четырнадцать полей связывают sh, python, c, awk, css, markdown, yaml, json, html, lua, cpp, javascript, typescript и kconfig с одним из восьми семантических цветов: красным, оранжевым, жёлтым, зелёным, цианом, синим, фиолетовым или розовым. Цвет левой линии берётся из --color-* и следует за сменой палитры. Синтаксическая подсветка кода не меняется.

> Ограничения
Язык задаётся после открывающих трёх обратных кавычек. Учтены псевдонимы bash/shell, py, gawk и md. Приём работает с отрисованными pre > code в режиме чтения; строки редактора CodeMirror имеют другую структуру. Неуказанные языки не получают линию. C++ записывается как cpp. Kconfig записывается как kconfig: цветная линия поддерживается, но в установленном Prism нет грамматики Kconfig, поэтому синтаксическая раскраска не обещается.
```

```hacksidian-sources
code-e051
```

```hacksidian-files
code-e051
```
