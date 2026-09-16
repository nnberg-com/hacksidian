# Разбор: GitHub Theme

[[atlas/! themes/github-theme|GitHub Theme]] · [Репозиторий на момент проверки](https://github.com/krios2146/obsidian-theme-github/tree/0ec83a88de1161ed0311f76b2e962b6a233121da)

Commit: `0ec83a88de1161ed0311f76b2e962b6a233121da`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 3; документов: 1; CSS-файлов: 1; правил основного CSS разобрано: 71.

## Результат сопоставления

Новых карточек: 4; ранее существовавших приёмов с найденными подтверждениями: 4.

- Палитры для различения цветов интерфейса — новая карточка
- Колонки Kanban на полную высоту — новая карточка
- Минимальная высота карточек Kanban — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/callout-technical-line/callout-technical-line|Только боковая линия]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Protanopia & Deuteranopia | `colorblind_protan-deutan` | Есть карточка | Подтверждено правилом CSS. Палитры для различения цветов интерфейса | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L15) |
| Tritanopia | `colorblind_tritan` | Есть карточка | Подтверждено правилом CSS. Палитры для различения цветов интерфейса | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L19) |
| GitHub callout style | `callout-on` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-line/callout-technical-line\|Только боковая линия]] | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L32) |
| H1 header underline enabled | `h1-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L46) |
| H2 header underline enabled | `h2-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L50) |
| All headers are the same color | `headers-one-color` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L71) |
| Kanban variant | `kanban-variant` | Вариант оформления | Варианты рамок, фона, отступов и высоты Kanban; минимальная высота карточек выделена отдельно.  | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L151) |
| Minimal height for cards | `kanban-same-height-cards` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Минимальная высота карточек Kanban | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L168) |
| Full height lists | `kanban-full-height-column` | Есть карточка | Подтверждено правилом CSS. Колонки Kanban на полную высоту | [код](https://github.com/krios2146/obsidian-theme-github/blob/0ec83a88de1161ed0311f76b2e962b6a233121da/theme.css#L174) |

## Документация в репозитории

- [README.md](https://github.com/krios2146/obsidian-theme-github/tree/0ec83a88de1161ed0311f76b2e962b6a233121da/README.md) — Obsidian GitHub Theme; Preview; Features; Theme Settings; How to Install; Contributing

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
