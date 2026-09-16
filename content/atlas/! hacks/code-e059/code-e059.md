---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Закреплённая шапка
category: code
sources: []
format: markdown
themes: []
---

```hacksidian-id
code-e059
```

```hacksidian-live
code-e059
```

```hacksidian-details
> Зачем
Сохранять название панели при чтении длинного вывода.

> Как работает
Псевдоэлемент pre::before закрепляется у верхнего края прокручиваемого pre через position: sticky. Непрозрачный фон закрывает проходящий под ним текст.

> Ограничения
Прокрутите внутри блока: шапка остаётся наверху. Подпись статическая, не извлекает имя файла; для содержательного названия нужен текст Markdown.
```

```hacksidian-sources
code-e059
```

```hacksidian-files
code-e059
```
