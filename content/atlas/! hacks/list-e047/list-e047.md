---
tags:
  - hacksidian_technique
  - hacksidian_list
title: Направляющая вложенности
category: list
sources: []
format: markdown
themes:
  - blue-topaz
  - its-theme
  - yin-and-yang
  - maple
  - aura
  - vicious
  - faded
  - composer
---

```hacksidian-id
list-e047
```

```hacksidian-live
list-e047
```

```hacksidian-details
> Зачем
Помогает глазами удерживать длинную группу подпунктов.

> Как работает
border-inline-start у вложенного ul проводит линию вдоль группы.
```

```hacksidian-sources
list-e047
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle colorful indentation lines (Editing)** (`bt-colorful-indentation-lines-editing`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2683), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L13723).
  Селектор: `body.bt-colorful-indentation-lines-editing .HyperMD-list-line-2 .cm-hmd-list-indent > .cm-indent::before, body.bt-colorful-indentation-lines-editing .HyperMD-list-line-3 .cm-hmd-list-indent > .cm-indent::before, body.bt-colorful-indentation-lines-editing .HyperMD-list-line-4 .cm-hmd-list-indent > .cm-indent::before, body.bt-colorful-indentation-lines-editing .HyperMD-list-line-5 .cm-hmd-list-indent > .cm-indent::before, body.bt-colorful-indentation-lines-editing .HyperMD-list-line-6 .cm-hmd-list-indent > .cm-indent::before, body.bt-colorful-indentation-lines-editing .HyperMD-list-line-7 .cm-hmd-list-indent > .cm-indent::before, body.bt-colorful-indentation-lines-editing .HyperMD-list-line-8 .cm-hmd-list-indent > .cm-indent::before, body.bt-colorful-indentation-lines-editing .HyperMD-list-line-9 .cm-hmd-list-indent > .cm-indent::before`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Toggle colorful indentation lines (Reading)** (`bt-colorful-indentation-lines`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2701), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L13686).
  Селектор: `body.bt-colorful-indentation-lines.bt-indentation-line-gradient ul ul::before, body.bt-colorful-indentation-lines.bt-indentation-line-gradient ol ol::before`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/its-theme|ITS Theme]]: **Colorful Bullet Lines** (`list-lines-color`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1505), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12063).
  Селектор: `.list-lines-color.list-lines-color`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: **Remove Relationship Lines in Preview** (`remove-pre-rel-lines`) — [описание настройки](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L554), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4139).
  Селектор: `body:not(.remove-pre-rel-lines) ul > li, body:not(.remove-pre-rel-lines) ol > li`.
- [[atlas/! themes/yin-and-yang|Yin and Yang]]: **Remove Relationship Lines in Editor** (`remove-ed-rel-lines`) — [описание настройки](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L559), [реализация](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme/blob/e780f0d58301cfa11c05d0cc351ee82a95d920de/obsidian.css#L4201).
  Селектор: `body:not(.remove-ed-rel-lines) .cm-s-obsidian > .cm-tab, body:not(.remove-ed-rel-lines) .cm-hmd-list-indent > .cm-tab, body:not(.remove-ed-rel-lines) .rel-lines-edit .cm-hmd-list-indent > .cm-tab`.
- [[atlas/! themes/maple|Maple]]: **Logseq Bullet Thread Style List** (`list-bullet-thread-style`) — [описание настройки](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L1797), [реализация](https://github.com/subframe7536/obsidian-theme-maple/blob/d7a6dc1834116e15f4a11c4d41276db6d7cb7437/theme.css#L4817).
  Селектор: `.list-enable.list-bullet-thread-style`.
- [[atlas/! themes/aura|Aura]]: **Neon List** (`aura-neon-list`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3351), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L755).
  Селектор: `.aura-neon-list .markdown-preview-section .list-bullet`.
- [[atlas/! themes/vicious|Vicious]]: **Disable Vibrant Indent** (`vibrant-indents`) — [описание настройки](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L34), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L1961).
  Селектор: `body:not(.vibrant-indents) .mod-cm6.is-live-preview .HyperMD-list-line.cm-line:not(.HyperMD-list-line-1)`.
- [[atlas/! themes/faded|Faded]]: **Gradient Bullet Point Lines** (`Gradient-Bullet-Point-Lines`) — [описание настройки](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L29), [реализация](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L3800).
  Селектор: `.gradientBulletPointLines li`.
  Варианты: Enabled (gradientBulletPointLines); Disabled (none)
- [[atlas/! themes/composer|Composer]]: **Enable Indentation Guide Line** (`composer--EnableIndentationGuidLine`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L377), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L2530).
  Селектор: `body.composer--EnableIndentationGuidLine`.

```hacksidian-files
list-e047
```
