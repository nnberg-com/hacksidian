---
tags:
  - hacksidian_technique
  - hacksidian_code
title: Без программных лигатур
category: code
sources: []
format: markdown
themes:
  - prism
  - ultra-lobster
---

```hacksidian-id
code-e012
```

```hacksidian-live
code-e012
```

```hacksidian-details
> Зачем
Видеть отдельные символы операторов.

> Как работает
font-variant-ligatures: none отключает доступные лигатуры.

> Ограничения
На шрифте без лигатур визуальной разницы не будет.
```

```hacksidian-sources
code-e012
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/prism|Prism]]: **Disable Ligatures** (`pt-font-disable-ligatures`) — [описание настройки](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9292), [реализация](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L5588).
  Селектор: `.pt-font-disable-ligatures *`.
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Disable Ligatures** (`ulu-disable-ligatures`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L856), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L7881).
  Селектор: `body.ulu-disable-ligatures .cm-content, body.ulu-disable-ligatures .markdown-preview-view`.

```hacksidian-files
code-e012
```
