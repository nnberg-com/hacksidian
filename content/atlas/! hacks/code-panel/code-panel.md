---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Код на собственной подложке
category: code
sources:
  - https://spec.commonmark.org/0.31.2/#fenced-code-blocks
format: markdown
themes: []
---

```hacksidian-id
code-panel
```

```hacksidian-live
code-panel
```

```hacksidian-details
> Зачем
Листинг внутри технической заметки.

> Как работает
Подложка подмешивает выбранный семантический цвет к фону страницы (по умолчанию 15%); рамка использует тот же цвет с долей 50%. Насыщенность подложки регулируется; рамка включается отдельным переключателем. Раньше приём использовал вторичный фон темы, часто почти неотличимый от штатного блока.
pre получает фон, поля и прокрутку; pre > code сбрасывает оформление встроенного кода.
```

```hacksidian-sources
code-panel
```

```hacksidian-files
code-panel
```
