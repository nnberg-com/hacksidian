---
tags:
  - hacksidian_technique
  - hacksidian_hr
title: Орнамент вместо горизонтальной черты
category: hr
sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters
format: markdown
themes:
  - blue-topaz
  - its-theme
  - encore
  - cyber-glow
  - dune
  - fancy-a-story
---

```hacksidian-id
hr-ornament
```

```hacksidian-live
hr-ornament
```

```hacksidian-details
> Зачем
Пауза между эпизодами дневника.

> Как работает
hr получает три радиальных градиента; ручные символы и дополнительные теги не нужны.
```

```hacksidian-sources
hr-ornament
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Fancy Dividing line (Horizontal ruler, hr, ---)** (`fancy-hr`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L2167), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L12504).
  Селектор: `body.fancy-hr-icon .markdown-rendered hr`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Варианты: Default (default-hr); with icons (fancy-hr-icon); without icons (fancy-hr-no-icon); with Numbers (fancy-hr-number)
- [[atlas/! themes/its-theme|ITS Theme]]: **No Horizontal Line Symbol** (`hr-no-icon`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1941), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L12780).
  Селектор: `.hr-no-icon.hr-no-icon div, .hr-tog.hr-tog div`.
- [[atlas/! themes/encore|Encore]]: **Disable Logo on Horizontal Rule** (`encore-disable-logo-on-hr`) — [описание настройки](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L319), [реализация](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L764).
  Селектор: `body:not(.encore-disable-logo-on-hr) .markdown-rendered hr, body:not(.encore-disable-logo-on-hr) .cm-line.hr hr`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: **Heading Dividing Line (---)** (`CG-hr`) — [описание настройки](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L355), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3184).
  Селектор: `.CG-NewObsidian-hr .markdown-preview-view hr::after, body:not(.CG-OG-hr, .CG-Hyrule-hr, .CG-Apple-hr, .CG-Windows-hr, .CG-Lorule-hr, .CG-ClassicObsidian-hr, .CG-None-hr) .markdown-preview-view hr::after, .CG-NewObsidian-hr .hr.cm-line hr::after, body:not(.CG-OG-hr, .CG-Hyrule-hr, .CG-Apple-hr, .CG-Windows-hr, .CG-Lorule-hr, .CG-ClassicObsidian-hr, .CG-None-hr) .hr.cm-line hr::after, .CG-ClassicObsidian-hr .markdown-preview-view hr::after, .CG-ClassicObsidian-hr .hr.cm-line hr::after, .CG-Apple-hr .markdown-preview-view hr::after, .CG-Apple-hr .hr.cm-line hr::after, .CG-Windows-hr .markdown-preview-view hr::after, .CG-Windows-hr .hr.cm-line hr::after`.
  Варианты: New Obsidian Outline (CG-NewObsidian-hr); CG Old Default (CG-OG-hr); No Logo (CG-None-hr); Classic Obsidian Outline (CG-ClassicObsidian-hr); Windows (CG-Windows-hr); Apple (CG-Apple-hr)
- [[atlas/! themes/dune|Dune]]: описанный автором способ применения — [руководство](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/Wiki/Poetry.md#L28), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L3764).
  Селектор: `pre.language-deko::after, pre.language-wave::after`.
  Применение: Пустой fenced-блок с языком `wave`, `wave2`, `wave3` или `wave4` превращается в декоративный разделитель.
- [[atlas/! themes/fancy-a-story|Fancy-a-Story]]: **Enable custom HR** (`fas-hr`) — [описание настройки](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L1806), [реализация](https://github.com/elsatam/obsidian-fancy-a-story/blob/9c59d86962dd8bd9030ff436ce6a58c248a9c43d/theme.css#L158).
  Селектор: `.css-settings-manager:not(.fas-hr)`.

```hacksidian-files
hr-ornament
```
