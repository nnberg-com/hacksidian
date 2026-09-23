# Разбор: Transparent

[[atlas/! themes/transparent|Transparent]] · [Репозиторий на момент проверки](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af)

Commit: `1b42ea12a80e5efde58cd50ab0f18133308370af`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 11; документов: 7; CSS-файлов: 1; правил основного CSS разобрано: 245.

## Результат сопоставления

Новых карточек: 6; ранее существовавших приёмов с найденными подтверждениями: 5.

- Рабочая область без видимых полос прокрутки — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Скорость и отключение анимации темы — новая карточка
- Размытие фона за всплывающими панелями — новая карточка
- Компактный файловый проводник — новая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/task-e14/task-e14|Приглушение без зачёркивания]] — существующая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка
- [[atlas/! hacks/table-e002/table-e002|Полная сетка]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| 🎨 Theme Preset | `preset-mode` | Вариант оформления | Комбинация фона, прозрачности, blur, ширины строки и анимации. Самостоятельные механизмы разобраны отдельными настройками.  | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L44) |
| Background Style | `bg-type` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Фоновое изображение рабочего пространства | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L82) |
| Disable Settings / Modal Animation | `disable-modal-animation` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L282) |
| Disable Startup Animation (Splash Screen) | `disable-splash-screen` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L288) |
| Disable Header Animations | `disable-header-animations` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L294) |
| Disable Inline Formatting Animations | `disable-formatting-animations` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L300) |
| Disable Checkbox Animations | `disable-checkbox-animations` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L306) |
| Animate Note Opening (beta) | `animate-note-open` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L312) |
| Show Scrollbars | `show-scrollbars` | Есть карточка | Подтверждено правилом CSS. Рабочая область без видимых полос прокрутки | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L328) |
| Hide Canvas Dots | `hide-canvas-dots` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L333) |
| Accent Color Everywhere | `accent-everywhere` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L357) |
| Default Sync Error Color | `default-sync-error` | Палитра | Вариант цветов темы: color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L362) |
| Disable Drawer Dimming (beta) | `disable-drawer-dimming` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Размытие фона за всплывающими панелями | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L373) |
| Revert to Classic File Tree | `obsidian-classic-tree` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Компактный файловый проводник | [код](https://github.com/oczko24/Obsidian-transparent/blob/1b42ea12a80e5efde58cd50ab0f18133308370af/theme.css#L378) |

## Документация в репозитории

- [.github/CONTRIBUTING.md](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af/.github/CONTRIBUTING.md) — Contributing to Obsidian-transparent; How to contribute:
- [.github/DONATE.md](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af/.github/DONATE.md) — Support Obsidian-transparent ; 🟠 Bitcoin (BTC); 🔵 Ethereum / USDT / Base; ⚪ Monero (XMR)
- [.github/ISSUE_TEMPLATE/bug_report.md](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af/.github/ISSUE_TEMPLATE/bug_report.md)
- [.github/ISSUE_TEMPLATE/feature_request.md](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af/.github/ISSUE_TEMPLATE/feature_request.md)
- [README.md](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af/README.md) — Obsidian transparent; Beautiful on Any Device; Features; Plugin Styling; Roadmap; How to Install; Star History; Support
- [RoadMap.md](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af/RoadMap.md) — todo rather than roadmap; dev notes with things to do so i can note things I can do:))
- [assets/phone_screenshots/test.md](https://github.com/oczko24/Obsidian-transparent/tree/1b42ea12a80e5efde58cd50ab0f18133308370af/assets/phone_screenshots/test.md)

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
