---
tags:
  - hacksidian_technique
  - hacksidian_tag
title: Радуга по позиции
category: tag
sources: []
format: markdown
themes:
  - blue-topaz
  - primary
  - pink-topaz
  - golden-topaz
  - obsidianotion
  - notation-2
  - aura
  - vicious
---

```hacksidian-id
tag-e064
```

```hacksidian-live
tag-e064
```

###### HTML-модель

[Открыть сохранённый образец](./Model.ru.html) · [Стили модели](./Model.css)

Это исходная HTML-модель из прежнего атласа: тегов в режиме чтения и, где они были, фрагментов CodeMirror. Сохранены разметка и состояния именно этого приёма; браузерные элементы управления и контейнеры образца перенесены вместе с ним. Изображения и шрифты модели встроены в её CSS.

Модель — эталон для будущего HTML-рендерера. Она не заменяет `markdown.md` и `snippet.css` и не запускает настоящий редактор Obsidian. В ней сохранено поведение исходного стенда, включая его статические имитации.

```hacksidian-details
> Зачем
Декоративное разнообразие, без связи цвета со смыслом.

> Как работает
Фильтр of a.tag считает только теги среди соседей одного родителя.

> Ограничения
В редакторе один тег разбит на части; этот счётчик туда не переносится.
```

```hacksidian-sources
tag-e064
```

- Обзор оформления тегов опирался на Minimal, Blue Topaz и Things. Компактные рецепты и декоративные расширения составлены для атласа; это не подтверждение наличия каждого варианта во всех трёх темах.


###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/blue-topaz|Blue Topaz]]: **Tag Style** (`tag-style-option`) — [описание настройки](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L3698), [реализация](https://github.com/pkm-er/Blue-Topaz_Obsidian-css/blob/54821893b8f293f9c738580f59d4f1beec5c4284/theme.css#L10655).
  Селектор: `body.colorful-tag-bt .tag:not(.token):nth-child(5n+1)`.
  Правило восстановлено отдельным разбором после ошибки CSS; внешние условия и каскад проверяйте по исходнику.
  Проверяемое свойство: `background-color`.
  Варианты: Rainbow tag (rainbow-tag); Rainbow tag alt (No influence on emojis) (rainbow-tag-no-filter); Outlined (tag-pill-outlined); Clear (tag-clear-style); Obsidian default (tag-default); Customised colorful tag (colorful-tag-bt)
- [[atlas/! themes/primary|Primary]]: правило CSS без отдельного переключателя — [исходник](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170), [реализация](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L170).
  Селектор: `.metadata-property[data-property-key=tags] .multi-select-pill:nth-child(3n+1)`.
- [[atlas/! themes/pink-topaz|Pink Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L802), [реализация](https://github.com/shaggyfeng/obsidian-Pink-topaz-theme/blob/4d260d1181027e9475d790a801b940ff686ced16/obsidian.css#L802).
  Селектор: `.tag:not(.token).tag:nth-child(9n+1)`.
- [[atlas/! themes/golden-topaz|Golden Topaz]]: правило CSS без отдельного переключателя — [исходник](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L802), [реализация](https://github.com/shaggyfeng/obsidian-Golden-Topaz-theme/blob/3eb6dae5091954fb80dd426917eddfc7a93885d3/obsidian.css#L802).
  Селектор: `.tag:not(.token).tag:nth-child(9n+1)`.
- [[atlas/! themes/obsidianotion|Obsidianotion]]: правило CSS без отдельного переключателя — [исходник](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L753), [реализация](https://github.com/diegoeis/obsidianotion/blob/420469845836be3f116d9070e7548362289b8ee7/theme.css#L753).
  Селектор: `.metadata-property[data-property-key="tags"] .multi-select-pill:nth-child(7n + 1)`.
- [[atlas/! themes/notation-2|Notation 2]]: правило CSS без отдельного переключателя — [исходник](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1020), [реализация](https://github.com/bluemoondragon07/obsidian-notation-2/blob/58e6626182fe78f71d6125c2bf1b07501f268f11/theme.css#L1020).
  Селектор: `.markdown-preview-section > div a.tag:nth-of-type(10n + 1), .HyperMD-list-line > :is(span.cm-hashtag:nth-of-type(20n + 2), span.cm-hashtag:nth-of-type(20n + 2) + .cm-hashtag), .cm-line > :is(span.cm-hashtag-begin:nth-of-type(10n + 1), span.cm-hashtag-end:nth-of-type(20n + 2))`.
- [[atlas/! themes/aura|Aura]]: **Enable Rainbow Tags** (`aura-rainbow-tags`) — [описание настройки](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3869), [реализация](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L1677).
  Селектор: `.aura-rainbow-tags a.tag`.
- [[atlas/! themes/vicious|Vicious]]: правило CSS без отдельного переключателя — [исходник](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L3254), [реализация](https://github.com/zaheralmajed/vicious-theme-obsidian/blob/8a46212741d5beca548d18849d4617f85e887f32/theme.css#L3254).
  Селектор: `a.tag:nth-child(7n + 1), .multi-select-pill:nth-child(7n + 1), p > a.tag:nth-child(7n + 1), :is(.cm-hashtag:nth-child(14n + 1), .cm-hashtag:nth-child(14n + 2))`.

```hacksidian-files
tag-e064
```
