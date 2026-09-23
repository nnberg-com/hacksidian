---
tags:
  - hacksidian_technique
  - hacksidian_callout
title: Тонкая рамка
category: callout
sources:
  - https://help.obsidian.md/callouts
format: markdown
themes:
  - minimal
  - willemstad
  - border
  - tokyo-night
  - ultra-lobster
  - composer
---

```hacksidian-id
callout-technical-outline
```

```hacksidian-live
callout-technical-outline
```

```hacksidian-details
> Зачем
Спокойно отделяет дополнительную информацию.

> Как работает
Цветная граница охватывает весь блок, фон остаётся белым.
```

```hacksidian-sources
callout-technical-outline
```


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Callout style** (`callouts-style`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L6829), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L1341).
  Селектор: `.callouts-outlined .callout`.
  Проверяемое свойство: `--callout-border-width`.
  Варианты: Filled (callouts-default); Outlined (callouts-outlined)
- [[atlas/! themes/willemstad|Willemstad]]: **Revert to Original Obsidian Styling on Standard Callouts** (`ssopt-callout-standard`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L50063), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L30214).
  Селектор: `:where(:not(.ssopt-callout-standard))`.
- [[atlas/! themes/willemstad|Willemstad]]: **Disable Callout Border Hover/Always Show Callout Border** (`ssopt-callout-no-hover`) — [описание настройки](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L50074), [реализация](https://github.com/tingmelvin/willemstad-x/blob/4b0cbba45b3d87ef6ac6cad51fbf58e347e8a14c/theme.css#L30240).
  Селектор: `body.ssopt-callout-no-hover:where(:not(.ssopt-callout-standard)) .callout:not([data-callout="columns"], [data-callout="images"], [data-callout="note-toolbar"]), :where(:not(.ssopt-callout-standard)) .callout:where([data-callout="columns"], [data-callout="images"]) > .callout-title`.
- [[atlas/! themes/border|Border]]: **callout style** (`callout-style-select`) — [описание настройки](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3383), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8217).
  Селектор: `.theme-light .callout:is([data-callout-metadata*="style-1"], [data-callout*=style-1]), .callout-style-1.theme-light`.
  Проверяемое свойство: `--callout-border-width`.
  Варианты: Customize (callout-style-customize); style 1 (callout-style-1); style 2 (callout-style-2); style 3 (callout-style-3); style 4 (callout-style-4)
- [[atlas/! themes/tokyo-night|Tokyo Night]]: **Callout Style** (`callout-style-select`) — [описание настройки](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1845), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L454).
  Селектор: `.callout-style-1.theme-light`.
  Варианты: Customize (callout-style-customize); style 1 (callout-style-1); style 2 (callout-style-2); style 3 (callout-style-3); style 4 (callout-style-4)
- [[atlas/! themes/ultra-lobster|Ultra Lobster]]: **Callout Style** (`ulu-callouts`) — [описание настройки](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L469), [реализация](https://github.com/7368697661/Ultra-Lobster/blob/e3121703dddda008218872f4ac38cad602e25619/theme.css#L13527).
  Селектор: `.ulu-gummy-callouts .callout`.
  Проверяемое свойство: `border`.
  Варианты: gummy (ulu-gummy-callouts); notyoutube (ulu-nt-callouts); brutal (ulu-brutal-callouts); soft (ulu-soft-callouts); working edits (gradient callouts) (ulu-we1-callouts); line (ulu-line-callouts)
- [[atlas/! themes/composer|Composer]]: **Callout Style** (`callout-style`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L68), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L1762).
  Селектор: `.composer--SubtleGridCallout .callout`.
  Проверяемое свойство: `border`.
  Варианты: Default 默认 (composer--DefaultCalloutStyle); Subtle Grid 渐隐网格 (composer--SubtleGridCallout); Clean Line 简洁线条 (composer--CleanLineCallout); Github Style (composer--GithubCallout); Window Panel 窗格 (composer--WindowPanelCallout)

```hacksidian-files
callout-technical-outline
```
