---
tags:
  - hacksidian_technique
  - hacksidian_note
title: Красная строка
category: note
sources:
  - https://raw.githubusercontent.com/oxalorg/sakura/master/css/sakura.css
format: markdown
themes:
  - blue-topaz
  - shimmering-focus
  - composer
---

```hacksidian-id
note-indent
```

```hacksidian-live
note-indent
```

```hacksidian-details
> Зачем
Связное повествование с плотным книжным ритмом.

> Как работает
p + p получает text-indent; первый абзац после заголовка остаётся без отступа.
```

```hacksidian-sources
note-indent
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Slight indentation of the first line** (`text-indentation-two-em`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L1950), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L11373).
  Селектор: `body.text-indentation-two-em .workspace-leaf-content[data-type="markdown"] .markdown-source-view.mod-cm6 div.cm-line:not(:is(.hr,.HyperMD-header,.HyperMD-quote,.HyperMD-list-line,.HyperMD-codeblock)), .markdown-source-view.mod-cm6.indent div.cm-line:not(:is(.hr,.HyperMD-header,.HyperMD-quote,.HyperMD-list-line,.HyperMD-codeblock))`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/shimmering-focus|Shimmering Focus]]: **First-line indent & no spacing between paragraphs (reading mode)** (`longform-text-indent`) — [описание настройки](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L503), [реализация](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L9).
  Селектор: `.longform-text-indent.longform-text-indent div:has(>p)+div>p`.
- [[atlas/! themes/composer|Composer]]: **Paragraph Indent** (`composer--ParagraphIndent`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L120), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L2837).
  Селектор: `.composer--ParagraphIndent`.

```hacksidian-files
note-indent
```
