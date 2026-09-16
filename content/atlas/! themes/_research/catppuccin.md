# Разбор: Catppuccin

[[atlas/! themes/catppuccin|Catppuccin]] · [Репозиторий на момент проверки](https://github.com/catppuccin/obsidian/tree/1316e03af5c31964116661ab08e7784bfa1d00b3)

Commit: `1316e03af5c31964116661ab08e7784bfa1d00b3`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 37; документов: 4; CSS-файлов: 2; правил основного CSS разобрано: 337.

## Результат сопоставления

Новых карточек: 7; ранее существовавших приёмов с найденными подтверждениями: 6.

- Инверсия страниц PDF в тёмном режиме — новая карточка
- PDF вписывается в фон темы — новая карточка
- PDF без рамок между страницами — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Полужирные имена папок — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- [[atlas/! hacks/tag-e021/tag-e021|Мягкая капсула]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|02 · Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|03 · Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Dark theme flavor | `catppuccin-theme-dark` | Палитра | Выбор палитры и акцента темы; сохраняется контекст рекомендации темы, отдельный приём на каждый цвет не создаётся.  | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L557) |
| Theme accent | `catppuccin-theme-accents` | Палитра | Выбор палитры и акцента темы; сохраняется контекст рекомендации темы, отдельный приём на каждый цвет не создаётся.  | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L574) |
| Hide icons | `ctp-icon-hide` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Значки папок вместо стрелок дерева | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L632) |
| Bold folder title | `ctp-bold-folder-title` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Полужирные имена папок | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L642) |
| Remove borders around PDF pages | `ctp-seamless-pdf` | Есть карточка | Подтверждено правилом CSS. PDF без рамок между страницами | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1309) |
| Darken PDF background | `ctp-pdf-darken` | Есть карточка | Подтверждено правилом CSS. Инверсия страниц PDF в тёмном режиме | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1314) |
| Blend PDF background | `ctp-pdf-blend` | Есть карточка | Подтверждено правилом CSS. PDF вписывается в фон темы | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1319) |
| Pill-shaped tags | `ctp-tag-pill` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/tag-e021/tag-e021\|Мягкая капсула]] | [код](https://github.com/catppuccin/obsidian/blob/1316e03af5c31964116661ab08e7784bfa1d00b3/theme.css#L1329) |

## Документация в репозитории

- [CONTRIBUTING.md](https://github.com/catppuccin/obsidian/tree/1316e03af5c31964116661ab08e7784bfa1d00b3/CONTRIBUTING.md) — Contributing; Theme layout and colors; What colors go where?; Working the theme; CSS for plugins
- [HISTORY.md](https://github.com/catppuccin/obsidian/tree/1316e03af5c31964116661ab08e7784bfa1d00b3/HISTORY.md) — History; [Upcoming]; 0.4.47 - 2026-3-11; Fixes; [0.4.45] - 2026-3-9; Changes; Fixes; [0.4.44] - 2025-4-9; Fixes; [0.4.43] - 2025-3-25; Fixes; [0.4.42] - 2025-1-31; Fixes; [0.4.41] - 2025-1-16; Adds; Fixes; [0.4.40] - 2024-12-4; Fixes; [0.4.39] - 2024-11-25; Adds; [0.4.38] - 2024-11-13; Fixes; [0.4.37] - 2024-11-12; Fixes; [0.4.35] - 2024-10-22; Fixes; [0.4.34] - 2024-10-22; Fixes; [0.4.33] - 2024-10-22; Adds; [0.4.32] - 2024-9-30; Adds; [0.4.29] - 2024-9-20; Adds; [0.4.28] - 2024-9-20; Adds; [0.4.27] - 2024-9-9; Fixes; [0.4.17] - 2023-8-14; Adds; Fixes; [0.4.14] - 2023-6-22; Fixes; [0.4.10] - 2023-5-15; Adds; Fixes; [0.4.9] - 2023-05-11; Fixes; [0.4.7] - 2023-04-19; Adds; Fixes; [0.4.6] - 2023-04-18; Adds; Changes; [0.4.5] - 2023-02-24; Adds; Changes; Fixes
- [README.md](https://github.com/catppuccin/obsidian/tree/1316e03af5c31964116661ab08e7784bfa1d00b3/README.md) — Previews; Usage; Obsidian theme store; Style Settings plugin installation and use; Problems?; Contributing; Plugins; Development; 💝 Thanks to
- [scss/vendors/README.md](https://github.com/catppuccin/obsidian/tree/1316e03af5c31964116661ab08e7784bfa1d00b3/scss/vendors/README.md) — Vendors

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
