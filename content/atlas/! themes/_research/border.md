# Разбор: Border

[[atlas/! themes/border|Border]] · [Репозиторий на момент проверки](https://github.com/akifyss/obsidian-border/tree/05d2df5d157e15f13be1a43da2d3034c995dd8e2)

Commit: `05d2df5d157e15f13be1a43da2d3034c995dd8e2`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 41; документов: 3; CSS-файлов: 2; правил основного CSS разобрано: 741.

## Результат сопоставления

Новых карточек: 28; ранее существовавших приёмов с найденными подтверждениями: 17.

- Полные имена файлов в проводнике — новая карточка
- Цветовые группы папок в проводнике — новая карточка
- Значки файлов в проводнике — новая карточка
- Строка состояния появляется при наведении — новая карточка
- Плавающий заголовок панели заметки — новая карточка
- Панели рабочего пространства отдельными карточками — новая карточка
- Проводник на весь экран телефона — новая карточка
- Маркер строки под указателем — новая карточка
- Связующие линии в оглавлении заметки — новая карточка
- Приглушение ярких изображений в тёмном режиме — новая карточка
- Canvas без постоянно видимых кнопок — новая карточка
- Режим письма со скрытыми элементами интерфейса — новая карточка
- Встроенная заметка без отдельной рамки — новая карточка
- Лента команд появляется при наведении — новая карточка
- Обозначение уровня заголовка в редакторе — новая карточка
- Заметная кнопка создания заметки — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Номера строк внутри блока кода — новая карточка
- Таблица шире текстовой полосы — новая карточка
- Размер и форма полос прокрутки — новая карточка
- Служебные элементы появляются при наведении — новая карточка
- Подсветка текущего уровня списка — новая карточка
- Положение маркера сворачивания заголовка — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Выделение активной строки редактора — новая карточка
- Выделение активного файла в проводнике — новая карточка
- [[atlas/! hacks/text-justify/text-justify|Выравнивание по ширине]] — существующая карточка
- [[atlas/! hacks/image-e006/image-e006|По центру]] — существующая карточка
- [[atlas/! hacks/composition-dotted/composition-dotted|Заметка на точечной сетке]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/unordered-markers/unordered-markers|Цвет и форма маркеров]] — существующая карточка
- [[atlas/! hacks/callout-technical-outline/callout-technical-outline|Тонкая рамка]] — существующая карточка
- [[atlas/! hacks/text-selection-custom/text-selection-custom|Собственный цвет выделения мышью]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Auto hide tab bar | `tab-autohide` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L28) |
| Auto hide bottom status bar | `status-bar-autohide` | Есть карточка | Подтверждено правилом CSS. Строка состояния появляется при наведении | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L35) |
| Auto hide left ribbon menu | `Ribbon-autohide` | Есть карточка | Подтверждено правилом CSS. Лента команд появляется при наведении | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L40) |
| Auto hide tab title bar | `tab-title-bar-autohide` | Есть карточка | Подтверждено правилом CSS. Плавающий заголовок панели заметки | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L50) |
| Auto hide vault profile | `vault-profile-autohide` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Служебные элементы появляются при наведении | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L55) |
| Enable bigger "New note" button | `CTA-BTN-enable` | Есть карточка | Подтверждено правилом CSS. Заметная кнопка создания заметки | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L67) |
| Untrim file names | `file-names-untrim` | Есть карточка | Подтверждено правилом CSS. Полные имена файлов в проводнике | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L72) |
| Bold folder font | `folder-font-bold` | Типографический параметр | Настройка типографических параметров: --nav-item-weight, --nav-item-weight-active, --nav-item-weight-hover. Отдельного способа взаимодействия или структуры блока не добавляет.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L77) |
| Remove custom icon | `file-icon-remove` | Есть карточка | Подтверждено правилом CSS. Значки файлов в проводнике | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L89) |
| Enable colorful folder icon | `colorful-folder` | Есть карточка | Подтверждено правилом CSS. Цветовые группы папок в проводнике | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L94) |
| Enable enhanced outline style | `outline-enhanced` | Есть карточка | Подтверждено правилом CSS. Связующие линии в оглавлении заметки | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L106) |
| New tab buttons | `new-tab-btn-select` | Вариант оформления | Оформление пустой вкладки: группировка кнопок и декоративная иллюстрация/логотип.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L119) |
| New tab image | `new-tab-image-select` | Вариант оформления | Оформление пустой вкладки: группировка кнопок и декоративная иллюстрация/логотип.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L131) |
| immersive canvas | `immersive-canvas` | Есть карточка | Подтверждено правилом CSS. Canvas без постоянно видимых кнопок | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L225) |
| Remove border effect of media card. | `media-embed-card-border-off` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Встроенная заметка без отдельной рамки | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L230) |
| canvas card menu position | `canvas-card-menu` | Есть карточка | Сопоставление уточнено после проверки конкретной цели CSS. Canvas без постоянно видимых кнопок | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L260) |
| Remove setting item title icon | `setting-item-title-icon-remove` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L302) |
| Hide scrollbar | `scrollbar-hide` | Есть карточка | Подтверждено правилом CSS. Рабочая область без видимых полос прокрутки | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L307) |
| Restore scrollbar style | `restored-scrollbars` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Размер и форма полос прокрутки | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L312) |
| Enable card layout(light mode) | `card-layout-open-light` | Есть карточка | Подтверждено правилом CSS. Панели рабочего пространства отдельными карточками | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L331) |
| Base style (light mode) | `theme-light-style-select` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L336) |
| Override accent color setting in "Settings-Appearance" menu(light mode) | `accent-color-override-light` | Служебная настройка | Сообщает в системных настройках, что акцент переопределён Style Settings; служебная индикация.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L374) |
| Left sidepane background(light mode) | `mod-left-split-background-select-light` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L503) |
| Right sidepane background (light mode) | `mod-right-split-background-select-light` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L564) |
| Middle pane background (light mode) | `mod-root-split-background-select-light` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L625) |
| underlying background(light mode) | `background-underlying-select-light` | Вариант оформления | Цвет или произвольный CSS-фон нижней поверхности; вместе с режимом смешивания background-blend-mode.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L686) |
| Apply custom color to the "close" icon(light mode) | `color-to-tab-icon-light` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1035) |
| Activated file style(light mode) | `Active-states-file-explorer-select-light` | Вариант оформления | Оформление активного файла: цвет текста, фон, тень и радиус.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1079) |
| Visually remove divider effect in workspace | `workspace-divider-transparent-light` | Палитра | Вариант цветов темы: --workspace-divider-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1248) |
| Enable card layout(dark mode) | `card-layout-open-dark` | Есть карточка | Подтверждено правилом CSS. Панели рабочего пространства отдельными карточками | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1285) |
| Base style (dark mode) | `theme-dark-style-select` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1290) |
| Override accent color setting in "Settings-Appearance" menu(dark mode) | `accent-color-override-dark` | Служебная настройка | Сообщает в системных настройках, что акцент переопределён Style Settings; служебная индикация.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1330) |
| Left sidepane background(dark mode) | `mod-left-split-background-select-dark` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1459) |
| Right sidepane background(dark mode) | `mod-right-split-background-select-dark` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1520) |
| Middle pane background (dark mode) | `mod-root-split-background-select-dark` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1581) |
| underlying background(dark mode) | `background-underlying-select-dark` | Вариант оформления | Цвет или произвольный CSS-фон нижней поверхности; вместе с режимом смешивания background-blend-mode.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1642) |
| Apply custom color to the "close" icon(dark mode) | `color-to-tab-icon-dark` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L1991) |
| Activated file style(dark mode) | `Active-states-file-explorer-select-dark` | Вариант оформления | Оформление активного файла: цвет текста, фон, тень и радиус.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2035) |
| Visually remove divider effect in workspace | `workspace-divider-transparent-dark` | Палитра | Вариант цветов темы: --workspace-divider-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2205) |
| Enable Focus indicator | `line-hover-indicator` | Есть карточка | Подтверждено правилом CSS. Маркер строки под указателем | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2249) |
| indicate list level | `focus-indicator-list-level` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Подсветка текущего уровня списка | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2254) |
| indicate codeblock line number | `focus-indicator-codeblock-line-number` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Номера строк внутри блока кода | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2259) |
| Enable focus mode | `border-focus-mode` | Есть карточка | Подтверждено правилом CSS. Режим письма со скрытыми элементами интерфейса | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2286) |
| Enable grid background pattern | `editor-grid-background-pattren` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/composition-dotted/composition-dotted\|Заметка на точечной сетке]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2316) |
| Restore the collapse icon before headings | `collapse-icon-restore` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Положение маркера сворачивания заголовка | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2345) |
| Remove headings indicator | `heading-indicator-off` | Есть карточка | Подтверждено правилом CSS. Обозначение уровня заголовка в редакторе | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2350) |
| Remove inline title divider | `inline-title-divider-remove` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2363) |
| inline title text color | `inline-title-color-select` | Переключатель не подтверждён CSS | У класса и значений настройки нет действующего правила в разобранном CSS.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2398) |
| Enable H1 divider | `h1-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2425) |
| H1 text color | `h1-color-select` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2469) |
| Enable H2 divider | `h2-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2488) |
| H2 text color | `h2-color-select` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2532) |
| Enable H3 divider | `h3-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2551) |
| H3 text color | `h3-color-select` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2595) |
| Enable H4 divider | `h4-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2614) |
| H4 text color | `h4-color-select` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2658) |
| Enable H5 divider | `h5-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2677) |
| H5 text color | `h5-color-select` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2721) |
| Enable H6 divider | `h6-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2740) |
| H6 text color | `h6-color-select` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2784) |
| Justify paragraph text | `text-align-justify` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/text-justify/text-justify\|Выравнивание по ширине]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2803) |
| Paragraph spacing also takes effect after a line break (Reading mode) | `p-spacing-br` | Типографический параметр | Добавляет интервал абзаца после br в режиме чтения, через display:block и margin-top.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L2827) |
| Restore default style of unordered list | `ul-marker-restore` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/unordered-markers/unordered-markers\|Цвет и форма маркеров]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3080) |
| Table width | `table-width-select` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Таблица шире текстовой полосы | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3152) |
| center-align the image | `img-center-align` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/image-e006/image-e006\|По центру]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3185) |
| darken image in dark mode | `img-darken` | Есть карточка | Подтверждено правилом CSS. Приглушение ярких изображений в тёмном режиме | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3190) |
| Codeblock theme | `codeblock-style-select` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Согласованная палитра синтаксиса кода | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3204) |
| callout style | `callout-style-select` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-outline/callout-technical-outline\|Тонкая рамка]] | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3383) |
| seamless embeds | `seamless-embeds` | Есть карточка | Подтверждено правилом CSS. Встроенная заметка без отдельной рамки | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3491) |
| Disable Alternative Checkboxes | `disable-alternative-checkboxes` | Есть карточка | Подтверждено правилом CSS. Состояния задач по символу в квадратных скобках | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3544) |
| Enable card layout (pad only) | `card-layout-pad-open` | Есть карточка | Подтверждено правилом CSS. Панели рабочего пространства отдельными карточками | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3612) |
| Side drawer full screen (phone only) | `drawer-phone-full-width` | Есть карточка | Подтверждено правилом CSS. Проводник на весь экран телефона | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3617) |
| Disable full width table | `DB-table-full-width-off` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Таблица шире текстовой полосы | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3636) |
| background color | `DB-table-bg-color` | Палитра | Вариант цветов темы: --background-modifier-hover, --background-primary, --background-secondary. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3641) |
| background color | `Projects-bg-color` | Палитра | Вариант цветов темы: --background-primary, --background-secondary, --tab-background-active. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3661) |
| colorful checkbox | `colorful-checkbox` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Состояния задач по символу в квадратных скобках | [код](https://github.com/akifyss/obsidian-border/blob/05d2df5d157e15f13be1a43da2d3034c995dd8e2/theme.css#L3681) |

## Документация в репозитории

- [README.md](https://github.com/akifyss/obsidian-border/tree/05d2df5d157e15f13be1a43da2d3034c995dd8e2/README.md) — Obsidian Border Theme; Feature; Auto hide; Card layout; Hover line indicator; Highly customizable; [Presets](https://github.com/Akifyss/obsidian-border/blob/main/presets.md); ➡️ [Presets full list](https://github.com/Akifyss/obsidian-border/blob/main/presets.md); Miscellaneous; Alternate checkboxes; Alternate callout style; Alternate codeblock theme; Card layout (Pad); Customizable new tab; Credits
- [README.zh.md](https://github.com/akifyss/obsidian-border/tree/05d2df5d157e15f13be1a43da2d3034c995dd8e2/README.zh.md) — Obsidian Border Theme; 特性; 自动隐藏; 卡片式布局; 悬停行指示器; 高度可定制; [预设](https://github.com/Akifyss/obsidian-border/blob/main/presets.md); ➡️ [预设的完整列表](https://github.com/Akifyss/obsidian-border/blob/main/presets.md); 杂项; 备用复选框; 可选替代的标注样式; 可选替代的代码块主题; 卡片式布局 （平板端）; 可自定义的新标签页
- [presets.md](https://github.com/akifyss/obsidian-border/tree/05d2df5d157e15f13be1a43da2d3034c995dd8e2/presets.md) — Presets for [Border theme](https://github.com/Akifyss/obsidian-border)（Updating）; Light Mode; Dark Mode; Create your own UI style

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
