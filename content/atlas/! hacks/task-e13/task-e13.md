---
tags:
  - hacksidian_technique
  - hacksidian_task
title: Зачёркивание
category: task
sources: []
format: markdown
themes:
  - minimal
  - things
  - blue-topaz
  - obsidianite
  - typewriter
  - its-theme
  - catppuccin
  - border
  - tokyo-night
  - notation
  - cyber-glow
  - baseline
  - obsidianotion
  - dune
  - everforest-enchanted
  - origami
  - transparent
  - simple
  - pine-forest-berry
  - composer
---

```hacksidian-id
task-e13
```

```hacksidian-live
task-e13
```

```hacksidian-details
> Зачем
Короткий плоский список с историей выполненного.

> Как работает
Состояние input выбирает родительский li через :has().

> Ограничения
Применять к плоским задачам: зачёркивание родителя может затронуть подзадачи.
```

```hacksidian-sources
task-e13
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/minimal|Minimal]]: **Strike completed tasks** (`minimal-strike-lists`) — [описание настройки](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L7816), [реализация](https://github.com/kepano/obsidian-minimal/blob/c4704fbc23625f4b35b0ab9b2e1eb584e6891be2/theme.css#L1372).
  Селектор: `body.minimal-strike-lists`.
- [[atlas/! themes/things|Things]]: правило CSS без отдельного переключателя — [исходник](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1048), [реализация](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1048).
  Селектор: `body:not(.tasks) .markdown-preview-view ul li[data-task='-'].task-list-item.is-checked, body:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task='-']), body:not(.tasks) li[data-task='-'].task-list-item.is-checked`.
- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Add strikethrough for checked items** (`toggle-checked-decoration`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3385), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L11920).
  Селектор: `body.toggle-checked-decoration .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="x"], body.toggle-checked-decoration .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="X"], body.toggle-checked-decoration ul > li.task-list-item[data-task="x"], body.toggle-checked-decoration ul > li.task-list-item[data-task="X"]`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
- [[atlas/! themes/obsidianite|Obsidianite]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L438), [реализация](https://github.com/bennyxguo/Obsidian-Obsidianite/blob/35d3ba897806957e5b13edb950c6b25e5ce4f5c5/theme.css#L438).
  Селектор: `.markdown-preview-view ul > li.task-list-item.is-checked`.
- [[atlas/! themes/typewriter|Typewriter]]: правило CSS без отдельного переключателя — [исходник](https://github.com/crashmoney/obsidian-typewriter/blob/1f4954741bcff466f05b5a284f0097cdbef4e4f4/theme.css#L723), [реализация](https://github.com/crashmoney/obsidian-typewriter/blob/1f4954741bcff466f05b5a284f0097cdbef4e4f4/theme.css#L723).
  Селектор: `body:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task="-"]), body:not(.tasks) .markdown-preview-view ul li[data-task="-"].task-list-item.is-checked, body:not(.tasks) li[data-task="-"].task-list-item.is-checked`.
- [[atlas/! themes/its-theme|ITS Theme]]: **Restore Checkbox Strike** (`check-strike`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1601), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L8591).
  Селектор: `.check-strike .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:not([data-task=" "]), .check-strike .markdown-preview-view ul > li.task-list-item.is-checked, .check-strike .markdown-preview-view ol > li.task-list-item.is-checked`.
- [[atlas/! themes/its-theme|ITS Theme]]: **[x] Regular** (`checkbox-strike-regular`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1612), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L8596).
  Селектор: `.checkbox-strike-regular .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task=x], .checkbox-strike-regular ul li[data-task=x].task-list-item.is-checked`.
- [[atlas/! themes/its-theme|ITS Theme]]: **[X] Checked** (`checkbox-strike-checked`) — [описание настройки](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L1616), [реализация](https://github.com/slrvb/Obsidian--ITS-Theme/blob/95924dce2d8025a116c54e586e8cf55e3150de68/theme.css#L8600).
  Селектор: `.checkbox-strike-checked .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task=X], .checkbox-strike-checked ul li[data-task=X].task-list-item.is-checked`.
- [[atlas/! themes/catppuccin|Catppuccin]]: правило CSS без отдельного переключателя — [исходник](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L3831), [реализация](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L3831).
  Селектор: `body:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task="-"]), body:not(.tasks) .markdown-preview-view ul li[data-task="-"].task-list-item.is-checked, body:not(.tasks) li[data-task="-"].task-list-item.is-checked`.
- [[atlas/! themes/border|Border]]: правило CSS без отдельного переключателя — [исходник](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8110), [реализация](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L8110).
  Селектор: `body:not(.disable-alternative-checkboxes):not(.tasks) .markdown-preview-view ul li[data-task="-"].task-list-item.is-checked, body:not(.disable-alternative-checkboxes):not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task="-"]), body:not(.disable-alternative-checkboxes):not(.tasks) li[data-task="-"].task-list-item.is-checked`.
- [[atlas/! themes/tokyo-night|Tokyo Night]]: правило CSS без отдельного переключателя — [исходник](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L725), [реализация](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L725).
  Селектор: `body:not(.disable-alternative-checkboxes) body:not(.tasks) .markdown-preview-view ul li[data-task="x"].task-list-item.is-checked, body:not(.disable-alternative-checkboxes) body:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task="x"]), body:not(.disable-alternative-checkboxes) body:not(.tasks) li[data-task="x"].task-list-item.is-checked, body:not(.disable-alternative-checkboxes) body:not(.tasks) .markdown-preview-view ul li[data-task="-"].task-list-item.is-checked, body:not(.disable-alternative-checkboxes) body:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task="-"]), body:not(.disable-alternative-checkboxes) body:not(.tasks) li[data-task="-"].task-list-item.is-checked`.
- [[atlas/! themes/notation|Notation]]: правило CSS без отдельного переключателя — [исходник](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L390), [реализация](https://github.com/deathau/Notation-for-Obsidian/blob/f48b5dd2c33f9d5fb47df3a5b95ed6c4073061db/obsidian.css#L390).
  Селектор: `.markdown-preview-view ul>li.task-list-item.is-checked`.
- [[atlas/! themes/cyber-glow|Cyber Glow]]: **Strikeout Text** (`CG-strike`) — [описание настройки](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L248), [реализация](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L3137).
  Селектор: `body:not(.CG-strike) .cm-strikethrough, del, ul > li.task-list-item[data-task="x"], body:not(.CG-strike) ul > li.task-list-item[data-task="X"]`.
- [[atlas/! themes/baseline|Baseline]]: **Disable checkbox strikethrough** (`strike-lists-off`) — [описание настройки](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L2932), [реализация](https://github.com/aaaaalexis/obsidian-baseline/blob/8c56e831e1abb1d3841c4ffdecbe06b5182fbc68/theme.css#L3173).
  Селектор: `body.strike-lists-off`.
  Условия CSS: `@media screen,print`
- [[atlas/! themes/obsidianotion|Obsidianotion]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L980), [реализация](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L980).
  Селектор: `.markdown-preview-view ul li[data-task='-'].task-list-item.is-checked, .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task='-']), li[data-task='-'].task-list-item.is-checked`.
- [[atlas/! themes/dune|Dune]]: **Tasks strikeout** (`show-strikeout`) — [описание настройки](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L782), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L5575).
  Селектор: `body:not(.show-strikeout) .task-list-item.is-checked[data-task]:is([data-task="x"], [data-task="X"]), body:not(.show-strikeout) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="x"], body:not(.show-strikeout) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="X"]`.
- [[atlas/! themes/everforest-enchanted|Everforest Enchanted]]: правило CSS без отдельного переключателя — [исходник](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1140), [реализация](https://github.com/fireisgood/obsidian-everforest-enchanted/blob/9dacd9c655427f36cb14e2e5ed1607629732e577/theme.css#L1140).
  Селектор: `body:not(.tasks) .markdown-preview-view ul li[data-task='-'].task-list-item.is-checked, body:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task='-']), body:not(.tasks) li[data-task='-'].task-list-item.is-checked`.
- [[atlas/! themes/origami|Origami]]: правило CSS без отдельного переключателя — [исходник](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4591), [реализация](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L4591).
  Селектор: `.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="x"], .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="X"], ul > li.task-list-item[data-task="x"], ul > li.task-list-item[data-task="X"]`.
- [[atlas/! themes/transparent|Transparent]]: правило CSS без отдельного переключателя — [исходник](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L2029), [реализация](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L2029).
  Селектор: `body:not(.ea-checkbox-animations):not(.disable-checkbox-animations) .task-list-item.is-checked`.
- [[atlas/! themes/simple|Simple]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L1249), [реализация](https://github.com/diegoeis/simple-obsidian/blob/3f10c405e7c2da7251323c78610108f326765c08/theme.css#L1249).
  Селектор: `body.enable-alternative-checkboxes:not(.tasks) .markdown-preview-view ul li[data-task='-'].task-list-item.is-checked, body.enable-alternative-checkboxes:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task='-']), body.enable-alternative-checkboxes:not(.tasks) li[data-task='-'].task-list-item.is-checked`.
- [[atlas/! themes/pine-forest-berry|Pine Forest Berry]]: правило CSS без отдельного переключателя — [исходник](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L1149), [реализация](https://github.com/nilahn/pine_forest_berry/blob/e74bd849e654c22b857229ef0f9c6c6834090d2a/obsidian.css#L1149).
  Селектор: `body:not(.tasks) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task="-"]), body:not(.tasks) .markdown-preview-view ul li[data-task="-"].task-list-item.is-checked, body:not(.tasks) li[data-task="-"].task-list-item.is-checked`.
- [[atlas/! themes/composer|Composer]]: **Remove Task Completed Decoration** (`composer--RemoveTaskCompletedDecoration`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L211), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L3076).
  Селектор: `body:not(.tasks).composer--RemoveTaskCompletedDecoration .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task="x"]), body:not(.tasks).composer--RemoveTaskCompletedDecoration .markdown-preview-view ul li[data-task="x"].task-list-item.is-checked, body:not(.tasks).composer--RemoveTaskCompletedDecoration li[data-task="x"].task-list-item.is-checked`.

```hacksidian-files
task-e13
```
