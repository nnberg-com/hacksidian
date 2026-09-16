# Разбор: Soft Paper

[[atlas/! themes/soft-paper|Soft Paper]] · [Репозиторий на момент проверки](https://github.com/nickmilo/soft-paper/tree/b7df83b162561df4a2851935ec85bac8aa27b3a5)

Commit: `b7df83b162561df4a2851935ec85bac8aa27b3a5`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 4; документов: 1; CSS-файлов: 1; правил основного CSS разобрано: 334.

## Результат сопоставления

Новых карточек: 11; ранее существовавших приёмов с найденными подтверждениями: 7.

- Цветовые группы папок в проводнике — новая карточка
- Компактные таблицы Bases — новая карточка
- Компактный файловый проводник — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- Компактные списки служебных панелей — новая карточка
- Полупрозрачные панели — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Выделение активной строки редактора — новая карточка
- Размер и форма полос прокрутки — новая карточка
- Выделение активного файла в проводнике — новая карточка
- [[atlas/! hacks/metadata-compact/metadata-compact|Компактные строки]] — существующая карточка
- [[atlas/! hacks/metadata-no-add/metadata-no-add|Без строки добавления]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|02 · Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|03 · Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Condense everything | `sp-compact-all` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Компактный файловый проводник; Компактные таблицы Bases; Компактные списки служебных панелей | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L29) |
| Make bases condensed | `sp-compact-bases` | Есть карточка | Подтверждено правилом CSS. Компактные таблицы Bases | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L35) |
| Make file explorer condensed | `sp-compact-explorer` | Есть карточка | Подтверждено правилом CSS. Компактный файловый проводник | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L41) |
| Make file explorer extra condensed | `sp-compact-explorer-extra` | Есть карточка | Подтверждено правилом CSS. Компактный файловый проводник | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L47) |
| Make sidebar panes condensed | `sp-compact-panes` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Компактные списки служебных панелей | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L53) |
| Make in-note properties condensed | `sp-compact-properties` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/metadata-compact/metadata-compact\|Компактные строки]] | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L59) |
| Make body text condensed | `sp-compact-body` | Типографический параметр | Меняет line-height, отступы абзацев и списков, сохраняя размер шрифта; настройка плотности текста, не отдельная структура.  | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L65) |
| Make settings popup condensed | `sp-compact-settings` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Компактные списки служебных панелей | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L71) |
| Hide "Add property" button | `sp-hide-add-property` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/metadata-no-add/metadata-no-add\|Без строки добавления]] | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L83) |
| Hide scrollbars | `sp-hide-scrollbars` | Есть карточка | Подтверждено правилом CSS. Рабочая область без видимых полос прокрутки | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L89) |
| Make status bar blue | `sp-status-bar-blue` | Палитра | Меняются только фон и цвет текста строки состояния.  | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L94) |
| Make settings more see-through | `sp-settings-transparent-80` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Полупрозрачные панели | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L100) |
| Rainbow-Colored Folders | `sp-rainbow-folders` | Есть карточка | Подтверждено правилом CSS. Цветовые группы папок в проводнике | [код](https://github.com/nickmilo/soft-paper/blob/b7df83b162561df4a2851935ec85bac8aa27b3a5/theme.css#L106) |

## Документация в репозитории

- [README.md](https://github.com/nickmilo/soft-paper/tree/b7df83b162561df4a2851935ec85bac8aa27b3a5/README.md) — Soft Paper; Rainbow Folders (NEW a/o 2026-05-23); Style Settings; The "See More" Section; Special Tweaks; Performance Benchmarks (2026-02-15); Roadmap; Credits; License

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
