# Разбор: Sanctum

[[atlas/! themes/sanctum|Sanctum]] · [Репозиторий на момент проверки](https://github.com/jdanielmourao/obsidian-sanctum/tree/ac69e5992a66d2aeabb30d8c2d90c636d155fc25)

Commit: `ac69e5992a66d2aeabb30d8c2d90c636d155fc25`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 69; документов: 2; CSS-файлов: 4; правил основного CSS разобрано: 959.

## Результат сопоставления

Новых карточек: 15; ранее существовавших приёмов с найденными подтверждениями: 23.

- Полные имена файлов в проводнике — новая карточка
- Плавающий заголовок панели заметки — новая карточка
- Номера строк внутри блока кода — новая карточка
- Колонки Kanban переходят на следующую строку — новая карточка
- Встроенная заметка без отдельной рамки — новая карточка
- Перестановка элементов заголовка календаря — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Перенос длинного содержимого таблиц — новая карточка
- Согласованный набор значков интерфейса — новая карточка
- Автоматическая нумерация боковых примечаний — новая карточка
- Только вертикальные разделители таблицы — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Примечание без заголовка — новая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/table-e008/table-e008|Полосы по столбцам]] — существующая карточка
- [[atlas/! hacks/table-e034/table-e034|Подсветка строки]] — существующая карточка
- [[atlas/! hacks/table-e043/table-e043|Закреплённая шапка]] — существующая карточка
- [[atlas/! hacks/table-e019/table-e019|Табличные цифры]] — существующая карточка
- [[atlas/! hacks/table-e066/table-e066|Нумерация строк]] — существующая карточка
- [[atlas/! hacks/table-e002/table-e002|Полная сетка]] — существующая карточка
- [[atlas/! hacks/table-e003/table-e003|Только горизонтали]] — существующая карточка
- [[atlas/! hacks/code-e052/code-e052|Читаемая метка языка]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/heading-e048/heading-e048|Контурные буквы]] — существующая карточка
- [[atlas/! hacks/combinations-s33/combinations-s33|Курсив с маркером]] — существующая карточка
- [[atlas/! hacks/quote-margin/quote-margin|Цитата на боковом поле]] — существующая карточка
- [[atlas/! hacks/quote-frame/quote-frame|Рамка вокруг цитаты]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/unordered-markers/unordered-markers|Цвет и форма маркеров]] — существующая карточка
- [[atlas/! hacks/image-e062/image-e062|Обтекание слева]] — существующая карточка
- [[atlas/! hacks/image-e063/image-e063|Обтекание справа]] — существующая карточка
- [[atlas/! hacks/composition-margin/composition-margin|Заметка на полях]] — существующая карточка
- [[atlas/! hacks/quote-line/quote-line|Классическая цитата с линией]] — существующая карточка
- [[atlas/! hacks/unordered-tree/unordered-tree|Линии вложенного плана]] — существующая карточка
- [[atlas/! hacks/ordered-o013/ordered-o013|Составные номера]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Light mode contrast mode | `light-mode-contrast-mode` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7073) |
| Dark mode contrast mode | `dark-mode-contrast-mode` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7089) |
| Toggle aside counter [Beta] | `aside-counter` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Автоматическая нумерация боковых примечаний | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7219) |
| Toggle aside borders | `aside-border` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/quote-margin/quote-margin\|Цитата на боковом поле]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7223) |
| Toggle blockquote short divider | `blockquote-marker` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/quote-frame/quote-frame\|Рамка вокруг цитаты]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7278) |
| Toggle blockquote horizontal dividers | `blockquote-border` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/quote-frame/quote-frame\|Рамка вокруг цитаты]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7283) |
| Toggle code block line numbers | `code-lines` | Есть карточка | Подтверждено правилом CSS. Номера строк внутри блока кода | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7334) |
| Toggle code block labels | `code-label` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/code-e052/code-e052\|Читаемая метка языка]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7339) |
| Code borders | `code-border` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/code-e002/code-e002\|Контур без заливки]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7344) |
| Syntax Highlighting color scheme | `syntax-highlighting` | Есть карточка | Подтверждено правилом CSS. Согласованная палитра синтаксиса кода | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7365) |
| Clean embeds | `clean-embeds` | Есть карточка | Подтверждено правилом CSS. Встроенная заметка без отдельной рамки | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7487) |
| Hide vault title | `hide-vault-title` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7550) |
| Wrap titles | `wrap-nav-titles` | Есть карточка | Подтверждено правилом CSS. Полные имена файлов в проводнике | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7554) |
| Heading outline | `heading-outline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e048/heading-e048\|Контурные буквы]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7564) |
| H1 divider line | `h1-line` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7600) |
| H2 divider line | `h2-line` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7668) |
| H3 divider line | `h3-line` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7736) |
| H4 divider line | `h4-line` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7804) |
| H5 divider line | `h5-line` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7872) |
| H6 divider line | `h6-line` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L7940) |
| Odd numbered list marker style | `odd-marker` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/unordered-markers/unordered-markers\|Цвет и форма маркеров]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8237) |
| Odd numbered list marker style | `even-marker` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/unordered-markers/unordered-markers\|Цвет и форма маркеров]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8265) |
| Ordered list marker style | `step-list` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/unordered-markers/unordered-markers\|Цвет и форма маркеров]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8293) |
| Cell borders | `table-cell-border` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e002/table-e002\|Полная сетка]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8316) |
| Row lines | `table-row-border` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e003/table-e003\|Только горизонтали]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8320) |
| Column lines | `table-column-border` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Только вертикальные разделители таблицы | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8324) |
| Striped rows | `table-alternate-row` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e007/table-e007\|Зебра по строкам]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8328) |
| Striped columns | `table-alternate-column` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e008/table-e008\|Полосы по столбцам]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8332) |
| Disable active row highlighting | `table-hover-row` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e034/table-e034\|Подсветка строки]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8336) |
| Disable row text wrap | `table-single-rows` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Перенос длинного содержимого таблиц | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8348) |
| Sticky headers | `table-sticky-headers` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e043/table-e043\|Закреплённая шапка]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8352) |
| Tabular figures | `table-tabular-figures` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e019/table-e019\|Табличные цифры]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8362) |
| Row numbers | `table-nums` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e066/table-e066\|Нумерация строк]] | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8366) |
| Disable floating tab title bar buttons | `sticky-view-actions` | Есть карточка | Подтверждено правилом CSS. Плавающий заголовок панели заметки | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8478) |
| Replace folder icons with regular chevron/arrows | `nav-folder-indicators` | Есть карточка | Подтверждено правилом CSS. Значки папок вместо стрелок дерева | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8489) |
| Disable colorful active nav items | `colorful-active-nav` | Палитра | Вариант цветов темы: background-color, color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8493) |
| Stendig-like layout [Beta] | `stendig` | Вариант оформления | Оформление календаря Stendig: шапка, направление flex, типографика, разделители. Не добавляет календарных операций.  | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8509) |
| Flip calendar Month + Year title | `calendar-flip` | Есть карточка | Подтверждено правилом CSS. Перестановка элементов заголовка календаря | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8514) |
| Wrap kanban lanes | `wrap-kanban-lanes` | Есть карточка | Подтверждено правилом CSS. Колонки Kanban переходят на следующую строку | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8538) |
| Disable custom icons | `no-sanctum-icons` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Согласованный набор значков интерфейса | [код](https://github.com/jdanielmourao/obsidian-sanctum/blob/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/theme.css#L8548) |

## Документация в репозитории

- [README.md](https://github.com/jdanielmourao/obsidian-sanctum/tree/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/README.md) — Sanctum 1.0 for Obsidian 0.16; Disclaimer for Sanctum Users; Installation; Disclaimer; Recommended Plugins; Design Principles; Showcase (outdated); Preview Mode; Edit Mode; Modal; Prompt; Resize Handles; Features; Plugin Support; Feedback & Contributions; Support
- [documentation/Theme_Guide.md](https://github.com/jdanielmourao/obsidian-sanctum/tree/ac69e5992a66d2aeabb30d8c2d90c636d155fc25/documentation/Theme_Guide.md) — Table of Contents; Features:; Html Blocks; Html elements ; Style Settings Options:

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
