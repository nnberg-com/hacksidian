---
tags:
  - hacksidian_technique
  - hacksidian_text
title: Выравнивание по ширине
category: text
sources: []
format: markdown
themes:
  - border
  - underwater
  - origami
  - zen
---

```hacksidian-id
text-justify
```

```hacksidian-live
text-justify
```

```hacksidian-details
> Зачем
Для книжной полосы достаточной ширины.

> Как работает
Выравнивание по ширине без изменения шрифта, размеров и палитры.

> Ограничения
На узком экране возможны заметные дыры между словами. Переносы зависят от языка и браузера.
```

```hacksidian-sources
text-justify
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/border|Border]]: **Justify paragraph text** (`text-align-justify`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2803), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L6923).
  Селектор: `.text-align-justify .markdown-source-view.mod-cm6 .cm-line:not(.HyperMD-codeblock), .text-align-justify .markdown-preview-view p`.
- [[atlas/! themes/underwater|Underwater]]: **Disable justified text** (`no-justify`) — [описание настройки](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2770), [реализация](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L892).
  Селектор: `body:not(.no-justify) .cm-s-obsidian, body:not(.no-justify) .markdown-preview-view`.
- [[atlas/! themes/origami|Origami]]: **justify text** (`o-justify`) — [описание настройки](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L220), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4236).
  Селектор: `.o-justify .markdown-source-view.mod-cm6 .cm-line, .o-justify .markdown-rendered p`.
- [[atlas/! themes/zen|Zen]]: **Open text justification.** (`text-justify`) — [описание настройки](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L103), [реализация](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L1085).
  Селектор: `body.text-justify .mod-cm6 .cm-editor .cm-line, body.text-justify p:not([align="right"]):not([align="left"]), body.text-justify li, body.text-justify ol`.

```hacksidian-files
text-justify
```
