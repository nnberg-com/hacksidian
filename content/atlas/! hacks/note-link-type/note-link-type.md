---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Значки по типу адреса
category: note
sources:
  - https://spec.commonmark.org/0.31.2/
  - https://developer.mozilla.org/en-US/docs/Web/CSS
  - https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
format: markdown
themes: []
---

```hacksidian-id
note-link-type
```

```hacksidian-live
note-link-type
```

```hacksidian-details
> Зачем
Отличает письмо, PDF и обычную веб-страницу.

> Как работает
Селекторы href проверяют mailto: и окончание .pdf; ::before/::after добавляют метки.

> Ограничения
Проверка окончания не охватывает .pdf?download=1. CSS не определяет MIME-тип ресурса.
```

```hacksidian-sources
note-link-type
```

```hacksidian-files
note-link-type
```
