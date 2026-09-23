# Разбор: Velocity

[[atlas/! themes/velocity|Velocity]] · [Репозиторий на момент проверки](https://github.com/gonzalo-d-sales/obsidian-velocity/tree/5ddc6c2e0028baad1b98fb5586517ff520291e7a)

Commit: `5ddc6c2e0028baad1b98fb5586517ff520291e7a`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 58; документов: 3; CSS-файлов: 2; правил основного CSS разобрано: 1160.

## Результат сопоставления

Новых карточек: 18; ранее существовавших приёмов с найденными подтверждениями: 10.

- Компактные закреплённые вкладки — новая карточка
- Меньше случайных закрытий вкладок — новая карточка
- Боковая панель появляется при наведении — новая карточка
- Строка состояния появляется при наведении — новая карточка
- Выделение активной строки редактора — новая карточка
- Приглушение ярких изображений в тёмном режиме — новая карточка
- Упрощённый заголовок Bases — новая карточка
- Встроенная заметка без отдельной рамки — новая карточка
- Боковые панели скрываются в узком окне — новая карточка
- Согласованный набор значков интерфейса — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Таблица шире текстовой полосы — новая карточка
- Связующие линии файлового дерева — новая карточка
- Непрерывное скругление углов Electron — новая карточка
- Служебные элементы появляются при наведении — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Встроенная заметка без повторного заголовка — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/note-list-markers/note-list-markers|Цвет и форма маркеров]] — существующая карточка
- [[atlas/! hacks/callout-technical-round/callout-technical-round|Большое скругление]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/table-e003/table-e003|Только горизонтали]] — существующая карточка
- [[atlas/! hacks/metadata-no-add/metadata-no-add|Без строки добавления]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| do not show again | `ss-section-news` | Служебная настройка | Скрывает уведомление о новостях темы внутри Style Settings.  | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L7) |
| Select paint job | `theme-paint-light` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L30) |
| Select paint job | `theme-paint-dark` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L50) |
| Colored bold and italics | `enable-special-text` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/emphasis-s02/emphasis-s02\|02 · Цветной bold]]; [[atlas/! hacks/emphasis-s03/emphasis-s03\|03 · Цвет вместо курсива]] | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L105) |
| Unique code text color | `enable-special-code` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L110) |
| Override dedicated theme typeface | `override-default-font` | Типографический параметр | Настройка типографических параметров: --font-interface-override, --font-text-override. Отдельного способа взаимодействия или структуры блока не добавляет.  | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L173) |
| Inverted editing mode toggle display | `switch-edit-icons` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Согласованный набор значков интерфейса | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L178) |
| Hide titlebar buttons | `titlebar-button-visibility` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L183) |
| Restore bullet-style list markers | `disable-list-styling` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-list-markers/note-list-markers\|Цвет и форма маркеров]] | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L216) |
| Restore default Callout styling | `disable-callout-styling` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-round/callout-technical-round\|Большое скругление]] | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L220) |
| Restore default icon styling | `disable-custom-icons` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Согласованный набор значков интерфейса | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L224) |
| Restore table scrolling behavior | `restore-table-scroll` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Таблица шире текстовой полосы | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L228) |
| Restore indentation guides | `restore-indent-guide` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Связующие линии файлового дерева | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L232) |
| Disable Compact Panels in the sidebar | `disable-hover-header` | Есть карточка | Сопоставление уточнено после проверки конкретной цели CSS. Служебные элементы появляются при наведении | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L236) |
| Disable Naked Embed styling | `disable-naked-embeds` | Есть карточка | Подтверждено правилом CSS. Встроенная заметка без отдельной рамки | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L240) |
| Disable Sidebar Auto-Hide™ feature | `disable-autohide` | Есть карточка | Подтверждено правилом CSS. Боковая панель появляется при наведении | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L244) |
| Disable Status Bar fade until hover | `disable-status-fade` | Есть карточка | Подтверждено правилом CSS. Строка состояния появляется при наведении | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L248) |
| Disable title style for H1 Headings | `disable-title-h1` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L252) |
| Accidental exit prevention for tabs | `prevent-exit` | Есть карточка | Подтверждено правилом CSS. Меньше случайных закрытий вкладок | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L262) |
| Active line highlighting | `active-line-highlight` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L267) |
| Cleaner Bases display | `hide-bases-header` | Есть карточка | Подтверждено правилом CSS. Упрощённый заголовок Bases | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L272) |
| Image dimming in Dark mode | `enable-dim-img` | Есть карточка | Подтверждено правилом CSS. Приглушение ярких изображений в тёмном режиме | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L277) |
| Improved pinned tabs appearance | `improve-pinned-tabs` | Есть карточка | Подтверждено правилом CSS. Компактные закреплённые вкладки | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L282) |
| Turn off Electron corner-smoothing | `disable-corner-smoothing` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Непрерывное скругление углов Electron | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L293) |
| Disable performance tweaks | `disable-performance-tweaks` | Вариант оформления | Подсказки will-change для прокрутки и margin-bottom; сами по себе не создают видимый приём и не доказывают ускорения.  | [код](https://github.com/gonzalo-d-sales/obsidian-velocity/blob/5ddc6c2e0028baad1b98fb5586517ff520291e7a/theme.css#L298) |

## Документация в репозитории

- [.github/ISSUE_TEMPLATE/bug-report.md](https://github.com/gonzalo-d-sales/obsidian-velocity/tree/5ddc6c2e0028baad1b98fb5586517ff520291e7a/.github/ISSUE_TEMPLATE/bug-report.md) — READ THIS FIRST (do not include in the report!); Information (remove the brackets):; Short Description; To Reproduce (i.e., when does the bug occur?); Screenshot(s) of bug; Default Theme for comparison
- [.github/ISSUE_TEMPLATE/feature_request.md](https://github.com/gonzalo-d-sales/obsidian-velocity/tree/5ddc6c2e0028baad1b98fb5586517ff520291e7a/.github/ISSUE_TEMPLATE/feature_request.md) — Please answer the questions first!; Request
- [README.md](https://github.com/gonzalo-d-sales/obsidian-velocity/tree/5ddc6c2e0028baad1b98fb5586517ff520291e7a/README.md) — Table of Contents; News [^](#Table-of-Contents); Issues Policy; FAQ [^](#Table-of-Contents); Features [^](#Table-of-Contents); CSSClasses; Auto-Hide; Math Callouts; Planned Features; Background [^](#Table-of-Contents); Credits [^](#Table-of-Contents); Themes:; People:

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
